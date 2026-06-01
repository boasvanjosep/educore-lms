import { 
  Send, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Smartphone, 
  Check, 
  Sparkles,
  Info
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { initialCampaigns } from "../data";
import { NotificationCampaign } from "../types";

const campaignSchema = z.object({
  audience: z.string().min(1, "Please select a target audience"),
  title: z.string().min(4, "Push title must be at least 4 characters"),
  body: z.string().min(5, "Notification message body must be at least 5 characters")
});

type CampaignFormData = z.infer<typeof campaignSchema>;

export default function NotificationCenter() {
  const [campaigns, setCampaigns] = useState<NotificationCampaign[]>(initialCampaigns);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isPriority, setIsPriority] = useState(true);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      audience: "students",
      title: "",
      body: ""
    }
  });

  const onSubmit = (data: CampaignFormData) => {
    const newCamp: NotificationCampaign = {
      id: "camp-" + Date.now(),
      title: data.title,
      audience: data.audience,
      dispatchedAt: "Just now",
      priority: isPriority ? "high" : "normal",
      deliveryRate: 99.8,
      status: "dispatched"
    };

    setCampaigns([newCamp, ...campaigns]);
    setSentSuccess(true);
    reset();

    setTimeout(() => {
      setSentSuccess(false);
    }, 4500);
  };

  return (
    <div className="space-y-6" id="notification-center-view">
      
      {/* Page Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">Notification Management Center</h1>
        <p className="text-xs text-slate-500 font-light mt-1">Configure transactional mobile push workflows and draft instant campus-wide bulletins.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Hand: Campaign Author creator (7 cells) */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
              <Send className="h-4.5 w-4.5 text-blue-600 animate-pulse shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Draft New Push Notification Campaign</h3>
                <p className="text-3xs text-slate-400 mt-0.5">Author instant mobile & desktop alerts</p>
              </div>
            </div>

            {sentSuccess && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3 text-xs text-emerald-800 animate-in fade-in" id="camp-success-badge">
                <CheckCircle className="h-5.5 w-5.5 shrink-0 text-emerald-600" />
                <div>
                  <span className="font-bold">Campaign Transmitted!</span>
                  <p className="text-3xs text-emerald-700 mt-1">Broadcasting payload to campus cloud clusters. Real-time delivery logs indicate 99.8% verification.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="campaign-form">
              {/* Audience selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Target Audience</label>
                <div className="relative rounded-lg border border-slate-200 bg-white text-slate-500 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <select 
                    {...register("audience")}
                    className="w-full bg-white py-2.5 px-3.5 text-xs font-bold text-slate-800 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="All Students representing Campus">All Registered Students</option>
                    <option value="All active Faculty Teachers">All Certified Teachers</option>
                    <option value="All System Administrators">All Platform Administrators</option>
                    <option value="PHY-101 Students">PHY-101 Foundations of Physics</option>
                    <option value="MATH-401 Students">MATH-401 Multi-variable Calculus</option>
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-3 w-4 h-4 border-l-4 border-r-4 border-t-4 border-slate-400 border-l-transparent border-r-transparent"></div>
                </div>
                {errors.audience && <span className="text-[10px] text-rose-500 mt-1 block">{errors.audience.message}</span>}
              </div>

              {/* Title / Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Notification Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Formative Grade Freeze: Actions Due"
                  {...register("title")}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 ${errors.title ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                />
                {errors.title && <span className="text-[10px] text-rose-500 mt-1 block">{errors.title.message}</span>}
              </div>

              {/* Message Payload text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Alert message / markdown payload</label>
                <textarea 
                  rows={4} 
                  maxLength={180}
                  placeholder="Write clear notice text. Maximum 180 characters."
                  {...register("body")}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 ${errors.body ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                />
                {errors.body && <span className="text-[10px] text-rose-500 mt-1 block">{errors.body.message}</span>}
              </div>

              {/* High priority toggle */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Critical High-Priority Alert</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Trigger instant lockscreen vibrations</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsPriority(!isPriority)}
                  className={`relative inline-flex h-5.5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPriority ? 'bg-slate-900' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isPriority ? 'translate-x-3.5' : 'translate-x-0'}`}></span>
                </button>
              </div>

              <button 
                type="submit"
                className="w-full rounded-lg bg-[#091426] hover:bg-slate-800 text-white font-semibold text-xs py-2.5 shadow transition cursor-pointer text-center"
                id="deploy-broadcast-action"
              >
                Deploy Push Broadcast
              </button>
            </form>
          </div>
        </div>

        {/* Right Hand Campaign logs list (5 cells) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Pending & Dispatched Campaigns ({campaigns.length})</h3>
          
          <div className="space-y-4" id="campaigns-list">
            {campaigns.map((camp) => (
              <div 
                key={camp.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3.5 transition hover:shadow"
              >
                <div className="flex items-start justify-between border-b border-slate-50 pb-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{camp.title}</h4>
                    <span className="text-[9px] uppercase font-bold text-blue-600 font-mono mt-1 block bg-blue-50 px-1.5 py-0.5 rounded w-fit">AUDIENCE: {camp.audience}</span>
                  </div>
                  
                  <span className="rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.5 text-xxs font-bold uppercase tracking-wider shrink-0">
                    Dispatched
                  </span>
                </div>

                <div className="flex items-center justify-between text-3xs font-mono font-bold leading-none text-slate-500">
                  <div className="flex items-center gap-1">
                    <Smartphone className="h-3.5 w-3.5 text-slate-400" />
                    <span>{camp.deliveryRate}% Delivery Verified</span>
                  </div>
                  <span>{camp.dispatchedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
