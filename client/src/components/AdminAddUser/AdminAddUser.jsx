import React, { useState } from 'react'
import './AdminAddUser.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const AddUser = () => {
    const users = {
        name: "",
        email: "",
        address: "",
        password: "",
    };
    const [user , setUser] =useState(users);
    const navigate = useNavigate();

    const inputHandler =(e) =>{
        const {name, value }= e.target
        
        setUser({ ...user, [name]:value});
    };

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user",user)
        .then((response)=>{
            toast.success(response.data.message,{position:"top-right"});
            navigate("/admin");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

  return (
    <div className='addUser'>
        <Link to='/admin' type="button" class="btn btn-secondary"><i class="fa-solid fa-backward"></i> Back </Link>
        <h3>Add New User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name'>Name : </label>
                <input type='text' id='name' onChange={inputHandler} name='name' autoComplete='off' placeholder='Enter Your Name' />
            </div>
            <div className='inputGroup'>
                <label htmlFor='email'>Email : </label>
                <input type='email' id='email' onChange={inputHandler} name='email' autoComplete='off' placeholder='Enter Your Email' />
            </div>
            <div className='inputGroup'>
                <label htmlFor='address'>Address : </label>
                <input type='text' id='address' onChange={inputHandler}  name='address' autoComplete='off' placeholder='Enter Your Address' />
            </div>
            <div className='inputGroup'>
                <label htmlFor='password'>Password : </label>
                <input type='password' id='password' onChange={inputHandler} name='password' autoComplete='off' placeholder='Enter Your Password' />
            </div>
            <div className='inputGroup'>
            <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddUser