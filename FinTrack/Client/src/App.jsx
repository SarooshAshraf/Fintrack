// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './component/SignUp';
import LoginForm from './component/LogIn';
import Main from './component/Main'
import VerifyScreen from './component/VerifyScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/verify" element={<VerifyScreen />} />
        <Route path="/Signup" element={<SignupForm/>} />
        <Route path="/Main" element={<Main/>} />
      </Routes>
    </Router>
  );
};

export default App;
