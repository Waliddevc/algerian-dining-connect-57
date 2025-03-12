
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  ChefHat, Clock, ClipboardList, 
  Home, ShoppingBag, User, Truck,
  CookingPot, Utensils, UtensilsCrossed, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Types pour notre application
interface KitchenOrder {
  id: number;
  table: number | null;
  type: "En salle" | "À emporter" | "Livraison";
  items: OrderItem[];
  priority: "high" | "medium" | "low";
  time: string;
  status: "waiting" | "preparation" | "ready" | "completed";
  notes?: string;
}

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  status: "waiting" | "preparation" | "ready" | "completed";
  notes?: string;
}

const CuisineDashboard = () => {
  const [activeTab, setActiveTab] = useState("enCours");
  const [orderDetails, setOrderDetails] = useState<KitchenOrder | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackOrderId, setFeedbackOrderId] = useState<number | null>(null);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [timer, setTimer] = useState<number>(0);
  
  // Mock data for orders in progress
  const [ordersInProgress, setOrdersInProgress] = useState<KitchenOrder[]>([
    { 
      id: 301, 
      table: 1, 
      type: "En salle", 
      items: [
        { id: 1, name: "Couscous Agneau", quantity: 2, status: "preparation" },
        { id: 2, name: "Salade Algérienne", quantity: 1, status: "waiting" }
      ], 
      priority: "high", 
      time: "19:35", 
      status: "preparation" 
    },
    { 
      id: 302, 
      table: 5, 
      type: "En salle", 
      items: [
        { id: 3, name: "Tajine Poulet", quantity: 1, status: "preparation" },
        { id: 4, name: "Baklava", quantity: 2, status: "waiting" }
      ], 
      priority: "medium", 
      time: "19:40", 
      status: "preparation" 
    },
    { 
      id: 303, 
      table: null, 
      type: "Livraison", 
      items: [
        { id: 5, name: "Méchoui", quantity: 1, status: "waiting" },
        { id: 6, name: "Chorba", quantity: 2, status: "waiting" }
      ], 
      priority: "low", 
      time: "19:50", 
      status: "waiting",
      notes: "Livraison express - prêt à 20h30"
    },
  ]);

  // Mock data for pending orders
  const [pendingOrders, setPendingOrders] = useState<KitchenOrder[]>([
    { 
      id: 304, 
      table: 3, 
      type: "En salle", 
      items: [
        { id: 7, name: "Harira", quantity: 2, status: "waiting" },
        { id: 8, name: "Makroud", quantity: 4, status: "waiting" }
      ], 
      priority: "medium", 
      time: "20:05",
      status: "waiting"
    },
    { 
      id: 305, 
      table: null, 
      type: "À emporter", 
      items: [
        { id: 9, name: "Couscous Végétarien", quantity: 1, status: "waiting" },
        { id: 10, name: "Thé à la menthe", quantity: 2, status: "waiting" }
      ], 
      priority: "high", 
      time: "20:10",
      status: "waiting",
      notes: "Client allergique aux noix"
    },
  ]);

  // Mock data for completed orders
  const [completedOrders, setCompletedOrders] = useState<KitchenOrder[]>([
    { 
      id: 306, 
      table: 6, 
      type: "En salle", 
      items: [
        { id: 11, name: "Rfiss", quantity: 1, status: "completed" },
        { id: 12, name: "Kalb el louz", quantity: 2, status: "completed" }
      ],
      priority: "medium", 
      time: "19:30", 
      status: "completed" 
    },
    { 
      id: 307, 
      table: null, 
      type: "Livraison", 
      items: [
        { id: 13, name: "Chakhchoukha", quantity: 2, status: "completed" }
      ],
      priority: "high", 
      time: "19:15", 
      status: "completed" 
    },
  ]);

  // Update timer every second to track cooking time
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Handles starting an order
  const handleStartOrder = (order: KitchenOrder) => {
    const updatedOrders = ordersInProgress.map(o => {
      if (o.id === order.id) {
        return { ...o, status: "preparation" as const };
      }
      return o;
    });
    
    setOrdersInProgress(updatedOrders);
    
    toast({
      title: `Commande ${order.id} démarrée`,
      description: "Statut mis à jour",
    });
  };

  // Handles completing an order
  const handleCompleteOrder = (order: KitchenOrder) => {
    // Move the order from in progress to completed
    const updatedInProgress = ordersInProgress.filter(o => o.id !== order.id);
    const completedOrder = { ...order, status: "completed" as const };
    
    setOrdersInProgress(updatedInProgress);
    setCompletedOrders([completedOrder, ...completedOrders]);
    
    toast({
      title: `Commande ${order.id} terminée`,
      description: "La commande a été envoyée en service",
    });
  };

  // Handles starting a pending order
  const handleStartPendingOrder = (order: KitchenOrder) => {
    // Move the order from pending to in progress
    const updatedPending = pendingOrders.filter(o => o.id !== order.id);
    const inProgressOrder = { ...order, status: "preparation" as const };
    
    setPendingOrders(updatedPending);
    setOrdersInProgress([...ordersInProgress, inProgressOrder]);
    
    toast({
      title: `Commande ${order.id} démarrée`,
      description: "La commande est maintenant en préparation",
    });
  };

  // Handles updating item status within an order
  const handleItemStatusUpdate = (order: KitchenOrder, itemId: number, newStatus: OrderItem["status"]) => {
    const updatedOrder = {
      ...order,
      items: order.items.map(item => {
        if (item.id === itemId) {
          return { ...item, status: newStatus };
        }
        return item;
      })
    };
    
    // Check if all items are ready
    const allItemsReady = updatedOrder.items.every(item => 
      item.status === "ready" || item.status === "completed"
    );
    
    if (allItemsReady && updatedOrder.status !== "ready") {
      updatedOrder.status = "ready";
      
      toast({
        title: `Commande ${order.id} prête`,
        description: "Tous les éléments sont prêts à être servis",
      });
    }
    
    // Update the order in the appropriate list
    const updatedOrders = ordersInProgress.map(o => {
      if (o.id === order.id) {
        return updatedOrder;
      }
      return o;
    });
    
    setOrdersInProgress(updatedOrders);
    setUpdateCounter(prev => prev + 1);
  };

  // Opens the order details dialog
  const viewOrderDetails = (order: KitchenOrder) => {
    setOrderDetails(order);
    setShowOrderDetails(true);
  };

  // Opens the feedback dialog
  const openFeedbackDialog = (orderId: number) => {
    setFeedbackOrderId(orderId);
    setFeedbackDialog(true);
  };

  // Submits feedback
  const submitFeedback = () => {
    if (!feedbackMessage.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un message de feedback",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Feedback envoyé",
      description: `Feedback pour la commande #${feedbackOrderId} envoyé`,
    });
    
    setFeedbackDialog(false);
    setFeedbackMessage("");
    setFeedbackOrderId(null);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'medium':
        return <Badge variant="default">Normal</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Basse</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'En salle':
        return <ChefHat size={16} className="mr-1" />;
      case 'À emporter':
        return <ShoppingBag size={16} className="mr-1" />;
      case 'Livraison':
        return <Truck size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  const getItemStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Clock size={16} className="text-yellow-500" />;
      case 'preparation':
        return <CookingPot size={16} className="text-blue-500" />;
      case 'ready':
        return <Utensils size={16} className="text-green-500" />;
      case 'completed':
        return <UtensilsCrossed size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };

  const sidebarMenuItems = [
    { icon: <ClipboardList size={18} />, label: "Commandes en cours" },
    { icon: <Clock size={18} />, label: "En attente" },
    { icon: <ChefHat size={18} />, label: "Recettes" },
    { icon: <User size={18} />, label: "Profil" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <EmployeeSidebar 
          title="Restaurant Algérien" 
          role="Cuisine"
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
                  <h1 className="text-2xl font-bold text-primary">Cuisine</h1>
                  <p className="text-gray-600">Gestion des commandes</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                  >
                    <ChefHat size={16} />
                    Mode service
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="enCours" className="mb-6" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="enCours">En préparation ({ordersInProgress.length})</TabsTrigger>
                  <TabsTrigger value="attente">En attente ({pendingOrders.length})</TabsTrigger>
                  <TabsTrigger value="terminees">Terminées</TabsTrigger>
                </TabsList>
                
                <TabsContent value="enCours" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ordersInProgress.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-lg">Commande #{order.id}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              {getTypeIcon(order.type)}
                              <span>{order.type}</span>
                              {order.table && <span className="ml-2">• Table {order.table}</span>}
                            </div>
                          </div>
                          {getPriorityBadge(order.priority)}
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Articles:</h4>
                          <ul className="space-y-2">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex justify-between items-center text-sm">
                                <span className="flex items-center gap-1">
                                  {getItemStatusIcon(item.status)}
                                  <span>{item.name} ({item.quantity})</span>
                                </span>
                                
                                {order.status === "preparation" && (
                                  <div className="flex space-x-1">
                                    {item.status === "waiting" && (
                                      <Button 
                                        size="sm" 
                                        variant="ghost"
                                        className="h-7 px-2 text-blue-600"
                                        onClick={() => handleItemStatusUpdate(order, item.id, "preparation")}
                                      >
                                        Démarrer
                                      </Button>
                                    )}
                                    
                                    {item.status === "preparation" && (
                                      <Button 
                                        size="sm" 
                                        variant="ghost"
                                        className="h-7 px-2 text-green-600"
                                        onClick={() => handleItemStatusUpdate(order, item.id, "ready")}
                                      >
                                        Prêt
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {order.notes && (
                          <div className="mb-4 p-2 bg-yellow-50 border-l-2 border-yellow-300 text-sm">
                            <p className="text-yellow-800">
                              <AlertCircle size={14} className="inline mr-1" />
                              Note: {order.notes}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            <Clock size={14} className="inline mr-1" /> 
                            Commandé à {order.time}
                          </span>
                          
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => viewOrderDetails(order)}
                            >
                              Détails
                            </Button>
                            
                            {order.status === "waiting" ? (
                              <Button 
                                size="sm" 
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleStartOrder(order)}
                              >
                                Démarrer
                              </Button>
                            ) : order.status === "ready" ? (
                              <Button 
                                size="sm" 
                                className="bg-blue-500 hover:bg-blue-600"
                                onClick={() => handleCompleteOrder(order)}
                              >
                                Terminé
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                className="bg-blue-500 hover:bg-blue-600"
                                onClick={() => openFeedbackDialog(order.id)}
                              >
                                Feedback
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {ordersInProgress.length === 0 && (
                      <div className="col-span-2 text-center py-8">
                        <ChefHat size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Aucune commande en préparation actuellement</p>
                        <p className="text-sm text-gray-400">Les nouvelles commandes apparaîtront ici</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="attente" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-lg">Commande #{order.id}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              {getTypeIcon(order.type)}
                              <span>{order.type}</span>
                              {order.table && <span className="ml-2">• Table {order.table}</span>}
                            </div>
                          </div>
                          {getPriorityBadge(order.priority)}
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Articles:</h4>
                          <ul className="list-disc list-inside text-sm">
                            {order.items.map((item, index) => (
                              <li key={index}>{item.name} ({item.quantity})</li>
                            ))}
                          </ul>
                        </div>
                        
                        {order.notes && (
                          <div className="mb-4 p-2 bg-yellow-50 border-l-2 border-yellow-300 text-sm">
                            <p className="text-yellow-800">
                              <AlertCircle size={14} className="inline mr-1" />
                              Note: {order.notes}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            <Clock size={14} className="inline mr-1" /> 
                            Prévu pour {order.time}
                          </span>
                          
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleStartPendingOrder(order)}
                          >
                            Démarrer
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                    
                    {pendingOrders.length === 0 && (
                      <div className="col-span-2 text-center py-8">
                        <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Aucune commande en attente</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="terminees" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Articles</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commandé</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {completedOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getTypeIcon(order.type)}
                                <span>{order.type}</span>
                                {order.table && <span className="ml-1">(Table {order.table})</span>}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <ul className="list-disc list-inside text-sm">
                                {order.items.map((item, index) => (
                                  <li key={index}>{item.name} ({item.quantity})</li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => viewOrderDetails(order)}
                              >
                                Détails
                              </Button>
                            </td>
                          </tr>
                        ))}
                        
                        {completedOrders.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                              Aucune commande terminée aujourd'hui
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Dialogue pour les détails de commande */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la commande #{orderDetails?.id}</DialogTitle>
            <DialogDescription>
              {orderDetails?.type} {orderDetails?.table ? `• Table ${orderDetails.table}` : ''}
            </DialogDescription>
          </DialogHeader>
          
          {orderDetails && (
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium">Articles</h3>
                  {getPriorityBadge(orderDetails.priority)}
                </div>
                
                <ul className="space-y-3">
                  {orderDetails.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
                        {item.notes && (
                          <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center">
                        {getItemStatusIcon(item.status)}
                        <span className="text-xs ml-1 capitalize">
                          {item.status === "waiting" ? "En attente" :
                            item.status === "preparation" ? "En cours" :
                            item.status === "ready" ? "Prêt" : "Terminé"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {orderDetails.notes && (
                <div className="border rounded-md p-4 bg-yellow-50 border-yellow-200">
                  <h3 className="font-medium mb-2">Notes</h3>
                  <p className="text-sm">{orderDetails.notes}</p>
                </div>
              )}
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>Commandé à: {orderDetails.time}</span>
                <span>
                  Statut: 
                  <span className="ml-1 font-medium">
                    {orderDetails.status === "waiting" ? "En attente" :
                     orderDetails.status === "preparation" ? "En préparation" :
                     orderDetails.status === "ready" ? "Prêt" : "Terminé"}
                  </span>
                </span>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                {orderDetails.status === "waiting" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleStartOrder(orderDetails);
                      setShowOrderDetails(false);
                    }}
                  >
                    Démarrer
                  </Button>
                )}
                
                {orderDetails.status === "preparation" && (
                  <Button
                    variant="outline"
                    onClick={() => openFeedbackDialog(orderDetails.id)}
                  >
                    Ajouter un feedback
                  </Button>
                )}
                
                {orderDetails.status === "ready" && (
                  <Button
                    variant="default"
                    onClick={() => {
                      handleCompleteOrder(orderDetails);
                      setShowOrderDetails(false);
                    }}
                  >
                    Terminer
                  </Button>
                )}
                
                <Button variant="ghost" onClick={() => setShowOrderDetails(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Dialogue pour le feedback */}
      <Dialog open={feedbackDialog} onOpenChange={setFeedbackDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Feedback pour la cuisine</DialogTitle>
            <DialogDescription>
              Envoyez un message concernant cette commande
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Message</Label>
              <Textarea
                id="feedback"
                placeholder="Ex: Manque d'ingrédients, problème d'équipement..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="ghost" onClick={() => setFeedbackDialog(false)}>
                Annuler
              </Button>
              <Button onClick={submitFeedback}>
                Envoyer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CuisineDashboard;
