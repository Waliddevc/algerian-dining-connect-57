
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  LayoutDashboard, Users, PackageCheck, TrendingUp, 
  Home, Calendar, Settings, User, ChefHat, Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GerantDashboard = () => {
  const [activeTab, setActiveTab] = useState("apercu");

  // Mock data for statistics
  const salesData = [
    { day: 'Lun', ventes: 5400 },
    { day: 'Mar', ventes: 4200 },
    { day: 'Mer', ventes: 3800 },
    { day: 'Jeu', ventes: 6100 },
    { day: 'Ven', ventes: 8500 },
    { day: 'Sam', ventes: 9200 },
    { day: 'Dim', ventes: 7800 },
  ];

  // Mock data for staff
  const staff = [
    { id: 1, name: "Ahmed Boudiaf", role: "Serveur Chef", status: "Présent", shift: "18:00 - 23:00" },
    { id: 2, name: "Lina Hadji", role: "Serveur Salle", status: "Présent", shift: "18:00 - 23:00" },
    { id: 3, name: "Karim Abbou", role: "Cuisinier", status: "Présent", shift: "16:00 - 23:00" },
    { id: 4, name: "Samia Fellah", role: "Caissier", status: "Absent", shift: "18:00 - 23:00" },
    { id: 5, name: "Riad Tlemcani", role: "Livreur", status: "Présent", shift: "19:00 - 00:00" },
  ];

  // Mock data for inventory
  const inventory = [
    { id: 1, name: "Semoule", quantity: 45, unit: "kg", status: "normal" },
    { id: 2, name: "Agneau", quantity: 12, unit: "kg", status: "normal" },
    { id: 3, name: "Poulet", quantity: 8, unit: "kg", status: "low" },
    { id: 4, name: "Tomates", quantity: 5, unit: "kg", status: "low" },
    { id: 5, name: "Oignons", quantity: 20, unit: "kg", status: "normal" },
    { id: 6, name: "Épices couscous", quantity: 2, unit: "kg", status: "critical" },
  ];

  // Mock data for quick stats
  const quickStats = [
    { title: "Ventes Aujourd'hui", value: "12,580 DA", change: "+15%", icon: <TrendingUp className="text-green-500" /> },
    { title: "Réservations", value: "8", change: "+2", icon: <Calendar className="text-blue-500" /> },
    { title: "Clients Servis", value: "54", change: "+12", icon: <Users className="text-indigo-500" /> },
    { title: "Livraisons", value: "17", change: "+5", icon: <Truck className="text-purple-500" /> },
  ];

  const handleAction = (type: string, id: number, action: string) => {
    toast({
      title: `${type} #${id}`,
      description: `Action ${action} effectuée avec succès`,
    });
  };

  const sidebarMenuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Tableau de bord" },
    { icon: <Users size={18} />, label: "Gestion du personnel" },
    { icon: <PackageCheck size={18} />, label: "Inventaire" },
    { icon: <TrendingUp size={18} />, label: "Rapports" },
    { icon: <Calendar size={18} />, label: "Réservations" },
    { icon: <User size={18} />, label: "Profil" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <EmployeeSidebar 
          title="Restaurant Algérien" 
          role="Gérant"
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
                  <h1 className="text-2xl font-bold text-primary">Tableau de Bord</h1>
                  <p className="text-gray-600">Aperçu de la gestion du restaurant</p>
                </div>
                <Button>
                  Générer Rapport
                </Button>
              </div>
              
              {/* Quick Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white p-5 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                      <div className="p-2 rounded-full bg-blue-50">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-green-600">{stat.change}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Tabs defaultValue="apercu" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="apercu">Aperçu</TabsTrigger>
                  <TabsTrigger value="personnel">Personnel</TabsTrigger>
                  <TabsTrigger value="inventaire">Inventaire</TabsTrigger>
                </TabsList>
                
                <TabsContent value="apercu" className="mt-6">
                  <div className="bg-white p-5 rounded-lg shadow-sm mb-5">
                    <h3 className="text-lg font-medium mb-4">Ventes cette semaine</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={salesData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value} DA`, 'Ventes']} />
                          <Bar dataKey="ventes" fill="#5c6ac4" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium mb-4">Plats les plus vendus</h3>
                      <ol className="space-y-2">
                        <li className="flex justify-between">
                          <span className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">1</span>
                            Couscous Royal
                          </span>
                          <span className="font-medium">42 plats</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">2</span>
                            Tajine Poulet
                          </span>
                          <span className="font-medium">36 plats</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">3</span>
                            Chorba
                          </span>
                          <span className="font-medium">28 plats</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">4</span>
                            Chakhchoukha
                          </span>
                          <span className="font-medium">24 plats</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">5</span>
                            Baklava
                          </span>
                          <span className="font-medium">22 plats</span>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium mb-4">Réservations à venir</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between p-2 bg-blue-50 rounded-md">
                          <div>
                            <h4 className="font-medium">Famille Messaoudi</h4>
                            <p className="text-sm text-gray-600">6 personnes • Table 8</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Aujourd'hui</p>
                            <p className="text-sm text-blue-600">20:30</p>
                          </div>
                        </div>
                        <div className="flex justify-between p-2 bg-blue-50 rounded-md">
                          <div>
                            <h4 className="font-medium">Zinedine Zidane</h4>
                            <p className="text-sm text-gray-600">4 personnes • Table 5</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Aujourd'hui</p>
                            <p className="text-sm text-blue-600">21:00</p>
                          </div>
                        </div>
                        <div className="flex justify-between p-2 rounded-md">
                          <div>
                            <h4 className="font-medium">Mariage Khelifi</h4>
                            <p className="text-sm text-gray-600">20 personnes • Section VIP</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Demain</p>
                            <p className="text-sm text-gray-600">19:00</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-3">
                        Voir toutes les réservations
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="personnel" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poste</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horaire</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {staff.map((employee) => (
                          <tr key={employee.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                  <User className="h-5 w-5 text-gray-500" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {employee.role === "Cuisinier" ? (
                                  <ChefHat size={16} className="mr-1 text-yellow-600" />
                                ) : employee.role.includes("Serveur") ? (
                                  <Users size={16} className="mr-1 text-blue-600" />
                                ) : employee.role === "Livreur" ? (
                                  <Truck size={16} className="mr-1 text-green-600" />
                                ) : (
                                  <User size={16} className="mr-1 text-gray-600" />
                                )}
                                <span>{employee.role}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                employee.status === 'Présent' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {employee.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {employee.shift}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleAction("Employé", employee.id, "détails")}
                              >
                                Détails
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleAction("Employé", employee.id, "message")}
                              >
                                Message
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="inventaire" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingrédient</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inventory.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{item.quantity} {item.unit}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === 'normal' 
                                  ? 'bg-green-100 text-green-800' 
                                  : item.status === 'low'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                              }`}>
                                {item.status === 'normal' 
                                  ? 'Normal' 
                                  : item.status === 'low'
                                    ? 'Faible'
                                    : 'Critique'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleAction("Stock", item.id, "commander")}
                              >
                                Commander
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleAction("Stock", item.id, "ajuster")}
                              >
                                Ajuster
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

export default GerantDashboard;
