import { useEffect, useState } from 'react';
import gsap from 'gsap';

function Preloader({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(".preloader-logo", 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );

    tl.fromTo(".preloader-text", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    const timer = setTimeout(() => {
      setIsExiting(true);
      
      gsap.to(".preloader-content", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          gsap.to(".preloader-overlay", {
            opacity: 0,
            duration: 0.5,
            ease: "none",
            onComplete: onComplete 
          });
        }
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="preloader-overlay fixed inset-0 z-[1000] bg-dark flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full" />
      
      <div className="preloader-content flex flex-col items-center text-center">
        {/* Logo Graphic */}
        <div className="preloader-logo mb-10 relative">
          <div className="w-20 h-20 border border-gold/10 rounded-full flex items-center justify-center">
             <div className="w-16 h-16 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-3 h-3 bg-gold rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Text Area */}
        <div className="preloader-text space-y-4">
          <h2 className="text-cream text-2xl font-serif tracking-[0.2em] lowercase italic">
            nature's essence
          </h2>
          <div className="w-12 h-[1px] bg-gold/30 mx-auto" />
          <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase font-bold">
            AgramBio Selection
          </p>
          <div className="mt-8">
            <p className="text-cream/30 text-2xl font-serif dir-rtl">
              جارٍ التحميل...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
