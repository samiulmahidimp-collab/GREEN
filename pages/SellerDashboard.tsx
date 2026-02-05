import React, { useState } from 'react';
import { User, Order } from '../types';
import { Button } from '../components/Button';
import { UCO_BUYBACK_PRICE } from '../constants';
import { Truck, DollarSign, Calendar, MapPin, Smartphone, Banknote, Building2 } from 'lucide-react';

interface SellerDashboardProps {
  user: User;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({ user }) => {
  const [liters, setLiters] = useState<number>(50);
  const [pickupDate, setPickupDate] = useState('');
  const [location, setLocation] = useState('');
  const [payoutMethod, setPayoutMethod] = useState<'cash' | 'bkash' | 'nagad'>('cash');
  const [pickups, setPickups] = useState<Order[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const estimatedEarnings = liters * UCO_BUYBACK_PRICE;

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newPickup: Order = {
      id: `UCO-${Math.floor(Math.random() * 10000)}`,
      date: pickupDate || new Date().toISOString().split('T')[0],
      amountLiters: liters,
      totalPrice: estimatedEarnings,
      status: 'pending',
      type: 'collection',
      location,
      paymentMethod: payoutMethod
    };
    setPickups([newPickup, ...pickups]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">UCO Donor Portal</h1>
          <p className="text-slate-500 mt-2 uppercase text-xs font-black tracking-widest italic">Supplying from: {user.organization || 'Independent Partner'}</p>
        </div>
        <div className="bg-green-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-green-600/20 group">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                 <DollarSign className="text-white h-6 w-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase opacity-80 mb-1">Buyback Rate</p>
                 <p className="text-3xl font-black">{UCO_BUYBACK_PRICE} ৳ <span className="text-sm font-medium opacity-60">/ Liter</span></p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[4rem] shadow-sm border border-slate-100 p-12">
            <h2 className="text-2xl font-black text-slate-900 mb-12 flex items-center">
              <Truck className="h-6 w-6 text-green-600 mr-4" /> Schedule Collection Fleet
            </h2>
            
            <form onSubmit={handleRequest} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Quantity (Est. Liters)</label>
                  <input
                    type="number" min="20" required
                    value={liters}
                    onChange={(e) => setLiters(Number(e.target.value))}
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-green-600 outline-none font-black text-2xl"
                  />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Preferred Date</label>
                   <input 
                    type="date" required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-green-600 outline-none font-bold"
                   />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Collection Point Address</label>
                <div className="relative">
                  <MapPin className="absolute left-8 top-6 h-6 w-6 text-slate-300" />
                  <input 
                    type="text" required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter full location for our driver"
                    className="w-full pl-20 pr-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-green-600 outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 text-center">How would you like to collect payment?</label>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { id: 'cash', label: 'Cash', icon: <Banknote />, color: 'bg-green-600' },
                    { id: 'bkash', label: 'bKash', icon: <Smartphone />, color: 'bg-[#E2136E]' },
                    { id: 'nagad', label: 'Nagad', icon: <Smartphone />, color: 'bg-[#ED1C24]' },
                  ].map(p => (
                    <button 
                      key={p.id} type="button"
                      onClick={() => setPayoutMethod(p.id as any)}
                      className={`flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 transition-all relative overflow-hidden group ${payoutMethod === p.id ? `${p.color} text-white border-transparent shadow-2xl` : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'}`}
                    >
                      <div className="mb-3 transition-transform group-hover:scale-110">{p.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white flex items-center justify-between">
                <div>
                  <h4 className="font-black text-green-400 uppercase tracking-widest text-[10px] mb-2">Estimated Partner Earning</h4>
                  <p className="text-5xl font-black">{estimatedEarnings.toLocaleString()} <span className="text-xl font-medium text-slate-500">৳</span></p>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md">
                   <Building2 className="text-green-500" />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full h-24 text-2xl font-black rounded-[2rem] shadow-2xl shadow-green-600/20 active:scale-95">
                Dispatch Collection Team
              </Button>
            </form>
            
            {showSuccess && (
              <div className="mt-12 p-8 bg-green-50 border-2 border-green-200 text-green-800 rounded-[3rem] flex items-center animate-in slide-in-from-top-4">
                <Calendar className="h-10 w-10 mr-6 text-green-600" />
                <div className="font-black uppercase tracking-widest text-xs leading-relaxed">
                  Collection Ticket Created! <br/>
                  <span className="opacity-60 text-[9px]">Our employee will arrive with payment on the scheduled date.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-50 p-10 rounded-[4rem] border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Circular Impact</h3>
              <div className="space-y-12">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center shadow-sm">
                      <Truck className="text-green-600 h-6 w-6" />
                   </div>
                   <div>
                     <p className="text-3xl font-black text-slate-900">{pickups.length}</p>
                     <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Total Supplies</p>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};