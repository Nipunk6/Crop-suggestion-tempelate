import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";

import LoginModal from "./components/LoginModal";
import Navigation from "./components/Navigation";

import api from "@/api/axios"; // ✅ shared axios instance

const queryClient = new QueryClient();

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // ⭐ critical

  
 // Inside App.tsx

useEffect(() => {
  const restoreSession = async () => {
    try {
      // 1. DO NOT call refresh-access-token directly here.
      // 2. Instead, try to fetch the user.
      // If this returns 401, the Axios interceptor handles the refresh automatically.
      await api.get("/user/current-user"); 
      
      setIsAuthenticated(true);
    } catch (error) {
      // If we are here, it means the refresh failed (or user was never logged in)
      console.log("Session restore failed", error);
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  };

  restoreSession();
}, []);
  
  const requireAuth = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      setIsModalOpen(true);
    }
  };

  // ⛔ Prevent UI flicker before auth check
  if (!authChecked) {
    return null; // or loader/spinner if you want
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Navigation
            isAuthenticated={isAuthenticated}
            onOpenLogin={() => setIsModalOpen(true)}
            onLogout={async () => {
              try {
                await api.post("/user/logout");
              } finally {
                setIsAuthenticated(false);
              }
            }}
            requireAuth={requireAuth}
          />

          <Routes>
            <Route path="/" element={<Index requireAuth={requireAuth} />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <LoginModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onLoginSuccess={() => {
              setIsAuthenticated(true);
              setIsModalOpen(false);
            }}
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
