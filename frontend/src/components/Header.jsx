import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Globe, Menu, X, ChevronDown } from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [lang, setLang] = useState("FR");
  const [showLang, setShowLang] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Language = useMemo(() => ["FR", "EN", "AR"], []);
  const navLinks = useMemo(() => ["Amlou", "Miel", "Argan", "About Us"], []);
  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${
        isScrolled 
        ? "bg-white/95 backdrop-blur-md border-black/5 py-3 shadow-sm" 
        : "bg-black/20 backdrop-blur-md border-white/10 py-3"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-12 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className={`text-xl md:text-2xl font-serif font-bold tracking-tight italic shrink-0 transition-colors duration-500 ${
            isScrolled ? "text-dark" : "text-cream"
          }`}>
            Agram<span className="text-gold not-italic ml-1">Souss</span>
          </Link>

          {/* desktop nav  */}
          <nav className="hidden md:flex gap-10">
            {navLinks.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-xs tracking-widest uppercase transition-all duration-500 ${
                  isScrolled ? "text-dark/60 hover:text-gold" : "text-cream/80 hover:text-gold"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* lang for desk */}
            <div className="relative hidden md:block">
              <button 
                onClick={() => setShowLang(!showLang)}
                className={`flex items-center gap-1 transition-colors duration-500 cursor-pointer text-xs font-bold ${
                  isScrolled ? "text-dark hover:text-gold" : "text-cream hover:text-gold"
                }`}
              >
                <Globe size={18} />
                {lang}
                <ChevronDown size={14} className={showLang ? 'rotate-180' : ''} />
              </button>
              {showLang && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-dark/95 border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                  {Language.map((l) => (
                    <button key={l} onClick={() => { setLang(l); setShowLang(false); }} className="w-full px-4 py-2 text-left text-xs hover:bg-gold hover:text-black text-cream">
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* shopping cart  */}
            <button className={`relative transition-colors duration-500 cursor-pointer p-1 ${
              isScrolled ? "text-dark hover:text-gold" : "text-cream hover:text-gold"
            }`}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* mobile menu  */}
            <button 
              className={`md:hidden cursor-pointer p-1 z-[110] transition-colors duration-500 ${
                isScrolled ? "text-dark" : "text-cream"
              }`} 
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
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-cream hover:text-gold text-3xl font-serif" onClick={() => setIsOpen(false)}>
              {item}
            </a>
          ))}
        </nav>

        {/* lang for  */}
        <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-8 w-40">
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-bold">Language</p>
          <div className="flex gap-6">
            {Language.map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setIsOpen(false); }}
                className={`text-lg cursor-pointer font-medium transition-all ${lang === l ? 'text-gold' : 'text-cream/40'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default Header;