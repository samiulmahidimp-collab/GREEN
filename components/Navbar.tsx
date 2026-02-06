import React from 'react';
import { User } from '../types';
import { LogOut, Menu, Home, Headphones, LayoutDashboard, Wallet, Users } from 'lucide-react';
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

  // Clean, professional white/slate theme
  const navBg = "bg-white/98 backdrop-blur-md border-b border-slate-100";
  const textColor = "text-slate-600";
  const activeColor = "text-green-600";

  return (
    <nav className={`sticky top-0 z-50 w-full ${navBg} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          <button 
            className="flex items-center cursor-pointer focus:outline-none group" 
            onClick={() => onNavigate('home')}
          >
            <Logo variant="dark" />
          </button>

          <div className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => onNavigate('home')}
              className={`flex items-center text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 ${currentView === 'home' ? activeColor : `${textColor} hover:text-slate-900`}`}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </button>

            <button 
              onClick={() => onNavigate('about')}
              className={`flex items-center text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 ${currentView === 'about' ? activeColor : `${textColor} hover:text-slate-900`}`}
            >
              <Users className="h-4 w-4 mr-2" />
              Our Team
            </button>
            
            <button 
              onClick={() => onNavigate('contact')}
              className={`flex items-center text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 ${currentView === 'contact' ? activeColor : `${textColor} hover:text-slate-900`}`}
            >
              <Headphones className="h-4 w-4 mr-2" />
              Support
            </button>
            
            {user ? (
              <div className="flex items-center space-x-6 pl-8 border-l border-slate-200">
                <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                  <Wallet className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-black text-slate-900">{user.balance.toLocaleString()} ৳</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-slate-900">{user.name}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">{user.role}</span>
                </div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => onNavigate('dashboard')}
                  className="rounded-xl bg-green-600 hover:bg-green-500 text-[10px] font-black uppercase tracking-widest px-5 shadow-lg shadow-green-600/20"
                >
                  <LayoutDashboard className="h-3.5 w-3.5 mr-2" /> Portal
                </Button>
                <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Button onClick={onLoginClick} size="md" className="rounded-xl px-8 font-black shadow-xl shadow-green-600/20 active:scale-95 bg-green-600 hover:bg-green-700 text-white">
                Sign In
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400">
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-10 space-y-8 animate-in slide-in-from-top duration-300">
          <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-2xl font-black text-slate-900 uppercase tracking-tighter">Home</button>
          <button onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-2xl font-black text-slate-900 uppercase tracking-tighter">About Us</button>
          <button onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-2xl font-black text-slate-900 uppercase tracking-tighter">Support</button>
          
          {user ? (
             <div className="border-t border-slate-100 pt-8 space-y-6">
               <div className="flex justify-between items-center">
                  <div>
                    <p className="font-black text-slate-900">{user.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{user.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-green-600">{user.balance.toLocaleString()} ৳</p>
                  </div>
               </div>
               <Button className="w-full h-14 rounded-2xl" onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }}>Go to Portal</Button>
               <button onClick={onLogout} className="w-full text-red-500 font-black text-xs uppercase tracking-widest py-4 bg-red-50 rounded-2xl">Logout Session</button>
             </div>
          ) : (
            <Button className="w-full h-16 text-lg rounded-2xl font-black" onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}>Partner Sign In</Button>
          )}
        </div>
      )}
    </nav>
  );
};