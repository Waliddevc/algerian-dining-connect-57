
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Truck, MapPin, Package, Clock, 
  Home, PhoneCall, User, Navigation, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { Badge } from "@/components/ui/badge";

const LivreurDashboard = () => {
  const [activeTab, setActiveTab] = useState("enAttente");

  // Mock data for deliveries in waiting
  const waitingDeliveries = [
    { 
      id: 501, 
      client: "Mohamed Benali", 
      address: "15 Rue Didouche Mourad, Alger", 
      phone: "0555123456", 
      status: "ready", 
      items: ["Couscous Royal (1)", "Makroud (3)"],
      total: 158.50,
      estimatedTime: "30-35 min",
      distance: "3.5 km"
    },
    { 
      id: 502, 
      client: "Amina Khelifi", 
      address: "7 Boulevard Krim Belkacem, Alger", 
      phone: "0550789123", 
      status: "preparing", 
      items: ["Tajine Poulet (2)", "Coca-Cola (2)"],
      total: 225.00,
      estimatedTime: "20-25 min",
      distance: "2.1 km"
    },
  ];

  // Mock data for deliveries in progress
  const inProgressDeliveries = [
    { 
      id: 503, 
      client: "Karim Hadj", 
      address: "23 Avenue Souidani Boudjemaa, Alger", 
      phone: "0555987654", 
      status: "in_progress", 
      items: ["Chakhchoukha (1)", "Chorba (2)", "Eau minérale (1)"],
      total: 192.75,
      startTime: "14:25",
      estimatedArrival: "14:45",
      distance: "1.8 km"
    },
  ];

  // Mock data for completed deliveries
  const completedDeliveries = [
    { 
      id: 504, 
      client: "Farid Messaoudi", 
      address: "5 Rue Ahmed Ouaked, Alger", 
      status: "completed", 
      total: 176.25,
      deliveredAt: "13:45",
      rating: 5
    },
    { 
      id: 505, 
      client: "Lila Benhamou", 
      address: "41 Boulevard Colonel Amirouche, Alger", 
      status: "completed", 
      total: 203.50,
      deliveredAt: "12:30",
      rating: 4
    },
  ];

  const handleDeliveryAction = (deliveryId: number, action: string) => {
    toast({
      title: `Livraison #${deliveryId}`,
      description: `Livraison ${action} avec succès`,
    });
  };

  const handleCall = (phone: string) => {
    toast({
      title: "Appel en cours",
      description: `Appel vers ${phone}`,
    });
  };

  const sidebarMenuItems = [
    { icon: <Package size={18} />, label: "Livraisons en attente" },
    { icon: <Truck size={18} />, label: "En cours" },
    { icon: <CheckCircle size={18} />, label: "Complétées" },
    { icon: <User size={18} />, label: "Profil" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <EmployeeSidebar 
          title="Restaurant Algérien" 
          role="Livreur"
          menuItems={sidebarMenuItems}
        />
        
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Top Bar - Mobile only */}
          <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
            <h2 className="font-bold text-primary">Restaurant Algérien</h2>
            <Button variant="ghost" size="icon">
              <Home size={20} />
            </Button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-primary">Livreur</h1>
                  <p className="text-gray-600">Gestion des livraisons</p>
                </div>
              </div>
              
              <Tabs defaultValue="enAttente" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="enAttente">En attente ({waitingDeliveries.length})</TabsTrigger>
                  <TabsTrigger value="enCours">En cours ({inProgressDeliveries.length})</TabsTrigger>
                  <TabsTrigger value="terminees">Terminées</TabsTrigger>
                </TabsList>
                
                <TabsContent value="enAttente" className="mt-6">
                  <div className="space-y-4">
                    {waitingDeliveries.map((delivery) => (
                      <motion.div
                        key={delivery.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-5 rounded-lg shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium text-lg">Livraison #{delivery.id}</h3>
                            <p className="text-gray-600">{delivery.client}</p>
                          </div>
                          <Badge 
                            className={delivery.status === "ready" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {delivery.status === "ready" ? "Prêt" : "En préparation"}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-5">
                          <div className="flex gap-2">
                            <MapPin size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-700">{delivery.address}</span>
                          </div>
                          <div className="flex gap-2">
                            <PhoneCall size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-blue-600 cursor-pointer" onClick={() => handleCall(delivery.phone)}>
                              {delivery.phone}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Clock size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-700">Temps estimé: {delivery.estimatedTime}</span>
                          </div>
                          <div className="flex gap-2">
                            <Truck size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-700">Distance: {delivery.distance}</span>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-3 mb-4">
                          <h4 className="text-sm font-medium mb-2">Détails de la commande:</h4>
                          <ul className="text-sm space-y-1 mb-2">
                            {delivery.items.map((item, index) => (
                              <li key={index} className="text-gray-700">{item}</li>
                            ))}
                          </ul>
                          <div className="font-medium">Total: {delivery.total.toFixed(2)} DA</div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button 
                            disabled={delivery.status !== "ready"}
                            onClick={() => handleDeliveryAction(delivery.id, "prise en charge")}
                          >
                            <Navigation size={16} className="mr-1" />
                            Prendre en charge
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="enCours" className="mt-6">
                  <div className="space-y-4">
                    {inProgressDeliveries.map((delivery) => (
                      <motion.div
                        key={delivery.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-5 rounded-lg shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium text-lg">Livraison #{delivery.id}</h3>
                            <p className="text-gray-600">{delivery.client}</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            En cours
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-5">
                          <div className="flex gap-2">
                            <MapPin size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-700">{delivery.address}</span>
                          </div>
                          <div className="flex gap-2">
                            <PhoneCall size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-blue-600 cursor-pointer" onClick={() => handleCall(delivery.phone)}>
                              {delivery.phone}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Clock size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-700">Départ: {delivery.startTime} • Arrivée prévue: {delivery.estimatedArrival}</span>
                          </div>
                          <div className="flex gap-2">
                            <Truck size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-700">Distance: {delivery.distance}</span>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-3 mb-4">
                          <h4 className="text-sm font-medium mb-2">Détails de la commande:</h4>
                          <ul className="text-sm space-y-1 mb-2">
                            {delivery.items.map((item, index) => (
                              <li key={index} className="text-gray-700">{item}</li>
                            ))}
                          </ul>
                          <div className="font-medium">Total: {delivery.total.toFixed(2)} DA</div>
                        </div>
                        
                        <div className="flex justify-between">
                          <Button 
                            variant="outline"
                            onClick={() => window.open(`https://maps.google.com/?q=${delivery.address}`, '_blank')}
                          >
                            <MapPin size={16} className="mr-1" />
                            Ouvrir GPS
                          </Button>
                          <Button 
                            onClick={() => handleDeliveryAction(delivery.id, "livrée")}
                          >
                            <CheckCircle size={16} className="mr-1" />
                            Livraison terminée
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="terminees" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livrée à</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Évaluation</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {completedDeliveries.map((delivery) => (
                          <tr key={delivery.id}>
                            <td className="px-6 py-4 whitespace-nowrap">#{delivery.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{delivery.client}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{delivery.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{delivery.total.toFixed(2)} DA</td>
                            <td className="px-6 py-4 whitespace-nowrap">{delivery.deliveredAt}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg 
                                    key={i}
                                    className={`w-4 h-4 ${i < delivery.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivreurDashboard;
