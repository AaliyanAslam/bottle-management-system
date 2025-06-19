// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './lib/firebase';
import Dashboard from './components/dashboard';
import DeliveryForm from './components/deliveryForm';
import DeliveryHistory from './components/deliveryHistory';

const Home = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'deliveries'), orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDeliveries(items);
    });

    return () => unsubscribe(); // Clean up
  }, []);

  return (
    <>
    
    <div className='[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white p-6'>
 <div className="max-w-4xl mx-auto px-4 py-8">
      <Dashboard deliveries={deliveries} />
      <DeliveryForm />
      <DeliveryHistory deliveries={deliveries} />
    </div>
    </div>
   
    
    </>
  );
};

export default Home;
