import React, { useEffect, useState  } from "react";
// import { useDispatch } from "react-redux";
import { login} from "../../redux/slices/authSlice";
import axios from "axios";
import "./UserLogin.css";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const UserLogin = () => {
const navigate = useNavigate()
  let data = useSelector((state)=>state)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem('authToken');
  useEffect(()=>{
    if(token){
        navigate('/home');
      }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        email,
        password,
      });

      const { token, userdata } = response.data;

      // Save token in Redux store and localStorage
      dispatch(login(userdata));
      localStorage.setItem("authToken", token);
      console.log('redux',data)
      navigate('/home')
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  
  return (
    <div className="user-login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>User Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
