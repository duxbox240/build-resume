
import { TemplateType } from './resumeContext';

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  previewImage: string;
  fontFamily: string;
  primaryColor: string;
  cardStyle: string;
  features: string[];
}

export const templates: TemplateConfig[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a focus on visual appeal and readability.',
    previewImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
    fontFamily: 'font-sans',
    primaryColor: 'text-blue-600',
    cardStyle: 'border-l-4 border-blue-500',
    features: [
      'Bold section headers',
      'Strategic use of whitespace',
      'Clean typography',
      'Modern layout'
    ]
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Elegant simplicity with a focus on content and minimal design elements.',
    previewImage: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop',
    fontFamily: 'font-sans',
    primaryColor: 'text-gray-800',
    cardStyle: 'border-t border-gray-200',
    features: [
      'Generous whitespace',
      'Subtle design elements',
      'Focus on content',
      'Simple elegance'
    ]
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless and traditional format that has stood the test of time.',
    previewImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop',
    fontFamily: 'font-serif',
    primaryColor: 'text-slate-700',
    cardStyle: 'border-b border-slate-300',
    features: [
      'Traditional layout',
      'Established format',
      'Formal structure',
      'Time-tested design'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Bold and confident design to make a strong impression.',
    previewImage: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?q=80&w=2070&auto=format&fit=crop',
    fontFamily: 'font-sans',
    primaryColor: 'text-emerald-700',
    cardStyle: 'border-l-4 border-emerald-500',
    features: [
      'Strong visual hierarchy',
      'Bold design elements',
      'Professional appearance',
      'Confident layout'
    ]
  }
];

export const getTemplateConfig = (templateId: TemplateType): TemplateConfig => {
  const template = templates.find(t => t.id === templateId);
  if (!template) {
    return templates[0]; // Default to first template if not found
  }
  return template;
};
