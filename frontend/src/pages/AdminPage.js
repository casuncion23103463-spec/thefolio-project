import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, postsRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/posts')
      ]);
      setUsers(usersRes.data);
      setPosts(postsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const { data } = await API.put(`/admin/users/${userId}/status`);
      setUsers(users.map(u => u._id === userId ? data.user : u));
    } catch (err) {
      console.error(err);
    }
  };

  const removePost = async (postId) => {
    try {
      await API.put(`/admin/posts/${postId}/remove`);
      setPosts(posts.map(p => p._id === postId ? { ...p, status: 'removed' } : p));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading admin dashboard...</div>;

  return (
    <section className="admin-section">
      <h1 className="title">Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <button 
          className={tab === 'users' ? 'tab-active' : ''}
          onClick={() => setTab('users')}
        >
          Members ({users.length})
        </button>
        <button 
          className={tab === 'posts' ? 'tab-active' : ''}
          onClick={() => setTab('posts')}
        >
          All Posts ({posts.length})
        </button>
      </div>
      
      {tab === 'users' && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleUserStatus(user._id)}
                      className={user.status === 'active' ? 'btn-warning' : 'btn-success'}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {tab === 'posts' && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.author?.name || 'Unknown'}</td>
                  <td>
                    <span className={`status-badge ${post.status}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>
                    {post.status === 'published' && (
                      <button
                        onClick={() => removePost(post._id)}
                        className="btn-danger"
                      >
                        Remove Post
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminPage;