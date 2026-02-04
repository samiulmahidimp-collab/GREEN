import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-6">
            <Logo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Transforming used cooking oil into clean, efficient biodiesel. 
              Powering a greener future for Bangladesh with sustainable logistics.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center">Buy Diesel</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center">Sell UCO</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center">Our Process</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors flex items-center">Sustainability Report</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-xs text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} Greengine. All rights reserved. Registered in Bangladesh.
        </div>
      </div>
    </footer>
  );
};