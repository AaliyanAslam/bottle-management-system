import React, { useState } from 'react';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import {auth} from "../lib/firebase"
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [messege , setMessege] = useState("")
    const [error , setError] = useState("")
const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    // Firebase logic yahan add karni hai
    console.log('Signup form:', form);
   try{
     await signInWithEmailAndPassword (auth , form.email , form.password)
     setMessege("Login successfull successfully")
     console.log("loin successfull");
     setInterval(() => {
        setMessege("")
     }, 2000);
     navigate("/app")
   }
   catch(err){
setError(err.message)
console.log(err.message);

   } finally{

   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-lg lg:text-2xl  font-bold mb-6 text-center">Login Here</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
<div className='text-green-600'>{messege}</div>
<div className='text-red-600'>{error}</div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
         Login
        </button>
            <div className="text-sm text-center text-gray-400 mt-4">
  Dont't have an account?{' '}
  <Link to="/signup" onClick={()=> console.log("clicked to signup")
  } className="text-blue-500 hover:underline">
    Signup
  </Link>
</div>
      </form>
 

    </div>
  );
};

export default Login;
