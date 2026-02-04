import React from 'react';
import { Leaf, Settings } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const isDark = variant === 'dark';
  
  return (
    <div className={`flex items-center ${className}`}>
      {/* Icon Composite: Leaf with a Gear inside */}
      <div className="relative flex items-center justify-center mr-2">
        <Leaf className={`h-8 w-8 ${isDark ? 'text-green-600' : 'text-green-500'} fill-current`} />
        {/* The gear is positioned absolutely to sit "inside" the leaf */}
        <Settings className={`absolute h-3.5 w-3.5 text-white/90 animate-[spin_10s_linear_infinite]`} />
      </div>
      
      {/* Text Composite */}
      <div className="flex items-baseline leading-none select-none">
        <span className={`font-kaushan text-3xl ${isDark ? 'text-green-700' : 'text-green-400'} -mr-1 z-10`}>
          Green
        </span>
        <div className={`flex items-baseline font-sans text-2xl font-bold tracking-tight ${isDark ? 'text-slate-700' : 'text-slate-100'}`}>
          <span>g</span>
          <span className="relative mx-[2px] flex items-end self-end mb-0.5">
             {/* Piston SVG to replace 'i' */}
             <svg width="6" height="16" viewBox="0 0 6 16" fill="currentColor" aria-hidden="true">
               {/* Piston Head */}
               <rect x="0" y="0" width="6" height="4" rx="1" />
               {/* Connecting Rod */}
               <rect x="2" y="4" width="2" height="8" />
               {/* Crank attachment */}
               <circle cx="3" cy="14" r="2" />
             </svg>
          </span>
          <span>ne</span>
        </div>
      </div>
    </div>
  );
};