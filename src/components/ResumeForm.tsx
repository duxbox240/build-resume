import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useResumeContext } from '@/lib/resumeContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Trash2, Upload } from "lucide-react";
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
    removeSkill
  } = useResumeContext();
  
  const [activeTab, setActiveTab] = useState("personal");
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      updatePersonalInfo({ profileImage: result });
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col">
      <ScrollArea className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="personal" className="text-xs sm:text-sm">Personal</TabsTrigger>
            <TabsTrigger value="education" className="text-xs sm:text-sm">Education</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs sm:text-sm">Experience</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs sm:text-sm">Projects</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs sm:text-sm">Skills</TabsTrigger>
            <TabsTrigger value="template" className="text-xs sm:text-sm">Template</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4 animate-fade-in">
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  {resumeData.personalInfo.profileImage ? (
                    <img 
                      src={resumeData.personalInfo.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
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
              <p className="text-sm text-gray-500">Upload a profile picture (optional)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  value={resumeData.personalInfo.firstName}
                  onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  value={resumeData.personalInfo.lastName}
                  onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input 
                id="title"
                value={resumeData.personalInfo.title}
                onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                placeholder="Senior Software Engineer"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  placeholder="john.doe@example.com"
                  type="email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                  placeholder="www.johndoe.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea 
                id="summary"
                value={resumeData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                placeholder="Write a brief summary of your professional experience and skills..."
                rows={4}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="education" className="space-y-6 animate-fade-in">
            {resumeData.education.map((edu, index) => (
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
                    <Label htmlFor={`institution-${index}`}>Institution</Label>
                    <Input 
                      id={`institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      placeholder="University Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                    <Input 
                      id={`degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`field-${index}`}>Field of Study</Label>
                    <Input 
                      id={`field-${index}`}
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                      placeholder="Computer Science"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`edu-start-${index}`}>Start Date</Label>
                      <Input 
                        id={`edu-start-${index}`}
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                        placeholder="MM/YYYY"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`edu-end-${index}`}>End Date</Label>
                      <Input 
                        id={`edu-end-${index}`}
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`edu-desc-${index}`}>Description</Label>
                  <Textarea 
                    id={`edu-desc-${index}`}
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
                field: '',
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
            {resumeData.experience.map((exp, index) => (
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
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input 
                      id={`company-${index}`}
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`position-${index}`}>Position</Label>
                    <Input 
                      id={`position-${index}`}
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                      placeholder="Software Engineer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Input 
                      id={`location-${index}`}
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                      <Input 
                        id={`exp-start-${index}`}
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        placeholder="MM/YYYY"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                      <Input 
                        id={`exp-end-${index}`}
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="MM/YYYY or Present"
                        disabled={exp.current}
                      />
                      <div className="flex items-center mt-1">
                        <input
                          type="checkbox"
                          id={`current-job-${index}`}
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, { 
                            current: e.target.checked,
                            endDate: e.target.checked ? 'Present' : exp.endDate
                          })}
                          className="mr-2"
                        />
                        <Label htmlFor={`current-job-${index}`} className="text-xs">Current Position</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`exp-desc-${index}`}>Description</Label>
                  <Textarea 
                    id={`exp-desc-${index}`}
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
                current: false,
                description: ''
              })}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Experience</span>
            </Button>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-6 animate-fade-in">
            {resumeData.projects.map((project, index) => (
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
                    <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                    <Input 
                      id={`project-name-${index}`}
                      value={project.name}
                      onChange={(e) => updateProject(project.id, { name: e.target.value })}
                      placeholder="Project Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`technologies-${index}`}>Technologies Used</Label>
                    <Input 
                      id={`technologies-${index}`}
                      value={project.technologies}
                      onChange={(e) => updateProject(project.id, { technologies: e.target.value })}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                  <Input 
                    id={`project-link-${index}`}
                    value={project.link}
                    onChange={(e) => updateProject(project.id, { link: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`project-desc-${index}`}>Description</Label>
                  <Textarea 
                    id={`project-desc-${index}`}
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
            {resumeData.skills.map((skill, index) => (
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
                  <Label htmlFor={`skill-name-${index}`}>Skill Name</Label>
                  <Input 
                    id={`skill-name-${index}`}
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                    placeholder="JavaScript, Project Management, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={`skill-level-${index}`}>Proficiency Level</Label>
                    <span className="text-sm text-gray-500">{skill.level}/5</span>
                  </div>
                  <Slider
                    id={`skill-level-${index}`}
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
          
          <TabsContent value="template" className="animate-fade-in">
            <TemplateSelector />
          </TabsContent>
        </Tabs>
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {activeTab === "personal" && "1/5 Personal Info"}
          {activeTab === "education" && "2/5 Education"}
          {activeTab === "experience" && "3/5 Experience"}
          {activeTab === "projects" && "4/5 Projects"}
          {activeTab === "skills" && "5/5 Skills"}
          {activeTab === "template" && "Template Selection"}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              const tabs = ["personal", "education", "experience", "projects", "skills", "template"];
              const currentIndex = tabs.indexOf(activeTab);
              const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
              setActiveTab(tabs[prevIndex]);
            }}
            disabled={activeTab === "personal"}
          >
            Previous
          </Button>
          
          <Button
            onClick={() => {
              const tabs = ["personal", "education", "experience", "projects", "skills", "template"];
              const currentIndex = tabs.indexOf(activeTab);
              const nextIndex = (currentIndex + 1) % tabs.length;
              setActiveTab(tabs[nextIndex]);
            }}
            disabled={activeTab === "template"}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
