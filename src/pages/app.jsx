// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";
import Dashboard from '../components/dashboard';
import DeliveryForm from '../components/deliveryForm';
import DeliveryHistory from '../components/deliveryHistory';

const Home = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Auth listener + fetch data in one place
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch only this user's deliveries
      const q = query(
  collection(db, 'deliveries'),
  where('userId', '==', currentUser.uid)
);


        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setDeliveries(items);
        });

        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
        navigate('/'); // Redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className='[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white p-6'>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Navbar />
        <Dashboard deliveries={deliveries} />
        <DeliveryForm />
        <DeliveryHistory deliveries={deliveries} />
      </div>
    </div>
  );
};

export default Home;
