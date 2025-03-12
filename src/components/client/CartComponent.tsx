
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { DeliveryItem } from "@/components/types/Delivery";

interface CartComponentProps {
  cartItems: DeliveryItem[];
  updateQuantity: (itemId: number, newQuantity: number) => void;
  removeItem: (itemId: number) => void;
  placeOrder: () => void;
}

const CartComponent = ({ 
  cartItems, 
  updateQuantity, 
  removeItem, 
  placeOrder 
}: CartComponentProps) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10; // 10% tax
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Votre panier est vide</h2>
        <p className="text-gray-600 mb-6">Ajoutez des articles depuis notre menu pour commencer votre commande</p>
        <Button variant="outline">Voir le menu</Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Votre panier</h2>
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.price.toFixed(2)}€</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <span className="font-medium w-20 text-right">
                {(item.price * item.quantity).toFixed(2)}€
              </span>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-500 h-8 w-8"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="space-y-2 p-4 bg-gray-50 rounded-lg mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Sous-total</span>
          <span>{subtotal.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">TVA (10%)</span>
          <span>{tax.toFixed(2)}€</span>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>{total.toFixed(2)}€</span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button variant="outline" className="sm:w-auto" onClick={() => cartItems.length = 0}>
          Vider le panier
        </Button>
        <Button 
          className="sm:w-auto"
          onClick={placeOrder}
        >
          Commander ({total.toFixed(2)}€)
        </Button>
      </div>
    </Card>
  );
};

export default CartComponent;
