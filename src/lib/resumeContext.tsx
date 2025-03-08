
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
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
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
  skills: string[];
  projects: Project[];
  certifications: Certification[];
};

type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (index: number, exp: Experience) => void;
  removeExperience: (index: number) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (index: number, edu: Education) => void;
  removeEducation: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Project) => void;
  removeProject: (index: number) => void;
  addCertification: (cert: Certification) => void;
  updateCertification: (index: number, cert: Certification) => void;
  removeCertification: (index: number) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
};

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
      company: "Tech Company",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2020",
      endDate: "Present",
      description: "Led development of key features for the company's flagship product. Mentored junior developers and improved team processes."
    },
    {
      company: "Startup Inc.",
      position: "Software Developer",
      location: "San Francisco, CA",
      startDate: "2018",
      endDate: "2020",
      description: "Developed and maintained web applications using React and Node.js. Collaborated closely with design team."
    }
  ],
  education: [
    {
      institution: "University of California",
      degree: "Bachelor of Science in Computer Science",
      location: "Berkeley, CA",
      startDate: "2014",
      endDate: "2018",
      description: "Graduated with honors. Member of computer science club."
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "HTML/CSS", "Git", "Python", "SQL"
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB."
    },
    {
      name: "Portfolio Website",
      description: "Designed and developed a personal portfolio website to showcase projects and skills."
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

  const addExperience = (exp: Experience) => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, exp]
    }));
  };

  const updateExperience = (index: number, exp: Experience) => {
    setResumeData(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = exp;
      return { ...prev, experience: newExperience };
    });
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = (edu: Education) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, edu]
    }));
  };

  const updateEducation = (index: number, edu: Education) => {
    setResumeData(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = edu;
      return { ...prev, education: newEducation };
    });
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = (project: Project) => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (index: number, project: Project) => {
    setResumeData(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = project;
      return { ...prev, projects: newProjects };
    });
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
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
