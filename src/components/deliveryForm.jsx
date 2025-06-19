import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  Package,
  Calendar,
  Hash,
  DollarSign,
  User,
  FileText,
  Check,
  AlertCircle,
} from 'lucide-react';

const DeliveryForm = () => {
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // e.g., "2025-06-18"
  };

  const [form, setForm] = useState({
    date: getToday(),
    quantity: '',
    price: '80',
    deliveredBy: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const total = form.quantity * form.price;

    try {
      await addDoc(collection(db, 'deliveries'), {
        ...form,
        total: Number(total),
        quantity: Number(form.quantity),
        price: Number(form.price),
        createdAt: new Date()
      });

      setSubmitStatus('success');

      // 👇 Form reset, but keep today's date
      setForm({
        date: getToday(),
        quantity: '',
        price: '80',
        deliveredBy: '',
        notes: ''
      });

      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = form.quantity && form.price
    ? (Number(form.quantity) * Number(form.price)).toFixed(2)
    : '0.00';

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#12152B] rounded-2xl shadow-lg ">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-200 rounded-lg">
            <Package className="w-6 h-6 text-blue-900" />
          </div>
          <h2 className="text-2xl font-bold text-white">Add New Delivery</h2>
        </div>
        <p className="text-white">Record a new bottle delivery with all the details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white">
            <Calendar className="w-4 h-4" />
            Delivery Date
          </label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
          />
        </div>

        {/* Quantity and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-white">
              <Hash className="w-4 h-4" />
              Quantity (Bottles)
            </label>
            <input
              name="quantity"
              type="number"
              placeholder="e.g., 24"
              value={form.quantity}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-white">
              <DollarSign className="w-4 h-4" />
              Price per Bottle
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="e.g., 80"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Total Display */}
        {(form.quantity || form.price) && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Total Amount:</span>
              <span className="text-lg font-bold text-blue-900">Rs: {total}</span>
            </div>
          </div>
        )}

        {/* Delivered By */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white">
            <User className="w-4 h-4" />
            Delivered By
          </label>
          <input
            name="deliveredBy"
            type="text"
            placeholder="Enter delivery person's name"
            value={form.deliveredBy}
            onChange={handleChange}
            className="w-full px-4 py-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-white">
            <FileText className="w-4 h-4" />
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            placeholder="Add any additional notes about this delivery..."
            value={form.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 text-black placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
          />
        </div>

        {/* Submit Status */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <Check className="w-5 h-5" />
            <span className="font-medium">Delivery added successfully!</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Failed to add delivery. Please try again.</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding Delivery...
            </>
          ) : (
            <>
              <Package className="w-5 h-5" />
              Add Delivery
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default DeliveryForm;
