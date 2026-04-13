import { ShoppingCart, Search, User } from "lucide-react";

function Header() {
  return (
    <header className="glass fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* logo */}
        <div className="text-2xl font-serif font-bold tracking-tight text-primary italic">
          Agram<span className="text-secondary not-italic ml-1">Bio</span>
        </div>

        {/* navlinks */}
        <nav className="hidden md:flex gap-10">
          <a href="#amlou" className="nav-link">Amlou</a>
          <a href="#miel" className="nav-link">Miel</a>
          <a href="#argan" className="nav-link">Argan</a>
          <a href="#about" className="nav-link">About Us</a>
        </nav>

        {/* actions */}
        <div className="flex items-center gap-6">
          <button className="text-primary hover:text-secondary transition-colors duration-300 cursor-pointer">
            <Search size={20} />
          </button>
          <button className="text-primary hover:text-secondary transition-colors duration-300 cursor-pointer">
            <User size={20} />
          </button>
          <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 cursor-pointer group">
            <div className="relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;