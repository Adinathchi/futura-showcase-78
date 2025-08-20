import { PortfolioData } from '@/types/portfolio';

// Default portfolio data - this will be replaced by admin edits
export const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: "ADINATH",
    title: "Full Stack Developer & AI Enthusiast",
    email: "contact@adinath.dev",
    location: "Remote",
    bio: "Passionate developer creating innovative solutions with cutting-edge technologies. Specialized in React, Node.js, and AI integration.",
    resumeUrl: "/resume.pdf"
  },
  projects: [
    {
      id: "1",
      title: "AI-Powered Dashboard",
      description: "Modern analytics dashboard with AI-driven insights and real-time data visualization.",
      image: "/project-1.jpg",
      techStack: ["React", "TypeScript", "Python", "TensorFlow", "D3.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true
    },
    {
      id: "2", 
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin panel.",
      image: "/project-2.jpg",
      techStack: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true
    },
    {
      id: "3",
      title: "Mobile Finance App",
      description: "React Native app for personal finance management with spending analytics.",
      image: "/project-3.jpg",
      techStack: ["React Native", "Firebase", "Redux", "Chart.js"],
      githubUrl: "https://github.com/example",
      featured: false
    }
  ],
  skills: [
    { id: "1", name: "React", level: 95, category: "frontend" },
    { id: "2", name: "TypeScript", level: 90, category: "frontend" },
    { id: "3", name: "Node.js", level: 85, category: "backend" },
    { id: "4", name: "Python", level: 80, category: "backend" },
    { id: "5", name: "Three.js", level: 75, category: "frontend" },
    { id: "6", name: "MongoDB", level: 85, category: "backend" },
    { id: "7", name: "AWS", level: 70, category: "tools" },
    { id: "8", name: "Docker", level: 75, category: "tools" }
  ],
  education: [
    {
      id: "1",
      institution: "Tech University",
      degree: "Bachelor of Science",
      field: "Information Science",
      startDate: "2020",
      endDate: "2024",
      description: "Specialized in AI and Machine Learning"
    }
  ],
  certificates: [
    {
      id: "1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2024",
      url: "https://aws.amazon.com"
    },
    {
      id: "2",
      name: "React Professional Certificate",
      issuer: "Meta",
      date: "2023",
      url: "https://meta.com"
    }
  ]
};

// Storage key for localStorage
const STORAGE_KEY = 'portfolio_data';

// Load data from localStorage or use default
const loadPortfolioData = (): PortfolioData => {
  if (typeof window === 'undefined') return defaultPortfolioData;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored portfolio data:', error);
    }
  }
  return defaultPortfolioData;
};

// Save data to localStorage
const savePortfolioData = (data: PortfolioData): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('portfolioDataChanged'));
  } catch (error) {
    console.error('Error saving portfolio data:', error);
  }
};

let portfolioData = loadPortfolioData();

export const getPortfolioData = (): PortfolioData => {
  return portfolioData;
};

export const updatePortfolioData = (newData: Partial<PortfolioData>): void => {
  portfolioData = { ...portfolioData, ...newData };
  savePortfolioData(portfolioData);
};

// Helper function to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};