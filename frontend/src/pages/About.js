import React, { useState, useEffect } from 'react';
import pfpImg from '../assets/Pfp.jpg';
import m4Img from '../assets/m4.jpg';
import auImg from '../assets/au.jpg';
import looImg from '../assets/loo.jpg';
import creepImg from '../assets/creep.jpg';
import minionImg from '../assets/minion.jpg';
import turtleImg from '../assets/turtle.jpg';
import lordImg from '../assets/lord.jpg';
import bushImg from '../assets/bush.jpg';
import itemImg from '../assets/item.jpg';
import heroesImg from '../assets/heroes.jpg';
import turretImg from '../assets/turret.jpg';
import baseImg from '../assets/base.jpg';
import mapImg from '../assets/map.jpg';

const About = () => {
  const [quizCards, setQuizCards] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [score, setScore] = useState(null);

  const quizData = [
    { img: creepImg, hint: "Any jungle monster", answer: "creep" },
    { img: minionImg, hint: "Small lane units walking to towers", answer: "minion" },
    { img: turtleImg, hint: "Big monster in the river (early game)", answer: "turtle" },
    { img: lordImg, hint: "Huge monster that helps push lanes", answer: "lord" },
    { img: bushImg, hint: "Tall grass where heroes can hide", answer: "bush" },
    { img: itemImg, hint: "Weapon or gear bought in shop", answer: "item" },
    { img: heroesImg, hint: "Character controlled by the player", answer: "hero" },
    { img: turretImg, hint: "Building that shoots enemies", answer: "turret" },
    { img: baseImg, hint: "Main base structure", answer: "base" },
    { img: mapImg, hint: "Whole battlefield where the game is played", answer: "map" }
  ];

  useEffect(() => {
    setQuizCards(quizData);
  }, []);

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
    if (value.toLowerCase() === quizData[index].answer) {
      setResults({ ...results, [index]: 'Correct!' });
    } else {
      setResults({ ...results, [index]: '' });
    }
  };

  const isCurrentAnswerCorrect = () => {
    const currentAnswer = answers[currentSlide];
    return currentAnswer && currentAnswer.toLowerCase() === quizData[currentSlide].answer;
  };

  const nextSlide = () => {
    if (currentSlide < quizData.length - 1) {
      if (!isCurrentAnswerCorrect()) {
        alert('Please answer correctly before proceeding!');
        return;
      }
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const checkAllAnswers = () => {
    let correct = 0;
    const newResults = {};
    quizData.forEach((item, idx) => {
      const userAnswer = answers[idx];
      if (userAnswer && userAnswer.toLowerCase() === item.answer) {
        newResults[idx] = 'Correct!';
        correct++;
      } else {
        newResults[idx] = '';
      }
    });
    setResults(newResults);
    setScore(`${correct}/${quizData.length}`);
  };

  const showAllAnswers = () => {
    const newAnswers = {};
    const newResults = {};
    quizData.forEach((item, idx) => {
      newAnswers[idx] = item.answer;
      newResults[idx] = 'Correct!';
    });
    setAnswers(newAnswers);
    setResults(newResults);
    setScore(`${quizData.length}/${quizData.length}`);
  };

  if (quizCards.length === 0) return <div>Loading...</div>;

  return (
    <>
      <section>
        <div className="featured-section">
          <div className="featured-item">
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <img src={pfpImg} alt="Profile" style={{ width: '160px', height: '160px', objectFit: 'cover', border: '3px solid var(--accent-color)' }} />
              <div>
                <h1 style={{ margin: '0 0 0.5rem' }}>7ckngmad</h1>
                <p style={{ margin: '0 0 1rem', color: 'var(--text-muted)' }}>Esports Analyst & Coach — specializing in MOBA macro strategy, draft analysis, and team performance.</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={() => window.location.href='/contact'}>Work With Me</button>
                  <button className="btn btn-outline" onClick={() => window.location.href='/register'}>View Services</button>
                </div>
              </div>
            </div>
          </div>

          <aside className="featured-item">
            <h3 style={{ marginTop: 0, color: 'var(--accent-color)' }}>Quick Stats</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              <li><strong>2+</strong> years — Competitive analysis</li>
              <li><strong>500+</strong> matches reviewed</li>
              <li><strong>10+</strong> teams assisted</li>
              <li><strong>4.9</strong> average client rating</li>
            </ul>
            <div style={{ marginTop: '1rem' }}><span className="featured-badge">Available for Coaching</span></div>
          </aside>
        </div>

        <h2 className="title">Core Strengths</h2>
        <div className="card-container">
          <div className="card">
            <h3>Strategic Analysis</h3>
            <p>Match breakdowns focused on macro decisions, rotations, and objective control to create repeatable win conditions.</p>
          </div>
          <div className="card">
            <h3>Draft & Meta</h3>
            <p>Draft recommendations, champion tiering, and counter-picks to maximize team composition efficiency.</p>
          </div>
          <div className="card">
            <h3>Coaching</h3>
            <p>Personalized coaching plans, scrim reviews, and communication training to improve team synergy.</p>
          </div>
        </div>

        <h2 className="title">Skills</h2>
        <div style={{ maxWidth: '900px', margin: '1rem auto', textAlign: 'left' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Macro Strategy</strong>
            <div style={{ background: 'rgba(255,255,255,0.05)', height: '10px', marginTop: '6px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: 'var(--accent-color)' }}></div>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Draft Analysis</strong>
            <div style={{ background: 'rgba(255,255,255,0.05)', height: '10px', marginTop: '6px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--accent-color)' }}></div>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Team Coaching</strong>
            <div style={{ background: 'rgba(255,255,255,0.05)', height: '10px', marginTop: '6px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '80%', height: '100%', background: 'var(--accent-color)' }}></div>
            </div>
          </div>
        </div>

        <h2 className="title">Visual Portfolio</h2>
        <div className="about-images">
          <img src={m4Img} alt="Professional headshot" />
          <img src={auImg} alt="Game analysis" />
          <img src={looImg} alt="Tournament review" />
        </div>

        <h2 className="title">Professional Journey</h2>
        <ol>
          <li><strong>2022</strong> – Mastered MOBA mechanics, studied competitive metas</li>
          <li><strong>2023</strong> – Analyzed hundreds of ranked and scrim matches</li>
          <li><strong>2024</strong> – Assisted multiple teams with draft strategies and game planning</li>
          <li><strong>2025</strong> – Advanced coaching focus with detailed match reviews and mentorship</li>
        </ol>

        <blockquote>
          "Winning starts with understanding the game, not just playing it. Excellence comes from preparation."
        </blockquote>

        <section className="map-section">
          <h2 className="title">Location</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=XG8P%2B89W,Bading,Butuan+City,8600+Agusan+del+Norte&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </section>

        <section className="quiz-section">
          <h2 className="title">Quiz — Match the Picture (1 pic 1 word)</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: 'auto' }}>Look at each image and type the one-word answer. Navigate through the quiz using the arrows.</p>
          
          <div className="quiz-slider" style={{ maxWidth: '500px', margin: '1rem auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              <span>{currentSlide + 1}</span> / {quizData.length}
            </div>
            
            <div style={{ position: 'relative', height: '420px' }}>
              <div className="quiz-card" style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
                <div className="q-number" style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{currentSlide + 1}</div>
                <div className="img-wrap" style={{ width: '100%', height: '300px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px', marginBottom: '0.75rem' }}>
                  <img src={quizData[currentSlide].img} alt="Quiz" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{quizData[currentSlide].hint}</div>
                <input 
                  type="text" 
                  placeholder="Your answer" 
                  value={answers[currentSlide] || ''}
                  onChange={(e) => handleAnswerChange(currentSlide, e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', color: 'inherit', textAlign: 'center' }}
                />
                <div className="q-result" style={{ marginTop: '0.4rem', height: '18px', fontWeight: '700', color: 'lightgreen' }}>
                  {results[currentSlide] || ''}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button onClick={prevSlide} className="btn btn-outline">← Prev</button>
              <button onClick={nextSlide} className="btn btn-primary">Next →</button>
            </div>

            <div style={{ textAlign: 'center', margin: '1rem' }}>
              <button onClick={checkAllAnswers} className="btn btn-primary">Check All Answers</button>
              <button onClick={showAllAnswers} className="btn btn-outline">Show All Answers</button>
              {score && <div id="quiz-score" style={{ marginTop: '0.75rem', color: 'var(--text-muted)' }}>Score: {score}</div>}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default About;