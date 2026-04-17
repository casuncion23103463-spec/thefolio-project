import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data);
    } catch (err) {
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/comments/${id}`);
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      const { data } = await API.post(`/comments/${id}`, { body: newComment });
      setComments([data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${id}`);
        navigate('/home');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (!post) return null;

  const canEdit = user && (user._id === post.author?._id || user.role === 'admin');
  const imageUrl = post.image ? `http://localhost:5000/uploads/${post.image}` : null;

  return (
    <section className="post-section">
      <article className="post-full">
        {imageUrl && (
          <div className="post-hero-image">
            <img src={imageUrl} alt={post.title} />
          </div>
        )}
        
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          By <strong>{post.author?.name}</strong> • 
          {new Date(post.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        
        <div className="post-body">
          {post.body.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        
        {canEdit && (
          <div className="post-actions">
            <Link to={`/edit-post/${id}`} className="btn btn-outline">Edit Post</Link>
            <button onClick={handleDeletePost} className="btn btn-danger">Delete Post</button>
          </div>
        )}
      </article>
      
      <div className="comments-section">
        <h2 className="section-title">Comments ({comments.length})</h2>
        
        {user ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              placeholder="Share your thoughts on this analysis..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              required
            />
            <button type="submit" className="btn btn-primary">Post Comment</button>
          </form>
        ) : (
          <div className="login-prompt">
            <p><Link to="/login">Login</Link> to join the discussion</p>
          </div>
        )}
        
        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className="comment-card">
                <div className="comment-header">
                  <strong>{comment.author?.name}</strong>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{comment.body}</p>
                {(user && (user._id === comment.author?._id || user.role === 'admin')) && (
                  <button 
                    onClick={() => handleDeleteComment(comment._id)}
                    className="delete-comment"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PostPage;