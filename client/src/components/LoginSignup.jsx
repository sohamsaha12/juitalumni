import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [passoutBatch, setPassoutBatch] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Minimum 8 characters, at least one letter, one number, and one special character
  const phoneRegex = /^\d{10}$/; // Exactly 10 digits

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);
  const isPhoneValid = isLogin || phoneRegex.test(contactNumber); // Validate phone number only during registration

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!isEmailValid) {
      setError('Invalid email format');
      return;
    }
    if (!isPasswordValid) {
      setError('Password must be at least 8 characters long, contain at least one letter, one number, and one special character');
      return;
    }
    if (!isPhoneValid) {
      setError('Contact number must be exactly 10 digits');
      return;
    }

    try {
      const response = isLogin
        ? await axios.post('https://ju-it-alumni-host.onrender.com/login', { email, password })
        : await axios.post('https://ju-it-alumni-host.onrender.com/register', {
            name,
            email,
            password,
            rollNumber,
            passoutBatch,
            contactNumber
          });
      if (isLogin) {
        onLogin(response.data.token);
        navigate('/'); // Redirect to home page after successful login
      } else {
        // Show success message as a prompt
        window.alert('Registration successful. Awaiting approval.');
        // Clear the form fields
        setName('');
        setEmail('');
        setPassword('');
        setRollNumber('');
        setPassoutBatch('');
        setContactNumber('');
        setError('');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rollNumber" className="block text-gray-700 font-bold mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  id="rollNumber"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="passoutBatch" className="block text-gray-700 font-bold mb-2">
                  Passout Batch
                </label>
                <input
                  type="text"
                  id="passoutBatch"
                  value={passoutBatch}
                  onChange={(e) => setPassoutBatch(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contactNumber" className="block text-gray-700 font-bold mb-2">
                  Contact Number (Preferably WhatsApp)
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <div className="mt-2">
                  <p className={`text-sm ${isPhoneValid ? 'text-green-500' : 'text-red-500'}`}>
                    {isPhoneValid ? '✔ Valid phone number' : '✘ Phone number must be exactly 10 digits'}
                  </p>
                </div>
              </div>
            </>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <div className="mt-2">
              <p className={`text-sm ${isEmailValid ? 'text-green-500' : 'text-red-500'}`}>
                {isEmailValid ? '✔ Valid email format' : '✘ Invalid email format'}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <div className="mt-2">
              <p className={`text-sm ${password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
                {password.length >= 8 ? '✔ At least 8 characters' : '✘ At least 8 characters'}
              </p>
              <p className={`text-sm ${/(?=.*[A-Za-z])/.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                {/(?=.*[A-Za-z])/.test(password) ? '✔ Contains at least one letter' : '✘ Must contain at least one letter'}
              </p>
              <p className={`text-sm ${/(?=.*\d)/.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                {/(?=.*\d)/.test(password) ? '✔ Contains at least one number' : '✘ Must contain at least one number'}
              </p>
              <p className={`text-sm ${/(?=.*[@$!%*?&])/.test(password) ? 'text-green-500' : 'text-red-500'}`}>
                {/(?=.*[@$!%*?&])/.test(password) ? '✔ Contains at least one special character' : '✘ Must contain at least one special character'}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;