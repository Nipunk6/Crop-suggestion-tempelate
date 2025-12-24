import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Added Navigate

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";

import LoginModal from "./components/LoginModal";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";

import api from "@/api/axios";

const queryClient = new QueryClient();

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // 1. Add state to store user data
  const [user, setUser] = useState(null); 
  const [authChecked, setAuthChecked] = useState(false);

  // Helper function to fetch user data
  const fetchUser = async () => {
    try {
      const response = await api.get("/user/current-user");
      // Assuming your API returns { data: userObject } based on previous responses
      setUser(response.data.data); 
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Failed to fetch user", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        await fetchUser(); // Reuse the fetch logic
      } catch (error) {
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

  // 2. Define a shared logout function
  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      // Optional: Redirect to home after logout if needed
      // window.location.href = "/"; 
    }
  };

  if (!authChecked) {
    return null; // Or a loading spinner
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
            onLogout={handleLogout} // Pass the shared function
            requireAuth={requireAuth}
          />

          <Routes>
            <Route path="/" element={<Index requireAuth={requireAuth} />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />
            
            {/* 3. Pass the required props to ProfilePage */}
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? (
                  <ProfilePage user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" replace /> 
                )
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>

          <LoginModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onLoginSuccess={() => {
              setIsAuthenticated(true);
              setIsModalOpen(false);
              fetchUser(); // 4. Fetch user data immediately after login
            }}
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;