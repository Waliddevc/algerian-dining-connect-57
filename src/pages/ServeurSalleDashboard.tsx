
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, Bell, ClipboardList, 
  Home, MessageSquare, User, Utensils,
  ArrowLeft, Settings, LogOut, MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableOrderForm } from "@/components/TableOrderForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileDialog from "@/components/ProfileDialog";

interface Table {
  id: number;
  status: "available" | "occupied" | "reserved";
  customers: number;
  time: string;
  orders: string;
  notifications: number;
}

const ServeurSalleDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tables");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const [tables, setTables] = useState<Table[]>([
    { id: 1, status: "occupied", customers: 4, time: "19:30", orders: "En cours", notifications: 1 },
    { id: 2, status: "available", customers: 0, time: "", orders: "", notifications: 0 },
    { id: 3, status: "reserved", customers: 2, time: "20:00", orders: "En attente", notifications: 0 },
    { id: 4, status: "available", customers: 0, time: "", orders: "", notifications: 0 },
    { id: 5, status: "occupied", customers: 6, time: "19:15", orders: "Servi", notifications: 2 },
    { id: 6, status: "occupied", customers: 2, time: "20:15", orders: "En cours", notifications: 0 },
  ]);

  const handleTableClick = (tableId: number) => {
    setSelectedTable(tableId);
    if (tables.find(t => t.id === tableId)?.status !== "available") {
      setOrderDialogOpen(true);
    } else {
      toast({
        title: "Table disponible",
        description: "Vous pouvez placer des clients à cette table",
      });
    }
  };

  const handleTableStatusChange = (tableId: number, newStatus: Table["status"]) => {
    setTables(tables.map(table => 
      table.id === tableId 
        ? { ...table, status: newStatus, time: new Date().toLocaleTimeString() }
        : table
    ));
    toast({
      title: "Statut mis à jour",
      description: `Table ${tableId} marquée comme ${newStatus}`,
    });
  };

  const handleHomeClick = () => {
    toast({
      title: "Navigation",
      description: "Retour à l'accueil",
    });
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
    toast({
      title: "Navigation",
      description: "Retour à la page précédente",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate("/employee-login");
  };

  const handleOpenProfile = () => {
    setProfileDialogOpen(true);
  };

  const sidebarMenuItems = [
    { icon: <Users size={18} />, label: "Gestion des tables" },
    { icon: <Utensils size={18} />, label: "Commandes en cours" },
    { icon: <Bell size={18} />, label: "Notifications cuisine" },
    { icon: <MessageSquare size={18} />, label: "Demandes spéciales" },
    { icon: <User size={18} />, label: "Profil" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex h-screen overflow-hidden">
        <EmployeeSidebar 
          title="Restaurant Algérien" 
          role="Serveur en Salle"
          menuItems={sidebarMenuItems}
        />
        
        <div className="flex-1 overflow-auto">
          <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
            <h2 className="font-bold text-primary">Restaurant Algérien</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={handleGoBack}>
                <ArrowLeft size={20} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleHomeClick}>
                <Home size={20} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleOpenProfile}>
                    <Settings size={16} className="mr-2" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-primary">Serveur en Salle</h1>
                  <p className="text-gray-600">Gérez vos tables et les commandes</p>
                </div>
                <div className="hidden md:flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleGoBack}
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleHomeClick}
                  >
                    <Home size={20} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleOpenProfile}>
                        <Settings size={16} className="mr-2" />
                        Profil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut size={16} className="mr-2" />
                        Déconnexion
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Tabs defaultValue="tables" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tables">Tables</TabsTrigger>
                  <TabsTrigger value="notifications">Commandes en cours</TabsTrigger>
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
                            ? 'bg-green-50 border border-green-200 hover:bg-green-100' 
                            : table.status === 'occupied' 
                              ? 'bg-red-50 border border-red-200 hover:bg-red-100' 
                              : 'bg-yellow-50 border border-yellow-200 hover:bg-yellow-100'
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
                              <p className="text-gray-600">{table.orders}</p>
                            </div>
                          )}

                          {table.status === 'available' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTableStatusChange(table.id, "occupied");
                              }}
                            >
                              Placer des clients
                            </Button>
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {tables
                          .filter(table => table.status === "occupied" && table.orders)
                          .map((table) => (
                            <tr key={table.id}>
                              <td className="px-6 py-4 whitespace-nowrap">Table {table.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{table.orders}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  table.orders === "Servi"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {table.orders}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">{table.time}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleTableClick(table.id)}
                                >
                                  Voir détails
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

      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Commander pour la Table {selectedTable}</DialogTitle>
          </DialogHeader>
          <TableOrderForm 
            tableId={selectedTable || 0} 
            onClose={() => setOrderDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <ProfileDialog 
        open={profileDialogOpen} 
        onOpenChange={setProfileDialogOpen} 
      />
    </div>
  );
};

export default ServeurSalleDashboard;
