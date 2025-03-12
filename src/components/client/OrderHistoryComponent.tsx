
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp, FileDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import RatingComponent from "./RatingComponent";

const OrderHistoryComponent = () => {
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  
  const orderHistory = [
    {
      id: 12345,
      date: "2023-05-15",
      status: "Livré",
      total: 24.97,
      items: [
        { name: "Tajine Poulet", quantity: 1, price: 16.99 },
        { name: "Mint Tea", quantity: 2, price: 3.99 }
      ],
      rated: true,
      rating: 5
    },
    {
      id: 12340,
      date: "2023-05-10",
      status: "Livré",
      total: 25.98,
      items: [
        { name: "Couscous Royal", quantity: 1, price: 18.99 },
        { name: "Baklava", quantity: 1, price: 6.99 }
      ],
      rated: true,
      rating: 4
    },
    {
      id: 12335,
      date: "2023-05-01",
      status: "Livré",
      total: 38.97,
      items: [
        { name: "Méchoui", quantity: 1, price: 24.99 },
        { name: "Brick à l'œuf", quantity: 1, price: 7.99 },
        { name: "Limonade maison", quantity: 1, price: 5.99 }
      ],
      rated: false
    }
  ];

  const toggleOrderExpansion = (orderId: number) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter(id => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  const downloadInvoice = (orderId: number) => {
    toast({
      title: "Téléchargement démarré",
      description: `Facture #${orderId} en cours de téléchargement`
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Historique des commandes</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Détails</TableHead>
            <TableHead>Commande</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderHistory.map((order) => (
            <>
              <TableRow key={order.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    {expandedOrders.includes(order.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">{order.total.toFixed(2)}€</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    onClick={() => downloadInvoice(order.id)}
                  >
                    <FileDown className="h-4 w-4 mr-1" /> Facture
                  </Button>
                </TableCell>
              </TableRow>
              
              {expandedOrders.includes(order.id) && (
                <TableRow key={`expanded-${order.id}`}>
                  <TableCell colSpan={6}>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-2"
                    >
                      <h4 className="font-medium mb-2">Articles commandés</h4>
                      <ul className="space-y-1 mb-4">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-sm">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>{(item.price * item.quantity).toFixed(2)}€</span>
                          </li>
                        ))}
                      </ul>
                      
                      {order.rated ? (
                        <div className="mt-2">
                          <h4 className="font-medium mb-1">Votre évaluation</h4>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-lg ${
                                  star <= (order.rating || 0)
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <h4 className="font-medium mb-1">Évaluez votre commande</h4>
                          <RatingComponent orderId={order.id} />
                        </div>
                      )}
                    </motion.div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default OrderHistoryComponent;
