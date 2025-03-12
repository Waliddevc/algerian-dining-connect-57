
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { DeliveryItem } from "@/components/types/Delivery";

interface MenuComponentProps {
  addToCart: (item: DeliveryItem) => void;
}

const MenuComponent = ({ addToCart }: MenuComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const menuItems = [
    { id: 1, name: "Couscous Royal", price: 18.99, category: "plats", image: "/placeholder.svg", description: "Un délicieux couscous avec agneau, poulet et merguez" },
    { id: 2, name: "Tajine Poulet", price: 16.99, category: "plats", image: "/placeholder.svg", description: "Tajine traditionnel au poulet et olives" },
    { id: 3, name: "Pastilla au Poulet", price: 15.99, category: "entrées", image: "/placeholder.svg", description: "Tourte feuilletée sucrée-salée garnie de poulet et d'amandes" },
    { id: 4, name: "Méchoui", price: 24.99, category: "plats", image: "/placeholder.svg", description: "Agneau rôti aux épices" },
    { id: 5, name: "Mint Tea", price: 3.99, category: "boissons", image: "/placeholder.svg", description: "Thé à la menthe fraîche" },
    { id: 6, name: "Brick à l'œuf", price: 7.99, category: "entrées", image: "/placeholder.svg", description: "Feuille de brick croustillante garnie d'œuf et de persil" },
    { id: 7, name: "Baklava", price: 6.99, category: "desserts", image: "/placeholder.svg", description: "Pâtisserie traditionnelle au miel et aux noix" },
    { id: 8, name: "Orange Cannelle", price: 5.99, category: "desserts", image: "/placeholder.svg", description: "Oranges fraîches à la cannelle et eau de fleur d'oranger" },
    { id: 9, name: "Limonade maison", price: 4.50, category: "boissons", image: "/placeholder.svg", description: "Limonade fraîche à la menthe" },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", name: "Tous" },
    { id: "entrées", name: "Entrées" },
    { id: "plats", name: "Plats principaux" },
    { id: "desserts", name: "Desserts" },
    { id: "boissons", name: "Boissons" }
  ];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Notre Menu</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Rechercher un plat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6 flex w-full justify-start overflow-auto">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems
                .filter(item => category.id === "all" || item.category === category.id)
                .map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{item.price.toFixed(2)}€</span>
                      <Button size="sm" onClick={() => addToCart({ ...item, quantity: 1 } as DeliveryItem)}>
                        Ajouter au panier
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default MenuComponent;
