
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TokenSystem } from "@/components/features/TokenSystem";
import { RouteMapping } from "@/components/features/RouteMapping";
import { ExpenseAnalytics } from "@/components/features/ExpenseAnalytics";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/30 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Features of <span className="text-indigo-600 dark:text-indigo-400">TokenTrip</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover all the powerful features that make TokenTrip the ultimate travel planning tool.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-lg px-8"
            asChild
          >
            <Link to="/start">Start Planning</Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
          <TokenSystem />
          <RouteMapping />
          <ExpenseAnalytics />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to Start Your Journey?
          </h2>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            asChild
          >
            <Link to="/register">Create Free Account</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
