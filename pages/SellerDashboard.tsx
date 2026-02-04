import React, { useState } from 'react';
import { User, Order } from '../types';
import { Button } from '../components/Button';
import { UCO_BUYBACK_PRICE } from '../constants';
import { Truck, DollarSign, Calendar, MapPin } from 'lucide-react';

interface SellerDashboardProps {
  user: User;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({ user }) => {
  const [liters, setLiters] = useState<number>(50);
  const [pickupDate, setPickupDate] = useState('');
  const [pickups, setPickups] = useState<Order[]>([
    { id: 'PKP-889', date: '2023-10-10', amountLiters: 40, totalPrice: 40 * UCO_BUYBACK_PRICE, status: 'completed', type: 'collection' },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const estimatedEarnings = liters * UCO_BUYBACK_PRICE;

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newPickup: Order = {
      id: `PKP-${Math.floor(Math.random() * 10000)}`,
      date: pickupDate || new Date().toISOString().split('T')[0],
      amountLiters: liters,
      totalPrice: estimatedEarnings,
      status: 'pending',
      type: 'collection'
    };
    setPickups([newPickup, ...pickups]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Restaurant Partner Dashboard</h1>
        <p className="text-slate-500">{user.organization || user.name} • Convert your waste into revenue.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Collection Request Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Truck className="h-6 w-6 text-green-600 mr-2" />
              Schedule UCO Pickup
            </h2>
            
            <form onSubmit={handleRequest}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Available Quantity</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="20"
                      value={liters}
                      onChange={(e) => setLiters(Number(e.target.value))}
                      className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-lg font-medium"
                    />
                    <span className="absolute right-4 top-3.5 text-slate-400">L</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Minimum pickup: 20 Liters</p>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                   <input 
                    type="date" 
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                   />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-8 flex items-start">
                <DollarSign className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Estimated Earnings</h4>
                  <p className="text-sm text-yellow-700">
                    At {UCO_BUYBACK_PRICE} BDT/L, you will receive <span className="font-bold">{estimatedEarnings.toLocaleString()} BDT</span> upon successful verification of oil quality.
                  </p>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Request Pickup
              </Button>
            </form>
            
            {showSuccess && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center animate-in fade-in slide-in-from-top-2">
                <Calendar className="h-5 w-5 mr-2" />
                Pickup scheduled! Our team will call you to confirm.
              </div>
            )}
          </div>
        </div>

        {/* Stats & History */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-600 to-emerald-800 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-medium text-green-100 uppercase tracking-wider mb-4">Total Earnings</h3>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{pickups.reduce((acc, curr) => acc + curr.totalPrice, 0).toLocaleString()}</span>
              <span className="ml-2 text-xl opacity-80">BDT</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm text-green-50">
              <span>Total Recycled</span>
              <span>{pickups.reduce((acc, curr) => acc + curr.amountLiters, 0)} Liters</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Pickup History</h3>
            <div className="space-y-4">
              {pickups.map((pickup) => (
                <div key={pickup.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900">{pickup.date}</div>
                    <div className="text-xs text-slate-500">{pickup.amountLiters}L • {pickup.totalPrice} BDT</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    pickup.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {pickup.status === 'pending' ? 'Scheduled' : 'Collected'}
                  </span>
                </div>
              ))}
              {pickups.length === 0 && <p className="text-slate-500 text-sm text-center py-4">No history yet.</p>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
