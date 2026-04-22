import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { useRegister } from "../hooks/useAuth";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const formRef = useRef(null);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useGSAP(() => {
    gsap.fromTo(".reg-el", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
    
    gsap.fromTo(".reg-bg", 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 2, ease: "power2.out" }
    );
  }, { scope: containerRef });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    registerMutation.mutate(formData, {
      onError: (err) => {
        setError(err.response?.data?.message || "Registration failed");
        gsap.to(formRef.current, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.4,
          ease: "none",
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-28 pb-12 px-4 overflow-hidden">
      <div className="reg-bg absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1495107333309-f067588477d4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center brightness-[0.2] opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cream/5 to-cream/10" />

      <div className="w-full max-w-lg">
        <div className="bg-white/90 backdrop-blur-xl border border-gold/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="reg-el text-4xl font-serif italic text-brown mb-3">
              {t("auth.reg_title", "Start Your Journey")}
            </h1>
            <p className="reg-el text-muted font-light">
              {t("auth.reg_subtitle", "Join the Agram Souss essence collection")}
            </p>
          </div>

          {error && (
            <div className="reg-el mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="reg-el grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gold mb-2 pl-1">
                  {t("auth.full_name", "Full Name")}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-lg group-focus-within:text-gold transition-colors" size={18} />
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ahmed Souss"
                    className="w-full bg-cream/30 border border-gold/20 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gold mb-2 pl-1">
                  {t("auth.phone", "Phone Number")}
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-lg group-focus-within:text-gold transition-colors" size={18} />
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0612XXXXXX"
                    className="w-full bg-cream/30 border border-gold/20 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="reg-el group">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gold mb-2 pl-1">
                {t("auth.email", "Email Address")}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-lg group-focus-within:text-gold transition-colors" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ahmed@example.com"
                  className="w-full bg-cream/30 border border-gold/20 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all text-sm"
                />
              </div>
            </div>

            <div className="reg-el group">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gold mb-2 pl-1">
                {t("auth.password", "Password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-lg group-focus-within:text-gold transition-colors" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full bg-cream/30 border border-gold/20 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="reg-el w-full bg-brown text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-brown/95 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-8 shadow-lg shadow-brown/20"
            >
              {registerMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t("auth.register_btn", "Create My Account")}
                  <ArrowRight className="text-xl rtl:rotate-180" size={18} />
                </>
              )}
            </button>
          </form>

          <div className="reg-el mt-8 text-center border-t border-gold/5 pt-8">
            <p className="text-muted text-xs">
              {t("auth.have_account", "Already part of the essence collection?")}{" "}
              <Link to="/login" className="text-gold font-bold hover:underline">
                {t("auth.login_link", "Login here")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
