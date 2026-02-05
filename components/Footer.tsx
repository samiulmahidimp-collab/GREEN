import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          
          <div className="space-y-8">
            <Logo variant="light" />
            <p className="text-base text-slate-400 leading-relaxed max-w-sm font-medium">
              Transforming Bangladesh's logistics with carbon-neutral biodiesel and high-purity industrial glycerin. Join the circular energy revolution.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black text-white mb-10 tracking-widest uppercase">Navigation</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center">Biodiesel Ordering</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center">Glycerin Bulk Supply</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center">UCO Selling Partnership</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center">Laboratory Standards</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black text-white mb-10 tracking-widest uppercase">Contact Desk</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-green-500 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-bold group-hover:text-white transition-colors leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-green-500 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-bold group-hover:text-white transition-colors">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-green-500 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-bold group-hover:text-white transition-colors underline decoration-green-500/30 underline-offset-4">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="border-t border-slate-800 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-black uppercase tracking-widest gap-4">
          <div>&copy; {new Date().getFullYear()} Greengine Biodiesel Ltd. All rights reserved.</div>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Safety Specs</a>
            <a href="#" className="hover:text-white transition-colors">Trade Licenses</a>
          </div>
        </div>
      </div>
    </footer>
  );
};