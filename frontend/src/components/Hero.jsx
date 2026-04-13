import { ArrowRight } from "lucide-react";
import miel from '../assets/miel1.jpg'
function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full -z-10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full -z-10 blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* TEXT CONTENT */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="space-y-4">
            <span className="text-secondary font-medium tracking-widest uppercase text-sm block">100% Organic • Moroccan Traditional</span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] text-primary">
              Nature's Finest <br /> 
              <span className="italic">Treasures.</span>
            </h1>
            <p className="text-lg text-primary/70 max-w-lg leading-relaxed">
              Experience the pure essence of Morocco with our premium selection of cold-pressed oils, unfiltered honey, and authentic natural products. Handcrafted for your well-being.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-primary flex items-center gap-2 group cursor-pointer">
              Shop Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 font-medium text-primary hover:text-secondary transition-colors cursor-pointer underline underline-offset-8 decoration-secondary/30 hover:decoration-secondary">
              Our Story
            </button>
          </div>

          
        </div>

        {/* image area */}
        <div className="relative group perspective-1000">
           <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              
              <div className="aspect-[4/5] bg-primary/10 flex items-center justify-center overflow-hidden">
                <img 
                  src={miel} 
                  alt="Organic Argan Oil" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs uppercase tracking-widest font-bold text-secondary">Featured Product</p>
                <h3 className="text-xl font-serif">Extra Virgin Argan Oil</h3>
              </div>
           </div>
           
           {/* Abstract Gold Glow behind image */}
           <div className="absolute inset-0 bg-secondary/20 blur-3xl -z-10 rounded-full scale-75 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;