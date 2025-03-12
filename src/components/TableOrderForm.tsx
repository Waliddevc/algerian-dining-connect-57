
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface TableOrderFormProps {
  tableId: number;
  onClose: () => void;
}

const menuItems = [
  { id: 1, name: "Couscous Royal", price: 18.99 },
  { id: 2, name: "Tajine Poulet", price: 16.99 },
  { id: 3, name: "Pastilla au Poulet", price: 15.99 },
  { id: 4, name: "Méchoui", price: 24.99 },
  { id: 5, name: "Mint Tea", price: 3.99 },
];

export const TableOrderForm = ({ tableId, onClose }: TableOrderFormProps) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItem) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un plat",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Commande envoyée",
      description: `Commande pour la table ${tableId} envoyée en cuisine`,
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="dish">Plat</Label>
        <Select value={selectedItem} onValueChange={setSelectedItem}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un plat" />
          </SelectTrigger>
          <SelectContent>
            {menuItems.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name} - {item.price}€
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantité</Label>
        <Input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes spéciales</Label>
        <Input
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Sans gluten, épicé, etc."
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          Commander
        </Button>
      </div>
    </form>
  );
};
