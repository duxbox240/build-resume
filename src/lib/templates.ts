
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import { ResumeData } from "./resumeContext";

export type TemplateType = {
  key: string;
  name: string;
  description: string;
  image: string;
  component: React.ComponentType<{ resumeData: ResumeData }>;
};

export const TEMPLATES: TemplateType[] = [
  {
    key: "modern",
    name: "Modern",
    description: "A clean, contemporary design with a touch of color",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
    component: ModernTemplate,
  },
  {
    key: "minimalist",
    name: "Minimalist",
    description: "Simple and elegant with plenty of white space",
    image: "https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=2071&auto=format&fit=crop",
    component: MinimalistTemplate,
  },
  {
    key: "classic",
    name: "Classic",
    description: "Traditional resume format with serif fonts",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2080&auto=format&fit=crop",
    component: ClassicTemplate,
  },
  {
    key: "professional",
    name: "Professional",
    description: "Bold header with a professional layout",
    image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1974&auto=format&fit=crop",
    component: ProfessionalTemplate,
  },
];

export const getTemplateByKey = (key: string) => {
  const template = TEMPLATES.find((t) => t.key === key);
  return template?.component || ModernTemplate;
};
