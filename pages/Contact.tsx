import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/Button';

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-slate-600">Have questions about biodiesel or collecting UCO?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-green-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Our Location</h3>
                <p className="text-slate-600">{CONTACT_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Phone Number</h3>
                <p className="text-slate-600">{CONTACT_INFO.phone}</p>
                <p className="text-sm text-slate-500 mt-1">Mon-Fri from 9am to 6pm</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                <p className="text-slate-600">{CONTACT_INFO.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Your Name" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="email@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="How can we help?" required></textarea>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Message <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
