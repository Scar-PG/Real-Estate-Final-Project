import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ValuationPage from "./pages/Valuation";
import InsightsPage from "./pages/Insights";
import CalculatorPage from "./pages/Calculator";
import ContactPage from "./pages/Contact";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import PredictPage from "./pages/Predict";
import FeaturesPage from "./pages/Features";

const queryClient = new QueryClient();

// Simple auth check using localStorage
const isAuthenticated = () => {
  try {
    const u = JSON.parse(localStorage.getItem("auth:user") || "null");
    return !!u && !!(u.email || u.name);
  } catch {
    return false;
  }
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  return isAuthenticated() ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

const App = () => {
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      return localStorage.getItem("splashSeen") !== "true";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!showSplash) return;
    const t = setTimeout(() => {
      setShowSplash(false);
      try { localStorage.setItem("splashSeen", "true"); } catch {}
    }, 2500);
    return () => clearTimeout(t);
  }, [showSplash]);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Luxury Splash Screen (first visit only) */}
      {showSplash && (
        <div id="luxury-splash" className="fixed inset-0 z-[100] flex items-center justify-center bg-black pointer-events-none animate-luxury-fade opacity-100">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl animate-pulse-slow"></div>
            
            {/* Main text with luxury animations */}
            <div className="relative text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-wider text-center">
              <div className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-x">
                LIVE IN
              </div>
              <div className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent animate-gradient-x animation-delay-200">
                LUXURY
              </div>
            </div>
            
            {/* Luxury particles */}
            <div className="absolute -top-10 -left-10 w-4 h-4 bg-secondary rounded-full animate-float opacity-60"></div>
            <div className="absolute -top-5 right-20 w-2 h-2 bg-primary rounded-full animate-float animation-delay-500 opacity-80"></div>
            <div className="absolute bottom-0 left-10 w-3 h-3 bg-secondary rounded-full animate-float animation-delay-1000 opacity-70"></div>
            <div className="absolute -bottom-5 -right-5 w-2 h-2 bg-primary rounded-full animate-float animation-delay-700 opacity-60"></div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes luxuryFadeOut { 
          0% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1.05); visibility: hidden; } 
        }
        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes floatLuxury {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(120deg); }
          66% { transform: translateY(-8px) rotate(240deg); }
        }
        
        .animate-luxury-fade { 
          animation: luxuryFadeOut 2.5s cubic-bezier(0.4, 0, 0.2, 1) 0s forwards; 
        }
        .animate-gradient-x { 
          background-size: 200% 200%;
          animation: gradientX 3s ease infinite; 
        }
        .animate-pulse-slow { 
          animation: pulseSlow 4s ease-in-out infinite; 
        }
        .animate-float { 
          animation: floatLuxury 6s ease-in-out infinite; 
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/valuation" element={<ValuationPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
