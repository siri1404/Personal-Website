import { motion } from 'framer-motion';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-title span', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.2
    });

    tl.from('.hero-subtitle span', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1
    }, '-=0.5');

    // Parallax effect for featured projects
    gsap.utils.toArray('.project-card').forEach(card => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'top center',
          scrub: 1
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <section className="hero-section h-screen flex items-center justify-center">
        <div className="container mx-auto px-8">
          <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span className="block">Hello, I'm</span>
            <span className="block text-primary">Pooja Kanala</span>
          </h1>
          
          <div className="hero-subtitle text-xl md:text-2xl text-gray-600 max-w-2xl">
            <span className="block">Full Stack Developer & Systems Designer</span>
            <span className="block mt-4">
              Building innovative solutions at the intersection of technology and user experience
            </span>
          </div>

          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <a href="#featured-work" className="scroll-button">
              <span className="sr-only">Scroll to see my work</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center pt-2"
              >
                <motion.div className="w-1 h-3 bg-gray-400 rounded-full" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>

      <section id="featured-work" className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold mb-16">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project cards will be mapped here */}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;