// components/Dashboard.jsx
import StatsCard from './topDetails';
import { FaAirFreshener, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const Dashboard = ({ deliveries }) => {
    const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const totalBottles = deliveries.reduce((acc, d) => acc + d.quantity, 0);
  const totalCost = deliveries.reduce((acc, d) => acc + (d.quantity * d.price), 0);
  const lastDeliveryDate = deliveries.length > 0 ? deliveries[deliveries.length - 1].date : "-";
  const monthlyDeliveries = deliveries.filter(d => {
    const deliveryDate = new Date(d.date);
    return (
      deliveryDate.getMonth() === currentMonth &&
      deliveryDate.getFullYear() === currentYear
    );
  });

  const monthlyCost = monthlyDeliveries.reduce((acc, d) => acc + (d.quantity * d.price), 0);
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <StatsCard
        icon={<FaAirFreshener size={24} />}
        title="Total Bottles"
        value={totalBottles}
        color="bg-blue-500"
      />
      <StatsCard
        icon={<FaMoneyBillWave size={24} />}
        title="Total Cost"
        value={`${totalCost} PKR`}
        color="bg-pink-500"
      />
      <StatsCard
        icon={<FaCalendarAlt size={24} />}
        title="Last Delivery"
        value={lastDeliveryDate}
        color="bg-teal-500"
      />
      <StatsCard
        icon={<FaCalendarAlt size={24} />}
        title="This Month Cost"
        value={`${monthlyCost} PKR`}
        color="bg-indigo-500"
      />
    </div>
  );
};

export default Dashboard;
