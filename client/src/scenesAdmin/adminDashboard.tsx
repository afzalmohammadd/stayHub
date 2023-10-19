import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <header className="bg-teal-500 text-white py-2 px-4 flex justify-between items-center">
        <div className="text-xl font-bold">StayHub.com</div>
        <div className="space-x-4 flex">
          <button className="bg-teal-400 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
            Home
          </button>
          <button className="bg-teal-400 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
            Guest
          </button>
          <button className="bg-teal-400 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
            Property
          </button>
          <button className="bg-teal-400 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
            Booking
          </button>
          <button className="bg-teal-400 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
            Approval
          </button>
          <button className="bg-teal-400 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded">
            Request
          </button>
        </div>
        <div className="font-semibold">Admin</div>
      </header>
    </div>
  );
};

export default AdminDashboard;
