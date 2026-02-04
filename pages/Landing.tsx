import React from 'react';
import { Button } from '../components/Button';
import { ArrowRight, Droplet, Recycle, TrendingUp, Truck } from 'lucide-react';
import { DIESEL_PRICE_PER_LITER } from '../constants';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1518655061710-5ccf392c275a?auto=format&fit=crop&q=80"
            alt="Biofuel Plant" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Fueling the Future with <span className="text-green-500">Recycled Energy</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Greengine transforms used cooking oil into high-quality biodiesel. 
              We connect responsible restaurants with eco-conscious industries. 
              Reduce waste, cut emissions, and save money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onGetStarted} className="group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-500 text-white hover:bg-white/10 hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              A circular economy model that benefits everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Collection</h3>
              <p className="text-slate-600">
                Restaurants schedule pickups for their used cooking oil. We pay competitive rates for your waste.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplet className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Processing</h3>
              <p className="text-slate-600">
                Our state-of-the-art facility filters and transesterifies the oil into clean-burning biodiesel.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Distribution</h3>
              <p className="text-slate-600">
                Industries and vehicle owners buy premium biodiesel at just <span className="font-bold text-slate-900">{DIESEL_PRICE_PER_LITER} BDT/L</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Impact */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">15k+</div>
              <div className="text-green-100">Liters Recycled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">40+</div>
              <div className="text-green-100">Partner Restaurants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">12k+</div>
              <div className="text-green-100">Liters Fuel Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">30T</div>
              <div className="text-green-100">CO2 Saved</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
