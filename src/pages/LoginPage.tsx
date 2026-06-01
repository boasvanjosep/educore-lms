import { 
  Building2, 
  Mail, 
  Lock, 
  GraduationCap, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mockInstitutions } from "../data";

const loginSchema = z.object({
  institution: z.string().min(1, "Please select your institution"),
  email: z.string().email("Enter a valid institutional email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginPageProps {
  onLoginSuccess: (email: string, institution: string) => void;
  onBackToLanding: () => void;
}

export default function LoginPage({ onLoginSuccess, onBackToLanding }: LoginPageProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      institution: "Global Academy",
      email: "alex.mercer@student.edu",
      password: "password123"
    }
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMsg(null);

    // Simulate verified sign-in with any inputs
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(data.email, data.institution);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-10 px-4 relative antialiased" id="login-container">
      {/* Floating Back to Public Web control */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
          id="login-back-btn"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to website
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center py-6">
        <div 
          className="w-full max-w-[430px] rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50"
          id="login-card"
        >
          {/* Institution Cap Logo */}
          <div className="text-center space-y-3 mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#091426] text-white">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <h2 className="font-sans text-2xl font-bold text-slate-900 tracking-tight leading-none">EduCore</h2>
              <span className="text-xxs font-bold text-slate-400 tracking-widest uppercase mt-1 block">Enterprise LMS Portal</span>
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 mb-5 flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="portal-login-form">
            
            {/* Institution select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Institution</label>
              <div className="relative rounded-lg border border-slate-200 bg-white text-slate-500 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <Building2 className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <select 
                  {...register("institution")}
                  className="w-full bg-white py-2.5 pl-9.5 pr-8 text-xs font-medium text-slate-800 focus:outline-none appearance-none cursor-pointer"
                >
                  {mockInstitutions.map((inst) => (
                    <option key={inst} value={inst}>{inst}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-l-4 border-r-4 border-t-4 border-slate-400 border-l-transparent border-r-transparent"></div>
              </div>
              {errors.institution && <span className="text-[10px] text-rose-500 mt-1 block">{errors.institution.message}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Institutional Email</label>
              <div className="relative rounded-lg border border-slate-200 bg-white text-slate-500 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="name@student.edu or @faculty.edu"
                  {...register("email")}
                  className="w-full bg-transparent py-2.5 pl-9.5 pr-4 text-xs font-medium text-slate-800 focus:outline-none placeholder-slate-400"
                />
              </div>
              {errors.email && <span className="text-[10px] text-rose-500 mt-1 block">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <button 
                  type="button" 
                  onClick={() => alert("Simulation detail: Forgot password flow starts. Verification email triggered.")}
                  className="text-xxs font-semibold text-blue-600 hover:text-blue-800"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative rounded-lg border border-slate-200 bg-white text-slate-500 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <Lock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full bg-transparent py-2.5 pl-9.5 pr-4 text-xs font-medium text-slate-800 focus:outline-none placeholder-slate-400"
                />
              </div>
              {errors.password && <span className="text-[10px] text-rose-500 mt-1 block">{errors.password.message}</span>}
            </div>

            {/* Hint Box */}
            <div className="rounded-lg bg-blue-50/75 border border-blue-100 p-2.5 text-xxs leading-relaxed text-blue-800">
              <span className="font-bold">Pro-tip:</span> Log in as <code className="bg-blue-100 px-1 rounded text-blue-900 font-mono">alex.mercer@student.edu</code> (student) or <code className="bg-blue-100 px-1 rounded text-blue-900 font-mono">s.jenkins@globalacademy.edu</code> (teacher) to trigger instant portal dashboards.
            </div>

            {/* Submit Action */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#091426] hover:bg-[#1a2e4a] text-white font-semibold text-xs py-2.5 shadow transition-colors block cursor-pointer disabled:opacity-50"
              id="login-secure-submit"
            >
              {isLoading ? "Verifying Credentials..." : "Secure Sign In"}
            </button>
          </form>

          {/* Social or continue with */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              or continue with
            </span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  onLoginSuccess("alex.mercer@student.edu", "Global Academy");
                }, 800);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <div className="h-4.5 w-4.5 shrink-0 bg-[#ea4335] text-white rounded-full flex items-center justify-center font-bold text-2xs">G</div>
              Google Workspace
            </button>
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  onLoginSuccess("s.jenkins@globalacademy.edu", "Global Academy");
                }, 800);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <div className="h-4.5 w-4.5 shrink-0 bg-[#0078d4] text-white rounded flex items-center justify-center font-bold text-3xs">M</div>
              Microsoft 365
            </button>
          </div>

        </div>
      </div>

      {/* Login Page Footer links */}
      <footer className="flex justify-center gap-4 text-xxs text-slate-400 font-medium pb-2 border-t border-slate-100/60 pt-4">
        <button onClick={() => alert("Help Center document load")} className="hover:text-slate-700 transition-colors">Help Center</button>
        <span>•</span>
        <button onClick={() => alert("Privacy policy page")} className="hover:text-slate-700 transition-colors">Privacy Policy</button>
        <span>•</span>
        <button onClick={() => alert("Terms of service page")} className="hover:text-slate-700 transition-colors">Terms of Service</button>
      </footer>
    </div>
  );
}
