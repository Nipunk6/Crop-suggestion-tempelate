import { useState, useEffect } from "react"; // Import hooks
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// IMPORT YOUR NEW MODAL
import LoginModal from "./components/LoginModal";
import Navigation from "./components/Navigation"; // Ensure Navigation is imported

const queryClient = new QueryClient();

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check login status on load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          
          {/* 1. Pass the login function to Navigation */}
          <Navigation 
            isAuthenticated={isAuthenticated} 
            onOpenLogin={() => setIsModalOpen(true)} 
            onLogout={() => {
               localStorage.removeItem('authToken');
               setIsAuthenticated(false);
            }}
          />

          <Routes>
            <Route path="/" element={<Index />} />
            {/* Add other routes here */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* 2. THE FLOATING WINDOW (Outside Routes so it floats over everything) */}
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