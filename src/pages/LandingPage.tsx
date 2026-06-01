import { 
  ArrowRight, 
  BookOpen, 
  BellRing, 
  ShieldCheck, 
  PieChart, 
  Smartphone, 
  CloudRain, 
  CheckCircle2, 
  Building2, 
  ArrowUpRight,
  Sparkles,
  Mail,
  Phone
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid institution email"),
  institutionName: z.string().min(2, "Institution name must be at least 2 characters"),
  question: z.string().min(5, "Please leave a brief description of your needs")
});

type ContactFormData = z.infer<typeof contactSchema>;

interface LandingPageProps {
  onEnterApp: () => void;
  onEnterLogin: () => void;
}

export default function LandingPage({ onEnterApp, onEnterLogin }: LandingPageProps) {
  const [submittedSales, setSubmittedSales] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      institutionName: "",
      question: ""
    }
  });

  const onSubmit = (data: ContactFormData) => {
    // Simulated submission Success
    setSubmittedSales(true);
    reset();
    setTimeout(() => {
      setSubmittedSales(false);
    }, 5000);
  };

  const featureCards = [
    {
      icon: BookOpen,
      title: "Assignment Management",
      desc: "A centralized hub for crafting, distributing, and evaluating coursework. Features automated plagiarism detection, rubric-based grading, and real-time student progress tracking.",
      link: "Explore Assignments →"
    },
    {
      icon: BellRing,
      title: "Automated Notifications",
      desc: "Smart alerts for upcoming deadlines, grade postings, and institutional announcements, ensuring no student falls behind in work execution.",
      link: "View Notification Mechanics"
    },
    {
      icon: ShieldCheck,
      title: "SaaS Cloud Architecture",
      desc: "Built on a highly available, secure cloud infrastructure. Experience 99.99% uptime, compliant regional databases, and seamless automatic updates.",
      link: "Read SLA Guarantees"
    },
    {
      icon: PieChart,
      title: "Institutional Analytics",
      desc: "Deep insights into student performance trends, faculty engagement ratios, and administrative resource utilization across the entire system.",
      link: "View Sample Reports"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] antialiased text-slate-800" id="landing-container">
      {/* Public Header */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary text-white font-black text-lg">
              E
            </div>
            <div>
              <span className="font-sans text-lg font-bold text-slate-900 tracking-tight block">EduCore</span>
              <span className="text-3xs text-blue-600 font-mono tracking-widest font-bold uppercase -mt-1 block">LMS Portal</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#mobile-app" className="hover:text-slate-900 transition-colors">Mobile App</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact Sales</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onEnterLogin}
              className="text-sm font-semibold text-slate-700 hover:text-slate-950 px-4 py-2 transition-colors"
              id="landing-signin-btn"
            >
              Sign In
            </button>
            <button 
              onClick={onEnterApp}
              className="flex items-center gap-2 rounded-lg bg-[#091426] hover:bg-[#1a2e4a] text-white px-4 py-2 text-sm font-semibold transition-all shadow hover:shadow-md"
              id="landing-sandbox-btn"
            >
              Test Sandbox Dashboard
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-20" id="landing-hero">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
              <Sparkles className="h-3 w-3 text-blue-600 animate-pulse" />
              <span>EduCore OS v2.4 Released</span>
            </div>
            <h1 className="font-sans text-4xl lg:text-5xl font-black text-[#091426] tracking-tight leading-tight">
              The Enterprise OS for Modern Education.
            </h1>
            <p className="text-slate-500 font-light text-base lg:text-lg leading-relaxed">
              Streamline administration, empower educators, and elevate student success with a unified digital platform built for institutional trust, compliance audits, and absolute operational clarity.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-2">
              <button
                onClick={onEnterLogin}
                className="rounded-lg bg-[#091426] hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3 transition-colors shadow-lg shadow-slate-900/10"
                id="hero-demo-btn"
              >
                Get a Demo
              </button>
              <a
                href="#features"
                className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm px-6 py-3 transition-colors inline-block"
              >
                View Documentation
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xl shadow-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?auto=format&fit=crop&w=1200&h=750&q=80" 
                alt="EduCore Platform Laptop View" 
                className="w-full rounded-xl object-cover ring-1 ring-slate-100"
                referrerPolicy="no-referrer"
              />
              {/* Floating notification UI */}
              <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xl max-w-xs transition-transform hover:scale-105">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Push Notification Sent</div>
                  <div className="text-3xs text-slate-500 mt-0.5">82.4% Delivery Verified globally</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-feature details Grid Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-6" id="features">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Platform Strengths</span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#091426] tracking-tight">
              Engineered for Academic Excellence
            </h2>
            <p className="text-slate-500 font-light text-sm lg:text-base leading-relaxed">
              Comprehensive security and communication tools designed to reduce heavy administrative overhead, facilitating maximum focus on course metrics and pure student learning outcomes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featureCards.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.title}
                  className="rounded-xl border border-slate-200/80 bg-white p-6 transition-all hover:shadow-lg hover:border-blue-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-base font-bold text-[#091426] mb-2">{feat.title}</h3>
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-4">{feat.desc}</p>
                  <button onClick={onEnterLogin} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    {feat.link}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile push notification section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24" id="mobile-app">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Mobile phone mockup illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-68 rounded-2.5xl border-[8px] border-slate-900 bg-slate-950 p-3 shadow-2xl relative overflow-hidden">
              <div className="bg-slate-950 text-white rounded-xl py-4 px-2 min-h-[420px] space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center px-1 mb-4">
                    <span className="text-4xs font-mono text-slate-400">10:42 AM</span>
                    <div className="h-3 w-16 bg-slate-900 rounded-full"></div>
                    <span className="text-4xs font-mono text-slate-500">EduCore App</span>
                  </div>
                  
                  {/* Lockscreen notification mock */}
                  <div className="bg-[#1a2235]/90 border border-slate-800/80 p-3 rounded-xl space-y-2 mt-4 shadow-lg backdrop-blur">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <span className="text-4xs font-bold text-blue-400 tracking-wider">UPCOMING DEADLINE</span>
                      <span className="text-5xs text-slate-400">Due in 2 days</span>
                    </div>
                    <div className="text-3xs font-bold">CS101 - Final Project</div>
                    <p className="text-5xs text-slate-300">Submit final PDF outline by Thurs 11:59PM CST.</p>
                  </div>

                  <div className="bg-[#1a2235]/90 border border-slate-800/80 p-3 rounded-xl space-y-1.5 mt-2 shadow-lg backdrop-blur">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <span className="text-4xs font-bold text-amber-400 tracking-wider">NEW POST</span>
                      <span className="text-5xs text-slate-400">History 202</span>
                    </div>
                    <div className="text-3xs font-bold text-slate-200">Re: Exam Syllabus Posted</div>
                  </div>
                </div>

                <div className="flex justify-center gap-1.5 pt-4 text-3xs border-t border-slate-900 text-slate-400">
                  <span>Home</span>
                  <span>•</span>
                  <span>Courses</span>
                  <span>•</span>
                  <span>Profile</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Mobile Ecosystem</span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#091426] tracking-tight">
              Learning, Unbound.
            </h2>
            <p className="text-slate-500 font-light text-sm lg:text-base leading-relaxed">
              Keep your students and faculty connected wherever they go. The EduCore mobile companion app provides seamless access to course materials, offline reading, secure exams verification, and instant push notification workflows.
            </p>

            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 mt-0.5">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
                <p className="text-slate-600 text-xs leading-loose">
                  <strong className="text-slate-900 font-semibold">Instant Alert API:</strong> Highly calibrated transactional workflows ensure 99.8% read notifications within critical target times.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 mt-0.5">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
                <p className="text-slate-600 text-xs leading-loose">
                  <strong className="text-slate-900 font-semibold">Offline Access Suite:</strong> Allows files to download locally, persisting assignments even on deficient connections.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 mt-0.5">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
                <p className="text-slate-600 text-xs leading-loose">
                  <strong className="text-slate-900 font-semibold">Active Grading:</strong> Lecturers can perform standard evaluation rubrics on tablet configurations.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={onEnterLogin} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 p-2 px-3 text-xs font-semibold text-slate-800 transition-colors">
                <span>App Store</span>
                <span className="text-4xs text-slate-400">iOS</span>
              </button>
              <button onClick={onEnterLogin} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 p-2 px-3 text-xs font-semibold text-slate-800 transition-colors">
                <span>Google Play</span>
                <span className="text-4xs text-slate-400">Android</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing For Institutions */}
      <section className="bg-slate-900 text-white py-16 px-6 border-t border-slate-950" id="pricing">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">Honest Costing</span>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Transparent Pricing for Institutions of All Sizes
            </h2>
            <p className="text-slate-400 font-light text-xs lg:text-sm">
              Scalable options customized specifically to your campus bandwidth needs. No hidden user tiers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Basic card */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold mb-1">Basic</h3>
                <p className="text-slate-400 text-xs mb-4">For small departments and specialized colleges.</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-black">$4</span>
                  <span className="text-slate-400 text-xs ml-1">/ student / mo</span>
                </div>
                <ul className="space-y-3 border-t border-slate-800 pt-5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Core Assignment Management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Standard Gradebook Logs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Email Ticket Support
                  </li>
                </ul>
              </div>
              <button onClick={onEnterLogin} className="mt-8 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs transition-colors">
                Start Trial
              </button>
            </div>

            {/* Pro Card (Recommended) */}
            <div className="rounded-xl border-2 border-blue-500 bg-slate-950 p-6 flex flex-col justify-between relative shadow-xl shadow-blue-500/5">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 text-xxs font-extrabold uppercase px-3 py-1 tracking-widest text-white">
                Most Popular
              </span>
              <div>
                <h3 className="text-base font-bold mb-1">Pro</h3>
                <p className="text-slate-400 text-xs mb-4">For growing colleges and mid-sized universities.</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-black">$9</span>
                  <span className="text-slate-400 text-xs ml-1">/ student / mo</span>
                </div>
                <ul className="space-y-3 border-t border-slate-800 pt-5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Everything in Basic pack
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Automated Plagiarism Checks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Advanced Analytics Dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Priority 24/7 Phone Support
                  </li>
                </ul>
              </div>
              <button onClick={onEnterLogin} className="mt-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors">
                Contact Sales
              </button>
            </div>

            {/* Enterprise Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold mb-1">Enterprise</h3>
                <p className="text-slate-400 text-xs mb-4">For large scale university networks and state districts.</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl font-black">Custom</span>
                  <span className="text-slate-400 text-xs ml-1">Volume Pricing</span>
                </div>
                <ul className="space-y-3 border-t border-slate-800 pt-5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Everything in Pro package
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Custom Integrations (SIS/API)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    Dedicated Account Success Rep
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    SLA Guarantees & Backups
                  </li>
                </ul>
              </div>
              <button onClick={onEnterLogin} className="mt-8 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs transition-colors">
                Request custom quotation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA sales inquiry Section with valid form */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24" id="contact">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden grid md:grid-cols-12">
          {/* CTA Info Sidebar banner */}
          <div className="md:col-span-5 bg-[#091426] text-white p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-sans text-xl font-bold tracking-tight mb-4">
                Let's talk about your campus.
              </h3>
              <p className="text-slate-300 font-light text-sm leading-relaxed mb-6">
                Fill out the form and our institutional Solutions Team will reach out within 24 hours to schedule a custom demonstration.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">enterprise@educore.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">+1 (800) 555-0199</span>
              </div>
            </div>
          </div>

          {/* Form area */}
          <div className="md:col-span-12 lg:col-span-7 bg-white p-8">
            {submittedSales ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-3 py-10" id="sales-banner-success">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
                <h4 className="text-lg font-bold text-slate-900">Request Received!</h4>
                <p className="text-slate-500 text-xs max-w-sm">
                  Our institutional sales desk has queued your details. One of our solutions architects will write to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="sales-inquiry-form">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">First name</label>
                    <input 
                      type="text" 
                      placeholder="Jane"
                      {...register("firstName")}
                      className={`w-full rounded-lg border px-3.5 py-2 text-xs focus:outline-none focus:ring-1 ${errors.firstName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                    />
                    {errors.firstName && <span className="text-[10px] text-rose-500 mt-1 block">{errors.firstName.message}</span>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Last name</label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      {...register("lastName")}
                      className={`w-full rounded-lg border px-3.5 py-2 text-xs focus:outline-none focus:ring-1 ${errors.lastName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                    />
                    {errors.lastName && <span className="text-[10px] text-rose-500 mt-1 block">{errors.lastName.message}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Institutional Email</label>
                  <input 
                    type="email" 
                    placeholder="jdoe@university.edu"
                    {...register("email")}
                    className={`w-full rounded-lg border px-3.5 py-2 text-xs focus:outline-none focus:ring-1 ${errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                  />
                  {errors.email && <span className="text-[10px] text-rose-500 mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Institution Name</label>
                  <input 
                    type="text" 
                    placeholder="State University"
                    {...register("institutionName")}
                    className={`w-full rounded-lg border px-3.5 py-2 text-xs focus:outline-none focus:ring-1 ${errors.institutionName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                  />
                  {errors.institutionName && <span className="text-[10px] text-rose-500 mt-1 block">{errors.institutionName.message}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">How can we help?</label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell us about your current LMS challenges..."
                    {...register("question")}
                    className={`w-full rounded-lg border px-3.5 py-2 text-xs focus:outline-none focus:ring-1 ${errors.question ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-500'}`}
                  />
                  {errors.question && <span className="text-[10px] text-rose-500 mt-1 block">{errors.question.message}</span>}
                </div>

                <button 
                  type="submit"
                  className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 transition-colors"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer view */}
      <footer className="bg-slate-50 border-t border-slate-200 py-10 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            © 2026 EduCore Enterprise LMS. Institutional Trust & Operational Clarity.
          </div>
          <div className="flex flex-wrap gap-5 font-medium">
            <a href="#features" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Accessibility</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
