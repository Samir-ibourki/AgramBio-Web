import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimationProvider, useAnimation } from "./context/AnimationContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import About from "./components/About";

const Category = lazy(() => import("./components/Category"));
const Products = lazy(() => import("./components/Products"));
const Shop = lazy(() => import("./components/Shop"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Checkout = lazy(() => import("./components/Checkout"));
const Features = lazy(() => import("./components/Features"));
const Contact = lazy(() => import("./components/Contact"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./components/TermsOfService"));
const FAQ = lazy(() => import("./components/FAQ"));

const queryClient = new QueryClient();

const NavProgress = () => (
  <div className="fixed top-0 left-0 w-full h-[2px] z-[1100] bg-gold/20 overflow-hidden">
    <div className="h-full bg-gold animate-[loading_2s_ease-in-out_infinite] origin-left" />
  </div>
);

function AppContent() {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const { setIsReady } = useAnimation();

  const handlePreloaderComplete = () => {
    setIsPreloaderVisible(false);
    setIsReady(true);
  };

  return (
    <>
      {isPreloaderVisible && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      <ScrollToTop />
      <Header />
      <main>
        <Suspense fallback={<NavProgress />}>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Category />
                <Products />
                <Features />
              </>
            } />
            
            <Route path="/shop" element={
              <div className="pt-20">
                <Shop />
              </div>
            } />

            <Route path="/checkout" element={
              <Checkout />
            } />

            <Route path="/category/:slug" element={
              <div className="pt-20">
                <Products />
              </div>
            } />

            <Route path="/product/:id" element={
              <div className="pt-20">
                <ProductDetails />
              </div>
            } />

            <Route path="/contact" element={
              <div className="pt-20">
                <Contact />
              </div>
            } />

            <Route path="/about" element={
              <div className="pt-20">
                <About />
              </div>
            } />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimationProvider>
        <AppContent />
      </AnimationProvider>
    </QueryClientProvider>
  );
}

export default App;
