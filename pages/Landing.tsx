
import React from 'react';
import { Button } from '../components/Button';
import { ArrowRight, CloudRain, Zap, HeartPulse, Leaf, ShieldCheck, TrendingDown, XCircle, CheckCircle2, Droplets, Waves, Sun, Recycle, Hammer, Building2, BarChart3, Users2 } from 'lucide-react';
import { DIESEL_PRICE_PER_LITER, IMPACT_STATS } from '../constants';

interface LandingProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
  onNavigateToGlycerin: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted, isLoggedIn, onNavigateToGlycerin }) => {
  const comparisonFeatures = [
    {
      label: "Carbon Footprint",
      diesel: "High Lifecycle Emissions",
      biodiesel: `${IMPACT_STATS.emissionsReduction} Net Reduction`,
      icon: <CloudRain className="h-5 w-5" />
    },
    {
      label: "Engine Health",
      diesel: "Standard Lubricity",
      biodiesel: "Superior Lubrication & Life",
      icon: <Zap className="h-5 w-5" />
    },
    {
      label: "Environmental Impact",
      diesel: "Non-biodegradable / Toxic",
      biodiesel: "99% Biodegradable / Safe",
      icon: <Leaf className="h-5 w-5" />
    },
    {
      label: "Public Health",
      diesel: "High Particulate Matter",
      biodiesel: "Zero Carcinogenic UCO Resale",
      icon: <HeartPulse className="h-5 w-5" />
    }
  ];

  const sdgs = [
    { id: 7, title: "Clean Energy", icon: <Sun className="text-amber-500" />, color: "bg-amber-50" },
    { id: 9, title: "Innovation", icon: <Hammer className="text-orange-600" />, color: "bg-orange-50" },
    { id: 12, title: "Circular Econ", icon: <Recycle className="text-emerald-600" />, color: "bg-emerald-50" },
    { id: 13, title: "Climate Action", icon: <Waves className="text-blue-600" />, color: "bg-blue-50" },
    { id: 3, title: "Public Health", icon: <HeartPulse className="text-red-500" />, color: "bg-red-50" },
    { id: 6, title: "Clean Water", icon: <Droplets className="text-blue-400" />, color: "bg-blue-50" },
    { id: 8, title: "Decent Work", icon: <Zap className="text-green-600" />, color: "bg-green-50" },
    { id: 11, title: "Sustainable Cities", icon: <Building2 className="text-slate-600" />, color: "bg-slate-100" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] overflow-hidden min-h-[95vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000"
            alt="Bio-Refinery Complex" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-900"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold mb-8 animate-pulse">
                <TrendingDown className="h-4 w-4" />
                <span>Today's Price: {DIESEL_PRICE_PER_LITER} BDT / Litre</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tighter">
                Fueling Tomorrow <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
                  with Today's Leftover
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl font-medium border-l-4 border-green-600 pl-6 italic">
                "{IMPACT_STATS.conversionRate}. Power your fleet with {IMPACT_STATS.emissionsReduction} fewer lifecycle emissions."
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <Button size="lg" onClick={onGetStarted} className="group h-16 px-10 text-lg font-black shadow-2xl shadow-green-500/30 active:scale-95 transition-all">
                  Get Started
                  <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Button>
                <div className="flex flex-col justify-center px-4 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
                  <span className="text-white font-black text-3xl">{DIESEL_PRICE_PER_LITER} <span className="text-lg font-medium text-slate-500">BDT</span></span>
                  <span className="text-[10px] uppercase tracking-widest font-black text-green-500">Eco-Premium Diesel</span>
                </div>
              </div>
            </div>

            <div className="lg:block hidden">
              <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center">
                     <BarChart3 className="mr-3 h-5 w-5 text-green-500" /> Global Insight
                   </h3>
                   <div className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full">SURVEY DATA</div>
                </div>
                <div className="space-y-8">
                  <div className="flex flex-col gap-6">
                     <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-center gap-6">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                           <Users2 className="text-green-500 h-6 w-6" />
                        </div>
                        <div>
                           <p className="text-2xl font-black text-white">92%</p>
                           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">User Preference for Eco-fuel</p>
                        </div>
                     </div>
                     <div className="bg-green-600/10 rounded-2xl p-6 border border-green-500/20 flex items-center gap-6">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                           <HeartPulse className="text-green-500 h-6 w-6" />
                        </div>
                        <div>
                           <p className="text-2xl font-black text-white">78%</p>
                           <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Health & Emission Improvement</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                     <div className="flex justify-between mb-2 text-xs font-black uppercase tracking-widest">
                        <span className="text-slate-400">Net Zero Carbon Commitment</span>
                        <span className="text-green-500">Target 2050</span>
                     </div>
                     <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[100%] h-full bg-green-500 animate-pulse"></div>
                     </div>
                     <p className="text-[9px] text-slate-500 mt-4 uppercase font-black leading-relaxed italic">
                       Why shift? Global mandates are moving towards 100% sustainable fuels to prevent irreversible climate damage. Biodiesel is the immediate industrial solution.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fuel Comparison Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-green-600 mb-6">Industrial Comparison</h2>
            <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Biodiesel Advantage</h3>
            <p className="text-slate-500 mt-4 font-medium italic">Why market leaders are shifting to Greengine B100</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-[3.5rem] p-10 md:p-14 border border-slate-100 flex flex-col grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 shadow-sm">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center shadow-inner">
                    <XCircle className="h-8 w-8 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Standard Fossil Diesel</h4>
                    <p className="text-xs font-bold text-slate-400">Import-Dependent Energy</p>
                  </div>
               </div>
               
               <div className="space-y-6 flex-grow">
                 {comparisonFeatures.map((f, i) => (
                   <div key={i} className="flex justify-between items-center py-4 border-b border-slate-200">
                      <div className="flex items-center gap-3 text-slate-500">
                         {f.icon}
                         <span className="text-[10px] font-black uppercase tracking-widest">{f.label}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-600">{f.diesel}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-14 border-4 border-green-600 shadow-2xl flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
               
               <div className="flex items-center gap-4 mb-10 relative z-10">
                  <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/30">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Greengine B100</h4>
                    <p className="text-xs font-bold text-green-500 tracking-widest uppercase">Premium Circular Fuel</p>
                  </div>
               </div>
               
               <div className="space-y-6 flex-grow relative z-10">
                 {comparisonFeatures.map((f, i) => (
                   <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
                      <div className="flex items-center gap-3 text-green-500">
                         {f.icon}
                         <span className="text-[10px] font-black uppercase tracking-widest">{f.label}</span>
                      </div>
                      <span className="text-sm font-black text-white">{f.biodiesel}</span>
                   </div>
                 ))}
               </div>

               <div className="mt-12 p-6 bg-green-600 rounded-2xl text-center relative z-10">
                  <p className="text-xs font-black text-white uppercase tracking-widest">Engineered in Bangladesh</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-green-600 mb-4">Mission Alignment</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">SDG Global Impact</h3>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sdgs.map((sdg) => (
                <div key={sdg.id} className={`${sdg.color} p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center group hover:scale-105 transition-all duration-300`}>
                   <div className="mb-4 bg-white p-4 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                      {React.cloneElement(sdg.icon as React.ReactElement<{ className?: string }>, { className: 'h-8 w-8' })}
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Goal {sdg.id}</p>
                   <p className="text-sm font-black text-slate-900 leading-tight">{sdg.title}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-green-600 relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-700">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 mb-10 shadow-2xl">
             <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-[1.1]">
            Shift to Carbon-Neutral <br className="hidden md:block" /> Industrial Power
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <Button size="lg" variant="secondary" onClick={onGetStarted} className="h-20 px-16 text-xl font-black rounded-3xl shadow-2xl shadow-slate-900/30 hover:scale-105 active:scale-95 transition-all w-full md:w-auto">
              Partner with Greengine
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
