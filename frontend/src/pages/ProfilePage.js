import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePic, setProfilePic] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    if (profilePic) formData.append('profilePic', profilePic);
    
    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      await changePassword(currentPassword, newPassword);
      setMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error changing password');
    }
  };

  const profilePicUrl = user?.profilePic 
    ? `http://localhost:5000/uploads/${user.profilePic}`
    : 'https://via.placeholder.com/150';

  return (
    <section className="profile-section">
      <div className="profile-container">
        <h1 className="title">My Profile</h1>
        
        {message && <div className="success-alert">{message}</div>}
        {error && <div className="error-alert">{error}</div>}
        
        <div className="profile-tabs">
          <button 
            className={activeTab === 'profile' ? 'tab-active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Edit Profile
          </button>
          <button 
            className={activeTab === 'password' ? 'tab-active' : ''}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
        </div>
        
        <div className="profile-preview">
          <img src={profilePicUrl} alt="Profile" className="profile-avatar" />
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
          <p className="role-badge">{user?.role}</p>
        </div>
        
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Bio / About</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
                placeholder="Tell us about your esports experience..."
              />
            </div>
            
            <div className="form-group">
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>
            
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        )}
        
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordChange} className="profile-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>New Password (min 6 characters)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength="6"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">Update Password</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;