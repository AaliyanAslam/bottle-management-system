import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { Link } from 'react-router-dom'
import { MdPaid } from "react-icons/md";


const navbar = () => {
     const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // ya '/'

    } catch (error) {
      console.log('Logout Error:', error.message);
    }
  };
  return (
            <nav className="flex justify-between [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white p-6  mb-5">
      <div>
  <Link 
    to="/payments" 
    className="text-white flex items-center justify-center gap-3   font-medium transition-colors bg-green-600 px-3 py-2 rounded-xl"
  >
    You paid <MdPaid />

  </Link>
</div>

<div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all text-sm"
        >
    Logout
      </button>
        </div>
      
    </nav>
  )
}

export default navbar