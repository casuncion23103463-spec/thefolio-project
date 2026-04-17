import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import PostPage from './pages/PostPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          
          {/* Protected Routes (logged in only) */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/create-post" element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          } />
          <Route path="/edit-post/:id" element={
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          } />
          
          {/* Admin Only Route */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;