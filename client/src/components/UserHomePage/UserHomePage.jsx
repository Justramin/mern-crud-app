import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../../redux/slices/authSlice";
import "./UserHomePage.css";
import defaultImage from '../../../src/assets/defalut.webp'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const UserHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userdata, isAuthenticated } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: userdata?.name || "",
    email: userdata?.email || "",
    profilePicture: userdata?.profilePicture || "",
  });
  const [profile,setProfile] = useState(null);

 

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    const formData = {}
  
    // Append text fields
    formData.name= updatedData.name
    formData.email = updatedData.email
  
    // Append file if it exists
    if (profile) {
      formData.profilePicture=profile
    }

    console.log(formData,'formdata of the user',updatedData);

    try{
    axios.put(`http://localhost:8000/api/user/update/${userdata._id}`, formData, {headers:{'Content-Type':'multipart/form-data'}})
      .then((response) => {
        console.log("Response:", response.data);
        dispatch(login({ ...userdata, ...updatedData }));
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        localStorage.removeItem('authToken');
        navigate('/')
        toast.error('Unauthorized, Please login again')
      });

    } catch (error) {
      console.log('error',error)
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedData({ ...updatedData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(()=>{
    const token = localStorage.getItem('authToken');
    if(!isAuthenticated || !token) {
      toast.error('Please log in to view your profile.');
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate('/')
    }
  },[])

  

  return (
    <>
    {
      isAuthenticated && 
   
    <div className="user-homepage">
      <div className="profile-container">
        <img
          src={updatedData.profilePicture || defaultImage}
          alt="Profile"
          className="profile-picture"
        />
        {!isEditing ? (
          <>
            <h2>{userdata.name}</h2>
            <p>{userdata.email}</p>
            <button className="edit-button" onClick={handleEdit}>
              Edit Profile
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <form className="edit-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button type="button" className="save-button" onClick={handleSave}>
              Save
            </button>
          </form>
        )}
      </div>
    </div>
     }
    </>
  );
};

export default UserHomePage;
