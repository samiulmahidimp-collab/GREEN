import React from 'react';
import { MOCK_STATS } from '../constants';
import { BarChart, Users, Droplet, Wallet } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Overview</h1>
          <p className="text-slate-500">System performance and inventory tracking.</p>
        </div>
        <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
          System Healthy
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Droplet className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">+12%</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{MOCK_STATS.totalDieselSold.toLocaleString()}</div>
          <div className="text-sm text-slate-500">Liters Sold</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <BarChart className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">+8%</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{MOCK_STATS.totalUCOCollected.toLocaleString()}</div>
          <div className="text-sm text-slate-500">UCO Collected (L)</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">+24%</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{(MOCK_STATS.revenue / 100000).toFixed(2)}M</div>
          <div className="text-sm text-slate-500">Total Revenue (BDT)</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">+5</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{MOCK_STATS.activeUsers}</div>
          <div className="text-sm text-slate-500">Active Partners</div>
        </div>
      </div>

      {/* Recent Activity Table (Mock) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">#ORD-5542</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">Sale</span></td>
                <td className="px-6 py-4 text-slate-600">Green Logistics Ltd</td>
                <td className="px-6 py-4 text-slate-900">500 L</td>
                <td className="px-6 py-4 text-yellow-600">Pending</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">#PKP-9921</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs">Collection</span></td>
                <td className="px-6 py-4 text-slate-600">Sultan's Dine</td>
                <td className="px-6 py-4 text-slate-900">120 L</td>
                <td className="px-6 py-4 text-green-600">Completed</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">#ORD-5541</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">Sale</span></td>
                <td className="px-6 py-4 text-slate-600">Rahim Motors</td>
                <td className="px-6 py-4 text-slate-900">50 L</td>
                <td className="px-6 py-4 text-green-600">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
