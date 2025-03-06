
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, UserCircle, WalletCards, Vote, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: <UserCircle className="mr-2 h-4 w-4" /> },
    { name: 'Wallet', path: '/wallet', icon: <WalletCards className="mr-2 h-4 w-4" /> },
    { name: 'Vote', path: '/vote', icon: <Vote className="mr-2 h-4 w-4" /> },
    { name: 'Trends', path: '/trends', icon: <BarChart2 className="mr-2 h-4 w-4" /> },
  ];

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
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass py-3 shadow-glass' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <span className={cn(
            'text-2xl font-bold transition-colors',
            isScrolled ? 'text-foreground' : 'text-foreground'
          )}>
            Ballot<span className="text-accent">Chain</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-md transition-colors flex items-center',
                location.pathname === link.path
                  ? 'bg-accent/10 text-accent'
                  : 'hover:bg-secondary'
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="ml-2"
              onClick={() => logout()}
            >
              Sign Out
            </Button>
          ) : (
            <Button className="ml-2" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="glass md:hidden absolute top-full left-0 right-0 p-4 animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-3 rounded-md transition-colors flex items-center',
                  location.pathname === link.path
                    ? 'bg-accent/10 text-accent'
                    : 'hover:bg-secondary'
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => logout()}
              >
                Sign Out
              </Button>
            ) : (
              <Button className="w-full mt-2" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
