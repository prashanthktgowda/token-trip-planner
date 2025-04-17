
import { Card } from "@/components/ui/card";
import { Coins, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const TokenSystem = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg bg-gradient-to-br from-indigo-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
          <Coins className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
        </div>
        <h3 className="text-xl font-semibold">Token System</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Manage your trip expenses effortlessly with our token-based system. One token equals one INR, 
        making expense tracking intuitive and straightforward.
      </p>
      <div className="flex items-center text-indigo-600 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-200 transition-colors">
        Learn more <ArrowRight className="ml-2 w-4 h-4" />
      </div>
    </motion.div>
  );
};
