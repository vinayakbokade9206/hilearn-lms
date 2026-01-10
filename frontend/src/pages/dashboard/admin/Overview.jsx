const Overview = () => {
  return (
    <div className="space-y-6 text-white">
      <h1 className="text-2xl font-bold">Platform Overview</h1>
      <p className="text-slate-400">
        Welcome to HiLearn LMS Admin Panel.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="3,420" />
        <StatCard title="Active Courses" value="84" />
        <StatCard title="Lectures" value="1,240" />
        <StatCard title="Batches" value="36" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
    <p className="text-sm text-slate-400">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

export default Overview;
