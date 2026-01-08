
import { useNavigate } from "react-router-dom";
import { 
  Users, PhoneCall, BarChart3, 
  Calendar, ShieldCheck, Zap, 
  CheckCircle2 
} from 'lucide-react';

const LoginLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#D6D8F2] text-gray-900">

      {/* ================= HEADER ================= */}
      <header className=" sticky top-0 z-50   bg-white shadow-sm">

        {/* Top Bar */}
        <div className="bg-gray-50 text-sm">
          <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
            <p className="text-blue-600 font-medium">
              AI for Everyone. Data for Everyone.
            </p>
            <div className="flex gap-6 text-gray-700">
              <span>📞 +91-6355030012</span>
              <span>✉ info@hilearnacademy.com</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-12 h-12 border-2 border-blue-600 rounded-md flex items-center justify-center">
              📘
            </div>
            <div>
              <h1 className="text-xl font-bold">HILEARN</h1>
              <p className="text-sm tracking-widest text-gray-600">
                ACADEMY
              </p>
            </div>
          </div>

          <nav className="md:flex gap-10 font-medium text-gray-700">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <span className="hover:text-blue-600 cursor-pointer">Market Integrations</span>
            <span className="hover:text-blue-600 cursor-pointer">Pricing</span>
            <span className="hover:text-blue-600 cursor-pointer">Testimonials</span>
            <span className="hover:text-blue-600 cursor-pointer">Contact</span>
            <span className="hover:text-blue-600 cursor-pointer">Help</span>
          </nav>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-7 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-b from-blue-50 to-white min-h-[70vh] flex items-center">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="inline-block px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
            HiLearn Learning Management System
          </p>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
            Manage Students, Mentors & Courses <br />
            From <span className="text-blue-600">One Smart LMS</span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            A centralized platform for admins, mentors and students
            to collaborate, track progress, manage lectures and
            deliver world-class learning experiences.
          </p>

          <div className="mt-8 flex justify-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              Continue to Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
      {/* ================= STATS ================= */}
      <section className="py-14 bg-blue-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            ["50K+", "Active Users"],
            ["10M+", "Leads Managed"],
            ["98%", "Satisfaction Rate"],
            ["24/7", "Support Available"],
          ].map(([value, label]) => (
            <div key={label}>
              <h2 className="text-3xl font-bold text-blue-600">{value}</h2>
              <p className="text-gray-600 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

       {/* ================= FEATURES ================= */}
      {/* 2. Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need To Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your sales process and boost team productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<Users />} title="Lead Management" desc="Centralize and organize all your leads with powerful filtering and search capabilities." />
            <FeatureCard icon={<PhoneCall />} title="Click-to-Call" desc="Integrated calling system with automatic call logging and recording features." />
            <FeatureCard icon={<BarChart3 />} title="Advanced Analytics" desc="Real-time insights and comprehensive reports to track your team performance." />
            <FeatureCard icon={<Calendar />} title="Smart Follow-ups" desc="Never miss a follow-up with automated reminders and scheduling tools." />
            <FeatureCard icon={<ShieldCheck />} title="Role-Based Access" desc="Secure your data with granular permission controls for different team roles." />
            <FeatureCard icon={<Zap />} title="Automation" desc="Automate lead assignment, email campaigns, and repetitive tasks effortlessly." />
          </div>
        </div>
      </section>

      {/* 3. Testimonials */}
      <section className="py-20 bg-slate-100 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Loved by Sales Teams Worldwide</h2>
          <p className="text-gray-600 mb-12">See what our customers have to say about CRM Pro</p>
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard 
              text="CRM Pro transformed our sales process. We increased conversions by 45% in just 3 months!" 
              name="Sarah Johnson" role="Sales Director, TechCorp Inc." initial="SJ"
            />
            <TestimonialCard 
              text="The best CRM investment we've made. Intuitive, powerful, and excellent customer support." 
              name="Michael Chen" role="CEO, GrowthHub" initial="MC"
            />
            <TestimonialCard 
              text="Managing our 20+ member team has never been easier. The analytics are game-changing!" 
              name="Priya Sharma" role="Team Lead, Salesforce India" initial="PS"
            />
          </div>
        </div>
      </section>

      {/* 4. Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Choose the perfect plan for your team size</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <PricingCard title="Starter" price="29" features={['Up to 5 users', '1,000 leads', 'Basic analytics', 'Email support', 'Mobile app access', 'API access']} />
            <PricingCard title="Professional" price="79" popular={true} features={['Up to 25 users', 'Unlimited leads', 'Advanced analytics', 'Priority support', 'Call recording', 'Custom integrations', 'Email automation', 'Custom reports']} />
            <PricingCard title="Enterprise" price="199" features={['Unlimited users', 'Unlimited leads', 'AI-powered insights', 'Dedicated support', 'White-label options', 'Advanced security', 'Custom development', 'SLA guarantee']} />
          </div>
        </div>
      </section>

      {/* 5. CTA Footer */}
      <section className="py-20 bg-indigo-600 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Sales?</h2>
        <p className="mb-10 text-indigo-100">Join 50,000+ teams already using CRM Pro to close more deals and grow faster.</p>
        <div className="flex sm:flex-row justify-center gap-4 px-4">
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition shadow-lg">Start Free 14-Day Trial</button>
          <button className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition">Schedule a Demo</button>
        </div>
      </section>
      

      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-b from-[#0B1220] to-[#060B16] text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">

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


const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard = ({ text, name, role, initial }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-left">
    <div className="flex text-yellow-400 mb-4">{"★★★★★"}</div>
    <p className="text-gray-700 italic mb-6">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{initial}</div>
      <div>
        <p className="font-bold text-sm leading-tight">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const PricingCard = ({ title, price, features, popular = false }) => (
  <div className={`relative p-8 rounded-2xl border ${popular ? 'border-indigo-500 shadow-xl ring-2 ring-indigo-500' : 'border-gray-200 bg-white'}`}>
    {popular && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Most Popular</span>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 text-sm mb-6">For {title === 'Starter' ? 'small teams' : title === 'Professional' ? 'growing businesses' : 'large organizations'}</p>
    <div className="mb-8">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-gray-500">/month</span>
    </div>
    <button className={`w-full py-3 rounded-lg font-bold mb-8 transition ${popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'}`}>
      Start Free Trial
    </button>
    <ul className="space-y-4">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
          <CheckCircle2 className="w-4 h-4 text-green-500" /> {f}
        </li>
      ))}
    </ul>
  </div>
);

export default LoginLandingPage;

