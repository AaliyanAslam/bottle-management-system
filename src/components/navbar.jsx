import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'

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
    <div>
            <nav className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white p-6  mb-5">
      <div className="text-xl font-semibold text-gray-800">
        {/* You can put your app name here if needed */}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all text-sm"
      >
    Logout
      </button>
    </nav>
    </div>
  )
}

export default navbar