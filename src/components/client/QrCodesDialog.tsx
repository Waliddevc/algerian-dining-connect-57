
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { QrCode } from "lucide-react";

interface QrCodesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QrCodesDialog = ({ open, onOpenChange }: QrCodesDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>("reservations");

  // Mock data for reservations and orders
  const reservations = [
    {
      id: "res-12345",
      date: "2023-06-15",
      time: "19:30",
      guests: 4,
      qrData: "reservation:res-12345"
    },
    {
      id: "res-12346",
      date: "2023-07-01",
      time: "20:00",
      guests: 2,
      qrData: "reservation:res-12346"
    }
  ];

  const orders = [
    {
      id: "ord-12345",
      date: "2023-05-15",
      total: 24.97,
      qrData: "order:ord-12345"
    },
    {
      id: "ord-12340",
      date: "2023-05-10",
      total: 25.98,
      qrData: "order:ord-12340"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <QrCode className="h-5 w-5" />
            Mes QR Codes
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reservations">Réservations</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
          </TabsList>

          <TabsContent value="reservations" className="mt-4">
            {reservations.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {reservations.map((reservation) => (
                  <Card key={reservation.id} className="p-4">
                    <div className="text-center mb-2">
                      <p className="font-semibold">{new Date(reservation.date).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">{reservation.time} - {reservation.guests} personne(s)</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg flex justify-center">
                      {/* Using SVG to create a simple QR code visual representation */}
                      <svg viewBox="0 0 100 100" width="100" height="100" className="border">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <g transform="scale(4)">
                          {Array.from({ length: 5 }).map((_, row) => (
                            Array.from({ length: 5 }).map((_, col) => (
                              ((row === 0 || row === 4) && (col < 3 || col === 4)) || 
                              ((col === 0 || col === 4) && (row < 3 || row === 4)) || 
                              (row === 2 && col === 2) ? (
                                <rect key={`${row}-${col}`} x={row*5} y={col*5} width="4" height="4" fill="black" />
                              ) : null
                            ))
                          ))}
                        </g>
                        <text x="50" y="60" textAnchor="middle" fontSize="10">Réservation</text>
                        <text x="50" y="75" textAnchor="middle" fontSize="8">#{reservation.id}</text>
                      </svg>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">Aucune réservation disponible</p>
            )}
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            {orders.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {orders.map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="text-center mb-2">
                      <p className="font-semibold">Commande #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()} - {order.total.toFixed(2)}€</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg flex justify-center">
                      {/* Using SVG to create a simple QR code visual representation */}
                      <svg viewBox="0 0 100 100" width="100" height="100" className="border">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <g transform="scale(4)">
                          {Array.from({ length: 5 }).map((_, row) => (
                            Array.from({ length: 5 }).map((_, col) => (
                              ((row === 0 || row === 4) && (col < 3 || col === 4)) || 
                              ((col === 0 || col === 4) && (row < 3 || row === 4)) || 
                              (row === 2 && col === 2) ? (
                                <rect key={`${row}-${col}`} x={row*5} y={col*5} width="4" height="4" fill="black" />
                              ) : null
                            ))
                          ))}
                        </g>
                        <text x="50" y="60" textAnchor="middle" fontSize="10">Commande</text>
                        <text x="50" y="75" textAnchor="middle" fontSize="8">#{order.id}</text>
                      </svg>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">Aucune commande disponible</p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QrCodesDialog;
