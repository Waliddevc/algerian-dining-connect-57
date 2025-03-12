
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Home, Utensils } from "lucide-react";

const ClientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Erreur de connexion",
        description: "Veuillez saisir votre email et mot de passe.",
        variant: "destructive",
      });
      return;
    }

    // Show success message (replace with actual authentication logic)
    toast({
      title: "Connexion réussie!",
      description: "Bienvenue dans votre espace client.",
    });

    // Redirect to client dashboard
    setTimeout(() => {
      navigate("/client-dashboard");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6 relative">
      {/* Home Icon */}
      <Link to="/" className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all">
        <Home className="text-accent h-6 w-6" />
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <Utensils size={36} className="text-accent" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary">Espace Client</h1>
            <p className="text-gray-600 mt-2">
              Connectez-vous pour accéder à votre espace personnel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-xs text-accent hover:underline">
                  Mot de passe oublié?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent-dark">
              Se connecter
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte?{" "}
              <a href="/register" className="text-accent hover:underline">
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientLogin;
