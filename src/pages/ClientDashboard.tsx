
import { motion } from "framer-motion";
import { 
  Book, Utensils, Receipt, QrCode, 
  Star, ShoppingBag, LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ClientDashboard = () => {
  const navigate = useNavigate();

  const menuOptions = [
    { 
      icon: <Utensils size={24} />, 
      title: "Commander en ligne", 
      description: "Accédez au menu et commandez à distance",
      action: () => toast({ title: "Fonctionnalité en développement", description: "La commande en ligne sera bientôt disponible" })
    },
    { 
      icon: <Book size={24} />, 
      title: "Réserver une table", 
      description: "Choisissez votre date et heure préférées",
      action: () => toast({ title: "Fonctionnalité en développement", description: "Les réservations seront bientôt disponibles" }) 
    },
    { 
      icon: <QrCode size={24} />, 
      title: "Scanner QR Code", 
      description: "Connectez-vous instantanément à votre table",
      action: () => toast({ title: "Fonctionnalité en développement", description: "La fonction de scanner sera bientôt disponible" })
    },
    { 
      icon: <Receipt size={24} />, 
      title: "Mes additions", 
      description: "Consultez vos factures et historique",
      action: () => toast({ title: "Fonctionnalité en développement", description: "L'historique des additions sera bientôt disponible" }) 
    },
    { 
      icon: <Star size={24} />, 
      title: "Recommandations", 
      description: "Découvrez nos suggestions personnalisées",
      action: () => toast({ title: "Fonctionnalité en développement", description: "Les recommandations seront bientôt disponibles" })
    },
    { 
      icon: <ShoppingBag size={24} />, 
      title: "Commandes actives", 
      description: "Suivez vos commandes en cours",
      action: () => toast({ title: "Fonctionnalité en développement", description: "Le suivi des commandes sera bientôt disponible" }) 
    },
  ];

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">Bienvenue, Client</h1>
              <p className="text-gray-600">Que souhaitez-vous faire aujourd'hui?</p>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Déconnexion
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              onClick={option.action}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6 flex flex-col items-center text-center cursor-pointer">
                <div className="p-3 rounded-full bg-accent/10 text-accent mb-4">
                  {option.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
