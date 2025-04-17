
import { Card } from "@/components/ui/card";
import { Map, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const RouteMapping = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 rounded-lg bg-gradient-to-br from-green-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
          <Map className="w-6 h-6 text-green-600 dark:text-green-300" />
        </div>
        <h3 className="text-xl font-semibold">Route Mapping</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Plan your journey with interactive maps. Mark points of interest, optimize routes,
        and share them with your travel companions.
      </p>
      <div className="flex items-center text-green-600 dark:text-green-300 hover:text-green-700 dark:hover:text-green-200 transition-colors">
        Explore maps <ArrowRight className="ml-2 w-4 h-4" />
      </div>
    </motion.div>
  );
};
