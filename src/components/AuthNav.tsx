
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/authContext';
import { LogOut, LogIn } from 'lucide-react';

const AuthNav = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <span className="hidden md:inline text-sm text-gray-600 dark:text-gray-300">
            {user.email}
          </span>
          <Button variant="ghost" size="sm" onClick={signOut} title="Sign Out">
            <LogOut className="h-4 w-4" />
            <span className="ml-2 hidden md:inline">Sign Out</span>
          </Button>
        </>
      ) : (
        <Button asChild variant="ghost" size="sm">
          <Link to="/auth" title="Sign In">
            <LogIn className="h-4 w-4" />
            <span className="ml-2 hidden md:inline">Sign In</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AuthNav;
