import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, ArrowLeft, MoreVertical, UserCircle, LogOut,
  ClipboardList, UsersRound, Bell, Coffee
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import ProfileDialog from "@/components/ProfileDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ServeurChefDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
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
          <h1 className="text-xl font-semibold text-primary">Serveur Chef</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <Home size={20} />
            </Button>
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
      </div>

      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Serveurs</h1>
            <p className="text-gray-600">Supervisez l'équipe et les commandes</p>
            <div className="mt-4">
              <Button 
                onClick={() => toast({ 
                  title: "Notification envoyée", 
                  description: "Tous les serveurs ont été notifiés" 
                })}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifier l'équipe
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="orders">Commandes</TabsTrigger>
              <TabsTrigger value="staff">Personnel</TabsTrigger>
              <TabsTrigger value="tables">Tables</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Commandes en cours</CardTitle>
                    <CardDescription>Les commandes actuellement en préparation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start p-3 bg-accent/5 rounded-md">
                        <div>
                          <p className="font-medium">Table 5 - Commande #123</p>
                          <p className="text-sm text-gray-500">2 personnes • 20:15</p>
                          <ul className="text-sm mt-1 list-disc list-inside">
                            <li>1× Couscous Royal</li>
                            <li>1× Tajine Poulet</li>
                          </ul>
                        </div>
                        <Badge>En préparation</Badge>
                      </div>
                      
                      <div className="flex justify-between items-start p-3 bg-accent/5 rounded-md">
                        <div>
                          <p className="font-medium">Table 8 - Commande #124</p>
                          <p className="text-sm text-gray-500">4 personnes • 20:30</p>
                          <ul className="text-sm mt-1 list-disc list-inside">
                            <li>2× Méchoui</li>
                            <li>2× Salade</li>
                          </ul>
                        </div>
                        <Badge>En préparation</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Voir toutes les commandes</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Commandes prêtes</CardTitle>
                    <CardDescription>Les commandes à servir</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start p-3 bg-green-50 rounded-md border border-green-100">
                        <div>
                          <p className="font-medium">Table 3 - Commande #121</p>
                          <p className="text-sm text-gray-500">3 personnes • 20:00</p>
                          <ul className="text-sm mt-1 list-disc list-inside">
                            <li>3× Chorba</li>
                          </ul>
                        </div>
                        <Badge className="bg-green-500">Prêt à servir</Badge>
                      </div>
                      
                      <div className="flex justify-between items-start p-3 bg-green-50 rounded-md border border-green-100">
                        <div>
                          <p className="font-medium">Table 1 - Commande #122</p>
                          <p className="text-sm text-gray-500">2 personnes • 20:05</p>
                          <ul className="text-sm mt-1 list-disc list-inside">
                            <li>2× Thé à la menthe</li>
                          </ul>
                        </div>
                        <Badge className="bg-green-500">Prêt à servir</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Assigner des serveurs</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="staff">
              <Card>
                <CardHeader>
                  <CardTitle>Équipe de service</CardTitle>
                  <CardDescription>Statut et assignation des serveurs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-md border">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Coffee size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Ahmed Salhi</p>
                          <p className="text-sm text-gray-500">Serveur Salle</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Actif</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white rounded-md border">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Coffee size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Mounir Lahmar</p>
                          <p className="text-sm text-gray-500">Serveur Salle</p>
                        </div>
                      </div>
                      <Badge className="bg-orange-500">En pause</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white rounded-md border">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Coffee size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Karim Benali</p>
                          <p className="text-sm text-gray-500">Serveur Salle</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Actif</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Gérer les rotations</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="tables">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((table) => (
                  <Card key={table}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>Table {table}</CardTitle>
                        <Badge className={table % 3 === 0 ? "bg-red-500" : table % 3 === 1 ? "bg-green-500" : "bg-gray-500"}>
                          {table % 3 === 0 ? "Occupée" : table % 3 === 1 ? "Libre" : "Réservée"}
                        </Badge>
                      </div>
                      <CardDescription>
                        {table % 3 === 0 ? "Depuis 19:45" : table % 3 === 1 ? "Disponible" : "Pour 21:00"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      {table % 3 === 0 && (
                        <>
                          <p>4 personnes</p>
                          <p>Serveur: Ahmed Salhi</p>
                          <p className="text-primary font-medium mt-1">1 commande en cours</p>
                        </>
                      )}
                      {table % 3 === 2 && (
                        <p>Réservation pour 2 personnes</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        {table % 3 === 0 ? "Voir détails" : table % 3 === 1 ? "Assigner serveur" : "Modifier réservation"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <ProfileDialog 
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        initialData={{
          name: "Nadir Serveur Chef",
          email: "nadir@restaurant.dz",
          phone: "0555123456",
        }}
        titles={{
          dialog: "Profil Serveur Chef",
          description: "Mettez à jour vos informations personnelles ici.",
          submitButton: "Enregistrer les modifications",
          successMessage: "Les informations de serveur chef ont été mises à jour avec succès"
        }}
      />
    </div>
  );
};

export default ServeurChefDashboard;
