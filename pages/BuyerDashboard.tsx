import React, { useState } from 'react';
import { User, BuyerPurpose, Order } from '../types';
import { Button } from '../components/Button';
import { DIESEL_PRICE_PER_LITER } from '../constants';
import { Wallet, Fuel as FuelIcon, FlaskConical, ArrowRight, Plus, X, Droplets, Building2, Car, ShieldAlert, History, CheckCircle, Truck, PackageCheck, Zap, ShoppingBag, AlertCircle, Ticket, Globe } from 'lucide-react';
import { GlycerinInquiry } from './GlycerinInquiry';

const VALID_REFERRAL_CODES = ["mahid", "prizon", "oyshee", "erata", "abrar"];

interface BuyerDashboardProps {
  user: User;
  onUpdateUser: (updated: User) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ user, onUpdateUser }) => {
  const [step, setStep] = useState<'selection' | 'purpose' | 'ordering' | 'tracking'>('selection');
  const [mode, setMode] = useState<'biodiesel' | 'glycerin'>('biodiesel');
  const [purpose, setPurpose] = useState<BuyerPurpose | null>(null);
  const [liters, setLiters] = useState<number>(250);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isInsufficientModalOpen, setIsInsufficientModalOpen] = useState(false);
  const [rechargeStep, setRechargeStep] = useState<'method' | 'payment'>('method');
  const [selectedGateway, setSelectedGateway] = useState<'bkash' | 'nagad' | null>(null);
  const [rechargeAmount, setRechargeAmount] = useState<number>(5000);
  const [txnId, setTxnId] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [referralError, setReferralError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalCost = liters * DIESEL_PRICE_PER_LITER;

  const handleSelection = (choice: 'biodiesel' | 'glycerin') => {
    setMode(choice);
    if (choice === 'biodiesel') setStep('purpose');
    else setStep('ordering');
  };

  const handlePurpose = (p: BuyerPurpose) => {
    setPurpose(p);
    setStep('ordering');
  };

  const finalizeRecharge = () => {
    if (!txnId) return alert("Please enter Transaction ID");
    onUpdateUser({ ...user, balance: user.balance + rechargeAmount });
    setIsRechargeModalOpen(false);
    setRechargeStep('method');
    setSelectedGateway(null);
    setTxnId('');
  };

  const handlePurchaseAttempt = () => {
    if (user.balance < totalCost) {
      setIsInsufficientModalOpen(true);
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleReferralOrder = () => {
    const code = referralCode.toLowerCase().trim();
    if (VALID_REFERRAL_CODES.includes(code)) {
      finalizeOrder('referral');
    } else {
      setReferralError(true);
      setTimeout(() => setReferralError(false), 2000);
    }
  };

  const finalizeOrder = (method: 'wallet' | 'referral' = 'wallet') => {
    if (method === 'wallet') {
      onUpdateUser({ ...user, balance: user.balance - totalCost });
    }
    
    const newOrder: Order = {
      id: `GRN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString(),
      amountLiters: liters,
      totalPrice: totalCost,
      status: 'pending',
      type: 'purchase',
      paymentMethod: method === 'referral' ? `Cash (Ref: ${referralCode.toUpperCase()})` : 'Digital Wallet'
    };
    
    setOrders([newOrder, ...orders]);
    setIsConfirmModalOpen(false);
    setIsInsufficientModalOpen(false);
    setOrderSuccess(true);
    setReferralCode('');
    
    setTimeout(() => {
        setOrderSuccess(false);
        setStep('tracking');
    }, 1500);
  };

  const OrderStatusStepper = ({ status }: { status: string }) => {
    const steps = [
      { id: 'pending', label: 'Pending', icon: <PackageCheck className="h-4 w-4" /> },
      { id: 'refinery', label: 'Refinery', icon: <Zap className="h-4 w-4" /> },
      { id: 'logistics', label: 'In Transit', icon: <Truck className="h-4 w-4" /> },
      { id: 'completed', label: 'Completed', icon: <CheckCircle className="h-4 w-4" /> },
    ];
    
    return (
      <div className="flex items-center w-full max-w-sm gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className={`flex flex-col items-center flex-1 ${status === s.id ? 'text-green-600' : 'text-slate-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${status === s.id ? 'bg-green-50 border-green-600' : 'bg-slate-50 border-slate-100'}`}>
                {s.icon}
              </div>
              <span className="text-[7px] font-black uppercase tracking-widest">{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className="h-px bg-slate-100 flex-grow mb-5"></div>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (step === 'tracking') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 animate-in fade-in duration-500">
        <button onClick={() => setStep('ordering')} className="mb-12 flex items-center text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900">
          <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> Back to Supply Request
        </button>
        <div className="flex justify-between items-end mb-12">
            <div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Live Order Tracker</h1>
                <p className="text-slate-500 font-medium italic mt-2">Monitoring your industrial fuel allocation in real-time.</p>
            </div>
            <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center">
                <ShoppingBag className="mr-3 h-4 w-4 text-green-500" /> Total Supplies: {orders.length}
            </div>
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-slate-50 p-20 rounded-[4rem] text-center border border-slate-100">
             <History className="h-16 w-16 text-slate-300 mx-auto mb-6" />
             <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No supply records found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden group">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
                           <FuelIcon className="text-green-600 h-8 w-8" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Ref: {order.id}</p>
                           <h3 className="text-xl font-black text-slate-900">{order.amountLiters}L Biodiesel</h3>
                           <p className="text-xs font-bold text-slate-500">{order.paymentMethod} • {order.date}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <OrderStatusStepper status={order.status} />
                        <div className="text-right">
                            <p className="text-2xl font-black text-slate-900">{order.totalPrice.toLocaleString()} ৳</p>
                            <span className={`inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border mt-1 ${order.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                Status: {order.status === 'pending' ? 'Pending' : 'Completed'}
                            </span>
                        </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (step === 'selection') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-5xl font-black text-slate-900 mb-4 text-center tracking-tight leading-none">Order Greengine</h1>
        <p className="text-slate-500 text-center mb-16 font-medium text-lg italic">Select your circular resource for procurement.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <button onClick={() => handleSelection('biodiesel')} className="group bg-white p-12 rounded-[3.5rem] border-2 border-slate-100 hover:border-green-500 hover:shadow-2xl transition-all text-left relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-125 transition-transform duration-700 text-green-600">
               <FuelIcon size={240} />
            </div>
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-green-600/20 group-hover:rotate-6 transition-transform">
              <FuelIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Biodiesel</h3>
            <p className="text-slate-500 font-medium leading-relaxed italic">Powering engines with {DIESEL_PRICE_PER_LITER} BDT/Litre eco-fuel.</p>
            <div className="mt-8 flex items-center text-green-600 font-black uppercase tracking-widest text-xs">
              Configure Order <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </button>

          <button onClick={() => handleSelection('glycerin')} className="group bg-white p-12 rounded-[3.5rem] border-2 border-slate-100 hover:border-emerald-500 hover:shadow-2xl transition-all text-left relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-125 transition-transform duration-700 text-emerald-600">
               <FlaskConical size={240} />
            </div>
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-emerald-600/20 group-hover:rotate-6 transition-transform">
              <FlaskConical className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Glycerin</h3>
            <p className="text-slate-500 font-medium leading-relaxed italic">High-purity industrial byproduct for chemical manufacturing.</p>
            <div className="mt-8 flex items-center text-emerald-600 font-black uppercase tracking-widest text-xs">
              Inquiry Desk <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </button>
        </div>
        <div className="mt-12 text-center">
            <button onClick={() => setStep('tracking')} className="text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-green-600 transition-colors flex items-center justify-center mx-auto">
                <History className="mr-2 h-3 w-3" /> View My Orders
            </button>
        </div>
      </div>
    );
  }

  if (step === 'purpose') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24">
        <button onClick={() => setStep('selection')} className="mb-12 flex items-center text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900">
          <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> Change Resource
        </button>
        <h1 className="text-5xl font-black text-slate-900 mb-16 text-center tracking-tighter">Usage Allocation</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { id: 'garments', icon: <Building2 />, label: 'Garments' },
            { id: 'factories', icon: <Building2 />, label: 'Factories' },
            { id: 'petrol_pump', icon: <FuelIcon />, label: 'Petrol Pump' },
            { id: 'own', icon: <Car />, label: 'Personal' },
            { id: 'international', icon: <Globe />, label: 'Export' },
          ].map((item) => (
            <button key={item.id} onClick={() => handlePurpose(item.id as BuyerPurpose)} className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 hover:border-green-500 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">{item.icon}</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'glycerin') return <GlycerinInquiry />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Supply Portal</h1>
          <div className="flex gap-4 mt-2">
            <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest flex items-center">
              <ShieldAlert className="h-3 w-3 mr-2 text-green-500" /> Sector: {purpose?.replace('_', ' ')}
            </p>
            <button onClick={() => setStep('tracking')} className="text-slate-500 uppercase text-[10px] font-black tracking-widest flex items-center hover:text-green-600 transition-colors">
              <History className="h-3 w-3 mr-2" /> Live Tracker
            </button>
          </div>
        </div>
        <div className="flex items-center bg-white px-8 py-5 rounded-3xl border border-slate-100 shadow-xl">
          <Wallet className="h-6 w-6 text-green-600 mr-5" />
          <div>
            <div className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Account Balance</div>
            <div className="text-3xl font-black text-slate-900">{user.balance.toLocaleString()} ৳</div>
          </div>
          <button onClick={() => setIsRechargeModalOpen(true)} className="ml-8 p-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all shadow-lg"><Plus className="h-6 w-6" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
            <div className="bg-white rounded-[4rem] shadow-sm border border-slate-100 p-12">
               <div className="flex justify-between items-center mb-12">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center">
                    <Droplets className="h-6 w-6 text-green-600 mr-4" /> Order Volume
                  </h2>
               </div>
               
               <div className="mb-16">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Selected Liters</span>
                    <span className="text-5xl font-black text-green-600">{liters} <span className="text-xl font-medium text-slate-400">L</span></span>
                  </div>
                  <input type="range" min="100" max="10000" step="100" value={liters} onChange={(e) => setLiters(Number(e.target.value))} className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-green-600" />
               </div>
               
               <div className="p-10 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center mb-12 relative overflow-hidden group gap-8">
                  <div className="relative z-10">
                    <p className="text-[10px] text-green-400 font-black uppercase tracking-widest mb-2">Total Amount Due (@ {DIESEL_PRICE_PER_LITER} BDT)</p>
                    <p className="text-5xl font-black tracking-tight">{totalCost.toLocaleString()} ৳</p>
                  </div>
                  <Button size="lg" className="rounded-2xl h-16 px-12 shadow-2xl relative z-10 w-full md:w-auto font-black" onClick={handlePurchaseAttempt}>
                    Place Order <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
               </div>
               
               {orderSuccess && (
                 <div className="mt-8 p-8 bg-green-50 border border-green-200 rounded-[2rem] flex items-center animate-in slide-in-from-top-4">
                   <CheckCircle className="h-10 w-10 text-green-600 mr-6" />
                   <div>
                     <p className="font-black text-green-900 uppercase tracking-widest text-xs">Order Successfully Placed</p>
                     <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1">Redirecting to Tracker...</p>
                   </div>
                 </div>
               )}
            </div>
        </div>
        <div className="space-y-8">
           <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Supply Protocol</h3>
              <p className="text-sm text-slate-600 font-medium italic leading-relaxed">Dispatch from Gulshan depot is initiated within 12 hours of payment verification. Track progress in the 'Live Tracker' section.</p>
           </div>
        </div>
      </div>

      {/* Insufficient Money Modal */}
      {isInsufficientModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
           <div className="bg-white rounded-[3rem] w-full max-w-lg p-12 relative shadow-2xl border-4 border-red-500/20">
              <button onClick={() => setIsInsufficientModalOpen(false)} className="absolute top-10 right-10 text-slate-400 hover:text-slate-900"><X /></button>
              <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-8">
                 <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">Insufficient Money</h2>
              <p className="text-slate-500 font-medium italic mb-10 leading-relaxed">Your wallet balance is too low. Please deposit funds or enter a referral code to pay as cash.</p>
              
              <div className="space-y-6">
                 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center">
                       <Ticket className="h-3 w-3 mr-2 text-green-600" /> Pay as Cash (Authorized Refer Code)
                    </label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         value={referralCode}
                         onChange={(e) => {
                           setReferralCode(e.target.value);
                           setReferralError(false);
                         }}
                         placeholder="Enter Code (e.g. mahid)"
                         className={`flex-grow bg-white px-6 py-4 rounded-xl border-2 outline-none font-bold text-slate-900 uppercase tracking-widest transition-all ${referralError ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-green-600'}`}
                       />
                       <Button 
                         disabled={!referralCode}
                         onClick={handleReferralOrder}
                         className="h-14 px-8 rounded-xl font-black bg-green-600"
                       >
                         Place Order
                       </Button>
                    </div>
                    {referralError && <p className="text-[10px] font-black text-red-600 uppercase mt-3 text-center tracking-widest">Invalid Referral Access Code</p>}
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="h-px bg-slate-200 flex-grow"></div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">OR DEPOSIT NOW</span>
                    <div className="h-px bg-slate-200 flex-grow"></div>
                 </div>

                 <Button 
                   variant="secondary" 
                   className="w-full h-16 rounded-2xl font-black flex items-center justify-center bg-slate-900"
                   onClick={() => {
                     setIsInsufficientModalOpen(false);
                     setIsRechargeModalOpen(true);
                   }}
                 >
                   <Plus className="mr-3 h-5 w-5" /> Deposit Money Now
                 </Button>
              </div>
           </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
           <div className="bg-white rounded-[3rem] w-full max-w-lg p-12 relative shadow-2xl border border-slate-100">
              <button onClick={() => setIsConfirmModalOpen(false)} className="absolute top-10 right-10 text-slate-400 hover:text-slate-900"><X /></button>
              <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">Procurement Confirmation</h2>
              <div className="space-y-6 mb-10 bg-slate-50 p-8 rounded-3xl">
                 <div className="flex justify-between py-4 border-b border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-xs">Product</span>
                    <span className="text-slate-900 font-black">Greengine B100</span>
                 </div>
                 <div className="flex justify-between py-4 border-b border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-xs">Order Volume</span>
                    <span className="text-slate-900 font-black">{liters} Liters</span>
                 </div>
                 <div className="flex justify-between py-4 text-2xl pt-6">
                    <span className="text-slate-900 font-black uppercase tracking-tighter text-3xl">Payable</span>
                    <span className="text-green-600 font-black text-3xl">{totalCost.toLocaleString()} ৳</span>
                 </div>
              </div>
              <div className="flex gap-4">
                 <Button variant="outline" className="flex-1 h-16 rounded-2xl" onClick={() => setIsConfirmModalOpen(false)}>Cancel</Button>
                 <Button className="flex-[2] h-16 rounded-2xl font-black bg-green-600" onClick={() => finalizeOrder('wallet')}>Place Order</Button>
              </div>
           </div>
        </div>
      )}

      {/* Recharge Modal */}
      {isRechargeModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xl">
           <div className="bg-white rounded-[3rem] w-full max-w-md p-10 relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <button onClick={() => setIsRechargeModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X /></button>
              <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight text-center">Wallet Recharge</h2>
              {rechargeStep === 'method' ? (
                <div className="space-y-8">
                   <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => { setSelectedGateway('bkash'); setRechargeStep('payment'); }} className="p-6 bg-[#E2136E]/5 border-2 border-transparent hover:border-[#E2136E] rounded-3xl flex flex-col items-center group transition-all">
                         <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Bkash_logo.svg/1200px-Bkash_logo.svg.png" className="h-8 object-contain mb-4 grayscale group-hover:grayscale-0" alt="bKash" />
                         <span className="text-[10px] font-black text-[#E2136E] uppercase tracking-widest">bKash</span>
                      </button>
                      <button onClick={() => { setSelectedGateway('nagad'); setRechargeStep('payment'); }} className="p-6 bg-[#ED1C24]/5 border-2 border-transparent hover:border-[#ED1C24] rounded-3xl flex flex-col items-center group transition-all">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nagad_Logo.svg/1200px-Nagad_Logo.svg.png" className="h-8 object-contain mb-4 grayscale group-hover:grayscale-0" alt="Nagad" />
                         <span className="text-[10px] font-black text-[#ED1C24] uppercase tracking-widest">Nagad</span>
                      </button>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Amount to Add (৳)</label>
                      <input type="number" value={rechargeAmount} onChange={(e) => setRechargeAmount(Number(e.target.value))} className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 outline-none text-2xl font-black text-center" />
                   </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                   <div className={`p-8 rounded-[2rem] text-white ${selectedGateway === 'bkash' ? 'bg-[#E2136E]' : 'bg-[#ED1C24]'}`}>
                      <p className="text-[10px] font-black uppercase opacity-80 mb-1">Transfer to Merchant Account</p>
                      <p className="text-2xl font-black">01799624541</p>
                   </div>
                   <div>
                      <input type="text" required value={txnId} onChange={(e) => setTxnId(e.target.value)} className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 outline-none text-xl font-black text-center uppercase tracking-widest" placeholder="Transaction ID" />
                      <div className="flex gap-4 mt-8">
                         <Button variant="outline" className="flex-1 h-16 rounded-2xl" onClick={() => setRechargeStep('method')}>Back</Button>
                         <Button className="flex-[2] h-16 rounded-2xl font-black bg-slate-900" onClick={finalizeRecharge}>Submit Deposit</Button>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};