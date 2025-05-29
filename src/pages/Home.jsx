import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);

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

    // Experience section animation
    gsap.from(experienceRef.current.children, {
      scrollTrigger: {
        trigger: experienceRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    });

    // Skills section animation
    gsap.from(skillsRef.current.children, {
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Corp",
      period: "2022 - Present",
      description: "Leading development of enterprise applications using React and Node.js"
    },
    {
      title: "Full Stack Developer",
      company: "Innovation Labs",
      period: "2020 - 2022",
      description: "Developed scalable web applications and microservices"
    },
    {
      title: "Software Engineer",
      company: "Digital Solutions",
      period: "2018 - 2020",
      description: "Built responsive web applications and RESTful APIs"
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Vue.js", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Python", "Java", "PostgreSQL"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Jenkins"] },
    { category: "Soft Skills", items: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"] }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <section className="hero-section h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
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
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="scroll-indicator"
            >
              <span className="sr-only">Scroll to explore</span>
              <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center pt-2">
                <div className="w-1 h-3 bg-gray-400 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={experienceRef} className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold mb-16">Experience</h2>
          <div className="grid gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="experience-card p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold text-primary">{exp.title}</h3>
                <p className="text-xl text-gray-700 mt-2">{exp.company}</p>
                <p className="text-gray-500 mt-1">{exp.period}</p>
                <p className="mt-4 text-gray-600">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={skillsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold mb-16">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                className="skills-card p-6 bg-white rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-primary mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-gray-700">{skill}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Work Together</h2>
          <motion.a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;