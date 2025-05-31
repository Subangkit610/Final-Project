import React, { useState } from 'react';

const Booking = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDestination || !selectedDate || !paymentMethod) {
      alert("Please complete all fields.");
      return;
    }
    alert(`Booking successful for ${selectedDestination} on ${selectedDate} with ${paymentMethod} payment.`);
  };

  return (
    <div className="font-sans">

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('src/assets/bajo.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4 py-32">
          <h1 className="text-3xl font-extrabold mb-6">Book Your Next Adventure</h1>
          <p className="text-xl mb-8">Secure your trip and enjoy a seamless booking experience</p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-8 text-center">Booking Details</h2>
          <form onSubmit={handleSubmit}>
            {/* Select Destination */}
            <div className="mb-6">
              <label htmlFor="destination" className="block text-lg font-medium mb-2">Select Your Destination</label>
              <select
                id="destination"
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-6 py-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select a Destination</option>
                <option value="Bali">Bali</option>
                <option value="Labuan Bajo">Labuan Bajo</option>
                <option value="Raja Ampat">Raja Ampat</option>
              </select>
            </div>

            {/* Select Date */}
            <div className="mb-6">
              <label htmlFor="date" className="block text-lg font-medium mb-2">Select Travel Date</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-6 py-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Select Payment Method */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Payment Method</label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="DANA"
                    name="paymentMethod"
                    value="DANA"
                    checked={paymentMethod === 'DANA'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio"
                  />
                  <label htmlFor="DANA" className="ml-2">DANA</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="OVO"
                    name="paymentMethod"
                    value="OVO"
                    checked={paymentMethod === 'OVO'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio"
                  />
                  <label htmlFor="OVO" className="ml-2">OVO</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bankTransfer"
                    name="paymentMethod"
                    value="Bank Transfer"
                    checked={paymentMethod === 'Bank Transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio"
                  />
                  <label htmlFor="bankTransfer" className="ml-2">Bank Transfer</label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="text-center">
          <p>&copy; 2025 Travel Website. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Booking;
