import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChevronLeft, ShoppingBag, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { staticProducts } from "../data/products";
import { useSingleProduct } from "../hooks/useProducts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function ProductDetails() {
  const { id } = useParams();

  /*
  const { data: apiResponse, isLoading, isError } = useSingleProduct(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAFA]">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAFA]">
        <div className="text-center">
            <h2 className="text-3xl font-serif text-dark mb-4 lowercase italic">couldn't fetch the treasure...</h2>
            <Link to="/shop" className="text-gold hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }
  const product = apiResponse?.data;
  */

  const product = staticProducts.find((p) => p.id === parseInt(id));
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".product-image", {
      x: -50,
      opacity: 0,
      duration: 1.2
    });

    tl.from(".product-info", {
      x: 50,
      opacity: 0,
      duration: 1.2
    }, "-=1");

    tl.from(".info-item", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
    }, "-=0.8");

  }, { scope: containerRef });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAFA]">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-dark mb-4">Product not found</h2>
          <Link to="/shop" className="text-gold hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FCFAFA] pb-24">
      {/* Navigation */}
      <div className="max-w-7xl lg:max-w-[95vw] mx-auto px-6 py-8">
        <Link to="/shop" className="flex items-center gap-2 text-dark/40 hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest">
          <ChevronLeft size={16} /> Back to boutique
        </Link>
      </div>

      <div className="max-w-7xl lg:max-w-[95vw] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* product images */}
        <div className="product-image group relative aspect-square bg-white rounded-[40px] overflow-hidden border border-black/5 shadow-sm">
          <img 
            src={product.images && product.images[0] ? product.images[0] : "/placeholder.png"} 
            alt={product.name.fr}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>

        {/* product info */}
        <div className="product-info space-y-10">
          <div>
            <span className="info-item inline-block px-4 py-1.5 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
              {product.categorySlug?.replace(/-/g, ' ') || "Organic treasure"}
            </span>
            <h1 className="info-item text-4xl md:text-5xl lg:text-6xl font-serif text-dark leading-tight mb-4">
              {product.name.fr}
            </h1>
            <div className="info-item flex items-center gap-4 text-2xl font-serif text-gold">
              <span>{product.price} MAD</span>
              {product.originalPrice && (
                <span className="text-dark/20 line-through text-lg">{product.originalPrice} MAD</span>
              )}
            </div>
          </div>

          <p className="info-item text-dark/60 leading-relaxed max-w-lg">
            Experience the purest essence of Morocco. Our {product.name.fr} is harvested with deep respect for nature, 
            ensuring the highest quality and authentic flavor profile. 100% organic, 100% natural.
          </p>

          {/* Features */}
          <div className="info-item grid grid-cols-1 sm:grid-cols-2 gap-6 py-10 border-y border-black/5">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/5 flex items-center justify-center rounded-full text-gold">
                    <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-dark/40 line-clamp-1">Pure quality</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/5 flex items-center justify-center rounded-full text-gold">
                    <Truck size={20} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-dark/40 line-clamp-1">Fast Delivery</span>
            </div>
          </div>

          {/* Actions */}
          <div className="info-item flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex-1 flex items-center justify-center gap-3 bg-dark text-cream py-5 rounded-2xl hover:bg-gold hover:text-dark transition-all duration-300 font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95">
              <ShoppingBag size={18} /> Add to cart
            </button>
            <button className="px-10 py-5 border border-dark/10 rounded-2xl text-dark text-xs font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
              Wishlist
            </button>
          </div>

          {/* Guarantee */}
          <div className="info-item flex items-center gap-3 text-dark/30">
            <RefreshCw size={14} />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Satisfaction Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
