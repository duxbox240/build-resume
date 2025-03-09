
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, ChevronRight, Download } from 'lucide-react';
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

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 md:py-4",
      isScrolled 
        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 z-10">
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
              <Link to="/templates" className="flex items-center">
                <span>Create Resume</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 z-10 relative"
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
        
        {/* Mobile Menu - Full Screen Overlay */}
        <div className={cn(
          "fixed inset-0 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out transform pt-20 px-6 pb-6 flex flex-col z-0",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <div className="flex flex-col space-y-4 mt-4">
            <Link 
              to="/" 
              className={cn(
                "px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                location.pathname === "/" 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className={cn(
                "px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                location.pathname === "/templates" 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Templates
            </Link>
            <Link 
              to="/builder" 
              className={cn(
                "px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                location.pathname === "/builder" 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              Builder
            </Link>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button asChild size="lg" className="w-full">
                <Link to="/templates" className="flex items-center justify-center">
                  <Download className="mr-2 h-5 w-5" />
                  <span>Create Resume</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-auto text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} ResumeBuilder</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
