import { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDTkMLE-H4GyaOs_QizCj7TeGFb8evIzic",
  authDomain: "chidambaram-d0257.firebaseapp.com",
  projectId: "chidambaram-d0257",
  storageBucket: "chidambaram-d0257.firebasestorage.app",
  messagingSenderId: "765266295460",
  appId: "1:765266295460:web:e3309005d454516c92c431",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Scroll Animation
function ScrollReveal({ children, delay = 0 }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });

  // 🔥 TEAM DATA
  const teamMembers = [
    {
      name: 'S. Eraiamudhan',
      role: 'Frontend Developer',
      description: 'Expert in React and UI design'
    },
    {
      name: 'S. Lokeshwaran',
      role: 'Backend Developer',
      description: 'Specialist in APIs and databases'
    }
  ];

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Booking', href: '#booking' },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '₹4,999',
      features: ['Single Page', 'Responsive', 'Basic SEO']
    },
    {
      name: 'Pro',
      price: '₹9,999',
      features: ['Multi Page', 'Animations', 'Database']
    },
    {
      name: 'Enterprise',
      price: '₹14,999',
      features: ['Full App', 'API', 'Dashboard']
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach(link => {
        const section = document.querySelector(link.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(link.href.replace('#', ''));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await addDoc(collection(db, 'bookings'), {
      ...formData,
      timestamp: serverTimestamp()
    });

    alert("Submitted Successfully!");
  };

  return (
    <div className="bg-[#0f0f23] text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-black/40 backdrop-blur z-50">
        <div className="flex justify-between px-6 py-4">
          <h1 className="font-bold text-xl">SV</h1>
          <div className="flex gap-4">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className={activeSection === link.href.slice(1)
                  ? "text-white"
                  : "text-gray-400"}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="text-center py-32">
        <ScrollReveal>
          <h1 className="text-6xl font-bold">S. Vigneshwaran</h1>
          <p className="text-gray-400 mt-4">Freelance Web Developer</p>
        </ScrollReveal>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 text-center">
        <h2 className="text-4xl mb-10">Services</h2>
        <div className="grid md:grid-cols-3 gap-6 px-6">
          {["Website", "Web App", "E-Commerce"].map((s, i) => (
            <ScrollReveal key={i}>
              <div className="glass p-6 rounded-xl">{s}</div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-20 text-center">
        <h2 className="text-4xl mb-10">My Team</h2>

        <div className="grid md:grid-cols-2 gap-8 px-6">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={i}>
              <div className="glass p-8 rounded-xl hover:scale-105 transition">
                <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {member.name[0]}
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-indigo-400">{member.role}</p>
                <p className="text-gray-400">{member.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 text-center">
        <h2 className="text-4xl mb-10">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6 px-6">
          {pricingPlans.map((plan, i) => (
            <ScrollReveal key={i}>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl">{plan.name}</h3>
                <p className="text-2xl">{plan.price}</p>
                <ul>
                  {plan.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20 text-center">
        <h2 className="text-4xl mb-10">Book Project</h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <input placeholder="Name" className="w-full p-3 bg-white/10 rounded"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

          <input placeholder="Email" className="w-full p-3 bg-white/10 rounded"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

          <input placeholder="Phone" className="w-full p-3 bg-white/10 rounded"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

          <textarea placeholder="Project Details" className="w-full p-3 bg-white/10 rounded"
            onChange={(e) => setFormData({ ...formData, project: e.target.value })} />

          <button className="bg-indigo-600 px-6 py-3 rounded">
            Submit
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-400">
        © 2026 S. Vigneshwaran
      </footer>

    </div>
  );
}
