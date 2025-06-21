import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch the user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'https://your-api-url.com/user-profile', // Replace with your actual API URL
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">User Profile</h1>

        {/* Profile Section */}
        <div className="flex items-center mb-6">
          {/* Profile Image */}
          <div className="w-24 h-24 mr-6">
            <img
              
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbkECXtEG_6-RV7CSNgNoYUGZE-JCliYm9g&s" 
                  alt="Profile Picture" 
                  className="w-full h-full object-cover"
            />
          </div>
          {/* User Details */}
          <div>
            <h2 className="text-xl font-semibold text-blue-900">{user.fullName}</h2>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Phone: {user.phoneNumber}</p>
            <p className="text-gray-700">Address: {user.address}</p>
            <p className="text-gray-700">Bank: {user.bankName}</p>
            <p className="text-gray-700">Account No: {user.bankAccountNumber}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="text-center mt-4">
          <Link
            to="/edit-profile"
            className="bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-400"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
