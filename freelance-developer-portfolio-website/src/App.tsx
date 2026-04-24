import { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase Configuration - Replace with your own config
const firebaseConfig = {
  apiKey: "AIzaSyDTkMLE-H4GyaOs_QizCj7TeGFb8evIzic",
  authDomain: "chidambaram-d0257.firebaseapp.com",
  projectId: "chidambaram-d0257",
  storageBucket: "chidambaram-d0257.firebasestorage.app",
  messagingSenderId: "765266295460",
  appId: "1:765266295460:web:e3309005d454516c92c431",
  measurementId: "G-YCPV1LGQ5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SplashScreen = () => {
  const bubbles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1 + 1.5,
    translateX: (Math.random() - 0.5) * 50 + 'vw',
    color: ['bg-fuchsia-500', 'bg-cyan-400', 'bg-yellow-400', 'bg-violet-500'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="splash-screen">
      {bubbles.map(b => (
        <div
          key={b.id}
          className={`absolute rounded-full opacity-0 animate-bubble ${b.color} shadow-lg shadow-white/20`}
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: '20%',
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            '--translate-x': b.translateX,
          } as React.CSSProperties}
        />
      ))}
      <div className="z-10 splash-logo">
        <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
          SV
        </h1>
      </div>
    </div>
  );
};

interface ScrollProps {
  children: React.ReactNode;
  delay?: number;
}

