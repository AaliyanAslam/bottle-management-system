import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
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
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setMessege('Login successful');
      setTimeout(() => {
        setMessege('');
      }, 2000);
      navigate('/app');
    } catch (err) {
      setError(err.message);
    }
  };

onAuthStateChanged(auth , (user)=> {
  if(user){
    console.log("user => " , user);
      navigate('/app');
    
  } else {
    console.log("no user ");
    
  }
})

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 
        p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-2xl shadow-2xl"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-center">
          Login Here
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
          Login
        </button>

        <div className="text-center text-gray-600 text-sm sm:text-base mt-4">
          Don't have an account?{' '}
          <Link
            to="/signup"
            onClick={() => console.log('clicked to signup')}
            className="text-blue-600 hover:underline"
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;



// import React, { useState } from 'react';

// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [messege, setMessege] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name : "",
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
   
//     try {
//     const response = await fetch('http://localhost/apointment-core/auth/register.php', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(form), // contains email and password
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setMessege('Login successful!');
//       // Example: Store token if returned
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//       }

//       // Redirect to dashboard or home
//       navigate('/dashboard');
//     } else {
//       // Show error message from backend
//       setError(data.message || 'Invalid credentials');
//     }
//   } catch (err) {
//     setError('Something went wrong. Please try again.');
//     console.error(err);
//   }


//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 
//       [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white">
      
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white text-black w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 
//         p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-2xl shadow-2xl"
//       >
//         <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-center">
//           Login Here
//         </h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full p-2 sm:p-3 mb-4 border border-gray-300 rounded text-sm sm:text-base"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full p-2 sm:p-3 mb-4 border border-gray-300 rounded text-sm sm:text-base"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full p-2 sm:p-3 mb-4 border border-gray-300 rounded text-sm sm:text-base"
//           required
//         />

//         {messege && <div className="text-green-600 text-sm sm:text-base mb-2">{messege}</div>}
//         {error && <div className="text-red-600 text-sm sm:text-base mb-2">{error}</div>}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 sm:p-3 rounded hover:bg-blue-700 transition text-sm sm:text-base"
//         >
//           Login
//         </button>

//         <div className="text-center text-gray-600 text-sm sm:text-base mt-4">
//           Don't have an account?{' '}
//           <Link
//             to="/signup"
//             onClick={() => console.log('clicked to signup')}
//             className="text-blue-600 hover:underline"
//           >
//             Signup
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;


