import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) formData.append('image', image);
    
    try {
      const { data } = await API.post('/posts', formData);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post');
      setLoading(false);
    }
  };

  return (
    <section className="create-post-section">
      <div className="post-form-container">
        <h1 className="title">Write a New Post</h1>
        <p>Share your esports analysis and insights</p>
        
        {error && <div className="error-alert">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <textarea
              placeholder="Write your analysis here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              required
            />
          </div>
          
          {user?.role === 'admin' && (
            <div className="form-group">
              <label>Upload Cover Image (Admin only):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <small>Recommended size: 1200x630px</small>
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePostPage;