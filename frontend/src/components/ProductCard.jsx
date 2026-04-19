import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCartStore();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    const cartProduct = {
      ...product,
      image: product.images && product.images[0] ? product.images[0] : "/placeholder.png"
    };
    addToCart(cartProduct);
    setIsCartOpen(true);
  };
  return (
    <div 
      className="group bg-[#FCFAFA] rounded-3xl overflow-hidden border border-black/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="block flex-1 group/link">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-white">
          <img 
            src={product.images && product.images[0] ? product.images[0] : "/placeholder.png"} 
            alt={product.name.fr}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover/link:scale-110"
          />
          
          {/* Badges */}
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
              Sale
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 text-center">
            <span className="text-gold text-[9px] font-bold uppercase tracking-widest mb-2 block">
                {product.categorySlug?.replace(/-/g, ' ') || "Organic"}
            </span>
          <h3 className="text-dark text-xl font-serif mb-3 line-clamp-1 group-hover/link:text-gold transition-colors">
            {product.name.fr}
          </h3>
          
          <div className="flex items-center justify-center gap-3">
            <span className="text-dark font-bold text-lg">{product.price} MAD</span>
            {product.originalPrice && (
              <span className="text-dark/30 line-through text-sm">{product.originalPrice} MAD</span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-6 pb-6 mt-auto">
        <button 
          onClick={handleAddToCart}
          className="w-full py-3 cursor-pointer bg-dark text-cream text-[10px] uppercase font-bold tracking-[0.2em] 
        rounded-xl transition-all duration-300 hover:bg-gold hover:text-dark shadow-md active:scale-95"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
