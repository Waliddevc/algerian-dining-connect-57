
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Package, CheckCircle, Clock, Star, User, Settings, LogOut, Home, ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Delivery } from "@/components/types/Delivery";
import ProfileDialog from "@/components/ProfileDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const LivreurDashboard = () => {
  const navigate = useNavigate();
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [deliveryDetailsOpen, setDeliveryDetailsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeDeliveries, setActiveDeliveries] = useState<Delivery[]>([
    {
      id: 1,
      client: "Ahmed Benaissa",
      address: "123 Rue Didouche Mourad, Alger",
      phone: "0555123456",
      status: "pending",
      total: 2500,
      items: ["Couscous x1", "Chorba x2", "Boisson x3"]
    },
    {
      id: 2,
      client: "Lila Kadri",
      address: "45 Boulevard Krim Belkacem, Alger",
      phone: "0661234567",
      status: "in-progress",
      total: 1800,
      items: ["Tajine x2", "Salade x1", "Eau x2"]
    }
  ]);

  const [completedDeliveries, setCompletedDeliveries] = useState<Delivery[]>([
    {
      id: 3,
      client: "Mohamed Rahmani",
      address: "78 Rue Larbi Ben M'hidi, Alger",
      phone: "0770123456",
      status: "completed",
      total: 3200,
      deliveredAt: "2023-06-10 19:45",
      rating: 5,
      items: ["Mechoui x1", "Salade x2", "Dessert x2"]
    },
    {
      id: 4,
      client: "Amina Benali",
      address: "12 Avenue Hassiba Ben Bouali, Alger",
      phone: "0550987654",
      status: "completed",
      total: 1500,
      deliveredAt: "2023-06-09 20:30",
      rating: 4,
      items: ["Pizzas x2", "Soda x2"]
    }
  ]);

  const handleDeliveryClick = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setDeliveryDetailsOpen(true);
  };

  const handleStatusChange = (deliveryId: number, newStatus: "in-progress" | "delivered") => {
    setActiveDeliveries(prevDeliveries => {
      const updatedDeliveries = prevDeliveries.map(delivery => {
        if (delivery.id === deliveryId) {
          return { ...delivery, status: newStatus };
        }
        return delivery;
      });
      
      if (newStatus === "delivered") {
        const deliveredItem = updatedDeliveries.find(d => d.id === deliveryId);
        if (deliveredItem) {
          const updatedItem: Delivery = {
            ...deliveredItem,
            status: "completed",
            deliveredAt: new Date().toLocaleString(),
            rating: 0
          };
          
          setCompletedDeliveries(prev => [updatedItem, ...prev]);
          
          toast({
            title: "Livraison terminée",
            description: `Commande #${deliveryId} livrée avec succès!`,
          });
          
          return updatedDeliveries.filter(d => d.id !== deliveryId);
        }
      } else {
        toast({
          title: "Statut mis à jour",
          description: `Commande #${deliveryId} est maintenant ${newStatus === "in-progress" ? "en cours de livraison" : "livrée"}`,
        });
      }
      
      return updatedDeliveries;
    });
    
    setDeliveryDetailsOpen(false);
  };

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!",
    });
    setTimeout(() => navigate("/"), 1500);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container py-12"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleGoBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleGoHome}>
              <Home className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Tableau de bord Livreur
              </h1>
              <p className="text-gray-600">
                Suivez et gérez vos livraisons
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
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

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Livraisons Actives</TabsTrigger>
            <TabsTrigger value="completed">Livraisons Complétées</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {activeDeliveries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeDeliveries.map((delivery) => (
                  <motion.div
                    key={delivery.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * delivery.id }}
                  >
                    <Card onClick={() => handleDeliveryClick(delivery)} className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          Commande #{delivery.id}
                          <Badge variant="secondary">{delivery.status}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>
                            <User size={14} className="mr-2 inline-block" />
                            {delivery.client}
                          </p>
                          <p>
                            <MapPin size={14} className="mr-2 inline-block" />
                            {delivery.address}
                          </p>
                          <p>
                            <Package size={14} className="mr-2 inline-block" />
                            {delivery.items.length} articles
                          </p>
                          <p className="font-medium">
                            Total: {delivery.total} DA
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-500">
                  Aucune livraison active pour le moment.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed">
            {completedDeliveries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedDeliveries.map((delivery) => (
                  <motion.div
                    key={delivery.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * delivery.id }}
                  >
                    <Card className="bg-green-50 border border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          Commande #{delivery.id}
                          <CheckCircle size={20} className="text-green-500" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>
                            <User size={14} className="mr-2 inline-block" />
                            {delivery.client}
                          </p>
                          <p>
                            <MapPin size={14} className="mr-2 inline-block" />
                            {delivery.address}
                          </p>
                          <p>
                            <Clock size={14} className="mr-2 inline-block" />
                            Livré le {delivery.deliveredAt}
                          </p>
                          <div className="flex items-center">
                            <Star size={14} className="mr-1 text-yellow-500" />
                            {delivery.rating}/5
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-500">
                  Aucune livraison complétée pour le moment.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={deliveryDetailsOpen} onOpenChange={setDeliveryDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de la livraison</DialogTitle>
              <DialogDescription>
                Informations complètes sur la livraison sélectionnée.
              </DialogDescription>
            </DialogHeader>
            {selectedDelivery && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations du client</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${selectedDelivery.client}`} />
                        <AvatarFallback>{selectedDelivery.client.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg font-semibold">{selectedDelivery.client}</p>
                        <p className="text-sm text-gray-500">{selectedDelivery.phone}</p>
                        <p className="text-sm text-gray-500">{selectedDelivery.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Détails de la commande</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {selectedDelivery.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <div className="mt-4 font-medium">
                      Total: {selectedDelivery.total} DA
                    </div>
                  </CardContent>
                </Card>

                {selectedDelivery.status !== "completed" ? (
                  <div className="flex justify-end space-x-2">
                    {selectedDelivery.status === "pending" && (
                      <Button variant="secondary" onClick={() => handleStatusChange(selectedDelivery.id, "in-progress")}>
                        Marquer comme "En cours"
                      </Button>
                    )}
                    {selectedDelivery.status === "in-progress" && (
                      <Button onClick={() => handleStatusChange(selectedDelivery.id, "delivered")}>
                        Marquer comme "Livré"
                      </Button>
                    )}
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Livraison Complétée</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Livré le {selectedDelivery.deliveredAt}
                      </p>
                      <div className="flex items-center mt-2">
                        <Star size={16} className="mr-1 text-yellow-500" />
                        {selectedDelivery.rating}/5
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setDeliveryDetailsOpen(false)}>
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ProfileDialog
          open={profileOpen}
          onOpenChange={setProfileOpen}
          initialData={{
            name: "Mourad Livreur",
            email: "mourad@restodz.com",
            phone: "0661234567"
          }}
          titles={{
            dialog: "Profil du Livreur",
            description: "Mettez à jour vos informations personnelles ici.",
            submitButton: "Enregistrer les modifications",
            successMessage: "Vos informations ont été mises à jour avec succès"
          }}
        />
      </motion.div>
    </div>
  );
};

export default LivreurDashboard;
