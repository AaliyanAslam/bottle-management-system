import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './app';
import Signup from './signup';
import Login from "./login"



const layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/app" element={<App />} />
      
    </Routes>
  );
};

export default layout;
