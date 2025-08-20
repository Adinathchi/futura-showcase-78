import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import { getPortfolioData } from '@/lib/portfolio-data';

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState(getPortfolioData());

  useEffect(() => {
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Listen for data changes
    const handleStorageChange = () => {
      setPortfolioData(getPortfolioData());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('portfolioDataChanged', handleStorageChange);
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('portfolioDataChanged', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}