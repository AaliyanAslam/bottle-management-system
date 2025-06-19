import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './app';
import Signup from './signup';


const layout = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      
    </Routes>
  );
};

export default layout;
