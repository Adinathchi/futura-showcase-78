import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPortfolioData } from '@/lib/portfolio-data';

// Animated counter component
function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// Skill progress bar component
function SkillBar({ skill }: { skill: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{skill.name}</h4>
        <span className="text-primary font-mono">
          <AnimatedCounter value={skill.level} />%
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-primary rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { skills } = getPortfolioData();

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryColors = {
    frontend: 'text-blue-400',
    backend: 'text-green-400',
    tools: 'text-purple-400',
    other: 'text-orange-400'
  };

  const stats = [
    { label: "Projects Completed", value: 50 },
    { label: "Technologies Mastered", value: skills.length },
    { label: "Years of Experience", value: 4 },
    { label: "Client Satisfaction", value: 98 }
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-primary mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">
                <AnimatedCounter value={stat.value} />
                {stat.label === "Client Satisfaction" && "%"}
                {stat.label === "Projects Completed" && "+"}
              </div>
              <p className="text-muted-foreground text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-gradient-secondary mb-8">
              Technical Proficiency
            </h3>
            
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-xl font-semibold capitalize flex items-center gap-2">
                  <span className={categoryColors[category as keyof typeof categoryColors]}>
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-gradient-primary" />
                </h4>
                
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <SkillBar key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Skills Cloud */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-gradient-secondary mb-8">
              Technology Stack
            </h3>
            
            <Card className="glass-strong border-primary/10 p-8 hover:shadow-glow transition-all duration-300">
              <CardContent className="space-y-6 p-0">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category} className="space-y-3">
                    <h4 className={`text-lg font-semibold capitalize ${categoryColors[category as keyof typeof categoryColors]}`}>
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill, index) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge 
                            variant="secondary"
                            className="px-3 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-200 cursor-pointer"
                          >
                            {skill.name}
                            <span className="ml-2 text-xs opacity-70">
                              {skill.level}%
                            </span>
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 glass rounded-lg border border-primary/10"
            >
              <p className="text-muted-foreground leading-relaxed">
                Always learning new technologies and staying up-to-date with industry trends. 
                Currently exploring <span className="text-primary font-semibold">WebAssembly</span> and 
                <span className="text-secondary font-semibold"> Machine Learning</span> integration.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}