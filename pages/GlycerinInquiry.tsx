import React, { useState } from 'react';
import { Button } from '../components/Button';
import { FlaskConical, Building2, ClipboardCheck, Phone, Mail, AlertCircle } from 'lucide-react';
import { CONTACT_INFO, GLYCERIN_PRICE_PER_KG } from '../constants';

export const GlycerinInquiry: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contactPerson: '',
    phone: '',
    email: '',
    volume: 1000,
    tradeLicense: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Inquiry submitted:', formData);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
          <ClipboardCheck className="h-14 w-14 text-green-600" />
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Request Received</h1>
        <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-xl mx-auto font-medium">
          Our industrial supply team is currently verifying your trade license. A personalized bulk contract quote will be dispatched to your business email within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-10 h-14 rounded-2xl" onClick={() => setSubmitted(false)}>Update volume</Button>
          <Button size="lg" variant="outline" className="px-10 h-14 rounded-2xl" onClick={() => window.location.reload()}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        <div className="sticky top-40">
          <div className="bg-emerald-600/10 border border-emerald-600/20 text-emerald-600 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest inline-flex mb-8">
            Verified Procurement
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-[1.1]">
            Crude Glycerin <br/> <span className="text-slate-400">Industrial Supply</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium border-l-4 border-emerald-600 pl-8">
            High-viscosity byproduct of Greengine bio-refining. Optimized for industrial-scale manufacturing of soaps, solvents, and chemical precursors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl hover:scale-105 transition-all">
               <FlaskConical className="h-10 w-10 text-emerald-600 mb-6 group-hover:rotate-12 transition-transform" />
               <h4 className="font-black text-slate-900 mb-2 uppercase tracking-tight">Technical Data</h4>
               <p className="text-sm text-slate-500 font-medium">Verified Grade. MONG &lt; 2%. Methanol &lt; 0.1%. Density approx 1.26 g/cm³.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl hover:scale-105 transition-all">
               <Building2 className="h-10 w-10 text-emerald-600 mb-6 group-hover:rotate-12 transition-transform" />
               <h4 className="font-black text-slate-900 mb-2 uppercase tracking-tight">Chain Support</h4>
               <p className="text-sm text-slate-500 font-medium">Standard IBC Tank or Bulk Fleet delivery to your facility.</p>
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
               <FlaskConical size={120} />
             </div>
             <h4 className="text-emerald-400 font-black uppercase tracking-widest text-xs mb-6 flex items-center">
               Industrial Desk
             </h4>
             <div className="space-y-6 relative z-10">
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center group/link">
                  <div className="p-3 bg-white/5 rounded-xl mr-5 group-hover/link:bg-emerald-600 transition-colors">
                    <Phone className="h-6 w-6 text-emerald-500 group-hover/link:text-white" />
                  </div>
                  <span className="text-2xl font-black group-hover/link:text-emerald-400 transition-colors">{CONTACT_INFO.phone}</span>
                </a>
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center group/link">
                  <div className="p-3 bg-white/5 rounded-xl mr-5 group-hover/link:bg-emerald-600 transition-colors">
                    <Mail className="h-6 w-6 text-emerald-500 group-hover/link:text-white" />
                  </div>
                  <span className="text-lg font-black group-hover/link:text-emerald-400 transition-colors">{CONTACT_INFO.email}</span>
                </a>
             </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl border border-slate-100">
          <h2 className="text-4xl font-black text-slate-900 mb-10 flex items-center tracking-tight">
            Procurement Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Organization Legal Name</label>
                <input 
                  type="text" required 
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-bold" 
                  placeholder="e.g. Acme Industrial Ltd"
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Business Email</label>
                <input 
                  type="email" required 
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-bold" 
                  placeholder="procurement@company.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Office Line</label>
                <input 
                  type="tel" required 
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-bold" 
                  placeholder="+880..."
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
               <div className="flex justify-between items-center mb-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Monthly Commitment (KG)</label>
                  <span className="text-emerald-600 font-black text-3xl">{formData.volume.toLocaleString()} KG</span>
               </div>
               <input 
                  type="range" min="500" max="25000" step="500"
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  value={formData.volume}
                  onChange={e => setFormData({...formData, volume: parseInt(e.target.value)})}
               />
               <div className="flex justify-between mt-4 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                 <span>Min 500 KG</span>
                 <span>Max 25,000 KG</span>
               </div>
            </div>

            <div>
               <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Trade License Number</label>
               <input 
                type="text" required
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-bold uppercase" 
                placeholder="TRL-XXXX-XXXX"
                value={formData.tradeLicense}
                onChange={e => setFormData({...formData, tradeLicense: e.target.value})}
               />
            </div>

            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start">
               <AlertCircle className="h-6 w-6 text-amber-600 mr-4 flex-shrink-0 mt-1" />
               <p className="text-xs text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                 Greengine calculates industrial yields at approx 18.5 BDT/kg UCO input. Prices are subject to volume-based negotiation upon business validation.
               </p>
            </div>

            <Button type="submit" size="lg" className="w-full h-20 text-xl font-black rounded-3xl shadow-2xl shadow-emerald-600/20 active:scale-95 transition-all">
              Submit Supply Inquiry
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};