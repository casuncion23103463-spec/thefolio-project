import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const EditPostPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setBody(res.data.body);
        setExistingImage(res.data.image);
      })
      .catch(err => {
        setError('Post not found');
        setTimeout(() => navigate('/home'), 2000);
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) formData.append('image', image);
    
    try {
      await API.put(`/posts/${id}`, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${id}`);
        navigate('/home');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete post');
      }
    }
  };

  return (
    <section className="edit-post-section">
      <div className="post-form-container">
        <h1 className="title">Edit Post</h1>
        
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
              <label>Upload New Cover Image (optional):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {existingImage && (
                <small>Current image: {existingImage}</small>
              )}
            </div>
          )}
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Post'}
            </button>
            <button type="button" onClick={handleDelete} className="btn btn-danger">
              Delete Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPostPage;