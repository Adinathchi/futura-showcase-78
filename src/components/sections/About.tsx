import { motion } from 'framer-motion';
import { Code, Zap, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getPortfolioData } from '@/lib/portfolio-data';

const features = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code that follows best practices."
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing applications for speed, SEO, and exceptional user experience."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in teams using Agile methodologies and modern tools."
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Staying current with cutting-edge technologies and innovative solutions."
  }
];

export default function About() {
  const { personalInfo, education } = getPortfolioData();

  return (
    <section id="about" className="py-20 px-6 bg-muted/5">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-secondary mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating digital experiences that make a difference.
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a strong foundation in both frontend and backend technologies, I enjoy 
                tackling complex problems and turning ideas into reality. My approach combines 
                technical expertise with creative problem-solving to deliver exceptional results.
              </p>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gradient-primary">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-primary/20 pl-4">
                  <h4 className="text-lg font-semibold">{edu.degree} in {edu.field}</h4>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </p>
                  {edu.description && (
                    <p className="text-muted-foreground mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="glass-strong border-primary/10 hover:border-primary/30 transition-all duration-300 h-full hover:shadow-glow">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-primary mb-4 animate-pulse-glow" />
                    <h3 className="text-xl font-bold mb-3 text-gradient-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}