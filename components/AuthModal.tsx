import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Button } from './Button';
import { X, CheckCircle } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate Authentication
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || (activeTab === UserRole.ADMIN ? 'Admin User' : activeTab === UserRole.SELLER ? 'Restaurant Owner' : 'Valued Customer'),
      role: activeTab,
      organization: activeTab === UserRole.SELLER ? 'Tasty Foods Ltd' : undefined
    };

    onLogin(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 pb-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            {isLoginMode ? 'Welcome Back' : 'Join Greengine'}
          </h2>
          <p className="text-slate-500 mt-2">
            {isLoginMode ? 'Sign in to access your dashboard' : 'Create an account to get started'}
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex border-b border-slate-200 px-8">
          {[UserRole.BUYER, UserRole.SELLER, UserRole.ADMIN].map((role) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === role 
                  ? 'border-green-600 text-green-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {role === UserRole.SELLER ? 'Restaurant' : role.charAt(0) + role.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
           {!isLoginMode && (
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
               <input
                 type="text"
                 required
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                 placeholder="John Doe"
               />
             </div>
           )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full">
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </Button>
          </div>

          <div className="text-center text-sm text-slate-500">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-green-600 font-medium hover:underline"
            >
              {isLoginMode ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </form>

        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-xs text-slate-500 flex items-start">
          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <p>
            {activeTab === UserRole.BUYER && "Buyers can purchase premium biodiesel at competitive rates."}
            {activeTab === UserRole.SELLER && "Restaurants earn money by selling their used cooking oil."}
            {activeTab === UserRole.ADMIN && "Admins manage inventory, pricing, and user accounts."}
          </p>
        </div>
      </div>
    </div>
  );
};
