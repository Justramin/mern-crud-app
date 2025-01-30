import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/adminlogin');
        }
    }, [navigate, token]);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data);
            } catch (error) {
                console.log('Error while fetching Data', error);
            }
        };
        fetchData();
    }, [token]);

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/api/delete/user/${userId}`)
            .then((response) => {
                setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
                toast.success(response.data.message, { position: "top-right" });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLogOut = () => {
        localStorage.removeItem('adminToken');
        navigate('/adminlogin');
        toast.error('Logout successful');
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='userTable'>
            <div className="header">
                <h2>User Management</h2>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="button">
                <Link to="/admin/add" className='add-user-btn'>
                    Add User <i className="fa-solid fa-user-plus"></i>
                </Link>
                <button className="logout-btn" onClick={handleLogOut}>Log out</button>
            </div>

            {filteredUsers.length === 0 ? (
                <div className='noData'>
                    <h3>No Data to display.</h3>
                    <p>Please add New User</p>
                </div>
            ) : (
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
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td className='actionButtons'>
                                    <Link to={`/admin/update/` + user._id} className="btn btn-info">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <Link onClick={() => deleteUser(user._id)} className="btn btn-danger">
                                        <i className="fa-solid fa-trash"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default User;