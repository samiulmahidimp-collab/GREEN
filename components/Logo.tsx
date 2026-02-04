import React from 'react';
import { Leaf, Droplet } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'dark' for white bg (Header), 'light' for dark bg (Footer)
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const isDarkBg = variant === 'light';

  return (
    <div className={`flex items-center gap-2 group select-none ${className}`}>
      {/* Graphic Element */}
      <div className="relative flex items-center justify-center">
        <div className={`absolute inset-0 bg-green-500/20 rounded-full blur-lg group-hover:scale-150 transition-transform duration-500 ${isDarkBg ? 'opacity-20' : 'opacity-40'}`}></div>
        <div className="relative flex items-center">
          <Leaf 
            className={`h-10 w-10 md:h-12 md:w-12 ${isDarkBg ? 'text-green-400' : 'text-green-600'} transform -rotate-12 transition-transform group-hover:rotate-0`} 
            strokeWidth={2.5}
          />
          <Droplet 
            className={`h-5 w-5 md:h-6 md:w-6 absolute bottom-0 -right-1 ${isDarkBg ? 'text-emerald-300' : 'text-emerald-500'} fill-current animate-pulse`} 
          />
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span className={`text-3xl md:text-4xl font-black tracking-tighter ${isDarkBg ? 'text-white' : 'text-slate-800'}`}>
            <span className="text-green-600">Green</span>
            <span className={isDarkBg ? 'text-slate-300' : 'text-slate-500'}>gine</span>
          </span>
        </div>
        <div className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mt-0.5 ${isDarkBg ? 'text-green-400/80' : 'text-slate-400'}`}>
          Premium Biodiesel
        </div>
      </div>
    </div>
  );
};