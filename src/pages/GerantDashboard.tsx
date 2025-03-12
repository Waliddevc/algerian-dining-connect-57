
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, Users, PackageCheck, TrendingUp, 
  Home, Calendar, Settings, User, ChefHat, Truck,
  PieChart, FileText, Filter, Download, Plus, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// New components for the manager dashboard
const StaffDialog = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [shift, setShift] = useState("");

  const handleSubmit = () => {
    if (!name || !role || !shift) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Employé ajouté",
      description: `${name} a été ajouté en tant que ${role}`,
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Ajouter un nouvel employé</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Ahmed Boudiaf"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Poste</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un poste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Serveur Chef">Serveur Chef</SelectItem>
              <SelectItem value="Serveur Salle">Serveur Salle</SelectItem>
              <SelectItem value="Cuisinier">Cuisinier</SelectItem>
              <SelectItem value="Caissier">Caissier</SelectItem>
              <SelectItem value="Livreur">Livreur</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="shift">Horaire</Label>
          <Select value={shift} onValueChange={setShift}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un horaire" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="16:00 - 23:00">16:00 - 23:00</SelectItem>
              <SelectItem value="18:00 - 23:00">18:00 - 23:00</SelectItem>
              <SelectItem value="19:00 - 00:00">19:00 - 00:00</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Ajouter</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const InventoryDialog = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");

  const handleSubmit = () => {
    if (!name || !quantity || !unit) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Produit ajouté",
      description: `${name} (${quantity} ${unit}) a été ajouté à l'inventaire`,
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Ajouter un produit à l'inventaire</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nom du produit</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Semoule"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quantity">Quantité</Label>
          <Input 
            id="quantity" 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            placeholder="10"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="unit">Unité</Label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une unité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="L">L</SelectItem>
              <SelectItem value="unités">unités</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Ajouter</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const ReportGenerator = () => {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("week");

  const handleGenerateReport = () => {
    toast({
      title: "Rapport généré",
      description: `Le rapport de ${
        reportType === "sales" ? "ventes" : 
        reportType === "inventory" ? "inventaire" : 
        reportType === "staffPerformance" ? "performance du personnel" : 
        "activité"
      } pour ${
        dateRange === "day" ? "aujourd'hui" : 
        dateRange === "week" ? "cette semaine" : 
        dateRange === "month" ? "ce mois" : 
        "cette année"
      } a été généré.`,
    });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-medium mb-4">Générateur de Rapports</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="reportType">Type de rapport</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type de rapport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Rapport de ventes</SelectItem>
              <SelectItem value="inventory">Rapport d'inventaire</SelectItem>
              <SelectItem value="staffPerformance">Performance du personnel</SelectItem>
              <SelectItem value="activity">Journal d'activité</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dateRange">Période</Label>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleGenerateReport} className="mt-2">
          <FileText className="mr-2 h-4 w-4" />
          Générer le rapport
        </Button>
      </div>
    </div>
  );
};

const FinancialAnalytics = () => {
  // Mock data for financial analytics
  const monthlyData = [
    { month: 'Jan', revenue: 420000, expenses: 310000, profit: 110000 },
    { month: 'Fév', revenue: 430000, expenses: 315000, profit: 115000 },
    { month: 'Mar', revenue: 450000, expenses: 325000, profit: 125000 },
    { month: 'Avr', revenue: 480000, expenses: 330000, profit: 150000 },
    { month: 'Mai', revenue: 520000, expenses: 345000, profit: 175000 },
    { month: 'Juin', revenue: 540000, expenses: 350000, profit: 190000 },
  ];

  const expenseCategories = [
    { category: 'Ingrédients', amount: 145000 },
    { category: 'Salaires', amount: 120000 },
    { category: 'Loyer', amount: 45000 },
    { category: 'Utilities', amount: 25000 },
    { category: 'Marketing', amount: 15000 },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-medium mb-4">Analyse Financière</h3>
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">Revenus et Dépenses</h4>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip formatter={(value) => [`${(value as number).toLocaleString()} DA`, '']} />
              <Bar name="Revenus" dataKey="revenue" fill="#5c6ac4" radius={[4, 4, 0, 0]} />
              <Bar name="Dépenses" dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h4 className="text-md font-medium mb-2">Dépenses par Catégorie</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead className="text-right">Pourcentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseCategories.map((category) => (
              <TableRow key={category.category}>
                <TableCell>{category.category}</TableCell>
                <TableCell className="text-right">{category.amount.toLocaleString()} DA</TableCell>
                <TableCell className="text-right">
                  {Math.round((category.amount / expenseCategories.reduce((sum, cat) => sum + cat.amount, 0)) * 100)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const GerantDashboard = () => {
  const [activeTab, setActiveTab] = useState("apercu");
  const [staffSearch, setStaffSearch] = useState("");
  const [inventorySearch, setInventorySearch] = useState("");
  const [inventoryFilter, setInventoryFilter] = useState("all");

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

  const filteredStaff = staff.filter(employee => 
    employee.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
    employee.role.toLowerCase().includes(staffSearch.toLowerCase())
  );

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(inventorySearch.toLowerCase());
    const matchesFilter = 
      inventoryFilter === "all" || 
      (inventoryFilter === "low" && (item.status === "low" || item.status === "critical")) ||
      (inventoryFilter === "critical" && item.status === "critical");
    
    return matchesSearch && matchesFilter;
  });

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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      Générer Rapport
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Générer un rapport</DialogTitle>
                    </DialogHeader>
                    <ReportGenerator />
                  </DialogContent>
                </Dialog>
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="apercu">Aperçu</TabsTrigger>
                  <TabsTrigger value="personnel">Personnel</TabsTrigger>
                  <TabsTrigger value="inventaire">Inventaire</TabsTrigger>
                  <TabsTrigger value="finances">Finances</TabsTrigger>
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
                          <RechartsTooltip formatter={(value) => [`${value} DA`, 'Ventes']} />
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
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1 mr-4">
                        <Search size={20} className="text-gray-400 mr-2" />
                        <Input
                          type="text"
                          placeholder="Rechercher un employé..."
                          value={staffSearch}
                          onChange={(e) => setStaffSearch(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="whitespace-nowrap">
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter
                          </Button>
                        </DialogTrigger>
                        <StaffDialog />
                      </Dialog>
                    </div>
                  </div>

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
                        {filteredStaff.map((employee) => (
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
                                onClick={() => handleAction("Employé", employee.id, "modifier")}
                              >
                                Modifier
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="inventaire" className="mt-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center flex-1">
                        <Search size={20} className="text-gray-400 mr-2" />
                        <Input
                          type="text"
                          placeholder="Rechercher un ingrédient..."
                          value={inventorySearch}
                          onChange={(e) => setInventorySearch(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={inventoryFilter} onValueChange={setInventoryFilter}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrer par statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous</SelectItem>
                            <SelectItem value="low">Faible</SelectItem>
                            <SelectItem value="critical">Critique</SelectItem>
                          </SelectContent>
                        </Select>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              Ajouter
                            </Button>
                          </DialogTrigger>
                          <InventoryDialog />
                        </Dialog>
                      </div>
                    </div>
                  </div>

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
                        {filteredInventory.map((item) => (
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

                <TabsContent value="finances" className="mt-6">
                  <FinancialAnalytics />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium mb-4">Revenus par Source</h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Repas sur place</span>
                          <span className="font-medium">320,500 DA</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Livraisons</span>
                          <span className="font-medium">120,300 DA</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Événements</span>
                          <span className="font-medium">55,200 DA</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium mb-4">Performance Financière</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Marge bénéficiaire</span>
                            <span className="font-medium text-green-600">28.5%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '28.5%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Coût des ingrédients</span>
                            <span className="font-medium text-yellow-600">42%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Coût du personnel</span>
                            <span className="font-medium text-orange-600">25%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span>Comparaison avec le mois dernier</span>
                            <span className="font-medium text-green-600">+4.5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg shadow-sm md:col-span-2">
                      <h3 className="text-lg font-medium mb-4">Actions Recommandées</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
                          <h4 className="font-medium mb-2">Augmenter les stocks</h4>
                          <p className="text-sm text-gray-600 mb-3">Les niveaux de Poulet et Tomates sont faibles.</p>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => toast({ title: "Commander", description: "Commande de réapprovisionnement initiée" })}>
                            Commander
                          </Button>
                        </div>
                        
                        <div className="p-3 border border-green-100 rounded-lg bg-green-50">
                          <h4 className="font-medium mb-2">Promotion de plats</h4>
                          <p className="text-sm text-gray-600 mb-3">Tajine de poulet est sous-performant ce mois-ci.</p>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => toast({ title: "Promotion", description: "Promotion créée pour Tajine de poulet" })}>
                            Créer promotion
                          </Button>
                        </div>
                        
                        <div className="p-3 border border-purple-100 rounded-lg bg-purple-50">
                          <h4 className="font-medium mb-2">Analyse client</h4>
                          <p className="text-sm text-gray-600 mb-3">Nouvelles habitudes de commande détectées.</p>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => toast({ title: "Analyse", description: "Rapport d'analyse client généré" })}>
                            Analyser
                          </Button>
                        </div>
                      </div>
                    </div>
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
