import React, { useState } from 'react';
import { User, Task } from '../types';
import { Button } from '../components/Button';
import { Clock, ClipboardList, CheckCircle2, Circle, Calendar, MapPin, LayoutDashboard } from 'lucide-react';

interface EmployeeDashboardProps {
  user: User;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ user }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Quality check at Gulshan Depot', status: 'pending', deadline: '12:00 PM' },
    { id: '2', title: 'UCO collection from Sultan’s Dine', status: 'pending', deadline: '02:00 PM' },
    { id: '3', title: 'Submit refinery log', status: 'completed', deadline: '10:00 AM' },
  ]);

  const handleClockToggle = () => {
    setClockedIn(!clockedIn);
    setClockTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Staff Operations</h1>
          <p className="text-slate-500 mt-1 uppercase text-xs font-black tracking-widest">Employee ID: {user.id.toUpperCase()}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white px-6 py-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${clockedIn ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-4">Status:</span>
            <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{clockedIn ? 'On Duty' : 'Off Duty'}</span>
          </div>
          <Button 
            variant={clockedIn ? 'danger' : 'primary'} 
            onClick={handleClockToggle}
            className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg"
          >
            {clockedIn ? 'Clock Out' : 'Clock In'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-12">
            <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center tracking-tight">
              <ClipboardList className="h-6 w-6 text-green-600 mr-4" />
              Assigned Tasks
            </h2>
            <div className="space-y-4">
              {tasks.map(task => (
                <button 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`w-full flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all text-left ${task.status === 'completed' ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 hover:border-green-500 hover:shadow-xl'}`}
                >
                  <div className="flex items-center">
                    {task.status === 'completed' ? <CheckCircle2 className="text-green-600 mr-4" /> : <Circle className="text-slate-300 mr-4" />}
                    <div>
                      <p className={`font-black uppercase tracking-tight text-sm ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>{task.title}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Deadline: {task.deadline}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                <Clock size={120} />
             </div>
             <h3 className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-8">Work Summary</h3>
             <div className="space-y-8 relative z-10">
               <div>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-2">Shift Start</p>
                  <p className="text-3xl font-black">{clockTime || '--:--'}</p>
               </div>
               <div className="pt-8 border-t border-white/10">
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-2">Hours Logged</p>
                  <p className="text-3xl font-black">0.0 <span className="text-sm font-medium text-slate-500 tracking-normal">HRS</span></p>
               </div>
             </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
             <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center">
               <Calendar className="h-4 w-4 mr-2" />
               Upcoming Depot Shifts
             </h3>
             <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl flex items-center border border-slate-100">
                   <MapPin className="h-4 w-4 text-slate-300 mr-3" />
                   <div>
                     <p className="text-[10px] font-black text-slate-900 uppercase">Dhaka Main Depot</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase">Tomorrow, 08:00 AM</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};