
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/AuthGuard";
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Initialize database tables
const initializeDatabase = async () => {
  try {
    // Create patient_notes table if it doesn't exist
    await supabase.functions.invoke('create-notes-table');
    console.log("Database initialization completed");
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

const App = () => {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <AuthGuard requireAuth={true}>
                    <Index />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <AuthGuard requireAuth={false}>
                    <Login />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <AuthGuard requireAuth={false}>
                    <Signup />
                  </AuthGuard>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
