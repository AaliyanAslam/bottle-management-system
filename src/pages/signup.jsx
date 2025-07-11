import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [messege, setMessege] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      setMessege('Account created successfully');
      setTimeout(() => setMessege(''), 2000);
      navigate('/app');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 
        p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-2xl shadow-2xl"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-center">
          Sign Up
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 sm:p-3 mb-4 border border-gray-300 rounded text-sm sm:text-base"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 sm:p-3 mb-4 border border-gray-300 rounded text-sm sm:text-base"
          required
        />

        {messege && <div className="text-green-600 text-sm sm:text-base mb-2">{messege}</div>}
        {error && <div className="text-red-600 text-sm sm:text-base mb-2">{error}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 sm:p-3 rounded hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Sign Up
        </button>

        <div className="text-center text-gray-600 text-sm sm:text-base mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
