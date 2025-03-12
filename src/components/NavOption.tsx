
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

interface NavOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  delay: number;
}

const NavOption = ({ icon, title, description, to, delay }: NavOptionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Link
        to={to}
        className="flex flex-col items-center p-6 bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[280px] space-y-4"
      >
        <div className="p-4 rounded-full bg-accent-light/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-primary">{title}</h2>
        <p className="text-sm text-gray-600 text-center">{description}</p>
      </Link>
    </motion.div>
  );
};

export default NavOption;
