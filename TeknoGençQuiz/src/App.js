// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { message } from 'antd';
import { auth, logout } from './firebase'; // Firebase config dosyanız
import LessonSelection from './LessonSelection';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Turkish from './Turkish';
import English from './English';
import MathLesson from './Math';
import ScienceLesson from './Science';
import Profile from './Profile';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleRegisterSuccess = (user) => {
    setLoggedInUser(user);
  };

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Başarıyla çıkış yapıldı!');
      setLoggedInUser(null);
    } catch (error) {
      message.error('Çıkış başarısız. Lütfen tekrar deneyin.');
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={loggedInUser ? <Navigate to="/LessonSelection" /> : <SignIn onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<SignUp onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/lessons/turkish" element={<Turkish />} />
          <Route path="/lessons/english" element={<English />} />
          <Route path="/lessons/science" element={<ScienceLesson />} />
          <Route path="/lessons/math" element={<MathLesson />} />
          <Route path="/LessonSelection" element={<LessonSelection handleLogout={handleLogout} />} />
          <Route path="/login" element={<SignIn onLoginSuccess={handleLoginSuccess} />} />
          {/* Pass loggedInUser as prop to Profile */}
          <Route path="/profile" element={<Profile user={loggedInUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
