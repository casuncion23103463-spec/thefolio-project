import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API, { API_BASE_URL } from '../api/axios';
import pfpImg from '../assets/Pfp.jpg';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <>
      <section id="profile">
        <img src={pfpImg} alt="Esports Analyst Avatar" className="profile-img" />
        <div className="profile-hero">
          <h1>Esports Analyst & Coach</h1>
          <p>Focused on MOBA strategy, draft analysis, and competitive team performance improvement.</p>
          <br />
          <button className="btn btn-primary" onClick={() => window.location.href='/about'}>About Me</button>
          <button className="btn btn-outline" onClick={() => window.location.href='/contact'}>Contact</button>
        </div>
      </section>

      <section>
        <h2 className="title">Latest Analysis Posts</h2>
        
        {posts.length === 0 ? (
          <p>No posts yet. Check back soon for analysis!</p>
        ) : (
          <div className="content-grid">
            {posts.map(post => (
              <div key={post._id} className="content-card">
                {post.image && (
                  <img 
                    src={`${API_BASE_URL}/uploads/${post.image}`} 
                    alt={post.title}
                    className="content-card-image"
                  />
                )}
                <div className="content-card-body">
                  <span className="content-card-badge">Analysis</span>
                  <h3>{post.title}</h3>
                  <p>{post.body.substring(0, 150)}...</p>
                  <Link to={`/posts/${post._id}`} className="btn btn-outline">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;