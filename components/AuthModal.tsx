import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Button } from './Button';
import { X, ShieldCheck, Lock, Mail, User as UserIcon, ArrowRight, Zap, Globe } from 'lucide-react';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-white w-full max-w-5xl min-h-[650px] overflow-hidden rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.7)] flex flex-col md:flex-row border border-slate-800 animate-in fade-in zoom-in duration-300">
        
        {/* Left Side: Brand & Impact */}
        <div className="md:w-[45%] bg-slate-900 p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute inset-0 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:24px_24px]"></div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mb-12 shadow-2xl">
              <ShieldCheck className="text-green-600 h-10 w-10" />
            </div>
            <h3 className="text-4xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              Securing the <br/> 
              <span className="text-green-500">Green Revolution.</span>
            </h3>
            <div className="space-y-6">
               {[
                 { icon: <Zap className="h-4 w-4" />, text: 'Industrial Grade B100 Certification' },
                 { icon: <Globe className="h-4 w-4" />, text: 'Circular Economy Integration' },
                 { icon: <Lock className="h-4 w-4" />, text: 'Secure Supply Chain Protocols' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <div className="mr-4 p-2 bg-white/5 rounded-lg text-green-500">{item.icon}</div>
                    {item.text}
                 </div>
               ))}
            </div>
          </div>

          <div className="relative z-10 pt-12 border-t border-white/10">
             <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Team Code Red</p>
             <p className="text-[9px] text-slate-600 mt-2 font-bold uppercase tracking-widest leading-relaxed">
                Authorized access only. All sessions are monitored for security compliance.
             </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 bg-white p-12 md:p-16 relative flex flex-col justify-center">
          <button onClick={onClose} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors p-2">
            <X size={32} />
          </button>

          <div className="mb-12">
             <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
               {isLoginMode ? 'Sign In' : 'Partner Portal'}
             </h2>
             <p className="text-slate-500 font-medium italic text-sm">Select your credential level to access the platform.</p>
          </div>

          <div className="mb-10">
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              {currentRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveTab(role)}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    activeTab === role 
                      ? 'bg-white text-slate-900 shadow-lg border border-slate-200' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {role === UserRole.SELLER ? 'Donor' : role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginMode && (
              <div className="relative group">
                <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-green-600 transition-colors" />
                <input
                  type="text" required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-slate-900 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all shadow-inner"
                  placeholder="Organization / Full Name"
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-green-600 transition-colors" />
              <input
                type="email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-slate-900 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all shadow-inner"
                placeholder="Business Email"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-green-600 transition-colors" />
              <input
                type="password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-slate-900 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all shadow-inner"
                placeholder="Access Token / Password"
              />
            </div>

            <div className="pt-6">
              <Button type="submit" size="lg" className="w-full h-20 text-sm font-black uppercase tracking-[0.2em] rounded-2xl bg-slate-900 hover:bg-black text-white shadow-2xl active:scale-[0.98] transition-all">
                {isLoginMode ? 'Access Workspace' : 'Initialize Account'}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>

            <div className="text-center pt-8">
              <button 
                type="button" 
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-green-600 transition-colors border-b-2 border-transparent hover:border-green-600 pb-1"
              >
                {isLoginMode ? "Need to join the circular network? Register" : "Already a registered partner? Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};