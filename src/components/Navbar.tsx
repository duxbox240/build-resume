
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      isScrolled 
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">ResumeBuilder</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={cn("nav-link", location.pathname === "/" && "active")}
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className={cn("nav-link", location.pathname === "/templates" && "active")}
            >
              Templates
            </Link>
            <Link 
              to="/builder" 
              className={cn("nav-link", location.pathname === "/builder" && "active")}
            >
              Builder
            </Link>
            
            <Button asChild size="sm" className="ml-4 shadow-sm transition-all duration-300 hover:shadow-md button-glow">
              <Link to="/templates">
                <span>Create Resume</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 mt-2 rounded-lg glass animate-scale">
            <div className="flex flex-col space-y-3 p-4">
              <Link 
                to="/" 
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  location.pathname === "/" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                Home
              </Link>
              <Link 
                to="/templates" 
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  location.pathname === "/templates" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                Templates
              </Link>
              <Link 
                to="/builder" 
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  location.pathname === "/builder" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                Builder
              </Link>
              
              <Button asChild className="mt-2">
                <Link to="/templates" className="flex items-center justify-center">
                  <span>Create Resume</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
