import React, { useState, useEffect } from 'react';

const AdminPanel = ({ user }) => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await fetch('https://ju-it-alumni-host.onrender.com/api/users/pending', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch pending users');
        }
        const data = await response.json();
        setPendingUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPendingUsers();
  }, []);

  const approveUser = async (userId) => {
    const confirmApprove = window.confirm('Are you sure you want to approve this user?');
    if (!confirmApprove) return;

    try {
      const response = await fetch(`https://ju-it-alumni-host.onrender.com/api/users/${userId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to approve user');
      }
      setPendingUsers(pendingUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const declineUser = async (userId) => {
    const confirmDecline = window.confirm('Are you sure you want to decline this user?');
    if (!confirmDecline) return;

    try {
      const response = await fetch(`https://ju-it-alumni-host.onrender.com/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to decline user');
      }
      setPendingUsers(pendingUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
      <h2 className="text-2xl font-bold mb-4">Pending Users</h2>
      {pendingUsers.length === 0 ? (
        <p>No pending users</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingUsers.map(user => (
            <div key={user._id} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <h3 className="text-xl font-bold mb-2 text-white">{user.name}</h3>
              <p className="text-gray-400 mb-2">{user.email}</p>
              <p className="text-gray-400 mb-2">Roll No: {user.rollNumber}</p>
              <p className="text-gray-400 mb-2">Passout Batch: {user.passoutBatch}</p>
              <p className="text-gray-400 mb-4">Contact: {user.contactNumber}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => approveUser(user._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => declineUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;