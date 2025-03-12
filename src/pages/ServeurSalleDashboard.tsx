
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Users, Bell, ClipboardList, 
  Home, MessageSquare, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EmployeeSidebar from "@/components/EmployeeSidebar";

const ServeurSalleDashboard = () => {
  const [activeTab, setActiveTab] = useState("tables");

  // Mock data for tables
  const tables = [
    { id: 1, status: "occupied", customers: 4, time: "19:30", orders: "En cours", notifications: 1 },
    { id: 2, status: "available", customers: 0, time: "", orders: "", notifications: 0 },
    { id: 3, status: "reserved", customers: 2, time: "20:00", orders: "En attente", notifications: 0 },
    { id: 4, status: "available", customers: 0, time: "", orders: "", notifications: 0 },
    { id: 5, status: "occupied", customers: 6, time: "19:15", orders: "Servi", notifications: 2 },
    { id: 6, status: "occupied", customers: 2, time: "20:15", orders: "En cours", notifications: 0 },
  ];

  // Mock data for kitchen notifications
  const kitchenNotifications = [
    { id: 201, table: 1, dish: "Couscous Agneau", status: "Prêt", time: "19:45" },
    { id: 202, table: 5, dish: "Tajine Poulet", status: "Prêt", time: "19:50" },
    { id: 203, table: 5, dish: "Baklava", status: "En préparation", time: "19:55" },
  ];

  const handleTableClick = (tableId: number) => {
    toast({
      title: `Table ${tableId}`,
      description: "Fonctionnalité détaillée en développement",
    });
  };

  const handleNotificationAction = (notifId: number, action: string) => {
    toast({
      title: `Notification ${notifId} ${action}`,
      description: "Fonctionnalité en développement",
    });
  };

  const sidebarMenuItems = [
    { icon: <Users size={18} />, label: "Gestion des tables" },
    { icon: <Bell size={18} />, label: "Notifications cuisine" },
    { icon: <ClipboardList size={18} />, label: "Commandes clients" },
    { icon: <MessageSquare size={18} />, label: "Demandes spéciales" },
    { icon: <User size={18} />, label: "Profil" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <EmployeeSidebar 
          title="Restaurant Algérien" 
          role="Serveur en Salle"
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
                  <h1 className="text-2xl font-bold text-primary">Serveur en Salle</h1>
                  <p className="text-gray-600">Gérez vos tables et les demandes des clients</p>
                </div>
              </div>
              
              <Tabs defaultValue="tables" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tables">Tables</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications Cuisine</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tables" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tables.map((table) => (
                      <motion.div
                        key={table.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: table.id * 0.05 }}
                        className={`p-4 rounded-lg cursor-pointer shadow-sm relative ${
                          table.status === 'available' 
                            ? 'bg-green-50 border border-green-200' 
                            : table.status === 'occupied' 
                              ? 'bg-red-50 border border-red-200' 
                              : 'bg-yellow-50 border border-yellow-200'
                        }`}
                        onClick={() => handleTableClick(table.id)}
                      >
                        {table.notifications > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {table.notifications}
                          </span>
                        )}
                        <div className="text-center">
                          <h3 className="font-medium">Table {table.id}</h3>
                          <div className={`text-xs font-medium uppercase mt-1 ${
                            table.status === 'available' 
                              ? 'text-green-600' 
                              : table.status === 'occupied' 
                                ? 'text-red-600' 
                                : 'text-yellow-600'
                          }`}>
                            {table.status === 'available' 
                              ? 'Disponible' 
                              : table.status === 'occupied' 
                                ? 'Occupée' 
                                : 'Réservée'}
                          </div>
                          
                          {table.status !== 'available' && (
                            <div className="mt-2 text-sm">
                              <p>{table.customers} personnes</p>
                              <p>{table.time}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plat</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {kitchenNotifications.map((notif) => (
                          <tr key={notif.id}>
                            <td className="px-6 py-4 whitespace-nowrap">Table {notif.table}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{notif.dish}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                notif.status === 'Prêt' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {notif.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{notif.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {notif.status === 'Prêt' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-primary hover:text-primary-dark"
                                  onClick={() => handleNotificationAction(notif.id, "servie")}
                                >
                                  Marquer comme servi
                                </Button>
                              )}
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

export default ServeurSalleDashboard;
