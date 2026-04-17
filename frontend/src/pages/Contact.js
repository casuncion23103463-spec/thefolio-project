import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
      hasError = true;
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setStatus('Please fix the errors above before sending.');
      return;
    }

    setStatus('Message sent! Thank you — I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    
    setTimeout(() => setStatus(''), 5000);
  };

  const resources = [
    { name: 'Esports Insider', desc: 'Latest industry news and competitive analysis' },
    { name: 'MOBA Analytics Pro', desc: 'Advanced strategy breakdowns and game guides' },
    { name: 'Gamepedia Database', desc: 'Comprehensive game mechanics and item references' },
    { name: 'Coach Portal', desc: 'Team management and performance tracking tools' }
  ];

  return (
    <>
      <section>
        <h1 className="title">Get In Touch</h1>
        <p style={{ marginBottom: '2rem' }}>Have a question or want to work together? Send me a message!</p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)' }}
            />
            <div style={{ color: 'tomato', fontSize: '0.9rem', marginTop: '0.25rem', height: '18px' }}>{errors.name || ''}</div>
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <input 
              type="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)' }}
            />
            <div style={{ color: 'tomato', fontSize: '0.9rem', marginTop: '0.25rem', height: '18px' }}>{errors.email || ''}</div>
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <textarea 
              placeholder="Your Message" 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)', minHeight: '120px' }}
            />
            <div style={{ color: 'tomato', fontSize: '0.9rem', marginTop: '0.25rem', height: '18px' }}>{errors.message || ''}</div>
          </div>
          
          <button type="submit" className="btn btn-primary">Send Message</button>
          <div style={{ marginTop: '0.75rem', height: '20px', fontSize: '0.95rem', color: status.includes('Thank') ? 'lightgreen' : 'var(--text-muted)' }}>
            {status}
          </div>
        </form>
      </section>

      <section>
        <h2 className="title">Resources & References</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid rgba(200, 170, 110, 0.3)', padding: '1rem', textAlign: 'left' }}>Resource</th>
              <th style={{ border: '1px solid rgba(200, 170, 110, 0.3)', padding: '1rem', textAlign: 'left' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid rgba(200, 170, 110, 0.3)', padding: '1rem' }}>{resource.name}</td>
                <td style={{ border: '1px solid rgba(200, 170, 110, 0.3)', padding: '1rem' }}>{resource.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Contact;  // ← Make sure this line exists