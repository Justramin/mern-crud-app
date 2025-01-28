import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./UserSignUp.css";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    confirmPassword: "",
  });

//   const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/signup', {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        password: formData.password,
      });

      toast.success(response.data.message || "Registration successful!", {
        position: "top-right",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong!", {
            position: "top-right",
          });
    }
  };

  return (
    <div className="signup-container">
      <h2>User Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <p className="login-link">
          Do you have an account? <a href="/">Login</a>
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default UserSignUp;
