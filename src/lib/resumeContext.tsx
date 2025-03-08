
import React, { createContext, useContext, useState } from "react";

export type PersonalInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  photo?: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current?: boolean;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies?: string;
  link?: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};

export type ResumeData = {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
};

type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Partial<Experience>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Partial<Education>) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Partial<Skill>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Partial<Project>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addCertification: (cert: Certification) => void;
  updateCertification: (index: number, cert: Certification) => void;
  removeCertification: (index: number) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialResumeData: ResumeData = {
  personal: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    website: "johndoe.com",
    summary: "Experienced software engineer with a passion for building innovative solutions to complex problems.",
    photo: "",
  },
  experience: [
    {
      id: generateId(),
      company: "Tech Company",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2020",
      endDate: "Present",
      description: "Led development of key features for the company's flagship product. Mentored junior developers and improved team processes.",
      current: true
    },
    {
      id: generateId(),
      company: "Startup Inc.",
      position: "Software Developer",
      location: "San Francisco, CA",
      startDate: "2018",
      endDate: "2020",
      description: "Developed and maintained web applications using React and Node.js. Collaborated closely with design team.",
      current: false
    }
  ],
  education: [
    {
      id: generateId(),
      institution: "University of California",
      degree: "Bachelor of Science in Computer Science",
      location: "Berkeley, CA",
      startDate: "2014",
      endDate: "2018",
      description: "Graduated with honors. Member of computer science club."
    }
  ],
  skills: [
    { id: generateId(), name: "JavaScript", level: 5 },
    { id: generateId(), name: "TypeScript", level: 4 },
    { id: generateId(), name: "React", level: 5 },
    { id: generateId(), name: "Node.js", level: 4 },
    { id: generateId(), name: "HTML/CSS", level: 5 },
    { id: generateId(), name: "Git", level: 4 },
    { id: generateId(), name: "Python", level: 3 },
    { id: generateId(), name: "SQL", level: 4 }
  ],
  projects: [
    {
      id: generateId(),
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB.",
      technologies: "React, Node.js, MongoDB",
      link: "https://github.com/johndoe/ecommerce"
    },
    {
      id: generateId(),
      name: "Portfolio Website",
      description: "Designed and developed a personal portfolio website to showcase projects and skills.",
      technologies: "React, Next.js, Tailwind CSS",
      link: "https://johndoe.com"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2022"
    }
  ]
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, ...info }
    }));
  };

  const addExperience = (exp: Partial<Experience>) => {
    const newExp: Experience = {
      id: generateId(),
      company: exp.company || "",
      position: exp.position || "",
      location: exp.location || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      description: exp.description || "",
      current: exp.current || false
    };
    
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setResumeData(prev => {
      const newExperience = prev.experience.map(item => 
        item.id === id ? { ...item, ...exp } : item
      );
      return { ...prev, experience: newExperience };
    });
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };

  const addEducation = (edu: Partial<Education>) => {
    const newEdu: Education = {
      id: generateId(),
      institution: edu.institution || "",
      degree: edu.degree || "",
      location: edu.location || "",
      startDate: edu.startDate || "",
      endDate: edu.endDate || "",
      description: edu.description || ""
    };
    
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setResumeData(prev => {
      const newEducation = prev.education.map(item => 
        item.id === id ? { ...item, ...edu } : item
      );
      return { ...prev, education: newEducation };
    });
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const addSkill = (skill: Partial<Skill>) => {
    const newSkill: Skill = {
      id: generateId(),
      name: skill.name || "",
      level: skill.level || 3
    };
    
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData(prev => {
      const newSkills = prev.skills.map(item => 
        item.id === id ? { ...item, ...skill } : item
      );
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id)
    }));
  };

  const addProject = (project: Partial<Project>) => {
    const newProject: Project = {
      id: generateId(),
      name: project.name || "",
      description: project.description || "",
      technologies: project.technologies,
      link: project.link
    };
    
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData(prev => {
      const newProjects = prev.projects.map(item => 
        item.id === id ? { ...item, ...project } : item
      );
      return { ...prev, projects: newProjects };
    });
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  const addCertification = (cert: Certification) => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, cert]
    }));
  };

  const updateCertification = (index: number, cert: Certification) => {
    setResumeData(prev => {
      const newCertifications = [...prev.certifications];
      newCertifications[index] = cert;
      return { ...prev, certifications: newCertifications };
    });
  };

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const value = {
    resumeData,
    setResumeData,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    selectedTemplate,
    setSelectedTemplate
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
