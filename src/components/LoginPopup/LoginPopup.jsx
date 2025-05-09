import axios from "axios";
import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import "./LoginPopup.css";

const LoginPopup = ({ setshowLogin }) => {
    const { url, settoken } = useContext(StoreContext);
    const [currState, setcurrState] = useState("Sign Up");

    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setdata((prevData) => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        const isLogin = currState === "Login";

        if (isLogin) {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                if (isLogin) {
                    // Login successful: store token and redirect
                    settoken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);
                    setshowLogin(false);
                    window.location.href = "/";
                } else {
                    // Registration successful: ask user to login manually
                    alert("User registered successfully! Please log in.");
                    setcurrState("Login");
                    setdata({ name: "", email: "", password: "" }); // reset form
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.error("Login/Register Error:", error);
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type='text'
                            placeholder='Enter your name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Enter email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Enter password'
                        required
                    />
                </div>
                <button type='submit'>
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                <p>
                    Create a new Account?{" "}
                    <span onClick={() => setcurrState("Sign Up")}>Click here</span>
                </p>
                <p>
                    Already have an account?{" "}
                    <span onClick={() => setcurrState("Login")}>Click here</span>
                </p>
            </form>
        </div>
    );
};

export default LoginPopup;
