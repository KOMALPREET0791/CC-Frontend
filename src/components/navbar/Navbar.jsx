import React, { useState, useContext, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setshowLogin }) => {
    const [menu, setmenu] = useState('');
    const { getTotalCartAmount, token, settoken } = useContext(StoreContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        settoken('');
        navigate('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className='navbar'>
            <div className="brand">
                <Link to="/">Crave<span>Cart</span></Link>
            </div>
            <ul className='navbar-menu'>
                <Link to="/"><li onClick={() => setmenu('home')} className={menu === 'home' ? 'active' : ''}>Home</li></Link>
                <a href="#explore-menu" onClick={() => setmenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a>
                <a href="#app-download" onClick={() => setmenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>App</a>
                <a href="#footer" onClick={() => setmenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact</a>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" />
                <div className="navbar-cart-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="Cart" /></Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>

                {!token ? (
                    <button onClick={() => setshowLogin(true)}>Sign In</button>
                ) : (
                    <div className='navbar-profile' ref={dropdownRef}>
                        <img src={assets.profile_icon} alt="Profile" onClick={() => setDropdownOpen(!dropdownOpen)} />
                        <ul className={`nav-profile-dropdown ${dropdownOpen ? 'show' : ''}`}>
                            <li onClick={() => { navigate('/profile'); setDropdownOpen(false); }}><img src={assets.profile_icon} alt="" /><p>Profile</p></li>
                            <li onClick={() => { navigate('/myorders'); setDropdownOpen(false); }}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={() => { logout(); setDropdownOpen(false); }}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
