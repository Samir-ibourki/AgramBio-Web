import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { useOrders } from "../hooks/useAuth";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  User as UserIcon, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  ChevronRight
} from "lucide-react";

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { user, logout, isAuthenticated } = useAuthStore();
  const { data: orderData, isLoading: ordersLoading } = useOrders();
  const orders = orderData?.data || [];

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  useGSAP(() => {
    gsap.from(".prof-el", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
    });
  }, { scope: containerRef, dependencies: [ordersLoading] });

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED": return "bg-green-100 text-green-700";
      case "SHIPPED": return "bg-blue-100 text-blue-700";
      case "PENDING": return "bg-amber-100 text-amber-700";
      case "CANCELLED": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FCFAFA] pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="prof-el flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-serif text-dark mb-4 italic">
              {t("profile.greeting", "Marhaba")}, <span className="text-gold not-italic">{user?.name}</span>
            </h1>
            <p className="text-dark/40 text-sm tracking-wider uppercase font-bold">
              {t("profile.subtitle", "Your Essence Collection Account")}
            </p>
          </div>
          <button 
            onClick={() => { logout(); navigate("/"); }}
            className="px-8 py-3 bg-red-50 text-red-600 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors"
          >
            {t("header.logout")}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="prof-el lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-dark/[0.03] border border-black/5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-8 flex items-center gap-2">
                <UserIcon className="text-lg" size={18} /> {t("profile.info_title", "Personal Essence")}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-cream/30 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gold shadow-sm">
                    <Mail className="text-lg" size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-dark/30 tracking-tighter">Email</p>
                    <p className="text-sm text-dark font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-cream/30 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gold shadow-sm">
                    <Phone className="text-lg" size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-dark/30 tracking-tighter">Phone</p>
                    <p className="text-sm text-dark font-medium">{user?.phone || t("profile.not_set", "Not set")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-cream/30 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gold shadow-sm">
                    <MapPin className="text-lg" size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-dark/30 tracking-tighter">Address</p>
                    <p className="text-sm text-dark font-medium line-clamp-2">
                      {user?.address || t("profile.not_set", "Not set")}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 py-4 border border-gold/20 text-gold rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:bg-gold hover:text-white transition-all duration-500">
                {t("profile.edit", "Edit Information")}
              </button>
            </div>
          </div>

          <div className="prof-el lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif text-dark mb-4 italic flex items-center gap-3">
                <ShoppingBag className="text-gold" size={24} /> {t("profile.history_title", "Order History")}
              </h2>
              <span className="text-[10px] font-black bg-gold/10 text-gold px-3 py-1 rounded-full">{orders.length}</span>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gold/20">
                <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="text-gold/40 text-3xl" size={32} />
                </div>
                <p className="text-dark/40 font-serif italic mb-8">{t("profile.no_orders", "You haven't added any treasures to your collection yet.")}</p>
                <button 
                  onClick={() => navigate("/shop")}
                  className="bg-dark text-cream px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gold hover:text-dark transition-all duration-500"
                >
                  {t("shop.all_products")}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-white rounded-3xl p-6 shadow-xl shadow-dark/[0.02] border border-black/5 hover:border-gold/30 transition-all cursor-pointer group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center text-brown shadow-sm group-hover:scale-110 transition-transform">
                        <Package />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-sm font-bold text-dark">{order.orderNumber}</h4>
                          <span className={`${getStatusColor(order.orderStatus)} text-[9px] font-black px-2 py-0.5 rounded-full tracking-tighter uppercase`}>
                            {order.orderStatus}
                          </span>
                        </div>
                        <p className="text-xs text-dark/40 flex items-center gap-1">
                          <Clock size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-12">
                      <div className="text-right">
                        <p className="text-[10px] text-dark/30 uppercase font-black tracking-widest mb-1">{t("cart.total")}</p>
                        <p className="text-lg font-serif italic font-bold text-dark">{order.totalAmount} MAD</p>
                      </div>
                      <div className="bg-cream/40 p-2 rounded-xl group-hover:bg-gold group-hover:text-white transition-all text-dark/30">
                        <ChevronRight className="text-xl rtl:rotate-180" size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Package = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

export default Profile;
