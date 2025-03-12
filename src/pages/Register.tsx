
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"client" | "employee">("client");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur de validation",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    toast({
      title: "Inscription réussie!",
      description: userType === "client" 
        ? "Votre compte client a été créé avec succès." 
        : `Votre compte employé (${formData.role}) a été créé et est en attente d'approbation.`,
    });

    // Redirect to appropriate page
    setTimeout(() => {
      navigate(userType === "client" ? "/client-login" : "/employee-login");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
            <h1 className="text-3xl font-bold text-primary">Inscription</h1>
            <p className="text-gray-600 mt-2">
              Créez votre compte pour accéder à notre système
            </p>
          </div>

          <RadioGroup
            defaultValue="client"
            className="flex justify-center space-x-6 mb-6"
            onValueChange={(value) => setUserType(value as "client" | "employee")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="client" id="client" />
              <Label htmlFor="client" className="font-medium">Client</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="employee" id="employee" />
              <Label htmlFor="employee" className="font-medium">Employé</Label>
            </div>
          </RadioGroup>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                name="name"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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

            {userType === "employee" && (
              <div className="space-y-2">
                <Label htmlFor="role">Poste</Label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, role: value})}
                >
                  <SelectTrigger>
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
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent-dark">
              S'inscrire
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà inscrit?{" "}
              <a 
                href={userType === "client" ? "/client-login" : "/employee-login"} 
                className="text-accent hover:underline"
              >
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
