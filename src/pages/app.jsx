// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Dashboard from '../components/dashboard';
import DeliveryForm from '../components/deliveryForm';
import DeliveryHistory from '../components/deliveryHistory';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "../lib/firebase";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar"

const Home = () => {
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate()
  const [user , setUser]= useState()

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

  useEffect(()=> {
const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
    setUser(currentUser)
   console.log("user in login");
   
if(currentUser){
    navigate("/app") 
} else {
    navigate("/") 

}
})
  } , [])

  return (
    <>
    
    <div className='[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white p-6'>
 <div className="max-w-4xl mx-auto px-4 py-8">
    <Navbar/>
      <Dashboard deliveries={deliveries} />
      <DeliveryForm />
      <DeliveryHistory deliveries={deliveries} />
    </div>
    </div>
   
    
    </>
  );
};

export default Home;
