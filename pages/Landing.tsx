
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ArrowRight, Droplet, Recycle, TrendingUp, Truck, CheckCircle, Calculator } from 'lucide-react';
import { DIESEL_PRICE_PER_LITER } from '../constants';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  const [calcLiters, setCalcLiters] = useState(100);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1578351006071-331500d463b2?auto=format&fit=crop&q=80"
            alt="Sustainability" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                <Droplet className="h-4 w-4" />
                <span>Premium Biodiesel now available</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                High Performance <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  Green Energy
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                Upgrade your fleet with Greengine. Premium, filtered biodiesel that reduces carbon footprint by 80% and costs less than traditional fuel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" onClick={onGetStarted} className="group h-14 px-8 shadow-xl shadow-green-600/20">
                  Order Diesel Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <div className="flex items-center px-6 text-white font-bold text-2xl">
                  {DIESEL_PRICE_PER_LITER} BDT <span className="text-sm font-normal text-slate-400 ml-2">/ Litre</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900" src={`https://i.pravatar.cc/150?u=${i+10}`} alt="" />
                  ))}
                </div>
                <p className="text-slate-400 text-sm italic">Joined by 40+ logistics partners</p>
              </div>
            </div>

            {/* Quick Calculator Card */}
            <div className="lg:block hidden">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-500 rounded-xl mr-4">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Savings Calculator</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Refill Amount (Liters)</label>
                    <input 
                      type="range" 
                      min="100" 
                      max="5000" 
                      step="100"
                      value={calcLiters}
                      onChange={(e) => setCalcLiters(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>100 L</span>
                      <span className="text-green-400 font-bold">{calcLiters} L</span>
                      <span>5000 L</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-400 uppercase">Total Cost</p>
                      <p className="text-xl font-bold text-white">{(calcLiters * DIESEL_PRICE_PER_LITER).toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500">BDT</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                      <p className="text-xs text-green-400 uppercase">CO2 Savings</p>
                      <p className="text-xl font-bold text-green-400">{(calcLiters * 2.5).toLocaleString()}</p>
                      <p className="text-[10px] text-green-500/60">KG PER REFILL</p>
                    </div>
                  </div>
                  <Button variant="primary" className="w-full h-12" onClick={onGetStarted}>
                    Lock in this Price
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-slate-50 py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all">
             <span className="font-bold text-xl text-slate-400">ISCC CERTIFIED</span>
             <span className="font-bold text-xl text-slate-400">ASTM D6751</span>
             <span className="font-bold text-xl text-slate-400">EN 14214</span>
             <span className="font-bold text-xl text-slate-400">BUET TESTED</span>
          </div>
        </div>
      </div>

      {/* Features/Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">The Greengine Cycle</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
              We turn waste into wealth. Our circular model ensures high quality fuel while supporting local businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="relative group">
              <div className="bg-green-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                <Recycle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">UCO Collection</h3>
              <p className="text-slate-600 leading-relaxed">
                We partner with thousands of restaurants to collect Used Cooking Oil (UCO), preventing it from entering our drainage systems.
              </p>
              <div className="mt-6 text-green-600 font-semibold flex items-center cursor-pointer hover:translate-x-1 transition-transform">
                Sell your UCO <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>

            <div className="relative group">
              <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform">
                <Droplet className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Precision Refining</h3>
              <p className="text-slate-600 leading-relaxed">
                Using advanced transesterification, we produce biodiesel that meets international standards for engine safety and performance.
              </p>
            </div>

            <div className="relative group">
              <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 rotate-6 group-hover:rotate-0 transition-transform">
                <Truck className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Doorstep Delivery</h3>
              <p className="text-slate-600 leading-relaxed">
                Order directly through our platform and get premium fuel delivered to your depot or site within 24 hours.
              </p>
              <div className="mt-6 text-blue-600 font-semibold flex items-center cursor-pointer hover:translate-x-1 transition-transform">
                Fleet rates <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Impact */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">15k+</div>
              <div className="text-green-400 font-medium">Liters Recycled</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">40+</div>
              <div className="text-green-400 font-medium">Logistics Partners</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">12k+</div>
              <div className="text-green-400 font-medium">Liters Fuel Sold</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">30T</div>
              <div className="text-green-400 font-medium">CO2 Prevented</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Simple CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Ready to switch to Greengine?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-12">
            <div className="flex items-start p-4 rounded-xl bg-slate-50">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <p className="text-slate-600 text-sm">Engine warranty safe – our fuel meets B5 and B20 blending standards perfectly.</p>
            </div>
            <div className="flex items-start p-4 rounded-xl bg-slate-50">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <p className="text-slate-600 text-sm">Competitive 110 BDT pricing with bulk discounts for monthly contracts.</p>
            </div>
          </div>
          <Button size="lg" onClick={onGetStarted} className="px-12 py-4 text-xl">
            Start Ordering Today
          </Button>
        </div>
      </section>
    </div>
  );
};
