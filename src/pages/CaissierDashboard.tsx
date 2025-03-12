
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Receipt, DollarSign, Calendar, CreditCard, 
  Home, Search, User, Printer, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentDialogProps {
  tableId: number;
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onProcessPayment: (method: string) => void;
}

const PaymentDialog = ({ tableId, total, isOpen, onClose, onProcessPayment }: PaymentDialogProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  
  const handlePayment = () => {
    if (!selectedMethod) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une méthode de paiement",
        variant: "destructive",
      });
      return;
    }
    onProcessPayment(selectedMethod);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Traitement du paiement - Table {tableId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-lg font-semibold">
            Total à payer: {total.toFixed(2)} DA
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedMethod === "Carte" ? "default" : "outline"}
              onClick={() => setSelectedMethod("Carte")}
            >
              <CreditCard className="mr-2" />
              Carte Bancaire
            </Button>
            <Button
              variant={selectedMethod === "Espèces" ? "default" : "outline"}
              onClick={() => setSelectedMethod("Espèces")}
            >
              <DollarSign className="mr-2" />
              Espèces
            </Button>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handlePayment}>
              <CheckCircle className="mr-2" />
              Valider
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CaissierDashboard = () => {
  const [activeTab, setActiveTab] = useState("paiements");
  const [tableSearch, setTableSearch] = useState("");
  const [selectedTable, setSelectedTable] = useState<{ id: number; total: number } | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  // Mock data for tables with bills
  const tables = [
    { id: 1, total: 156.50, items: 8, status: "ready", customers: 4, time: "19:30" },
    { id: 5, total: 223.75, items: 12, status: "ready", customers: 6, time: "19:15" },
    { id: 6, total: 78.25, items: 4, status: "ready", customers: 2, time: "20:15" },
  ];

  // Mock data for recent transactions
  const [transactions, setTransactions] = useState([
    { id: 1001, table: 2, amount: 145.50, method: "Carte", time: "19:40", status: "completed" },
    { id: 1002, table: 4, amount: 187.25, method: "Espèces", time: "19:25", status: "completed" },
    { id: 1003, table: 8, amount: 93.00, method: "Carte", time: "18:55", status: "completed" },
  ]);

  const handlePayment = (tableId: number, total: number) => {
    setSelectedTable({ id: tableId, total });
    setIsPaymentDialogOpen(true);
  };

  const handleProcessPayment = (method: string) => {
    if (!selectedTable) return;

    const newTransaction = {
      id: Date.now(),
      table: selectedTable.id,
      amount: selectedTable.total,
      method,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: "completed"
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: "Paiement traité",
      description: `Paiement de ${selectedTable.total.toFixed(2)} DA par ${method} traité avec succès`
    });
    
    setSelectedTable(null);
  };

  const handlePrintReceipt = (transactionId: number) => {
    toast({
      title: `Reçu #${transactionId}`,
      description: "Impression démarrée",
    });
  };

  const filteredTables = tables.filter(table => 
    tableSearch === "" || table.id.toString().includes(tableSearch)
  );

  const sidebarMenuItems = [
    { icon: <Receipt size={18} />, label: "Paiements" },
    { icon: <DollarSign size={18} />, label: "Transactions" },
    { icon: <Calendar size={18} />, label: "Historique" },
    { icon: <User size={18} />, label: "Profil" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <EmployeeSidebar 
          title="Restaurant Algérien" 
          role="Caissier"
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
                  <h1 className="text-2xl font-bold text-primary">Caisse</h1>
                  <p className="text-gray-600">Gestion des paiements</p>
                </div>
              </div>
              
              <Tabs defaultValue="paiements" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="paiements">Paiements en attente</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions récentes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="paiements" className="mt-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex items-center">
                      <Search size={20} className="text-gray-400 mr-2" />
                      <Input
                        type="text"
                        placeholder="Rechercher par numéro de table..."
                        value={tableSearch}
                        onChange={(e) => setTableSearch(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTables.map((table) => (
                      <motion.div
                        key={table.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-5 rounded-lg shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-medium text-lg">Table {table.id}</h3>
                          <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                            Prêt à payer
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total</span>
                            <span className="font-semibold">{table.total.toFixed(2)} DA</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Articles</span>
                            <span>{table.items}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Clients</span>
                            <span>{table.customers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Heure d'arrivée</span>
                            <span>{table.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            className="flex-1"
                            onClick={() => handlePayment(table.id, table.total)}
                          >
                            <CreditCard size={16} className="mr-1" />
                            Paiement
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handlePrintReceipt(table.id)}
                          >
                            <Printer size={16} className="mr-1" />
                            Imprimer
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="transactions" className="mt-6">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td className="px-6 py-4 whitespace-nowrap">#{transaction.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">Table {transaction.table}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{transaction.amount.toFixed(2)} DA</td>
                            <td className="px-6 py-4 whitespace-nowrap">{transaction.method}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{transaction.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handlePrintReceipt(transaction.id)}
                              >
                                <Printer size={16} className="mr-1" />
                                Imprimer
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
      
      {/* Payment Dialog */}
      {selectedTable && (
        <PaymentDialog
          tableId={selectedTable.id}
          total={selectedTable.total}
          isOpen={isPaymentDialogOpen}
          onClose={() => setIsPaymentDialogOpen(false)}
          onProcessPayment={handleProcessPayment}
        />
      )}
    </div>
  );
};

export default CaissierDashboard;
