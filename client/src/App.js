import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Mission from './components/Mission';
import Alumni from './components/Alumni';
import Events from './components/Events';
import Donate from './components/Donate';
import Footer from './components/Footer';
import Blogs from './components/Blogs';
import Achievement from './components/Achievement.jsx';
import LoginSignup from './components/LoginSignup';
import AdminPanel from './components/AdminPanel';
import {jwtDecode} from 'jwt-decode';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/events" element={<Events />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/blogs" element={<Blogs user={user} />} />
        <Route path="/achievement" element={<Achievement />} />
        <Route path="/login" element={<LoginSignup onLogin={handleLogin} />} />
        {user && user.role === 'root' && (
          <Route path="/admin" element={<AdminPanel user={user} />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;