import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-white/90 backdrop-blur-sm' : 'py-8'}`}>
      <nav className="container mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="logo">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-semibold"
          >
            Pooja G. Kanala
          </motion.span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="nav-links flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link relative text-base font-medium transition-colors
                  ${location.pathname === item.path ? 'text-primary' : 'text-gray-800'}
                  hover:text-primary before:content-[''] before:absolute before:bottom-0 
                  before:left-0 before:w-0 before:h-0.5 before:bg-primary
                  before:transition-all hover:before:w-full`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <motion.a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-button px-6 py-2 rounded-full bg-primary text-white
              hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;