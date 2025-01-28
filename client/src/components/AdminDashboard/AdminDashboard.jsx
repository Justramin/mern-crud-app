import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const User = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
const token = localStorage.getItem('adminToken');

  useEffect(()=>{
    if(!token){
        navigate('/adminlogin')
    }
  },[]);


    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data)
            } catch (error) {
                console.log('Error while fetching Data', error);
                
            }
        };
        fetchData()
    },[]);

    const deleteUser = async (userId)=>{
        await axios.delete(`http://localhost:8000/api/delete/user/${userId}`)
        .then((response)=>{
            setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId));
            toast.success(response.data.message,{position:"top-right"})
        })
        .catch((error)=>{
            console.log(error); 
        });
    }

    const handelLogOut = () =>{
        localStorage.removeItem('adminToken');
        navigate('/adminlogin');
        toast.error('Logout successful')
    }
  return (
    <div className='userTable'>

        
        <Link to="/admin/add" type='button' className='btn btn-primary'>Add User <i class="fa-solid fa-user-plus"></i></Link>

        <button className="btn btn-danger" onClick={handelLogOut}>Log out</button>

       

        {users.length === 0 ?(
            <div className='noData'>
                <h3>No Data to display.</h3>
                <p>Please add New User</p>
            </div>
        ):(
            <table className='table table-bordered'>
            <thead>
                <tr>
                    <th scope='col'>Si:No.</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((users,index)=>{
                    return(

                        <tr>
                    <td>{index+1}</td>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>{users.address}</td>
                    <td className='actionButtons'>
                    <Link to={`/admin/update/`+users._id} type="button" class="btn btn-info"><i class="fa-solid fa-pen-to-square"></i></Link>
                    <Link onClick={()=>deleteUser(users._id)} type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></Link>
                    </td>
                </tr>
                    )
                })}
                
            </tbody>
        </table>
        )}
        

    </div>
  )
}

export default User