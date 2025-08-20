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
      field: "Computer Science",
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

// In a real app, this would connect to a backend
let portfolioData = { ...defaultPortfolioData };

export const getPortfolioData = (): PortfolioData => {
  return portfolioData;
};

export const updatePortfolioData = (newData: Partial<PortfolioData>): void => {
  portfolioData = { ...portfolioData, ...newData };
};