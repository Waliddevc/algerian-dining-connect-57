
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, ArrowLeft, MoreVertical, UserCircle, 
  LogOut, LineChart, Users, DollarSign, Calendar, Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ProfileDialog from "@/components/ProfileDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GerantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <Home size={20} />
            </Button>
          </div>
          <h1 className="text-xl font-semibold text-primary">Espace Gérant</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600">Bienvenue sur votre espace de gestion du restaurant</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="staff">Personnel</TabsTrigger>
              <TabsTrigger value="finance">Finances</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Chiffre d'affaires</h3>
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">54,320 DA</p>
                    <p className="text-sm text-green-600 mt-1">+12% par rapport à la semaine dernière</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Commandes</h3>
                      <LineChart className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">187</p>
                    <p className="text-sm text-green-600 mt-1">+8% par rapport à la semaine dernière</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Employés actifs</h3>
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">14</p>
                    <p className="text-sm text-gray-500 mt-1">2 absents aujourd'hui</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Réservations</h3>
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-sm text-orange-500 mt-1">7 en attente de confirmation</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="staff">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Gestion du personnel</h2>
                  <p className="text-gray-500">Cette section est en développement...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="finance">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Rapports financiers</h2>
                  <p className="text-gray-500">Cette section est en développement...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Paramètres du restaurant</h2>
                  <div className="grid gap-4">
                    <Button variant="outline" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Configuration générale
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Gestion des accès
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <ProfileDialog 
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        initialData={{
          name: "Mohamed Gérant",
          email: "gerant@restaurant.dz",
          phone: "0555789012",
        }}
        titles={{
          dialog: "Profil Gérant",
          description: "Mettez à jour vos informations personnelles ici.",
          submitButton: "Enregistrer les modifications",
          successMessage: "Les informations de gérant ont été mises à jour avec succès"
        }}
      />
    </div>
  );
};

export default GerantDashboard;
