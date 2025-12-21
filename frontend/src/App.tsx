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

const queryClient = new QueryClient();

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);
  const requireAuth = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      setIsModalOpen(true);
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation
            isAuthenticated={isAuthenticated}
            onOpenLogin={() => setIsModalOpen(true)}
            onLogout={() => {
              localStorage.removeItem("authToken");
              setIsAuthenticated(false);
            }}
            requireAuth={requireAuth}
          />

          <Routes>
            <Route path="/" element={<Index requireAuth={requireAuth} />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <LoginModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onLoginSuccess={() => {
              setIsAuthenticated(true);
              setIsModalOpen(false); // Close modal on success
            }}
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
