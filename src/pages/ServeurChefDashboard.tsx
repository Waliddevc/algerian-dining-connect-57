
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Users, Calendar, Bell, ClipboardList, 
  Home, LogOut, LayoutDashboard, Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const ServeurChefDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tables");

  // Mock data for tables
  const tables = [
    { id: 1, status: "occupied", customers: 4, time: "19:30", orders: "En cours" },
    { id: 2, status: "available", customers: 0, time: "", orders: "" },
    { id: 3, status: "reserved", customers: 2, time: "20:00", orders: "En attente" },
    { id: 4, status: "available", customers: 0, time: "", orders: "" },
    { id: 5, status: "occupied", customers: 6, time: "19:15", orders: "Servi" },
    { id: 6, status: "occupied", customers: 2, time: "20:15", orders: "En cours" },
    { id: 7, status: "available", customers: 0, time: "", orders: "" },
    { id: 8, status: "reserved", customers: 3, time: "21:00", orders: "En attente" },
  ];

  // Mock data for reservations
  const reservations = [
    { id: 101, name: "Karim Benzema", time: "20:00", people: 2, table: 3, status: "Confirmé" },
    { id: 102, name: "Zinedine Zidane", time: "21:00", people: 3, table: 8, status: "Confirmé" },
    { id: 103, name: "Houssem Aouar", time: "19:45", people: 4, table: null, status: "En attente" },
    { id: 104, name: "Ismael Bennacer", time: "20:30", people: 2, table: null, status: "En attente" },
  ];

  const handleTableClick = (tableId: number) => {
    toast({
      title: `Table ${tableId}`,
      description: "Fonctionnalité détaillée en développement",
    });
  };

  const handleReservationAction = (resId: number, action: string) => {
    toast({
      title: `Réservation ${resId} ${action}`,
      description: "Fonctionnalité en développement",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex w-64 flex-col bg-white shadow-md"
        >
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-primary">Restaurant Algérien</h2>
            <p className="text-sm text-gray-500">Serveur Chef</p>
          </div>
          
          <div className="flex-1 py-6 flex flex-col gap-2 px-3">
            <Button variant="ghost" className="justify-start gap-3 mb-2">
              <LayoutDashboard size={18} />
              Tableau de bord
            </Button>
            <Button variant="ghost" className="justify-start gap-3 mb-2">
              <Users size={18} />
              Gestion des tables
            </Button>
            <Button variant="ghost" className="justify-start gap-3 mb-2">
              <Calendar size={18} />
              Réservations
            </Button>
            <Button variant="ghost" className="justify-start gap-3 mb-2">
              <Bell size={18} />
              Notifications
            </Button>
            <Button variant="ghost" className="justify-start gap-3 mb-2">
              <ClipboardList size={18} />
              Commandes
            </Button>
          </div>
          
          <div className="p-4 border-t">
            <Button variant="ghost" className="justify-start gap-3 mb-2 w-full">
              <Settings size={18} />
              Paramètres
            </Button>
            <Button 
              variant="outline" 
              className="justify-start gap-3 w-full"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Déconnexion
            </Button>
          </div>
        </motion.div>
        
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
                  <h1 className="text-2xl font-bold text-primary">Tableau de Bord</h1>
                  <p className="text-gray-600">Gérez vos tables et réservations</p>
                </div>
              </div>
              
              <Tabs defaultValue="tables" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tables">Plan des Tables</TabsTrigger>
                  <TabsTrigger value="reservations">Réservations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tables" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tables.map((table) => (
                      <motion.div
                        key={table.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: table.id * 0.05 }}
                        className={`p-4 rounded-lg cursor-pointer shadow-sm ${
                          table.status === 'available' 
                            ? 'bg-green-50 border border-green-200' 
                            : table.status === 'occupied' 
                              ? 'bg-red-50 border border-red-200' 
                              : 'bg-yellow-50 border border-yellow-200'
                        }`}
                        onClick={() => handleTableClick(table.id)}
                      >
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
                
                <TabsContent value="reservations" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pers.</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reservations.map((res) => (
                          <tr key={res.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{res.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{res.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{res.people}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {res.table ? `Table ${res.table}` : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                res.status === 'Confirmé' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {res.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-primary hover:text-primary-dark mr-2"
                                onClick={() => handleReservationAction(res.id, "confirmée")}
                              >
                                Confirmer
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-800"
                                onClick={() => handleReservationAction(res.id, "annulée")}
                              >
                                Annuler
                              </Button>
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

export default ServeurChefDashboard;
