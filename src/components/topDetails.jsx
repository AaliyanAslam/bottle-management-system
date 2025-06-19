import React from 'react'

const topDetails = ({ icon, title, value, color }) => {
  return (
    <div className="bg-[#12152B] rounded-2xl p-6 text-white w-full sm:w-1/3">
      <div className={`p-3 inline-block rounded-xl mb-4 ${color}`}>
        {icon}
      </div>
      <h2 className="text-gray-400 text-sm mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};



export default topDetails