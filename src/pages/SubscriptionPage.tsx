import { 
  CreditCard, 
  Check, 
  Download, 
  ArrowUpRight, 
  Zap, 
  Minus, 
  Plus, 
  Calendar,
  Building2,
  Lock
} from "lucide-react";
import { useState } from "react";

export default function SubscriptionPage() {
  const [seats, setSeats] = useState(142);
  const costPerSeat = 9.0;
  const renewalDate = "Nov 01, 2026";
  
  const handleIncrease = () => {
    setSeats(prev => prev + 5);
  };

  const handleDecrease = () => {
    if (seats > 10) setSeats(prev => prev - 5);
  };

  const totalMonthlyCost = seats * costPerSeat;

  const pastInvoices = [
    { id: "INV-20412", date: "Oct 01, 2026", seats: 142, amount: 1278.0, status: "Paid" },
    { id: "INV-19945", date: "Sept 01, 2026", seats: 120, amount: 1080.0, status: "Paid" },
    { id: "INV-19256", date: "Aug 01, 2026", seats: 120, amount: 1080.0, status: "Paid" }
  ];

  return (
    <div className="space-y-6" id="subscription-management-view">
      
      {/* Page Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">SaaS Platform Subscription</h1>
        <p className="text-xs text-slate-500 font-light mt-1">Manage institutional license seats, active plan tiers, billing limits, and PDF invoice receipts.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Side (7 cells): Active Plan details & Seat Adjuster */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active collegiate banner */}
          <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-5 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 border border-blue-200 px-3 py-0.5 text-4xs font-bold text-blue-700 uppercase tracking-widest font-mono">
                  Active Tier
                </div>
                <h3 className="text-lg font-black text-slate-900">ScholarStack Pro Collegiate Plan</h3>
                <p className="text-xs text-slate-500 max-w-md">Provides complete access to custom modules, assignments creator databases, and instant mobile push campaigns.</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider block">COST PER SEAT</span>
                <span className="text-xl font-extrabold text-blue-700 block mt-0.5">${costPerSeat.toFixed(2)}<span className="text-3xs text-slate-400 font-medium font-mono"> / mo</span></span>
              </div>
            </div>
          </div>

          {/* Interactive seat slider multiplier */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <div className="border-b border-slate-50 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Configure Licensed Student Seats</h3>
              <p className="text-3xs text-slate-400 mt-0.5">Scale seat targets to reflect current educational enrollments</p>
            </div>

            <div className="flex items-center justify-between gap-5 bg-slate-50 p-4 rounded-xl border border-slate-150">
              <div className="space-y-1">
                <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider">Allocated Active Seats</span>
                <span className="text-2xl font-black text-slate-900 block font-mono">{seats} Student Seats</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleDecrease}
                  className="h-8 w-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer"
                  id="sub-decrease-seat-btn"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleIncrease}
                  className="h-8 w-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer"
                  id="sub-increase-seat-btn"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Total projection cost displaying */}
            <div className="flex items-center justify-between px-2 pt-2" id="billing-projection-display">
              <div className="text-xs">
                <span className="text-slate-500 font-medium font-sans">Projected Billing Rate</span>
                <p className="text-xxs font-mono text-slate-400 mt-0.5">{seats} seats x ${costPerSeat.toFixed(2)}</p>
              </div>

              <div className="text-right">
                <span className="text-lg font-extrabold text-slate-900">${totalMonthlyCost.toLocaleString()}<span className="text-3xs text-slate-400 font-normal"> / month</span></span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side (5 cells): Invoices history & Payment options */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Invoice transaction list */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-50 pb-3 leading-none">Invoice Transaction History</h3>

            <div className="divide-y divide-slate-100" id="invoices-list">
              {pastInvoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 font-medium">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block font-mono">{inv.id}</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">{inv.date} • {inv.seats} seats</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-slate-800">${inv.amount.toLocaleString()}</span>
                    <button 
                      onClick={() => alert(`Initiating direct PDF download for bill manifest ${inv.id}`)}
                      className="p-1 rounded hover:bg-slate-100 text-slate-450 hover:text-slate-700 transition cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
