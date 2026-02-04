import React from 'react';
import { User } from '../types';
import { LogOut, Menu } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onLogout, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <button 
            className="flex items-center cursor-pointer hover:opacity-90 transition-opacity focus:outline-none" 
            onClick={() => onNavigate('home')}
          >
            <Logo variant="dark" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-green-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className={`text-sm font-medium transition-colors ${currentView === 'contact' ? 'text-green-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Contact
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">{user.role}</span>
                </div>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onLoginClick}>Sign In</Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4">
          <button 
            onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
            className="block w-full text-left px-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded"
          >
            Home
          </button>
          <button 
            onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }}
            className="block w-full text-left px-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded"
          >
            Contact
          </button>
          {user ? (
             <div className="border-t border-slate-100 pt-4">
               <div className="px-4 py-2">
                 <p className="font-medium text-slate-900">{user.name}</p>
                 <p className="text-sm text-slate-500">{user.role}</p>
               </div>
               <button 
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded"
               >
                 Logout
               </button>
             </div>
          ) : (
            <Button className="w-full" onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}>Sign In</Button>
          )}
        </div>
      )}
    </nav>
  );
};