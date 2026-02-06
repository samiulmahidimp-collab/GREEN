import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Button } from './Button';
import { X, ShieldCheck, Lock, Mail, User as UserIcon, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.BUYER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (!isOpen) return null;

  const signupRoles = [UserRole.BUYER, UserRole.SELLER, UserRole.EMPLOYEE];
  const signinRoles = [UserRole.BUYER, UserRole.SELLER, UserRole.EMPLOYEE, UserRole.ADMIN];
  const currentRoles = isLoginMode ? signinRoles : signupRoles;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || (activeTab === UserRole.ADMIN ? 'Greengine Admin' : activeTab === UserRole.EMPLOYEE ? 'Operations Staff' : 'Greengine Partner'),
      role: activeTab,
      balance: activeTab === UserRole.BUYER ? 0 : 500,
    };
    onLogin(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-300">
        <div className="p-10 relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
            <X size={24} />
          </button>

          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 rounded-2xl mb-4">
                <ShieldCheck className="text-green-600 h-8 w-8" />
             </div>
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
               {isLoginMode ? 'Welcome Back' : 'Register Partner'}
             </h2>
             <p className="text-slate-500 font-medium text-xs mt-1 italic">Greengine Circular Energy Network</p>
          </div>

          <div className="mb-8">
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
              {currentRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveTab(role)}
                  className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activeTab === role 
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {role === UserRole.SELLER ? 'Donor' : role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div className="relative">
                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <input
                  type="text" required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-green-600 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all text-sm"
                  placeholder="Organization / Name"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-green-600 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all text-sm"
                placeholder="Email Address"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-green-600 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all text-sm"
                placeholder="Password"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full h-14 text-xs font-black uppercase tracking-widest rounded-xl bg-slate-900 hover:bg-black text-white shadow-xl">
                {isLoginMode ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="text-center pt-6">
              <button 
                type="button" 
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-green-600 transition-colors"
              >
                {isLoginMode ? "Need a partner account? Sign Up" : "Already registered? Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};