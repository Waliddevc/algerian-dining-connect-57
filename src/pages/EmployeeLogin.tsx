
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ChefHat } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EmployeeRole = "serveur-chef" | "serveur-salle" | "cuisinier" | "caissier" | "livreur" | "gerant";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "" as EmployeeRole | "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.role) {
      toast({
        title: "Erreur de connexion",
        description: "Veuillez remplir tous les champs requis.",
        variant: "destructive",
      });
      return;
    }

    // Use the directly selected role instead of parsing from email
    const role = formData.role as EmployeeRole;

    toast({
      title: "Connexion réussie!",
      description: "Bienvenue dans votre espace employé.",
    });

    // Redirect based on employee role
    setTimeout(() => {
      const roleRoutes: Record<EmployeeRole, string> = {
        "serveur-chef": "/serveur-chef-dashboard",
        "serveur-salle": "/serveur-salle-dashboard",
        "cuisinier": "/cuisine-dashboard",
        "caissier": "/caissier-dashboard",
        "livreur": "/livreur-dashboard",
        "gerant": "/gerant-dashboard"
      };
      navigate(roleRoutes[role]);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value as EmployeeRole,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ChefHat size={36} className="text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary">Espace Employé</h1>
            <p className="text-gray-600 mt-2">
              Connectez-vous pour accéder à votre espace de travail
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
              <Label htmlFor="role">Type d'emploi</Label>
              <Select 
                value={formData.role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez votre poste" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="serveur-chef">Serveur Chef</SelectItem>
                  <SelectItem value="serveur-salle">Serveur Salle</SelectItem>
                  <SelectItem value="cuisinier">Cuisinier</SelectItem>
                  <SelectItem value="caissier">Caissier</SelectItem>
                  <SelectItem value="livreur">Livreur</SelectItem>
                  <SelectItem value="gerant">Gérant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-xs text-primary hover:underline">
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

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Se connecter
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Nouveau employé?{" "}
              <a href="/register" className="text-primary hover:underline">
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeLogin;
