import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Globe, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import CartDrawer from "./CartDrawer";

import { NAV_LINKS, LANGUAGES } from "../constants/navigation";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState("FR");
  const [showLang, setShowLang] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const totalItems = useCartStore((state) => state.getTotalItems());
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = !isHomePage || isScrolled
    ? "bg-white/95 backdrop-blur-md border-black/5 py-3 shadow-sm"
    : "bg-black/10 backdrop-blur-sm border-white/5 py-3";
  
  const textColor = !isHomePage || isScrolled ? "text-dark" : "text-cream";
  const textMutedColor = !isHomePage || isScrolled ? "text-dark/60" : "text-cream/80";

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${headerBg}`}>
        <div className="max-w-7xl lg:max-w-[95vw] mx-auto px-6 h-12 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className={`text-xl md:text-2xl font-serif font-bold tracking-tight italic shrink-0 transition-colors duration-500 ${textColor}`}>
            Agram<span className="text-gold not-italic ml-1">Souss</span>
          </Link>

          {/* desktop nav  */}
          <nav className="hidden lg:flex gap-8">
            {NAV_LINKS.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-xs tracking-widest uppercase transition-all duration-500 ${textMutedColor} hover:text-gold`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* lang for desk */}
            <div className="relative hidden lg:block">
              <button 
                onClick={() => setShowLang(!showLang)}
                className={`flex items-center gap-1 transition-colors duration-500 cursor-pointer text-xs font-bold ${textColor} hover:text-gold`}
              >
                <Globe size={18} />
                {lang}
                <ChevronDown size={14} className={showLang ? 'rotate-180' : ''} />
              </button>
              {showLang && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-dark/95 border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                  {LANGUAGES.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code.toUpperCase()); setShowLang(false); }} className="w-full px-4 py-2 text-left text-xs hover:bg-gold hover:text-black text-cream">
                      {l.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* shopping cart  */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative transition-colors duration-500 cursor-pointer p-1 ${textColor} hover:text-gold`}
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* mobile menu  */}
            <button 
              className={`lg:hidden cursor-pointer p-1 z-[110] transition-colors duration-500 ${textColor}`} 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu overlay */}
      <div className={`fixed inset-0 bg-[#0d0900] z-[90] flex flex-col items-center justify-center transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        
        {/* nav links */}
        <nav className="flex flex-col items-center gap-8 mb-12">
          {NAV_LINKS.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="text-cream hover:text-gold text-3xl font-serif" 
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* lang for  */}
        <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-8 w-40">
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-bold">Language</p>
          <div className="flex gap-6">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code.toUpperCase()); setIsOpen(false); }}
                className={`text-lg cursor-pointer font-medium transition-all ${lang === l.code.toUpperCase() ? 'text-gold' : 'text-cream/40'}`}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Header;