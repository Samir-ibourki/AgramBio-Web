import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { useLogin } from "../hooks/useAuth";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);
  const formRef = useRef(null);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useGSAP(() => {
    gsap.fromTo(".login-el", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
    
    gsap.fromTo(".login-bg", 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 2, ease: "power2.out" }
    );
  }, { scope: containerRef });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    loginMutation.mutate({ email, password }, {
      onError: (err) => {
        setError(err.response?.data?.message || "Login failed");
        gsap.to(formRef.current, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.4,
          ease: "none",
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      <div className="login-bg absolute inset-0 -z-10 brightness-[0.2] opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cream/5 to-cream/10" />

      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl border border-gold/10 p-8 md:p-12 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="login-el text-4xl font-serif italic text-brown mb-3">
              {t("auth.login_title", "Welcome Back")}
            </h1>
            <p className="login-el text-muted font-light">
              {t("auth.login_subtitle", "Continue your essence journey")}
            </p>
          </div>

          {error && (
            <div className="login-el mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="login-el group">
              <label className="block text-xs font-semibold uppercase tracking-widest text-gold mb-2 pl-1">
                {t("auth.email", "Email Address")}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-xl group-focus-within:text-gold transition-colors" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-cream/30 border border-gold/20 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all placeholder:text-muted/40"
                />
              </div>
            </div>

            <div className="login-el group">
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="block text-xs font-semibold uppercase tracking-widest text-gold">
                  {t("auth.password", "Password")}
                </label>
                <Link to="/forgot-password" size="sm" className="text-[10px] uppercase font-bold text-muted hover:text-gold transition-colors">
                  {t("auth.forgot", "Forgot?")}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-xl group-focus-within:text-gold transition-colors" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-cream/30 border border-gold/20 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all placeholder:text-muted/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="login-el w-full bg-brown text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-brown/95 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-8 shadow-lg shadow-brown/20"
            >
              {loginMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t("auth.login_btn", "Login to Boutique")}
                  <ArrowRight className="text-xl rtl:rotate-180" size={20} />
                </>
              )}
            </button>
          </form>

          <div className="login-el mt-10 text-center border-t border-gold/5 pt-8">
            <p className="text-muted text-sm pb-4">
              {t("auth.no_account", "Don't have an account yet?")}
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 border border-gold/30 rounded-xl text-gold font-semibold hover:bg-gold hover:text-white transition-all duration-300"
            >
              {t("auth.create_account", "Create Essence Account")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
