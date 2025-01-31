import React, { useEffect, useState } from 'react';
import './AdminLogin.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import toast, { LoaderIcon } from "react-hot-toast";
import axios from 'axios';


const AdminLogin = () => {
    const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(()=>{
    console.log(token)
    if(token){
        navigate('/admin')
    }
  },[]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:8000/api/login',credentials);

      console.log(result,'----admin login');
      if(result.data.success){
        toast.success('Login successful!');
      localStorage.setItem('adminToken',result.data.token);
      navigate('/admin')
      }
    } catch (error) {
      toast.error('Internal server Error');
      console.log('error',error)
    }

    // Dummy authentication logic
    // if (credentials.username === 'admin' && credentials.password === '123') {
    //   navigate('/admin')
    //   toast.success('Login successful!');
    //   localStorage.setItem('adminToken','adminToken1234');
    //   // Redirect to the admin dashboard (implement routing later)
    // } else {
    //   setError('Invalid username or password.');
    // }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email address"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
