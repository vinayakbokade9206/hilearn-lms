import {
  LayoutDashboard,
  Users,
  Layers,
  Wallet,
  FileBarChart,
  Settings,
  Bell,
} from "lucide-react";

const kpis = [
  { label: "Total Users", value: "3,420", change: "+12%" },
  { label: "Active Courses", value: "84", change: "+4%" },
  { label: "Monthly Revenue", value: "₹7.6L", change: "+18%" },
  { label: "System Health", value: "99.9%", change: "Stable" },
];

const approvals = [
  { name: "Amit Shah", type: "Mentor Approval" },
  { name: "UI/UX Bootcamp", type: "Course Approval" },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-950 p-6 border-r border-slate-800">
        <h1 className="text-2xl font-black tracking-wide text-orange-500 mb-10">
          ADMIN PANEL
        </h1>

        <nav className="space-y-4 text-slate-300">
          <NavItem icon={LayoutDashboard} label="Overview" />
          <NavItem icon={Users} label="User Management" />
          <NavItem icon={Layers} label="Course Control" />
          <NavItem icon={Wallet} label="Payments" />
          <NavItem icon={FileBarChart} label="Reports" />
          <NavItem icon={Settings} label="System Settings" />
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOP BAR */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold">Platform Overview</h2>
            <p className="text-xs text-slate-400">
              System performance & platform insights
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-slate-400" />
            <div className="text-right">
              <p className="font-semibold">Super Admin</p>
              <p className="text-xs text-slate-400">root@hilearn.com</p>
            </div>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-8 space-y-10">

          {/* KPI CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((k, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <p className="text-xs text-slate-400">{k.label}</p>
                <h3 className="text-3xl font-bold mt-1">{k.value}</h3>
                <p className="text-green-400 text-xs mt-2">{k.change}</p>
              </div>
            ))}
          </section>

          {/* MID SECTION */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ACTIVITY */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold mb-4">Platform Activity</h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>🔹 New student registrations increased by 14%</p>
                <p>🔹 6 mentors awaiting approval</p>
                <p>🔹 Payment gateway uptime stable</p>
                <p>🔹 Course completion rate improved</p>
              </div>
            </div>

            {/* APPROVALS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold mb-4">Pending Approvals</h3>

              {approvals.map((a, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center mb-3"
                >
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-xs text-slate-400">{a.type}</p>
                  </div>

                  <button className="text-xs px-3 py-1 rounded-lg bg-orange-500 text-black font-bold">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 cursor-pointer hover:text-orange-400">
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </div>
);

export default AdminDashboard;
