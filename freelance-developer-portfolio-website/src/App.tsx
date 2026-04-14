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
    });

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addDoc(collection(db, 'bookings'), {
      ...formData,
      timestamp: serverTimestamp()
    });
    alert("Submitted!");
  };

  return (
    <div className="bg-[#0f0f23] text-white">

      {/* HERO */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold">S. Vigneshwaran</h1>
        <p className="text-gray-400 mt-4">Freelance Web Developer</p>
      </section>

      {/* SERVICES */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-10">Services</h2>
        <div className="grid md:grid-cols-3 gap-6 px-6">
          {["Website", "Web App", "E-Commerce"].map((s, i) => (
            <ScrollReveal key={i}>
              <div className="glass p-6 rounded-xl">{s}</div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-10">My Team</h2>

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

      {/* BOOKING FORM */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-10">Book Project</h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <input
            placeholder="Name"
            className="w-full p-3 bg-white/10 rounded"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="Email"
            className="w-full p-3 bg-white/10 rounded"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            placeholder="Phone"
            className="w-full p-3 bg-white/10 rounded"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <textarea
            placeholder="Project Details"
            className="w-full p-3 bg-white/10 rounded"
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          />

          <button className="bg-indigo-600 px-6 py-3 rounded">
            Submit
          </button>
        </form>
      </section>

    </div>
  );
}
