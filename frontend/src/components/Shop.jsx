import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { staticProducts } from "../data/products";
import ProductCard from "./ProductCard";

function Shop() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /*
  const { data: apiResponse, isLoading, isError } = useProducts({
    search: searchTerm,
    category: selectedCategories.length > 0 ? selectedCategories[0] : null,
    maxPrice: priceRange
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500 font-serif lowercase italic">Error loading nature's boutique.</div>;
  }
  const products = apiResponse?.data || [];
  */

  const categories = useMemo(() => [
    { label: "Miel Naturel", slug: "miel-naturel" },
    { label: "Amlou", slug: "amlou" },
    { label: "Argan Oil", slug: "huiles-naturelles" },
    { label: "Promotions", slug: "promotions" },
  ], []);

  // Sync state with URL params on mount
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategories([catParam]);
    }
  }, [searchParams]);

  // Toggle category filter
  const toggleCategory = useCallback((slug) => {
    setSelectedCategories(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  }, []);

  // Filter products based on search, category and price
  const filteredProducts = useMemo(() => {
    return staticProducts.filter(product => {
      const matchesSearch = product.name.fr.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.categorySlug);
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategories, priceRange]);

  return (
    <div className="min-h-screen bg-[#FCFAFA] pb-24 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-lg">
            <h1 className="text-5xl font-serif text-dark mb-4">Our <span className="text-gold italic">Boutique</span></h1>
            <p className="text-dark/40 text-sm leading-relaxed">
              Explore our collection of pure Moroccan treasures, harvested with respect for nature.
            </p>
          </div>
          
          {/* search input */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20 group-focus-within:text-gold transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-black/5 rounded-2xl outline-none focus:border-gold/30 transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* sidebar*/}
          <aside className="w-full lg:w-64 space-y-10">
            
            {/* categories */}
            <div className="p-8 bg-white border border-black/5 rounded-3xl">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-dark mb-6">Categories</h3>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <input 
                            type="checkbox" 
                            checked={selectedCategories.includes(cat.slug)}
                            onChange={() => toggleCategory(cat.slug)}
                            className="peer hidden"
                        />
                        <div className="w-5 h-5 border-2 border-black/5 rounded-md peer-checked:bg-gold peer-checked:border-gold transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 text-white text-[10px]">✓</div>
                    </div>
                    <span className={`text-sm tracking-wide transition-colors ${selectedCategories.includes(cat.slug) ? 'text-dark font-bold' : 'text-dark/40 group-hover:text-dark'}`}>
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="p-8 bg-white border border-black/5 rounded-3xl">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-dark mb-6">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-gold h-1 bg-black/5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-4">
                <span className="text-[10px] text-dark/30 font-bold uppercase">0 MAD</span>
                <span className="text-sm text-gold font-bold">{priceRange} MAD</span>
              </div>
            </div>

            {/* Clear Button */}
            {(selectedCategories.length > 0 || searchTerm || priceRange < 1000) && (
              <button 
                onClick={() => { setSelectedCategories([]); setSearchTerm(""); setPriceRange(1000); }}
                className="w-full py-4 text-[10px] uppercase font-bold tracking-[0.2em] text-red-800/60 hover:text-red-800 transition-colors flex items-center justify-center gap-2"
              >
                <X size={14} /> Clear all filters
              </button>
            )}
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs text-dark/30 font-bold uppercase tracking-widest">
                Showing {filteredProducts.length} results
              </p>
              
              <div className="flex items-center gap-2 text-xs text-dark/40 font-bold uppercase tracking-widest">
                  Sort by: <span className="text-dark cursor-pointer flex items-center gap-1">Newest <ChevronDown size={14}/></span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white border border-black/5 rounded-[40px]">
                 <p className="font-serif italic text-xl text-dark/20">No products found matching your selection.</p>
              </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 lg:gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Shop;
