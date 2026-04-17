import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import championImg from '../assets/Champion.jpg';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={championImg} alt="Logo" className="logo-img" />
        <span>Esports Analyst</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/home" className={isActive('/home')}>Home</Link></li>
        <li><Link to="/about" className={isActive('/about')}>About</Link></li>
        <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
        
        {user ? (
          <>
            <li><Link to="/profile" className={isActive('/profile')}>Profile</Link></li>
            <li><Link to="/create-post" className={isActive('/create-post')}>Write Post</Link></li>
            {user.role === 'admin' && (
              <li><Link to="/admin" className={isActive('/admin')}>Admin</Link></li>
            )}
            <li><button onClick={handleLogout} className="nav-logout-btn">Logout ({user.name})</button></li>
          </>
        ) : (
          <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
        )}
      </ul>
      <ThemeToggle />
    </header>
  );
};

export default Header;