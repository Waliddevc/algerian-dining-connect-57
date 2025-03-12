
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ChefHat, Clock, ClipboardList, 
  Home, ShoppingBag, User, Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { Badge } from "@/components/ui/badge";

const CuisineDashboard = () => {
  const [activeTab, setActiveTab] = useState("enCours");

  // Mock data for orders in progress
  const ordersInProgress = [
    { id: 301, table: 1, type: "En salle", items: ["Couscous Agneau (2)", "Salade Algérienne (1)"], priority: "high", time: "19:35", status: "preparation" },
    { id: 302, table: 5, type: "En salle", items: ["Tajine Poulet (1)", "Baklava (2)"], priority: "medium", time: "19:40", status: "preparation" },
    { id: 303, table: null, type: "Livraison", items: ["Méchoui (1)", "Chorba (2)"], priority: "low", time: "19:50", status: "waiting" },
  ];

  // Mock data for pending orders
  const pendingOrders = [
    { id: 304, table: 3, type: "En salle", items: ["Harira (2)", "Makroud (4)"], priority: "medium", time: "20:05" },
    { id: 305, table: null, type: "À emporter", items: ["Couscous Végétarien (1)", "Thé à la menthe (2)"], priority: "high", time: "20:10" },
  ];

  // Mock data for completed orders
  const completedOrders = [
    { id: 306, table: 6, type: "En salle", items: ["Rfiss (1)", "Kalb el louz (2)"], time: "19:30", completedAt: "19:45" },
    { id: 307, table: null, type: "Livraison", items: ["Chakhchoukha (2)"], time: "19:15", completedAt: "19:40" },
  ];

  const handleOrderAction = (orderId: number, action: string) => {
    toast({
      title: `Commande ${orderId} ${action}`,
      description: "Statut mis à jour",
    });
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
              </div>
              
              <Tabs defaultValue="enCours" className="mb-6" onValueChange={setActiveTab}>
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
                          <ul className="list-disc list-inside text-sm">
                            {order.items.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            <Clock size={14} className="inline mr-1" /> 
                            Commandé à {order.time}
                          </span>
                          
                          <div>
                            {order.status === "waiting" ? (
                              <Button 
                                size="sm" 
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleOrderAction(order.id, "démarrée")}
                              >
                                Démarrer
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                className="bg-blue-500 hover:bg-blue-600"
                                onClick={() => handleOrderAction(order.id, "terminée")}
                              >
                                Terminer
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
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
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            <Clock size={14} className="inline mr-1" /> 
                            Prévu pour {order.time}
                          </span>
                          
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleOrderAction(order.id, "démarrée")}
                          >
                            Démarrer
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Articles</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commandé</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terminé</th>
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
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.completedAt}</td>
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

export default CuisineDashboard;
