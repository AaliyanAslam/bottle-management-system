// components/DeliveryHistory.jsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Make sure this path is correct

const DeliveryHistory = ({ deliveries }) => {
  // 📅 Format date like "18 Jun 2025"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // 🧹 Delete delivery
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this delivery?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'deliveries', id));
      alert("Deleted successfully");
      // If using useEffect to fetch data, deletion will auto-reflect via onSnapshot or refresh logic
    } catch (err) {
      console.error("Error deleting delivery:", err);
      alert("Failed to delete delivery");
    }
  };

  // 🔁 Sort by date descending (latest first)
  const sortedDeliveries = [...deliveries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="bg-[#12152B] p-6 rounded-2xl mt-10 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Delivery History</h2>

      {sortedDeliveries.length === 0 ? (
        <p className="text-gray-400">No deliveries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="uppercase bg-[#1D203E] text-gray-400 text-xs sm:text-sm">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Delivered By</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {sortedDeliveries.map((d, index) => (
                <tr
                  key={d.id || index}
                  className="border-b border-[#2A2D47] hover:bg-[#1F223E] transition-colors"
                >
                  <td className="px-4 py-3">{formatDate(d.date)}</td>
                  <td className="px-4 py-3">{d.quantity}</td>
                  <td className="px-4 py-3">{d.price} PKR</td>
                  <td className="px-4 py-3 font-semibold text-green-400">
                    {d.total} PKR
                  </td>
                  <td className="px-4 py-3">{d.deliveredBy || '-'}</td>
                  <td className="px-4 py-3 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                    {d.notes || '-'}</td>
                  <td className="px-4 py-3">
                    {d.id ? (
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="text-red-400 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeliveryHistory;
