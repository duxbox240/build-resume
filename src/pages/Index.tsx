
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, Clock, Download, Layout, RefreshCw, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/authContext';

const Index = () => {
  const { user } = useAuth();
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const features = [
    {
      icon: <Layout className="h-10 w-10 mb-4 text-primary" />,
      title: 'Beautiful Templates',
      description: 'Choose from professionally designed templates that help you stand out from the crowd.',
    },
    {
      icon: <Clock className="h-10 w-10 mb-4 text-primary" />,
      title: 'Real-time Preview',
      description: 'See your changes immediately with our live preview feature as you build your resume.',
    },
    {
      icon: <RefreshCw className="h-10 w-10 mb-4 text-primary" />,
      title: 'Easy Customization',
      description: 'Customize every aspect of your resume with intuitive controls and options.',
    },
    {
      icon: <Download className="h-10 w-10 mb-4 text-primary" />,
      title: 'Export as PDF',
      description: 'Download your finished resume as a professional PDF ready to send to employers.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Mobile optimized */}
      <section className="pt-28 pb-12 md:pt-40 md:pb-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 animate-slide-in-left text-center md:text-left">
              <div className="inline-block px-3 py-1 mb-4 md:mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
                Build Your Professional Resume
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">
                Create a resume that <br className="hidden md:block" /> 
                <span className="text-primary">stands out</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-xl mx-auto md:mx-0">
                Craft a professional resume in minutes with our intuitive builder. 
                Choose from beautiful templates and export as a polished PDF.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                {user ? (
                  <Button asChild size="lg" className="shadow-sm button-glow mobile-touch-target h-12 md:h-auto">
                    <Link to="/templates" className="flex items-center">
                      Get Started
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="shadow-sm button-glow mobile-touch-target h-12 md:h-auto">
                    <Link to="/auth" className="flex items-center">
                      Sign In / Sign Up
                      <LogIn className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="mobile-touch-target h-12 md:h-auto">
                  <Link to={user ? "/templates" : "/auth"}>
                    View Templates
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative min-h-[300px] md:min-h-[400px] w-full max-w-[90vw] mx-auto md:max-w-full animate-slide-in-right mt-8 md:mt-0">
              <div className="absolute top-0 right-0 w-full h-full rounded-xl overflow-hidden shadow-lg md:shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop" 
                  alt="Resume Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-gray-900/90 p-4 md:p-6 rounded-lg shadow-lg max-w-xs md:max-w-md">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      <h3 className="text-base md:text-lg font-semibold">Modern Resume</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="h-2 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 md:w-48 h-32 md:h-48 bg-primary/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Mobile optimized */}
      <section className="py-12 md:py-24 px-4 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Everything You Need to Create a Perfect Resume</h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive tools and templates make resume creation simple and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={el => featureRefs.current[index] = el}
                className={cn(
                  "feature-card animate-on-scroll p-5 md:p-6",
                  index % 2 === 0 ? "transform-gpu translate-y-4" : "transform-gpu translate-y-8"
                )}
              >
                {feature.icon}
                <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Mobile optimized */}
      <section className="py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto max-w-4xl relative">
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl p-6 md:p-12 shadow-lg md:shadow-xl">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Ready to Build Your Resume?</h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Create a professional resume in minutes and take the next step in your career.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Button asChild size="lg" className="shadow-sm button-glow h-12 md:h-auto">
                <Link to="/templates" className="flex items-center">
                  Create My Resume
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 md:h-auto">
                <Link to="/templates">
                  View Templates
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - Mobile optimized */}
      <footer className="py-6 md:py-8 px-4 border-t mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">ResumeBuilder</span>
          </div>
          <div className="flex space-x-6 md:space-x-8 mb-4 md:mb-0">
            <Link to="/" className="text-sm text-gray-600 hover:text-primary transition-colors py-2">
              Home
            </Link>
            <Link to="/templates" className="text-sm text-gray-600 hover:text-primary transition-colors py-2">
              Templates
            </Link>
            <Link to="/builder" className="text-sm text-gray-600 hover:text-primary transition-colors py-2">
              Builder
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} ResumeBuilder
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
