
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Users, Calendar, Bell, ClipboardList, 
  Home, LogOut, LayoutDashboard, Settings, 
  ChefHat, Utensils
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { TableOrderForm } from "@/components/TableOrderForm";

// Types pour notre application
interface TableData {
  id: number;
  status: "available" | "occupied" | "reserved";
  customers: number;
  time: string;
  orders: string;
}

interface ReservationData {
  id: number;
  name: string;
  time: string;
  people: number;
  table: number | null;
  status: "Confirmé" | "En attente";
}

interface OrderData {
  id: number;
  tableId: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    status: "En attente" | "En préparation" | "Prêt" | "Servi";
    notes?: string;
  }[];
  time: string;
  status: "En attente" | "En préparation" | "Prêt" | "Servi" | "Terminé";
}

const ServeurChefDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tables");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [assignTableDialog, setAssignTableDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationData | null>(null);

  // Mock data pour les tables
  const [tables, setTables] = useState<TableData[]>([
    { id: 1, status: "occupied", customers: 4, time: "19:30", orders: "En cours" },
    { id: 2, status: "available", customers: 0, time: "", orders: "" },
    { id: 3, status: "reserved", customers: 2, time: "20:00", orders: "En attente" },
    { id: 4, status: "available", customers: 0, time: "", orders: "" },
    { id: 5, status: "occupied", customers: 6, time: "19:15", orders: "Servi" },
    { id: 6, status: "occupied", customers: 2, time: "20:15", orders: "En cours" },
    { id: 7, status: "available", customers: 0, time: "", orders: "" },
    { id: 8, status: "reserved", customers: 3, time: "21:00", orders: "En attente" },
  ]);

  // Mock data pour les réservations
  const [reservations, setReservations] = useState<ReservationData[]>([
    { id: 101, name: "Karim Benzema", time: "20:00", people: 2, table: 3, status: "Confirmé" },
    { id: 102, name: "Zinedine Zidane", time: "21:00", people: 3, table: 8, status: "Confirmé" },
    { id: 103, name: "Houssem Aouar", time: "19:45", people: 4, table: null, status: "En attente" },
    { id: 104, name: "Ismael Bennacer", time: "20:30", people: 2, table: null, status: "En attente" },
  ]);

  // Mock data pour les commandes
  const [orders, setOrders] = useState<OrderData[]>([
    { 
      id: 1, 
      tableId: 1, 
      items: [
        { id: 1, name: "Couscous Royal", quantity: 2, status: "En préparation" },
        { id: 3, name: "Pastilla au Poulet", quantity: 1, status: "En attente", notes: "Sans amandes" }
      ],
      time: "19:35",
      status: "En préparation"
    },
    { 
      id: 2, 
      tableId: 5, 
      items: [
        { id: 2, name: "Tajine Poulet", quantity: 3, status: "Prêt" },
        { id: 5, name: "Mint Tea", quantity: 3, status: "Servi" }
      ],
      time: "19:20",
      status: "Prêt"
    },
    { 
      id: 3, 
      tableId: 6, 
      items: [
        { id: 4, name: "Méchoui", quantity: 1, status: "En préparation" },
        { id: 5, name: "Mint Tea", quantity: 2, status: "En attente" }
      ],
      time: "20:20",
      status: "En préparation"
    }
  ]);

  const handleTableClick = (tableId: number) => {
    setSelectedTable(tableId);
    
    // Vérifier si la table est occupée ou réservée
    const table = tables.find(t => t.id === tableId);
    if (table?.status === "occupied") {
      // Afficher les détails de la commande
      const tableOrder = orders.find(o => o.tableId === tableId);
      if (tableOrder) {
        setSelectedOrder(tableOrder);
        setShowOrderDetails(true);
      } else {
        // Option pour ajouter une commande
        setShowOrderForm(true);
      }
    } else if (table?.status === "available") {
      // Option pour placer des clients
      toast({
        title: `Table ${tableId}`,
        description: "Table disponible. Cliquez sur 'Réservations' pour assigner des clients.",
      });
    } else if (table?.status === "reserved") {
      toast({
        title: `Table ${tableId}`,
        description: "Table réservée. Les clients devraient arriver bientôt.",
      });
    }
  };

  const handleReservationAction = (resId: number, action: string) => {
    if (action === "confirmée") {
      const reservation = reservations.find(r => r.id === resId);
      if (reservation && reservation.table === null) {
        setSelectedReservation(reservation);
        setAssignTableDialog(true);
      } else {
        toast({
          title: `Réservation ${resId} confirmée`,
          description: "Table déjà assignée à cette réservation.",
        });
      }
    } else if (action === "annulée") {
      // Mettre à jour les réservations et libérer la table si assignée
      const updatedReservations = reservations.map(r => {
        if (r.id === resId) {
          // Si la réservation avait une table assignée, on la libère
          if (r.table) {
            const updatedTables = tables.map(t => {
              if (t.id === r.table) {
                return { ...t, status: "available", customers: 0, time: "", orders: "" };
              }
              return t;
            });
            setTables(updatedTables);
          }
          
          // Retourner la réservation sans la supprimer pour cet exemple
          return { ...r, status: "En attente", table: null };
        }
        return r;
      });
      
      setReservations(updatedReservations);
      
      toast({
        title: `Réservation ${resId} annulée`,
        description: "La réservation a été annulée et la table a été libérée.",
      });
    }
  };

  const assignTableToReservation = (tableId: number) => {
    if (!selectedReservation) return;
    
    // Mettre à jour la table
    const updatedTables = tables.map(t => {
      if (t.id === tableId) {
        return {
          ...t,
          status: "reserved",
          customers: selectedReservation.people,
          time: selectedReservation.time,
          orders: "En attente"
        };
      }
      return t;
    });
    
    // Mettre à jour la réservation
    const updatedReservations = reservations.map(r => {
      if (r.id === selectedReservation.id) {
        return { ...r, table: tableId, status: "Confirmé" };
      }
      return r;
    });
    
    setTables(updatedTables);
    setReservations(updatedReservations);
    setAssignTableDialog(false);
    
    toast({
      title: "Table assignée",
      description: `Table ${tableId} assignée à la réservation de ${selectedReservation.name}`,
    });
  };
  
  const handleAddOrder = (orderData: { tableId: number; dishId: number; quantity: number; notes: string }) => {
    // Trouver le nom du plat
    const menuItems = [
      { id: 1, name: "Couscous Royal", price: 18.99 },
      { id: 2, name: "Tajine Poulet", price: 16.99 },
      { id: 3, name: "Pastilla au Poulet", price: 15.99 },
      { id: 4, name: "Méchoui", price: 24.99 },
      { id: 5, name: "Mint Tea", price: 3.99 },
    ];
    
    const dishName = menuItems.find(item => item.id === orderData.dishId)?.name || "Plat inconnu";
    
    // Vérifier si une commande existe déjà pour cette table
    const existingOrderIndex = orders.findIndex(o => o.tableId === orderData.tableId);
    
    if (existingOrderIndex !== -1) {
      // Ajouter un élément à une commande existante
      const updatedOrders = [...orders];
      updatedOrders[existingOrderIndex].items.push({
        id: orderData.dishId,
        name: dishName,
        quantity: orderData.quantity,
        status: "En attente",
        notes: orderData.notes || undefined
      });
      
      setOrders(updatedOrders);
    } else {
      // Créer une nouvelle commande
      const newOrder: OrderData = {
        id: orders.length + 1,
        tableId: orderData.tableId,
        items: [{
          id: orderData.dishId,
          name: dishName,
          quantity: orderData.quantity,
          status: "En attente",
          notes: orderData.notes || undefined
        }],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "En attente"
      };
      
      setOrders([...orders, newOrder]);
      
      // Mettre à jour le statut de la table si nécessaire
      if (tables.find(t => t.id === orderData.tableId)?.status !== "occupied") {
        const updatedTables = tables.map(t => {
          if (t.id === orderData.tableId) {
            return {
              ...t,
              status: "occupied",
              customers: t.customers || 2, // Valeur par défaut si pas définie
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              orders: "En cours"
            };
          }
          return t;
        });
        
        setTables(updatedTables);
      }
    }
  };

  const updateOrderStatus = (orderId: number, status: OrderData["status"]) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // Mettre à jour le statut de la table
    if (status === "Servi" || status === "Terminé") {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        const updatedTables = tables.map(table => {
          if (table.id === order.tableId) {
            return { ...table, orders: status };
          }
          return table;
        });
        
        setTables(updatedTables);
      }
    }
    
    toast({
      title: "Statut mis à jour",
      description: `La commande #${orderId} est maintenant "${status}"`,
    });
    
    setShowOrderDetails(false);
  };

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  // Items de menu pour la sidebar
  const menuItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
      onClick: () => setActiveTab("tables")
    },
    {
      icon: <Users size={18} />,
      label: "Gestion des tables",
      onClick: () => setActiveTab("tables")
    },
    {
      icon: <Calendar size={18} />,
      label: "Réservations",
      onClick: () => setActiveTab("reservations")
    },
    {
      icon: <ClipboardList size={18} />,
      label: "Commandes",
      onClick: () => setActiveTab("orders")
    },
    {
      icon: <Bell size={18} />,
      label: "Notifications",
      onClick: () => toast({
        title: "Notifications",
        description: "Vous n'avez pas de nouvelles notifications."
      })
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <EmployeeSidebar 
          title="Restaurant Algérien"
          role="Serveur Chef"
          menuItems={menuItems}
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
                  <p className="text-gray-600">Gérez vos tables et réservations</p>
                </div>
              </div>
              
              <Tabs defaultValue="tables" className="mb-6" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3">
                  <TabsTrigger value="tables">Plan des Tables</TabsTrigger>
                  <TabsTrigger value="reservations">Réservations</TabsTrigger>
                  <TabsTrigger value="orders">Commandes</TabsTrigger>
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
                              {table.orders && <p className="font-medium">{table.orders}</p>}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reservations" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client</TableHead>
                          <TableHead>Heure</TableHead>
                          <TableHead>Pers.</TableHead>
                          <TableHead>Table</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reservations.map((res) => (
                          <TableRow key={res.id}>
                            <TableCell>{res.name}</TableCell>
                            <TableCell>{res.time}</TableCell>
                            <TableCell>{res.people}</TableCell>
                            <TableCell>
                              {res.table ? `Table ${res.table}` : '-'}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                res.status === 'Confirmé' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {res.status}
                              </span>
                            </TableCell>
                            <TableCell>
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
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="orders" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commande #</TableHead>
                          <TableHead>Table</TableHead>
                          <TableHead>Heure</TableHead>
                          <TableHead>Éléments</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>#{order.id}</TableCell>
                            <TableCell>Table {order.tableId}</TableCell>
                            <TableCell>{order.time}</TableCell>
                            <TableCell>{order.items.length} plat(s)</TableCell>
                            <TableCell>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'En attente' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : order.status === 'En préparation'
                                    ? 'bg-blue-100 text-blue-800'
                                    : order.status === 'Prêt'
                                      ? 'bg-green-100 text-green-800'
                                      : order.status === 'Servi'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-primary hover:text-primary-dark"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderDetails(true);
                                }}
                              >
                                Détails
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Dialogue pour le formulaire de commande */}
      <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle commande - Table {selectedTable}</DialogTitle>
            <DialogDescription>
              Ajoutez une commande pour cette table.
            </DialogDescription>
          </DialogHeader>
          {selectedTable && (
            <TableOrderForm 
              tableId={selectedTable} 
              onClose={() => setShowOrderForm(false)} 
              onSubmit={handleAddOrder}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Dialogue pour les détails de commande */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la commande - Table {selectedOrder?.tableId}</DialogTitle>
            <DialogDescription>
              Commande #{selectedOrder?.id} - {selectedOrder?.time}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Éléments commandés</h3>
              <ul className="space-y-2">
                {selectedOrder?.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                      {item.notes && <span className="text-xs text-gray-500 block">{item.notes}</span>}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'En attente' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : item.status === 'En préparation'
                          ? 'bg-blue-100 text-blue-800'
                          : item.status === 'Prêt'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between">
              <p>Statut: <span className="font-medium">{selectedOrder?.status}</span></p>
            </div>
            
            <div className="flex justify-end gap-2">
              {selectedOrder?.status !== "Terminé" && (
                <>
                  {selectedOrder?.status === "En attente" && (
                    <Button
                      variant="outline" 
                      onClick={() => selectedOrder && updateOrderStatus(selectedOrder.id, "En préparation")}
                    >
                      <ChefHat className="mr-2" size={16} />
                      En préparation
                    </Button>
                  )}
                  
                  {selectedOrder?.status === "En préparation" && (
                    <Button
                      variant="outline"
                      onClick={() => selectedOrder && updateOrderStatus(selectedOrder.id, "Prêt")}
                    >
                      <Utensils className="mr-2" size={16} />
                      Prêt à servir
                    </Button>
                  )}
                  
                  {selectedOrder?.status === "Prêt" && (
                    <Button
                      variant="outline"
                      onClick={() => selectedOrder && updateOrderStatus(selectedOrder.id, "Servi")}
                    >
                      Servi
                    </Button>
                  )}
                  
                  {selectedOrder?.status === "Servi" && (
                    <Button
                      variant="outline"
                      onClick={() => selectedOrder && updateOrderStatus(selectedOrder.id, "Terminé")}
                    >
                      Terminer
                    </Button>
                  )}
                </>
              )}
              
              <Button 
                variant="ghost" 
                onClick={() => setShowOrderDetails(false)}
              >
                Fermer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue pour assigner une table à une réservation */}
      <Dialog open={assignTableDialog} onOpenChange={setAssignTableDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assigner une table</DialogTitle>
            <DialogDescription>
              Choisissez une table pour la réservation de {selectedReservation?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {tables
              .filter(table => table.status === "available")
              .map(table => (
                <Button
                  key={table.id}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => assignTableToReservation(table.id)}
                >
                  <span className="text-lg font-medium">Table {table.id}</span>
                  <span className="text-xs text-green-600">Disponible</span>
                </Button>
              ))}
              
            {tables.filter(table => table.status === "available").length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                Aucune table disponible. Veuillez libérer une table d'abord.
              </p>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            onClick={() => setAssignTableDialog(false)}
            className="mt-4"
          >
            Annuler
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServeurChefDashboard;
