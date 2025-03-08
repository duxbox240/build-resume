
import { useEffect } from 'react';
import { templates } from '@/lib/templates';
import { useResume } from '@/lib/resumeContext';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow keyboard navigation between templates with arrow keys
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        
        const currentIndex = templates.findIndex(t => t.id === selectedTemplate);
        let newIndex = currentIndex;
        
        if (e.key === 'ArrowRight') {
          newIndex = (currentIndex + 1) % templates.length;
        } else if (e.key === 'ArrowLeft') {
          newIndex = (currentIndex - 1 + templates.length) % templates.length;
        }
        
        setSelectedTemplate(templates[newIndex].id);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTemplate, setSelectedTemplate]);

  return (
    <div className="py-4">
      <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={cn(
              "relative rounded-lg overflow-hidden cursor-pointer border transition-all duration-300",
              selectedTemplate === template.id 
                ? "border-primary ring-2 ring-primary/20" 
                : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
            )}
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={template.previewImage}
                alt={`${template.name} template`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-md">
                  <Check className="h-3 w-3" />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="text-sm font-bold">{template.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
