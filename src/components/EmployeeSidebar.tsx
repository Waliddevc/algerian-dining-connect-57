
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

interface EmployeeSidebarProps {
  title: string;
  role: string;
  menuItems: SidebarItemProps[];
}

const SidebarItem = ({ icon, label, onClick }: SidebarItemProps) => (
  <Button variant="ghost" className="justify-start gap-3 mb-2 w-full" onClick={onClick}>
    {icon}
    {label}
  </Button>
);

const EmployeeSidebar = ({ title, role, menuItems }: EmployeeSidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex w-64 flex-col bg-white shadow-md"
    >
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-2 px-3">
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
      </div>
      
      <div className="p-4 border-t">
        <Button variant="ghost" className="justify-start gap-3 mb-2 w-full">
          <Settings size={18} />
          Paramètres
        </Button>
        <Button 
          variant="outline" 
          className="justify-start gap-3 w-full"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Déconnexion
        </Button>
      </div>
    </motion.div>
  );
};

export default EmployeeSidebar;
