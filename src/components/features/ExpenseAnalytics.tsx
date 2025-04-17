
import { Card } from "@/components/ui/card";
import { LineChart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const ExpenseAnalytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="p-6 rounded-lg bg-gradient-to-br from-purple-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
          <LineChart className="w-6 h-6 text-purple-600 dark:text-purple-300" />
        </div>
        <h3 className="text-xl font-semibold">Expense Analytics</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Get detailed insights into your travel expenses. View charts, download reports,
        and make informed decisions about your spending.
      </p>
      <div className="flex items-center text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 transition-colors">
        View analytics <ArrowRight className="ml-2 w-4 h-4" />
      </div>
    </motion.div>
  );
};
