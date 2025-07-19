import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './app';
import Signup from './signup';
import Login from "./login";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import PaymentsPage from "./PaymentsPage"

const Layout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // wait for auth state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // clean up
  }, []);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/app" /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/app" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/app" /> : <Signup />}
      />
      <Route
        path="/app"
        element={user ? <App /> : <Navigate to="/login" />}
      />
      <Route
  path="/payments"
  element={user ? <PaymentsPage /> : <Navigate to="/login" />}
/>
    </Routes>
  );
};

export default Layout;
