
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Book, Utensils, Receipt, QrCode, 
  Star, ShoppingBag, LogOut, ShoppingCart,
  Home, ArrowLeft, MoreVertical, UserCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliveryItem } from "@/components/types/Delivery";
import MenuComponent from "@/components/client/MenuComponent";
import CartComponent from "@/components/client/CartComponent";
import OrderHistoryComponent from "@/components/client/OrderHistoryComponent";
import TableReservationComponent from "@/components/client/TableReservationComponent";
import RatingComponent from "@/components/client/RatingComponent";
import { Card } from "@/components/ui/card";
import ProfileDialog from "@/components/ProfileDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cartItems, setCartItems] = useState<DeliveryItem[]>([]);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  
  const menuOptions = [
    { 
      icon: <Utensils size={24} />, 
      title: "Commander en ligne", 
      description: "Accédez au menu et commandez à distance",
      action: () => setActiveTab("order")
    },
    { 
      icon: <Book size={24} />, 
      title: "Réserver une table", 
      description: "Choisissez votre date et heure préférées",
      action: () => setActiveTab("reservation")
    },
    { 
      icon: <QrCode size={24} />, 
      title: "Scanner QR Code", 
      description: "Connectez-vous instantanément à votre table",
      action: () => toast({ title: "Scanner activé", description: "Veuillez pointer votre caméra vers le QR code de votre table" })
    },
    { 
      icon: <Receipt size={24} />, 
      title: "Mes additions", 
      description: "Consultez vos factures et historique",
      action: () => setActiveTab("history")
    },
    { 
      icon: <Star size={24} />, 
      title: "Recommandations", 
      description: "Découvrez nos suggestions personnalisées",
      action: () => setActiveTab("recommendations")
    },
    { 
      icon: <ShoppingBag size={24} />, 
      title: "Commandes actives", 
      description: "Suivez vos commandes en cours",
      action: () => setActiveTab("active-orders")
    },
  ];

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  const addToCart = (item: DeliveryItem) => {
    // Check if item already exists in cart
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // Update quantity if item exists
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      // Add new item to cart
      setCartItems([...cartItems, item]);
    }
    
    toast({
      title: "Ajouté au panier",
      description: `${item.name} a été ajouté à votre panier`
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    
    toast({
      title: "Retiré du panier",
      description: "L'article a été retiré de votre panier"
    });
  };

  const updateCartItemQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Panier vide",
        description: "Veuillez ajouter des articles à votre panier",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simulating order submission
    toast({
      title: "Commande confirmée",
      description: `Votre commande de ${total.toFixed(2)}€ a été reçue`
    });
    
    // Clear cart after successful order
    setCartItems([]);
    
    // Redirect to active orders tab
    setActiveTab("active-orders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <Home size={20} />
            </Button>
          </div>
          <h1 className="text-xl font-semibold text-primary">Espace Client</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary">Bienvenue, Client</h2>
              <p className="text-gray-600">Que souhaitez-vous faire aujourd'hui?</p>
            </div>
            <div className="flex items-center gap-4">
              {cartItems.length > 0 && (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setActiveTab("cart")}
                >
                  <ShoppingCart size={16} />
                  Panier ({cartItems.length})
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-7 w-full mb-6">
            <TabsTrigger value="dashboard">Accueil</TabsTrigger>
            <TabsTrigger value="order">Commander</TabsTrigger>
            <TabsTrigger value="reservation">Réserver</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="recommendations">Suggestions</TabsTrigger>
            <TabsTrigger value="active-orders">Commandes</TabsTrigger>
            <TabsTrigger value="cart">Panier</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={option.action}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-6 flex flex-col items-center text-center cursor-pointer">
                    <div className="p-3 rounded-full bg-accent/10 text-accent mb-4">
                      {option.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="order">
            <MenuComponent addToCart={addToCart} />
          </TabsContent>

          <TabsContent value="cart">
            <CartComponent 
              cartItems={cartItems} 
              updateQuantity={updateCartItemQuantity} 
              removeItem={removeFromCart}
              placeOrder={placeOrder}
            />
          </TabsContent>

          <TabsContent value="history">
            <OrderHistoryComponent />
          </TabsContent>

          <TabsContent value="reservation">
            <TableReservationComponent />
          </TabsContent>

          <TabsContent value="recommendations">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Nos recommandations pour vous</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 1, name: "Couscous Royal", price: 18.99, image: "/placeholder.svg", description: "Notre plat signature, un délicieux couscous avec agneau, poulet et merguez" },
                  { id: 7, name: "Baklava", price: 6.99, image: "/placeholder.svg", description: "Pâtisserie traditionnelle au miel et aux noix" },
                  { id: 3, name: "Pastilla au Poulet", price: 15.99, image: "/placeholder.svg", description: "Tourte feuilletée sucrée-salée garnie de poulet et d'amandes" }
                ].map(item => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-lg shadow p-4"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3" />
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{item.price.toFixed(2)}€</span>
                      <Button size="sm" onClick={() => addToCart({ ...item, quantity: 1 } as DeliveryItem)}>
                        Ajouter
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="active-orders">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Vos commandes actives</h2>
              <div className="space-y-4">
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">Commande #12345</h3>
                      <p className="text-sm text-gray-600">Passée il y a 15 minutes</p>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">En préparation</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-3">
                    <li>1x Tajine Poulet</li>
                    <li>2x Mint Tea</li>
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total: 24.97€</span>
                    <Button size="sm" variant="outline" onClick={() => setActiveTab("history")}>
                      Détails
                    </Button>
                  </div>
                </div>
                
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">Commande #12340</h3>
                      <p className="text-sm text-gray-600">Passée hier</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Prête pour livraison</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-3">
                    <li>1x Couscous Royal</li>
                    <li>1x Baklava</li>
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total: 25.98€</span>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setActiveTab("history")}>
                        Détails
                      </Button>
                      <Button size="sm" onClick={() => toast({ title: "Livraison confirmée", description: "Votre commande arrivera dans 30 minutes" })}>
                        Confirmer livraison
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ProfileDialog 
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        initialData={{
          name: "Client Utilisateur",
          email: "client@restaurant.dz",
          phone: "0555123456",
        }}
      />
    </div>
  );
};

export default ClientDashboard;
