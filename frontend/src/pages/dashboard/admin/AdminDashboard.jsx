const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Total Students</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">120</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Courses</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">8</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Lectures</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">45</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Active Batches</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">5</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
