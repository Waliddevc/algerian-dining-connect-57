
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Truck, MapPin, Package, Clock, 
  Home, PhoneCall, User, Navigation, CheckCircle,
  AlertTriangle, LocateFixed, History, ChevronRight, Star, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Define delivery types
type DeliveryStatus = "ready" | "preparing" | "in_progress" | "completed" | "issue";
type Delivery = {
  id: number;
  client: string;
  address: string;
  phone: string;
  status: DeliveryStatus;
  items: string[];
  total: number;
  estimatedTime?: string;
  distance?: string;
  startTime?: string;
  estimatedArrival?: string;
  deliveredAt?: string;
  rating?: number;
  issue?: string;
  notes?: string;
};

const LivreurDashboard = () => {
  const [activeTab, setActiveTab] = useState("enAttente");
  const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState<Delivery | null>(null);
  const [issue, setIssue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Mock data for deliveries in waiting
  const [waitingDeliveries, setWaitingDeliveries] = useState<Delivery[]>([
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
  ]);

  // Mock data for deliveries in progress
  const [inProgressDeliveries, setInProgressDeliveries] = useState<Delivery[]>([
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
  ]);

  // Mock data for completed deliveries
  const [completedDeliveries, setCompletedDeliveries] = useState<Delivery[]>([
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
  ]);

  // Delivery with issues
  const [issueDeliveries, setIssueDeliveries] = useState<Delivery[]>([
    {
      id: 506,
      client: "Youcef Benmira",
      address: "12 Rue des Frères Bouzid, Alger",
      phone: "0561234567",
      status: "issue",
      items: ["Mechoui (1)", "Salade (2)"],
      total: 245.75,
      distance: "4.2 km",
      issue: "Adresse introuvable"
    }
  ]);

  // Filtered deliveries based on search and filters
  const getFilteredDeliveries = (deliveries: Delivery[], query: string) => {
    return deliveries.filter(delivery => 
      delivery.client.toLowerCase().includes(query.toLowerCase()) ||
      delivery.address.toLowerCase().includes(query.toLowerCase()) ||
      delivery.id.toString().includes(query)
    );
  };

  // Handle taking a delivery
  const handleTakeDelivery = (delivery: Delivery) => {
    // Remove from waiting and add to in progress
    setWaitingDeliveries(prev => prev.filter(d => d.id !== delivery.id));
    
    const now = new Date();
    const startTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Calculate estimated arrival time (15-20 min later)
    let arrivalMinutes = now.getMinutes() + Math.floor(Math.random() * 5) + 15;
    let arrivalHours = now.getHours();
    if (arrivalMinutes >= 60) {
      arrivalHours += 1;
      arrivalMinutes -= 60;
    }
    const estimatedArrival = `${arrivalHours}:${arrivalMinutes.toString().padStart(2, '0')}`;
    
    const updatedDelivery = {
      ...delivery,
      status: "in_progress" as DeliveryStatus,
      startTime,
      estimatedArrival
    };
    
    setInProgressDeliveries(prev => [...prev, updatedDelivery]);
    
    toast({
      title: `Livraison #${delivery.id}`,
      description: `Livraison prise en charge. Bonne route!`,
    });
  };

  // Handle completing a delivery
  const handleCompleteDelivery = (delivery: Delivery) => {
    // Remove from in progress and add to completed
    setInProgressDeliveries(prev => prev.filter(d => d.id !== delivery.id));
    
    const now = new Date();
    const deliveredAt = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const updatedDelivery = {
      ...delivery,
      status: "completed" as DeliveryStatus,
      deliveredAt,
      rating: Math.floor(Math.random() * 2) + 4 // Random rating between 4-5
    };
    
    setCompletedDeliveries(prev => [...prev, updatedDelivery]);
    
    toast({
      title: `Livraison #${delivery.id}`,
      description: `Livraison complétée avec succès!`,
    });
  };

  // Handle reporting an issue with delivery
  const handleReportIssue = (delivery: Delivery) => {
    setCurrentDelivery(delivery);
    setDeliveryDialogOpen(true);
  };

  // Submit issue report
  const submitIssueReport = () => {
    if (!currentDelivery || !issue) return;
    
    // Remove from in progress
    setInProgressDeliveries(prev => prev.filter(d => d.id !== currentDelivery.id));
    
    const updatedDelivery = {
      ...currentDelivery,
      status: "issue" as DeliveryStatus,
      issue
    };
    
    setIssueDeliveries(prev => [...prev, updatedDelivery]);
    setDeliveryDialogOpen(false);
    setIssue("");
    
    toast({
      title: `Problème signalé`,
      description: `Le problème a été signalé au restaurant.`,
    });
  };

  // Handle returning a delivery with issues back to waiting list
  const handleRetryDelivery = (delivery: Delivery) => {
    // Remove from issues
    setIssueDeliveries(prev => prev.filter(d => d.id !== delivery.id));
    
    const updatedDelivery = {
      ...delivery,
      status: "ready" as DeliveryStatus,
      issue: undefined
    };
    
    setWaitingDeliveries(prev => [...prev, updatedDelivery]);
    
    toast({
      title: `Livraison #${delivery.id}`,
      description: `Livraison remise en attente.`,
    });
  };

  // Mock location tracking
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  
  const updateCurrentLocation = () => {
    const locations = [
      "Alger Centre",
      "Bab Ezzouar",
      "Hydra",
      "Kouba",
      "El Biar"
    ];
    setCurrentLocation(locations[Math.floor(Math.random() * locations.length)]);
    
    toast({
      title: "Localisation mise à jour",
      description: `Vous êtes actuellement à ${locations[Math.floor(Math.random() * locations.length)]}`
    });
  };

  // Period status updates for in-progress deliveries
  useEffect(() => {
    const interval = setInterval(() => {
      if (inProgressDeliveries.length > 0) {
        const messages = [
          "Encore 5 minutes estimées",
          "Trafic léger sur la route",
          "Vous approchez de la destination",
          "Tournez à droite au prochain carrefour"
        ];
        
        if (Math.random() > 0.7) {
          toast({
            title: `Mise à jour livraison #${inProgressDeliveries[0].id}`,
            description: messages[Math.floor(Math.random() * messages.length)]
          });
        }
      }
    }, 45000); // Every 45 seconds
    
    return () => clearInterval(interval);
  }, [inProgressDeliveries]);

  const sidebarMenuItems = [
    { icon: <Package size={18} />, label: "Livraisons en attente", onClick: () => setActiveTab("enAttente") },
    { icon: <Truck size={18} />, label: "En cours", onClick: () => setActiveTab("enCours") },
    { icon: <AlertTriangle size={18} />, label: `Problèmes (${issueDeliveries.length})`, onClick: () => setActiveTab("problemes") },
    { icon: <CheckCircle size={18} />, label: "Complétées", onClick: () => setActiveTab("terminees") },
    { icon: <User size={18} />, label: "Profil" },
  ];

  // Count all pending and in-progress deliveries for stats
  const activeDeliveries = waitingDeliveries.length + inProgressDeliveries.length;
  const totalEarningsToday = completedDeliveries.reduce((sum, delivery) => sum + delivery.total * 0.1, 0);

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
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={updateCurrentLocation}>
                    <LocateFixed size={16} className="mr-1" />
                    {currentLocation ? currentLocation : "Localiser"}
                  </Button>
                  <Badge className="bg-blue-100 text-blue-800 flex items-center">
                    <Clock size={14} className="mr-1" />
                    Livraisons actives: {activeDeliveries}
                  </Badge>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Livraisons aujourd'hui</p>
                      <h3 className="text-2xl font-bold">{completedDeliveries.length}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Distance parcourue</p>
                      <h3 className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 10} km</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Navigation size={20} className="text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Gains aujourd'hui</p>
                      <h3 className="text-2xl font-bold">{totalEarningsToday.toFixed(0)} DA</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <History size={20} className="text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Search field */}
              <div className="mb-4">
                <Input
                  placeholder="Rechercher par client, adresse ou numéro de livraison..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Tabs defaultValue="enAttente" className="mb-6" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="enAttente">En attente ({waitingDeliveries.length})</TabsTrigger>
                  <TabsTrigger value="enCours">En cours ({inProgressDeliveries.length})</TabsTrigger>
                  <TabsTrigger value="problemes">Problèmes ({issueDeliveries.length})</TabsTrigger>
                  <TabsTrigger value="terminees">Terminées</TabsTrigger>
                </TabsList>
                
                <TabsContent value="enAttente" className="mt-6">
                  <div className="space-y-4">
                    {getFilteredDeliveries(waitingDeliveries, searchQuery).map((delivery) => (
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
                            <span className="text-blue-600 cursor-pointer" onClick={() => toast({
                              title: "Appel en cours",
                              description: `Appel vers ${delivery.phone}`
                            })}>
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
                            onClick={() => handleTakeDelivery(delivery)}
                          >
                            <Navigation size={16} className="mr-1" />
                            Prendre en charge
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                    
                    {getFilteredDeliveries(waitingDeliveries, searchQuery).length === 0 && (
                      <div className="text-center py-8">
                        <Package size={40} className="mx-auto text-gray-300 mb-2" />
                        <h3 className="text-lg font-medium text-gray-500">Aucune livraison en attente</h3>
                        <p className="text-gray-400">Les nouvelles livraisons apparaîtront ici</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="enCours" className="mt-6">
                  <div className="space-y-4">
                    {getFilteredDeliveries(inProgressDeliveries, searchQuery).map((delivery) => (
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
                            <span className="text-blue-600 cursor-pointer" onClick={() => toast({
                              title: "Appel en cours",
                              description: `Appel vers ${delivery.phone}`
                            })}>
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
                          <div className="space-x-2">
                            <Button 
                              variant="outline"
                              onClick={() => window.open(`https://maps.google.com/?q=${delivery.address}`, '_blank')}
                            >
                              <MapPin size={16} className="mr-1" />
                              Ouvrir GPS
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => handleReportIssue(delivery)}
                            >
                              <AlertTriangle size={16} className="mr-1" />
                              Signaler problème
                            </Button>
                          </div>
                          <Button 
                            onClick={() => handleCompleteDelivery(delivery)}
                          >
                            <CheckCircle size={16} className="mr-1" />
                            Livraison terminée
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                    
                    {getFilteredDeliveries(inProgressDeliveries, searchQuery).length === 0 && (
                      <div className="text-center py-8">
                        <Truck size={40} className="mx-auto text-gray-300 mb-2" />
                        <h3 className="text-lg font-medium text-gray-500">Aucune livraison en cours</h3>
                        <p className="text-gray-400">Les livraisons prises en charge apparaîtront ici</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="problemes" className="mt-6">
                  <div className="space-y-4">
                    {getFilteredDeliveries(issueDeliveries, searchQuery).map((delivery) => (
                      <motion.div
                        key={delivery.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-5 rounded-lg shadow border-l-4 border-red-500"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium text-lg">Livraison #{delivery.id}</h3>
                            <p className="text-gray-600">{delivery.client}</p>
                          </div>
                          <Badge className="bg-red-100 text-red-800">
                            Problème
                          </Badge>
                        </div>
                        
                        <div className="bg-red-50 p-3 rounded-md mb-4">
                          <div className="flex gap-2">
                            <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
                            <span className="text-red-700 font-medium">{delivery.issue}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-5">
                          <div className="flex gap-2">
                            <MapPin size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-700">{delivery.address}</span>
                          </div>
                          <div className="flex gap-2">
                            <PhoneCall size={18} className="text-gray-500 flex-shrink-0" />
                            <span className="text-blue-600 cursor-pointer" onClick={() => toast({
                              title: "Appel en cours",
                              description: `Appel vers ${delivery.phone}`
                            })}>
                              {delivery.phone}
                            </span>
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
                            Vérifier adresse
                          </Button>
                          <Button 
                            onClick={() => handleRetryDelivery(delivery)}
                          >
                            <Truck size={16} className="mr-1" />
                            Réessayer la livraison
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                    
                    {getFilteredDeliveries(issueDeliveries, searchQuery).length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle size={40} className="mx-auto text-green-300 mb-2" />
                        <h3 className="text-lg font-medium text-gray-500">Aucun problème de livraison</h3>
                        <p className="text-gray-400">Les livraisons avec des problèmes apparaîtront ici</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="terminees" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-medium">Historique des livraisons</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Filter size={14} className="mr-1" />
                          Filtrer
                        </Button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livrée à</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Évaluation</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {getFilteredDeliveries(completedDeliveries, searchQuery).map((delivery) => (
                            <tr key={delivery.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">#{delivery.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{delivery.client}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{delivery.address}</td>
                              <td className="px-6 py-4 whitespace-nowrap font-medium">{delivery.total.toFixed(2)} DA</td>
                              <td className="px-6 py-4 whitespace-nowrap">{delivery.deliveredAt}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star 
                                      key={i}
                                      className={`w-4 h-4 ${i < (delivery.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                  <span className="ml-1 text-sm text-gray-500">({delivery.rating})</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Button variant="ghost" size="sm">
                                  <ChevronRight size={14} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {getFilteredDeliveries(completedDeliveries, searchQuery).length === 0 && (
                        <div className="text-center py-8">
                          <History size={40} className="mx-auto text-gray-300 mb-2" />
                          <h3 className="text-lg font-medium text-gray-500">Aucune livraison terminée</h3>
                          <p className="text-gray-400">Les livraisons complétées apparaîtront ici</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Issue Dialog */}
      <Dialog open={deliveryDialogOpen} onOpenChange={setDeliveryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Signaler un problème</DialogTitle>
          </DialogHeader>
          
          {currentDelivery && (
            <div className="py-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-blue-100 text-blue-800">
                  Livraison #{currentDelivery.id}
                </Badge>
                <span className="text-sm text-gray-500">{currentDelivery.client}</span>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="issue">Description du problème</Label>
                  <Input
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Ex: Adresse introuvable, client injoignable..."
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeliveryDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={submitIssueReport} disabled={!issue}>
              <AlertTriangle size={16} className="mr-1" />
              Signaler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LivreurDashboard;
