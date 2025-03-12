
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import ClientLogin from "./pages/ClientLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import ClientDashboard from "./pages/ClientDashboard";
import ServeurChefDashboard from "./pages/ServeurChefDashboard";
import ServeurSalleDashboard from "./pages/ServeurSalleDashboard";
import CuisineDashboard from "./pages/CuisineDashboard";
import CaissierDashboard from "./pages/CaissierDashboard";
import LivreurDashboard from "./pages/LivreurDashboard";
import GerantDashboard from "./pages/GerantDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/client-login" element={<ClientLogin />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/serveur-chef-dashboard" element={<ServeurChefDashboard />} />
          <Route path="/serveur-salle-dashboard" element={<ServeurSalleDashboard />} />
          <Route path="/cuisine-dashboard" element={<CuisineDashboard />} />
          <Route path="/caissier-dashboard" element={<CaissierDashboard />} />
          <Route path="/livreur-dashboard" element={<LivreurDashboard />} />
          <Route path="/gerant-dashboard" element={<GerantDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
