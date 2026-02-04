
import React, { useState } from 'react';
import { User, Order } from '../types';
import { Button } from '../components/Button';
import { DIESEL_PRICE_PER_LITER } from '../constants';
import { Droplet, History, CreditCard, AlertCircle, Fuel, Gauge, Leaf, MapPin, BadgePercent } from 'lucide-react';

interface BuyerDashboardProps {
  user: User;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ user }) => {
  const [liters, setLiters] = useState<number>(250);
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD-123', date: '2023-11-05', amountLiters: 500, totalPrice: 55000, status: 'completed', type: 'purchase' },
    { id: 'ORD-124', date: '2023-11-12', amountLiters: 1000, totalPrice: 110000, status: 'pending', type: 'purchase' },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Bulk discount: 2% off for > 1000L, 5% off for > 5000L
  const getDiscount = (qty: number) => {
    if (qty >= 5000) return 0.05;
    if (qty >= 1000) return 0.02;
    return 0;
  };

  const discountRate = getDiscount(liters);
  const basePrice = liters * DIESEL_PRICE_PER_LITER;
  const discountAmount = basePrice * discountRate;
  const totalCost = basePrice - discountAmount;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert("Please provide a delivery address.");
      return;
    }
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0],
      amountLiters: liters,
      totalPrice: totalCost,
      status: 'pending',
      type: 'purchase'
    };
    setOrders([newOrder, ...orders]);
    setShowSuccess(true);
    setAddress('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Buyer Dashboard</h1>
          <p className="text-slate-500 mt-1">Refuel your logistics with Greengine premium biodiesel.</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
           <div className="flex items-center bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-2 bg-green-500 rounded-lg mr-3">
              <Fuel className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] text-green-600 uppercase font-bold tracking-wider">Base Price</div>
              <div className="text-xl font-bold text-slate-900">{DIESEL_PRICE_PER_LITER} BDT <span className="text-xs font-normal text-slate-400">/ L</span></div>
            </div>
          </div>
          {liters >= 1000 && (
            <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 animate-pulse">
              <BadgePercent className="h-3 w-3 mr-1" />
              {(discountRate * 100).toFixed(0)}% Bulk Discount Applied
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Order Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-8 py-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Gauge className="h-6 w-6 text-green-400 mr-3" />
                Place New Order
              </h2>
              <span className="text-slate-400 text-sm">Priority Dispatch Available</span>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleOrder}>
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-sm font-semibold text-slate-700">Refill Quantity</label>
                    <div className="text-3xl font-black text-slate-900">{liters.toLocaleString()} <span className="text-sm font-medium text-slate-400">Liters</span></div>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={liters}
                    onChange={(e) => setLiters(Number(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>100 L</span>
                    <span>5,000 L (5% OFF)</span>
                    <span>10,000 L</span>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                    Delivery Depot / Site Address
                  </label>
                  <input 
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full address for fuel delivery"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Total Quote</div>
                    <div className="text-2xl font-bold text-slate-900">
                      {totalCost.toLocaleString()} <span className="text-sm font-medium uppercase">BDT</span>
                      {discountAmount > 0 && (
                        <span className="ml-2 text-xs text-emerald-600 line-through decoration-emerald-300 font-normal">
                          {basePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <div className="text-xs text-emerald-600 mb-1 uppercase tracking-wider font-bold">Emission Offset</div>
                    <div className="text-2xl font-bold text-emerald-700 flex items-center">
                      <Leaf className="h-5 w-5 mr-2" />
                      {(liters * 2.5).toLocaleString()} <span className="text-sm font-medium ml-1 text-emerald-600/70">kg CO2</span>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full h-16 text-xl shadow-lg shadow-green-600/10">
                  Confirm & Schedule
                </Button>
              </form>

              {showSuccess && (
                <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-2xl flex items-center border border-green-100 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-bold">Order Successfully Placed!</p>
                    <p className="text-sm opacity-90">Our logistics team will contact you shortly to coordinate arrival.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Impact Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
               <Fuel size={120} />
            </div>
            <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-6">Your Fleet Impact</h3>
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-black text-white">{(orders.reduce((acc, curr) => acc + curr.amountLiters, 0)).toLocaleString()} L</div>
                <div className="text-sm text-slate-400">Lifetime Diesel Volume</div>
              </div>
              <div className="pt-6 border-t border-white/5">
                <div className="text-4xl font-black text-emerald-400">{(orders.reduce((acc, curr) => acc + curr.amountLiters, 0) * 2.5).toLocaleString()} kg</div>
                <div className="text-sm text-slate-400">Total Carbon Offset</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <History className="h-5 w-5 text-slate-400 mr-2" />
                Order History
              </div>
            </h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200 group">
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-green-600 transition-colors">{order.amountLiters.toLocaleString()} L</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{order.date} • {order.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{order.totalPrice.toLocaleString()} ৳</div>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
