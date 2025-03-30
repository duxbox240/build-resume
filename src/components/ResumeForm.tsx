import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useResumeContext } from '@/lib/resumeContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  PlusCircle, Trash2, Upload, User, GraduationCap, 
  Briefcase, FolderKanban, Award, BadgeCheck, 
  PaintBucket, ChevronRight, ChevronLeft 
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import TemplateSelector from './TemplateSelector';

const ResumeForm = () => {
  const {
    resumeData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    addSkill,
    updateSkill,
    removeSkill,
    addCertification,
    updateCertification,
    removeCertification
  } = useResumeContext();
  
  const [activeTab, setActiveTab] = useState("personal");
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      updatePersonalInfo({ photo: result });
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 h-full flex flex-col overflow-hidden">
      <ScrollArea className="flex-1 p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col gap-2 mb-8">
            <TabsList className="w-full grid grid-cols-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <TabsTrigger 
                value="personal" 
                className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
              >
                <User className="h-4 w-4" />
                <span className="text-xs">Personal</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="education" 
                className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="text-xs">Education</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="experience" 
                className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
              >
                <Briefcase className="h-4 w-4" />
                <span className="text-xs">Work</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="projects" 
                className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
              >
                <FolderKanban className="h-4 w-4" />
                <span className="text-xs">Projects</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsList className="w-full grid grid-cols-3 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <TabsTrigger 
                value="skills" 
                className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
              >
                <Award className="h-4 w-4" />
                <span className="text-xs">Skills</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="certifications" 
                className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
              >
                <BadgeCheck className="h-4 w-4" />
                <span className="text-xs">Certifications</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="template" 
                className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
              >
                <PaintBucket className="h-4 w-4" />
                <span className="text-xs">Design</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="personal" className="space-y-6 animate-fade-in">
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  {resumeData.personal.photo ? (
                    <img 
                      src={resumeData.personal.photo} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <label htmlFor="profile-image" className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                  <Upload className="h-3.5 w-3.5" />
                  <input 
                    id="profile-image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleProfileImageChange} 
                    className="hidden" 
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">Upload a profile picture (optional)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input 
                  id="name"
                  value={resumeData.personal.name}
                  onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                  placeholder="John Doe"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Professional Title</Label>
                <Input 
                  id="title"
                  value={resumeData.personal.title}
                  onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                  placeholder="Senior Software Engineer"
                  className="h-9"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input 
                  id="email"
                  value={resumeData.personal.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  placeholder="john.doe@example.com"
                  type="email"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                <Input 
                  id="phone"
                  value={resumeData.personal.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                <Input 
                  id="website"
                  value={resumeData.personal.website}
                  onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                  placeholder="www.johndoe.com"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <Input 
                  id="location"
                  value={resumeData.personal.location}
                  onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                  placeholder="San Francisco, CA"
                  className="h-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-sm font-medium">Professional Summary</Label>
              <Textarea 
                id="summary"
                value={resumeData.personal.summary}
                onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                placeholder="Write a brief summary of your professional experience and skills..."
                rows={4}
                className="resize-none"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="education" className="space-y-6 animate-fade-in">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50 relative group">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute -top-3 -right-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input 
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      placeholder="University Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input 
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`location-${edu.id}`}>Location</Label>
                    <Input 
                      id={`location-${edu.id}`}
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                      placeholder="Berkeley, CA"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`edu-start-${edu.id}`}>Start Date</Label>
                      <Input 
                        id={`edu-start-${edu.id}`}
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                        placeholder="MM/YYYY"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`edu-end-${edu.id}`}>End Date</Label>
                      <Input 
                        id={`edu-end-${edu.id}`}
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`edu-desc-${edu.id}`}>Description</Label>
                  <Textarea 
                    id={`edu-desc-${edu.id}`}
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                    placeholder="Describe your achievements, relevant coursework, etc."
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={() => addEducation({
                institution: '',
                degree: '',
                location: '',
                startDate: '',
                endDate: '',
                description: ''
              })}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Education</span>
            </Button>
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-6 animate-fade-in">
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50 relative group">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute -top-3 -right-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input 
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`position-${exp.id}`}>Position</Label>
                    <Input 
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                      placeholder="Software Engineer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`location-${exp.id}`}>Location</Label>
                    <Input 
                      id={`location-${exp.id}`}
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`exp-start-${exp.id}`}>Start Date</Label>
                      <Input 
                        id={`exp-start-${exp.id}`}
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        placeholder="MM/YYYY"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`exp-end-${exp.id}`}>End Date</Label>
                      <Input 
                        id={`exp-end-${exp.id}`}
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="MM/YYYY or Present"
                        disabled={exp.current}
                      />
                      <div className="flex items-center mt-1">
                        <input
                          type="checkbox"
                          id={`current-job-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { 
                            current: e.target.checked,
                            endDate: e.target.checked ? 'Present' : exp.endDate
                          })}
                          className="mr-2"
                        />
                        <Label htmlFor={`current-job-${exp.id}`} className="text-xs">Current Position</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`exp-desc-${exp.id}`}>Description</Label>
                  <Textarea 
                    id={`exp-desc-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    placeholder="Describe your responsibilities and achievements"
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={() => addExperience({
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                description: '',
                current: false
              })}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Experience</span>
            </Button>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-6 animate-fade-in">
            {resumeData.projects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50 relative group">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute -top-3 -right-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`project-name-${project.id}`}>Project Name</Label>
                    <Input 
                      id={`project-name-${project.id}`}
                      value={project.name}
                      onChange={(e) => updateProject(project.id, { name: e.target.value })}
                      placeholder="Project Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
                    <Input 
                      id={`technologies-${project.id}`}
                      value={project.technologies}
                      onChange={(e) => updateProject(project.id, { technologies: e.target.value })}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor={`project-link-${project.id}`}>Project Link</Label>
                  <Input 
                    id={`project-link-${project.id}`}
                    value={project.link}
                    onChange={(e) => updateProject(project.id, { link: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`project-desc-${project.id}`}>Description</Label>
                  <Textarea 
                    id={`project-desc-${project.id}`}
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                    placeholder="Describe the project, your role, and achievements"
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={() => addProject({
                name: '',
                description: '',
                technologies: '',
                link: ''
              })}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Project</span>
            </Button>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-6 animate-fade-in">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50 relative group">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute -top-3 -right-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  onClick={() => removeSkill(skill.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor={`skill-name-${skill.id}`}>Skill Name</Label>
                  <Input 
                    id={`skill-name-${skill.id}`}
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                    placeholder="JavaScript, Project Management, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={`skill-level-${skill.id}`}>Proficiency Level</Label>
                    <span className="text-sm text-gray-500">{skill.level}/5</span>
                  </div>
                  <Slider
                    id={`skill-level-${skill.id}`}
                    value={[skill.level]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => updateSkill(skill.id, { level: value[0] })}
                    className="py-4"
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={() => addSkill({
                name: '',
                level: 3
              })}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Skill</span>
            </Button>
          </TabsContent>
          
          <TabsContent value="certifications" className="space-y-6 animate-fade-in">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/50 relative group">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute -top-3 -right-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  onClick={() => removeCertification(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                    <Input 
                      id={`cert-name-${index}`}
                      value={cert.name}
                      onChange={(e) => updateCertification(index, { 
                        ...cert,
                        name: e.target.value 
                      })}
                      placeholder="AWS Certified Developer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${index}`}>Issuing Organization</Label>
                    <Input 
                      id={`issuer-${index}`}
                      value={cert.issuer}
                      onChange={(e) => updateCertification(index, { 
                        ...cert,
                        issuer: e.target.value 
                      })}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`cert-date-${index}`}>Date</Label>
                    <Input 
                      id={`cert-date-${index}`}
                      value={cert.date}
                      onChange={(e) => updateCertification(index, { 
                        ...cert,
                        date: e.target.value 
                      })}
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={() => addCertification({
                name: '',
                issuer: '',
                date: ''
              })}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Certification</span>
            </Button>
          </TabsContent>
          
          <TabsContent value="template" className="animate-fade-in">
            <TemplateSelector />
          </TabsContent>
        </Tabs>
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {activeTab === "personal" && "1/7 Personal Info"}
          {activeTab === "education" && "2/7 Education"}
          {activeTab === "experience" && "3/7 Experience"}
          {activeTab === "projects" && "4/7 Projects"}
          {activeTab === "skills" && "5/7 Skills"}
          {activeTab === "certifications" && "6/7 Certifications"}
          {activeTab === "template" && "7/7 Template Selection"}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              const tabs = ["personal", "education", "experience", "projects", "skills", "certifications", "template"];
              const currentIndex = tabs.indexOf(activeTab);
              const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
              setActiveTab(tabs[prevIndex]);
            }}
            disabled={activeTab === "personal"}
            className="h-8 text-xs px-3 flex items-center gap-1 bg-white dark:bg-gray-700 shadow-sm"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </Button>
          
          <Button
            onClick={() => {
              const tabs = ["personal", "education", "experience", "projects", "skills", "certifications", "template"];
              const currentIndex = tabs.indexOf(activeTab);
              const nextIndex = (currentIndex + 1) % tabs.length;
              setActiveTab(tabs[nextIndex]);
            }}
            disabled={activeTab === "template"}
            className="h-8 text-xs px-3 flex items-center gap-1 shadow-sm"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
