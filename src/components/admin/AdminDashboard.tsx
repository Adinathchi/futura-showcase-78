import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  FolderOpen, 
  Award, 
  GraduationCap, 
  Save, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getPortfolioData, updatePortfolioData } from '@/lib/portfolio-data';
import type { Project, Skill, Education, Certificate } from '@/types/portfolio';

export default function AdminDashboard() {
  const [portfolioData, setPortfolioData] = useState(getPortfolioData());
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    updatePortfolioData(portfolioData);
    toast({
      title: "Changes saved!",
      description: "Your portfolio has been updated successfully.",
    });
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      image: '/placeholder.jpg',
      techStack: ['React'],
      featured: false
    };
    
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
    setActiveProject(newProject);
    setIsEditing(true);
  };

  const updateProject = (updatedProject: Project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === updatedProject.id ? updatedProject : p
      )
    }));
  };

  const deleteProject = (projectId: string) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
    
    if (activeProject?.id === projectId) {
      setActiveProject(null);
      setIsEditing(false);
    }
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: 'New Skill',
      level: 70,
      category: 'frontend'
    };
    
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (skillId: string, field: string, value: any) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map(s => 
        s.id === skillId ? { ...s, [field]: value } : s
      )
    }));
  };

  const deleteSkill = (skillId: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== skillId)
    }));
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-20 right-6 z-40"
      >
        <Button
          onClick={handleSave}
          className="bg-gradient-primary hover:shadow-primary transition-all duration-300"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </motion.div>

      <Tabs defaultValue="personal" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 glass-strong">
          <TabsTrigger value="personal" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center space-x-2">
            <FolderOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Education</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card className="glass-strong">
            <CardHeader>
              <CardTitle className="text-gradient-primary">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <Input
                    value={portfolioData.personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Title</label>
                  <Input
                    value={portfolioData.personalInfo.title}
                    onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input
                    type="email"
                    value={portfolioData.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <Input
                    value={portfolioData.personalInfo.location || ''}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Bio</label>
                <Textarea
                  value={portfolioData.personalInfo.bio}
                  onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Resume URL</label>
                <Input
                  value={portfolioData.personalInfo.resumeUrl || ''}
                  onChange={(e) => handlePersonalInfoChange('resumeUrl', e.target.value)}
                  className="mt-1"
                  placeholder="https://example.com/resume.pdf"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects */}
        <TabsContent value="projects">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project List */}
            <Card className="glass-strong">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-gradient-primary">Projects</CardTitle>
                <Button onClick={addProject} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioData.projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      activeProject?.id === project.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setActiveProject(project)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {project.techStack.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {project.featured && (
                          <Badge variant="secondary" className="text-xs">Featured</Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Project Editor */}
            {activeProject && (
              <Card className="glass-strong">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-gradient-secondary">Edit Project</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveProject(null);
                      setIsEditing(false);
                    }}
                  >
                    Close
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                    <Input
                      value={activeProject.title}
                      onChange={(e) =>
                        updateProject({ ...activeProject, title: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <Textarea
                      value={activeProject.description}
                      onChange={(e) =>
                        updateProject({ ...activeProject, description: e.target.value })
                      }
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Tech Stack (comma-separated)
                    </label>
                    <Input
                      value={activeProject.techStack.join(', ')}
                      onChange={(e) =>
                        updateProject({
                          ...activeProject,
                          techStack: e.target.value.split(', ').filter(Boolean)
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Live URL</label>
                      <Input
                        value={activeProject.liveUrl || ''}
                        onChange={(e) =>
                          updateProject({ ...activeProject, liveUrl: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">GitHub URL</label>
                      <Input
                        value={activeProject.githubUrl || ''}
                        onChange={(e) =>
                          updateProject({ ...activeProject, githubUrl: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={activeProject.featured}
                      onChange={(e) =>
                        updateProject({ ...activeProject, featured: e.target.checked })
                      }
                      className="rounded"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Featured Project
                    </label>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Skills */}
        <TabsContent value="skills">
          <Card className="glass-strong">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gradient-primary">Skills</CardTitle>
              <Button onClick={addSkill} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolioData.skills.map((skill) => (
                <div key={skill.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-4 border border-border rounded-lg">
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="Skill name"
                  />
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                  />
                  <select
                    value={skill.category}
                    onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                    className="px-3 py-2 bg-background border border-border rounded-md"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="tools">Tools</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="text-center">
                    <Badge variant="secondary">{skill.level}%</Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteSkill(skill.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education & Certificates */}
        <TabsContent value="education">
          <div className="space-y-8">
            {/* Education */}
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="text-gradient-primary">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioData.education.map((edu) => (
                  <div key={edu.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={edu.institution}
                        onChange={(e) => {
                          setPortfolioData(prev => ({
                            ...prev,
                            education: prev.education.map(ed =>
                              ed.id === edu.id ? { ...ed, institution: e.target.value } : ed
                            )
                          }));
                        }}
                        placeholder="Institution"
                      />
                      <Input
                        value={edu.degree}
                        onChange={(e) => {
                          setPortfolioData(prev => ({
                            ...prev,
                            education: prev.education.map(ed =>
                              ed.id === edu.id ? { ...ed, degree: e.target.value } : ed
                            )
                          }));
                        }}
                        placeholder="Degree"
                      />
                    </div>
                    <Textarea
                      value={edu.description || ''}
                      onChange={(e) => {
                        setPortfolioData(prev => ({
                          ...prev,
                          education: prev.education.map(ed =>
                            ed.id === edu.id ? { ...ed, description: e.target.value } : ed
                          )
                        }));
                      }}
                      placeholder="Description"
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certificates */}
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="text-gradient-secondary">Certificates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioData.certificates.map((cert) => (
                  <div key={cert.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        value={cert.name}
                        onChange={(e) => {
                          setPortfolioData(prev => ({
                            ...prev,
                            certificates: prev.certificates.map(c =>
                              c.id === cert.id ? { ...c, name: e.target.value } : c
                            )
                          }));
                        }}
                        placeholder="Certificate name"
                      />
                      <Input
                        value={cert.issuer}
                        onChange={(e) => {
                          setPortfolioData(prev => ({
                            ...prev,
                            certificates: prev.certificates.map(c =>
                              c.id === cert.id ? { ...c, issuer: e.target.value } : c
                            )
                          }));
                        }}
                        placeholder="Issuer"
                      />
                      <Input
                        value={cert.date}
                        onChange={(e) => {
                          setPortfolioData(prev => ({
                            ...prev,
                            certificates: prev.certificates.map(c =>
                              c.id === cert.id ? { ...c, date: e.target.value } : c
                            )
                          }));
                        }}
                        placeholder="Date"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}