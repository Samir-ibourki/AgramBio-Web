import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import { ChevronLeft, ShoppingBag, ShieldCheck, Truck, RefreshCw, Minus, Plus } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { staticProducts } from "../data/products";
import { useSingleProduct } from "../hooks/useProducts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function ProductDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const getName = (name) => {
    if (typeof name === 'object') return name[lang] || name.fr || name.ar || "Product";
    return name;
  };

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
            <h2 className="text-3xl font-serif text-dark mb-4 lowercase italic">{t('product_detail.fetch_error')}</h2>
            <Link to="/shop" className="text-gold hover:underline">{t('product_detail.back_to_shop')}</Link>
        </div>
      </div>
    );
  }

  const product = apiResponse?.data;
  */

  const product = useMemo(() => {
    return staticProducts.find(p => String(p.id) === String(id));
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return staticProducts
      .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const { addToCart, setIsCartOpen } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      image: product.images && product.images[0] ? product.images[0] : "/placeholder.png"
    };
    for (let i = 0; i < quantity; i++) addToCart(cartProduct);
    setIsCartOpen(true);
  };

  useGSAP(() => {
    if (!product) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".product-image", { x: -60, opacity: 0, duration: 1 });
    tl.from(".info-item", { y: 30, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.5");

    gsap.from(".related-product-card", {
      scrollTrigger: { trigger: ".related-product-card", start: "top 90%" },
      y: 60, opacity: 0, stagger: 0.1, duration: 0.8
    });
  }, { scope: containerRef, dependencies: [product, relatedProducts] });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAFA]">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-dark mb-4">{t('product_detail.not_found')}</h2>
          <Link to="/shop" className="text-gold hover:underline">{t('product_detail.back_to_shop')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FCFAFA] pt-24 pb-24">
      
      <div className="max-w-7xl lg:max-w-[95vw] mx-auto px-6 mb-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-dark/40 hover:text-gold transition-colors group">
          <ChevronLeft size={16} /> {t('product_detail.back')}
        </Link>
      </div>

      <div className="max-w-7xl lg:max-w-[95vw] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <div className="lg:col-span-5 product-image group relative aspect-square bg-white rounded-[40px] overflow-hidden border border-black/5 shadow-sm max-w-xl mx-auto w-full">
          <img 
            src={product.images && product.images[0] ? product.images[0] : "/placeholder.png"} 
            alt={getName(product.name)}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>

        <div className="lg:col-span-7 product-info space-y-10">
          <div>
            <span className="info-item inline-block px-4 py-1.5 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
              {product.categorySlug?.replace(/-/g, ' ') || t('product_detail.organic_treasure')}
            </span>
            <h1 className="info-item text-4xl md:text-5xl lg:text-6xl font-serif text-dark leading-tight mb-4">
              {getName(product.name)}
            </h1>
            <div className="info-item flex items-center gap-4 text-2xl font-serif text-gold">
              <span>{product.price} MAD</span>
              {product.originalPrice && (
                <span className="text-dark/20 line-through text-lg">{product.originalPrice} MAD</span>
              )}
            </div>
          </div>

          <p className="info-item text-dark/60 leading-relaxed max-w-lg">
            {typeof product.description === 'object' 
              ? (product.description[lang] || product.description.fr || '')
              : (product.description || '')
            }
          </p>

          <div className="info-item grid grid-cols-1 sm:grid-cols-2 gap-6 py-10 border-y border-black/5">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/5 flex items-center justify-center rounded-full text-gold"><ShieldCheck size={20} /></div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-dark/40 line-clamp-1">{t('product_detail.pure_quality')}</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/5 flex items-center justify-center rounded-full text-gold"><Truck size={20} /></div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-dark/40 line-clamp-1">{t('product_detail.fast_delivery')}</span>
            </div>
          </div>

          <div className="info-item flex items-center gap-4 pt-4">
            <div className="flex items-center justify-between bg-white border border-black/5 rounded-2xl px-4 py-3 shadow-sm min-w-[120px]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 text-dark/40 hover:text-gold transition-colors"><Minus size={14} /></button>
              <span className="w-8 text-center font-bold text-dark text-sm">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-1 text-dark/40 hover:text-gold transition-colors"><Plus size={14} /></button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-3 bg-dark text-cream py-5 rounded-2xl hover:bg-gold hover:text-dark transition-all duration-300 font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95"
            >
              <ShoppingBag size={18} /> {t('product_detail.add_to_cart')}
            </button>
          </div>

          <div className="info-item flex items-center gap-3 text-dark/30">
            <RefreshCw size={14} />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{t('product_detail.satisfaction')}</span>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-32 border-t border-black/5 pt-24 pb-12">
          <div className="max-w-7xl lg:max-w-[95vw] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{t('product_detail.related_tag')}</span>
                <h2 className="text-4xl md:text-5xl font-serif text-dark lowercase italic">{t('product_detail.related_title')}</h2>
              </div>
              <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-dark/40 hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-1 w-fit">
                {t('product_detail.view_all')}
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-8">
              {relatedProducts.map((p) => (
                <div key={p.id} className="related-product-card">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
