
import { motion } from "framer-motion";
import { UserPlus, LogIn, Users } from "lucide-react";
import NavOption from "@/components/NavOption";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Restaurant Algérien
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Bienvenue dans notre système de gestion intégré
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NavOption
          icon={<UserPlus size={24} />}
          title="Inscription"
          description="Inscrivez-vous en tant que client ou employé"
          to="/register"
          delay={0.2}
        />
        <NavOption
          icon={<LogIn size={24} />}
          title="Espace Client"
          description="Accédez à votre espace personnel"
          to="/client-login"
          delay={0.4}
        />
        <NavOption
          icon={<Users size={24} />}
          title="Espace Employé"
          description="Connectez-vous à votre espace de travail"
          to="/employee-login"
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default Index;
