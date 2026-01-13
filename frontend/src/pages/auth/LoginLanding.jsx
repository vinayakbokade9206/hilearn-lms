
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Users, PhoneCall, BarChart3,
  Calendar, ShieldCheck, Zap,
  CheckCircle2, Menu, X, Phone, Mail, GraduationCap
} from "lucide-react";

const LoginLandingPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    "Home",
    "Market Integrations",
    "Pricing",
    "Testimonials",
    "Contact",
    "Help"
  ];

  const Counter = ({ end, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 1200;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end]);

    return (
      <span>
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-blue-600 text-white font-sans">

      {/* ================= HEADER ================= */}
 <header className="sticky top-0 z-50 bg-white shadow-sm w-full">
      {/* --- TOP BAR (Only Desktop) --- */}
    <div className=" lg:block sm:hidden bg-gray-200 text-sm">
    <div className=" mx-auto px-6 py-2 flex justify-between items-center">
      <p className="text-blue-600 font-medium">
        AI for Everyone. Data for Everyone.
      </p>
      <div className="flex gap-6 text-gray-700">
        <span>📞 +91-6355030012</span>
        <span>✉ info@hilearnacademy.com</span>
      </div>
    </div>
</div>


      {/* --- MAIN NAVBAR --- */}
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
            <GraduationCap className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 leading-none">HILEARN</h1>
            <p className="text-[10px] tracking-[0.2em] text-blue-600 font-bold">ACADEMY</p>
          </div>
        </div>

        {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
        <nav className="sm:hidden lg:flex items-center gap-8">
          {menuItems.map((item, idx) => (
            <span
              key={idx}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 cursor-pointer transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-full after:transition-all"
            >
              {item}
            </span>
          ))}
        </nav>

        {/* --- DESKTOP BUTTONS (Hidden on Mobile) --- */}
        <div className="sm:hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
          >
            Register Now
          </button>
        </div>

        {/* --- MOBILE HAMBURGER BUTTON (Hidden on Desktop) --- */}
        <div className="sm:flex lg:hidden items-center">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {open && (
        <nav className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col p-6 gap-4">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                className="text-base font-semibold text-slate-700 hover:text-blue-600 transition-colors border-b border-slate-50 pb-2"
                onClick={() => setOpen(false)}
              >
                {item}
              </li>
            ))}
            <li className="flex flex-col gap-3 pt-4">
              <button
                onClick={() => { navigate("/login"); setOpen(false); }}
                className="w-full py-3 border-2 border-slate-100 text-slate-700 font-bold rounded-xl"
              >
                Login
              </button>
              <button
                onClick={() => { navigate("/register"); setOpen(false); }}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100"
              >
                Get Started
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-b from-blue-600 to-indigo-700 min-h-[84vh] flex items-center lg:py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <p className="inline-block px-5 py-1.5 text-sm font-semibold text-blue-600 bg-white rounded-full mb-5">
            HiLearn Learning Management System
          </p>

          <h1 className="mt-4 text-4xl md:text-[3.4rem] font-bold leading-tight text-white">
            Manage Students, Mentors & Courses <br />
            From <span className="text-yellow-300">One Smart LMS</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-blue-100 max-w-3xl mx-auto">
            A centralized platform for admins, mentors and students
            to collaborate, track progress, manage lectures and
            deliver world-class learning experiences.
          </p>

          <div className="mt-8 flex flex-row sm:flex-row justify-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-white text-blue-600 rounded-xl shadow hover:bg-blue-50 transition"
            > 
              Continue to Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 border border-white rounded-xl hover:bg-white/10 transition"
            >
              Create Account
            </button>
          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div className="group hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-extrabold text-blue-700">
              <Counter end={50} suffix="K+" />
            </h2>
            <p className="text-gray-500 text-sm mt-2 group-hover:text-blue-600 transition">
              Active Users
            </p>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-extrabold text-emerald-600">
              <Counter end={10} suffix="M+" />
            </h2>
            <p className="text-gray-500 text-sm mt-2 group-hover:text-emerald-600 transition">
              Leads Managed
            </p>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-extrabold text-blue-700">
              <Counter end={98} suffix="%" />
            </h2>
            <p className="text-gray-500 text-sm mt-2 group-hover:text-blue-600 transition">
              Satisfaction Rate
            </p>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-extrabold text-emerald-600">
              <Counter end={24} suffix="/7" />
            </h2>
            <p className="text-gray-500 text-sm mt-2 group-hover:text-emerald-600 transition">
              Support Available
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 px-4 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Everything You Need To Succeed
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your sales process and boost team productivity.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={<Users />} title="Lead Management" desc="Centralize and organize all your leads with powerful filtering and search capabilities." />
            <FeatureCard icon={<PhoneCall />} title="Click-to-Call" desc="Integrated calling system with automatic call logging and recording features." />
            <FeatureCard icon={<BarChart3 />} title="Advanced Analytics" desc="Real-time insights and comprehensive reports to track your team performance." />
            <FeatureCard icon={<Calendar />} title="Smart Follow-ups" desc="Never miss a follow-up with automated reminders and scheduling tools." />
            <FeatureCard icon={<ShieldCheck />} title="Role-Based Access" desc="Secure your data with granular permission controls for different team roles." />
            <FeatureCard icon={<Zap />} title="Automation" desc="Automate lead assignment, email campaigns, and repetitive tasks effortlessly." />
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            Loved by Sales Teams Worldwide
          </h2>
          <p className="text-gray-500 mb-12">
            See what our customers have to say about CRM Pro
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard text="CRM Pro transformed our sales process. We increased conversions by 45% in just 3 months!" name="Sarah Johnson" role="Sales Director, TechCorp Inc." initial="SJ" />
            <TestimonialCard text="The best CRM investment we've made. Intuitive, powerful, and excellent customer support." name="Michael Chen" role="CEO, GrowthHub" initial="MC" />
            <TestimonialCard text="Managing our 20+ member team has never been easier. The analytics are game-changing!" name="Priya Sharma" role="Team Lead, Salesforce India" initial="PS" />
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-20 px-4 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600">
              Choose the perfect plan for your team size
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard title="Starter" price="29" features={[
              'Up to 5 users', '1,000 leads', 'Basic analytics', 'Email support', 'Mobile app access', 'API access'
            ]} />
            <PricingCard title="Professional" price="79" popular features={[
              'Up to 25 users', 'Unlimited leads', 'Advanced analytics', 'Priority support',
              'Call recording', 'Custom integrations', 'Email automation', 'Custom reports'
            ]} />
            <PricingCard title="Enterprise" price="199" features={[
              'Unlimited users', 'Unlimited leads', 'AI-powered insights', 'Dedicated support',
              'White-label options', 'Advanced security', 'Custom development', 'SLA guarantee'
            ]} />
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-b from-[#0B1220] to-[#060B16] text-gray-300 px-6">
        <div className="max-w-7xl mx-auto py-20 grid sm:grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-gray-500 rounded-md flex items-center justify-center">
                📘
              </div>
              <span className="text-2xl font-semibold text-white">
                HILEARN ACADEMY
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              Making AI and Data accessible to everyone. Transform your career
              with industry-aligned, practical learning.
            </p>

            <p className="mt-6 text-teal-400 font-semibold">
              AI for Everyone. Data for Everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Courses</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Refund Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li>✉ info@hilearnacademy.com</li>
              <li>📞 +91-6355030012</li>
              <li>
                📍 401, 402, Yash Aqua, Vijay Cross Roads,
                Navrangpura, Ahmedabad - 380009
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-white mb-3">Follow Us</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">f</div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">in</div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">⧉</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400">
          © 2025 HiLearn Academy. All rights reserved. | Empowering careers through data and AI education.
        </div>
      </footer>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-blue-700">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard = ({ text, name, role, initial }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm text-left hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
    <div className="flex text-yellow-400 mb-4">★★★★★</div>
    <p className="text-gray-700 italic mb-6">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
        {initial}
      </div>
      <div>
        <p className="font-bold text-sm">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const PricingCard = ({ title, price, features, popular = false }) => (
  <div
    className={`relative bg-white text-gray-800 p-8 rounded-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl
      ${popular ? "border-2 border-indigo-500" : "border border-gray-200"}`}
  >
    {popular && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold">
        Most Popular
      </span>
    )}

    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-gray-500">/month</span>

    </div>

    <button className={`w-full py-3 rounded-lg font-bold mb-8
      ${popular
        ? "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"}`}>
      Start Free Trial
    </button>

    <ul className="space-y-4">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm">
          <CheckCircle2 className="w-4 h-4 text-green-500" /> {f}
        </li>
      ))}
    </ul>
  </div>
);


export default LoginLandingPage;