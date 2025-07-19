import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { DollarSign, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const navigate = useNavigate();

  // Track user login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      setUser(currentUser);

      // Fetch only this user's payments, latest first
     const q = query(
  collection(db, "payments"),
  where("userId", "==", currentUser.uid)
);
// orderBy hata diya temporarily


      const unsubPayments = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate() : new Date(d.createdAt),
          };
        });
        setPayments(data);

        // Calculate total
        setTotalPaid(data.reduce((sum, p) => sum + p.amount, 0));
      });

      return () => unsubPayments();
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to add a payment.');
      return;
    }
    setIsSubmitting(true);
    setStatus(null);

    try {
      await addDoc(collection(db, 'payments'), {
        amount: Number(amount),
        createdAt: new Date(),
        userId: user.uid,
      });
      setStatus('success');
      setAmount('');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Back Button */}
      <div className='[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white p-6'>

      <div className="absolute left-4 top-4 bg-blue-500 p-3 rounded-3xl text-white shadow-md hover:bg-blue-600 transition">
        <Link to="/app">
          <IoArrowBack />
        </Link>
      </div>

      {/* Add Payment Form */}
      <div className="mt-16 w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto  
        p-4 sm:p-6 md:p-8 
        rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]
        bg-gradient-to-br from-[#000950] via-[#1B1E3C] to-[#111428] 
        border border-gray-700 
        transition-all duration-300 
        hover:shadow-[0_6px_30px_rgba(0,0,0,0.6)]">
        
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
          <span className="p-2 sm:p-3 bg-green-100 rounded-full shadow-inner">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </span>
          Enter Amount You Paid
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="relative">
            <input
              type="number"
              placeholder="Enter amount (PKR)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg text-white placeholder-gray-400 bg-[#1B1E3C] border border-gray-600 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
            <span className="absolute right-3 sm:right-4 top-2.5 sm:top-3 text-gray-400 text-base sm:text-lg">
              ₨
            </span>
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm sm:text-base animate-fade-in">
              <Check className="w-4 h-4 sm:w-5 sm:h-5" /> Payment added successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm sm:text-base animate-fade-in">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Failed to add payment. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full py-2.5 sm:py-3 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg transition-all duration-200 hover:from-green-700 hover:to-green-800 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Payment...
              </span>
            ) : (
              'Add Payment'
            )}
          </button>
        </form>
      </div>

      {/* Payments Overview */}
      <div className="max-w-3xl mx-auto p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Payments Overview</h2>

        <div className="p-4 bg-[#12152B] rounded-lg mb-6">
          <h3 className="text-lg font-semibold">Total Paid</h3>
          <p className="text-2xl font-bold text-green-400">₨ {totalPaid}</p>
        </div>

        <div className="bg-[#1B1E3C] p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          {payments.length > 0 ? (
            <ul className="space-y-3">
              {payments.map((p) => (
                <li key={p.id} className="flex justify-between p-3 bg-[#12152B] rounded-md shadow">
                  <span className="text-gray-300">{p.createdAt.toLocaleDateString()}</span>
                  <span className="text-green-400 font-bold">₨ {p.amount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No payments recorded yet.</p>
          )}
        </div>
      </div>
      </div>

    </>
  );
};

export default PaymentForm;