function ScrollReveal({ children, delay = 0 }: ScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`opacity-0 transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'team', 'pricing', 'booking'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'bookings'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project: formData.project,
        timestamp: serverTimestamp()
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', project: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Booking', href: '#booking' },
  ];

  const services = [
    {
      icon: '🌐',
      title: 'Website Development',
      description: 'Custom, responsive websites built with modern technologies like React, Vue.js, and Next.js.'
    },
    {
      icon: '📱',
      title: 'Web Applications',
      description: 'Dynamic and interactive web applications with smooth user experiences and powerful functionality.'
    },
    {
      icon: '🛒',
      title: 'E-Commerce Solutions',
      description: 'Full-featured online stores with payment integration, inventory management, and analytics.'
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Speed optimization, SEO enhancements, and best practices for better user experience.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Modern, intuitive designs that convert visitors into customers with exceptional user experiences.'
    },
    {
      icon: '🔧',
      title: 'Maintenance & Support',
      description: 'Ongoing support, updates, and maintenance to keep your website running smoothly.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '₹4,999',
      period: 'starting at',
      features: [
        'Single Page Website',
        'Responsive Design',
        'Contact Form',
        'Basic SEO Setup',
        '2 Revisions',
        '1 Week Support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₹9,999',
      period: 'starting at',
      features: [
        'Multi-Page Website',
        'Custom Animations',
        'CMS Integration',
        'Advanced SEO',
        'Contact Form + Database',
        '5 Revisions',
        '1 Month Support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₹14,999',
      period: 'starting at',
      features: [
        'Web Application',
        'Database Integration',
        'API Development',
        'Payment Integration',
        'Admin Dashboard',
        'Unlimited Revisions',
        '3 Months Support'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
      <SplashScreen />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#home" className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-md">
                SV
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === link.href.slice(1)
                        ? 'bg-white/10 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-4 pt-16">
        <div className="max-w-7xl mx-auto text-center z-10">
          <ScrollReveal>
            <div className="mb-6 inline-block animate-float">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-1 animate-pulse-glow shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                <div className="w-full h-full rounded-full bg-[#0a0a1a] flex items-center justify-center">
                  <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                    SV
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-fuchsia-200 bg-clip-text text-transparent">
                S. Vigneshwaran
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-cyan-50/80 mb-8 max-w-2xl mx-auto font-light">
              Freelance Web Developer crafting modern, high-performance digital experiences
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#booking"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-xl font-bold text-white hover:from-cyan-400 hover:to-fuchsia-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl shadow-fuchsia-500/25"
              >
                Start Your Project
              </a>
              <a
                href="#pricing"
                className="px-8 py-4 glass rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                View Pricing
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="mt-16 flex justify-center gap-8">
              <a href="#booking" className="glass px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <span>💼</span> Hire Me
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <span>💼</span> LinkedIn
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={800}>
            <div className="mt-20 animate-bounce">
              <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-md">
                About Me
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full shadow-[0_0_15px_rgba(192,38,211,0.5)]" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={200}>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Who I Am</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  I'm S. Vigneshwaran, a passionate freelance web developer with expertise in creating stunning, functional websites and web applications. With several years of experience in the industry, I help businesses transform their digital presence.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  My approach combines creativity with technical excellence, ensuring every project not only looks beautiful but also performs exceptionally. I specialize in modern frameworks and always stay updated with the latest web technologies.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Vue.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'MongoDB', 'Redis'].map((tech) => (
                    <span key={tech} className="px-4 py-2 glass rounded-full text-sm hover:bg-white/10 transition-all duration-300 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '50+', label: 'Projects Completed' },
                  { number: '30+', label: 'Happy Clients' },
                  { number: '5+', label: 'Years Experience' },
                  { number: '100%', label: 'Client Satisfaction' }
                ].map((stat, index) => (
                  <div key={index} className="glass rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] border border-cyan-500/10">
                    <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent mb-2 drop-shadow-sm">
                      {stat.number}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-md">
                My Services
              </h2>
              <p className="text-cyan-50/70 max-w-2xl mx-auto mt-4 text-lg">
                I offer a comprehensive range of web development services tailored to your unique business needs
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(192,38,211,0.2)] border border-fuchsia-500/10 group">
                  <div className="text-5xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-light">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-md">
                My Team
              </h2>
              <p className="text-cyan-50/70 max-w-2xl mx-auto mt-4 text-lg">
                The brilliant minds working alongside me to deliver exceptional results
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(192,38,211,0.5)]" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] border border-cyan-500/10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-3xl font-black shadow-lg">
                  SE
                </div>
                <h3 className="text-2xl font-bold mb-2">s.eraiamudhan</h3>
                <p className="text-fuchsia-400 mb-4 font-semibold tracking-wide uppercase text-sm">Team Member</p>
                <p className="text-gray-300 font-light">Dedicated professional contributing to our standard of excellence.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(192,38,211,0.2)] border border-fuchsia-500/10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-yellow-500 flex items-center justify-center text-3xl font-black shadow-lg">
                  SL
                </div>
                <h3 className="text-2xl font-bold mb-2">s.losehwaran</h3>
                <p className="text-cyan-400 mb-4 font-semibold tracking-wide uppercase text-sm">Team Member</p>
                <p className="text-gray-300 font-light">Passionate collaborator delivering outstanding project outcomes.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-md">
                Pricing Plans
              </h2>
              <p className="text-cyan-50/70 max-w-2xl mx-auto mt-4 text-lg">
                Transparent pricing tailored to your project requirements
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className={`glass rounded-2xl p-8 transition-all duration-300 relative ${
                  plan.popular ? 'border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)] transform -translate-y-2' : 'border border-white/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.period}</p>
                  <div className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {plan.price}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-fuchsia-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300 font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#booking"
                    className={`block text-center px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white hover:shadow-[0_0_20px_rgba(192,38,211,0.5)] transform hover:scale-105'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-md">
                Book Your Project
              </h2>
              <p className="text-cyan-50/70 max-w-2xl mx-auto mt-4 text-lg">
                Ready to start your project? Fill out the form below and I'll get back to you within 24 hours
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(192,38,211,0.5)]" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="max-w-2xl mx-auto glass rounded-2xl p-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-fuchsia-500/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-cyan-50 mb-2 tracking-wide">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-500 text-white"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-cyan-50 mb-2 tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-500 text-white"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-cyan-50 mb-2 tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-500 text-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-semibold text-cyan-50 mb-2 tracking-wide">
                    Project Details *
                  </label>
                  <textarea
                    id="project"
                    required
                    rows={5}
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-500 text-white resize-none"
                    placeholder="Describe your project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-xl font-bold text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-400">Thank you! Your request has been submitted. I'll contact you soon!</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-red-400">Something went wrong. Please try again or contact me directly.</span>
                  </div>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 relative z-10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent mb-4 drop-shadow-md">
                S. Vigneshwaran
              </h3>
              <p className="text-gray-400">
                Freelance Web Developer creating modern digital experiences for businesses worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <a href="mailto:hello@vigneshwaran.com" className="hover:text-white transition-colors">
                    hello@vigneshwaran.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <a href="tel:+919876543210" className="hover:text-white transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} S. Vigneshwaran. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
