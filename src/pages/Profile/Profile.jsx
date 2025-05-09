import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './Profile.css';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons from react-icons

const Profile = () => {
    const { token } = useContext(StoreContext);
    const [user, setUser] = useState('');
    const userId=localStorage.getItem("userId")
    const [editData, setEditData] = useState({ name: '', email: user.email, userId:userId });
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const fetchUserProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/user/profile/${userId}`, {
                headers: { token }
            });
            if (res.data.success) {
                setUser(res.data.data);
            }
        } catch (err) {
            console.log("Failed to fetch user profile", err);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const updateProfile = async () => {
        try {
            setLoading(true);
            const res = await axios.put('http://localhost:4000/api/user/profile', editData, { headers: { token } });
            setLoading(false);
            if (res.data.success) {
                alert('Profile updated successfully!');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    const changePassword = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwords;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put(
                'http://localhost:4000/api/user/changepassword',
                { currentPassword, newPassword, userId }
            );
            setLoading(false);
            if (response.data.success) {
                alert('Password changed successfully!');
                // ✅ Reset password form
                setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error changing password:', error);
            alert('Failed to change password.');
        }
    };

    return (
        <div className="profile-page">
            <h2>Profile</h2>
            <div className="profile-info">
                <input
                    defaultValue={user.name}
                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                    placeholder="Name"
                />
                <input
                    value={user.email}
                    disabled
                    onChange={e => setEditData({ ...editData, email: e.target.value })}
                    placeholder="Email"
                />
                <button onClick={updateProfile} disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </div>

            <h3>Change Password</h3>
            <div className="password-change">
                <div className="password-input-container">
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Current Password"
                        value={passwords.currentPassword}
                        onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    />
                    <span onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="password-toggle-icon">
                        {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>
                <div className="password-input-container">
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="New Password"
                        value={passwords.newPassword}
                        onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
                    />
                    <span onClick={() => setShowNewPassword(!showNewPassword)} className="password-toggle-icon">
                        {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>
                <div className="password-input-container">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm New Password"
                        value={passwords.confirmPassword}
                        onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle-icon">
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>
                <button onClick={changePassword} disabled={loading}>
                    {loading ? 'Changing...' : 'Change Password'}
                </button>
            </div>
        </div>
    );
};

export default Profile;
