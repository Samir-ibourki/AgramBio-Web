import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { staticProducts } from "../data/products";
import ProductCard from "./ProductCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Products() {
  const containerRef = useRef(null);
  /*
  const { data: produits, isLoading, isError } = useProducts({ limit: 4 });

  if (isLoading) {
    return (
      <section className="py-20 bg-white flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-dark/40 font-serif italic text-sm">Discovering treasures...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 text-center text-red-500 font-serif lowercase italic">
        Failed to load featured products.
      </section>
    );
  }
  const products = produits?.data || [];
  */

  const products = useMemo(() => staticProducts.slice(0, 4), []);

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);

    // title 
    gsap.from(q('.title-anim'), {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: q('.title-anim'),
        start: "top 90%",
      }
    });

    // cards
    gsap.fromTo(q('.card'), 
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: q('.card'),
          start: "top 90%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="products" ref={containerRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="title-anim mb-12 flex flex-col items-center text-center">
          <span className="text-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-4">
            Pure & Natural
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-dark lowercase italic leading-tight mb-2">
            Selected <span className="text-gold not-italic font-bold tracking-tighter uppercase">Products</span>
          </h2>
          <div className="w-12 h-[2px] bg-gold/30 mt-4 mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* seeMore btn */}
        <div className="mt-16 flex justify-center">
          <Link 
            to="/shop" 
            className="group relative px-10 py-4 bg-dark text-cream rounded-full overflow-hidden transition-all duration-300 hover:pr-14 shadow-xl"
          >
            <span className="relative z-10 text-[10px] uppercase font-bold tracking-[0.2em]">See more products</span>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              →
            </div>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Products;
