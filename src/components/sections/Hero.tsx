import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TechScene from '@/components/3d/TechScene';
import { getPortfolioData } from '@/lib/portfolio-data';
import heroImage from '@/assets/hero-tech-model.jpg';

export default function Hero() {
  const { personalInfo } = getPortfolioData();

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* 3D Scene Overlay */}
      <div className="absolute inset-0 z-10 opacity-60">
        <TechScene />
      </div>

      {/* Animated particles background */}
      <div className="absolute inset-0 z-5">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        {/* Main heading with animated name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gradient-primary leading-none tracking-tighter">
            {personalInfo.name}
          </h1>
          <div className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black text-white/5 leading-none tracking-tighter transform translate-x-2 translate-y-2 -z-10">
            {personalInfo.name}
          </div>
        </motion.div>

        {/* Subtitle with typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-muted-foreground font-mono">
            {personalInfo.title}
          </p>
          <div className="mt-4 w-32 h-px bg-gradient-primary mx-auto" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button 
            size="lg" 
            onClick={scrollToProjects}
            className="px-8 py-4 text-lg font-semibold bg-gradient-primary hover:shadow-primary transition-all duration-300 hover-lift"
          >
            View Projects
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={scrollToContact}
            className="px-8 py-4 text-lg font-semibold border-primary/20 hover:border-primary hover:shadow-glow transition-all duration-300 hover-lift"
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex justify-center space-x-6 mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${personalInfo.email}`}
            className="p-3 rounded-full glass-strong hover:glow-primary transition-all duration-300"
          >
            <Mail className="w-6 h-6 text-primary" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass-strong hover:glow-primary transition-all duration-300"
          >
            <Github className="w-6 h-6 text-primary" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass-strong hover:glow-primary transition-all duration-300"
          >
            <Linkedin className="w-6 h-6 text-primary" />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToProjects}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary hover:text-primary-glow transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
          <p className="text-xs text-muted-foreground mt-2 font-mono">SCROLL</p>
        </motion.div>
      </div>
    </section>
  );
}