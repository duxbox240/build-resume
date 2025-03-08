
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TEMPLATES } from '@/lib/templates';
import { useResumeContext } from '@/lib/resumeContext';
import Navbar from '@/components/Navbar';
import { Check, ChevronRight } from 'lucide-react';

const Templates = () => {
  const { selectedTemplate, setSelectedTemplate } = useResumeContext();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Choose Your Style
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Select a Template for Your Resume
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Pick the perfect template that matches your style and highlights your professional experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {TEMPLATES.map((template, index) => (
              <div 
                key={template.key}
                className={`
                  bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800
                  hover:shadow-md transition-all duration-300
                  ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}
                `}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={template.image}
                    alt={`${template.name} template`}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {selectedTemplate === template.key && (
                    <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-1.5 shadow-lg animate-scale">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{template.name}</h3>
                    <p className="text-sm text-white/80">{template.description}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex space-x-3">
                    <Button 
                      variant={selectedTemplate === template.key ? "default" : "outline"}
                      onClick={() => setSelectedTemplate(template.key)}
                      className="flex-1"
                    >
                      {selectedTemplate === template.key ? 'Selected' : 'Select'}
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={`/builder?template=${template.key}`} className="flex-1 flex justify-center">
                        Use Template
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center animate-fade-in">
            <Button asChild size="lg" className="button-glow">
              <Link to="/builder" className="flex items-center">
                Continue to Builder
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-4 mt-auto border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Templates;
