import React, { useState } from 'react';
import { User, Order } from '../types';
import { Button } from '../components/Button';
import { DIESEL_PRICE_PER_LITER } from '../constants';
import { Droplet, History, CreditCard, AlertCircle } from 'lucide-react';

interface BuyerDashboardProps {
  user: User;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ user }) => {
  const [liters, setLiters] = useState<number>(100);
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD-123', date: '2023-10-15', amountLiters: 50, totalPrice: 5500, status: 'completed', type: 'purchase' },
    { id: 'ORD-124', date: '2023-10-20', amountLiters: 200, totalPrice: 22000, status: 'pending', type: 'purchase' },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalCost = liters * DIESEL_PRICE_PER_LITER;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
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
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Buyer Dashboard</h1>
        <p className="text-slate-500">Welcome back, {user.name}. Ready to refuel?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Order Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Droplet className="h-6 w-6 text-green-600 mr-2" />
              Place New Order
            </h2>
            
            <form onSubmit={handleOrder}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Quantity (Liters)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="10"
                      value={liters}
                      onChange={(e) => setLiters(Number(e.target.value))}
                      className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-lg font-medium"
                    />
                    <span className="absolute right-4 top-3.5 text-slate-400">L</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Minimum order: 10 Liters</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center">
                  <div className="text-sm text-slate-500 mb-1">Current Price</div>
                  <div className="text-lg font-semibold text-slate-900">{DIESEL_PRICE_PER_LITER} BDT <span className="text-sm font-normal text-slate-500">/ Liter</span></div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-600 font-medium">Total Cost</span>
                  <span className="text-3xl font-bold text-slate-900">{totalCost.toLocaleString()} BDT</span>
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  Confirm Purchase
                </Button>
              </div>
            </form>

            {showSuccess && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-5 w-5 mr-2" />
                Order placed successfully! We will contact you for delivery.
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats & History */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Your Impact</h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-green-400">{(orders.reduce((acc, curr) => acc + curr.amountLiters, 0)).toLocaleString()} L</div>
                <div className="text-sm text-slate-300">Biodiesel Purchased</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">{(orders.reduce((acc, curr) => acc + curr.amountLiters, 0) * 2.5).toFixed(1)} kg</div>
                <div className="text-sm text-slate-300">CO2 Emissions Saved</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <History className="h-5 w-5 text-slate-400 mr-2" />
              Recent Orders
            </h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900">{order.amountLiters} Liters</div>
                    <div className="text-xs text-slate-500">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-900">{order.totalPrice.toLocaleString()} ৳</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
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
