import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="fixed w-full z-50 px-20 py-8">
      <nav className="flex justify-between items-center">
        <Link to="/" className="logo">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Pooja G. Kanala
          </motion.span>
        </Link>

        <div className="nav-links flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="resume-button"
        >
          Resume
        </a>
      </nav>
    </header>
  );
};

export default Navigation;