
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapIcon, WalletIcon, UsersIcon, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
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
            Plan Your Trip with
            <span className="text-indigo-600 dark:text-indigo-400"> TokenTrip</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            The all-in-one platform for planning routes, managing budgets, and collaborating with your travel companions.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-lg px-8"
            asChild
          >
            <Link to="/start">Start Planning</Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
          <FeatureCard 
            icon={<MapIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
            title="Route Planning"
            description="Plan your routes with interactive maps and save points of interest."
            delay={0.2}
          />
          <FeatureCard 
            icon={<WalletIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
            title="Token System"
            description="Track expenses easily with our token system (1 Token = 1 INR)."
            delay={0.3}
          />
          <FeatureCard 
            icon={<UsersIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
            title="Multiple Admins"
            description="Share control with trusted companions for better coordination."
            delay={0.4}
          />
          <FeatureCard 
            icon={<LineChart className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
            title="Reports & Analytics"
            description="Download detailed reports of your trip expenses and routes."
            delay={0.5}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="my-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Create a Trip"
              description="Set up your trip with initial budget and invite companions."
              delay={0.7}
            />
            <StepCard 
              number="2"
              title="Plan & Track"
              description="Map your route, add expenses, and manage tokens in real-time."
              delay={0.8}
            />
            <StepCard 
              number="3"
              title="Share & Download"
              description="Generate reports and share expenses with your group."
              delay={0.9}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description,
  delay 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:scale-105">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Card>
  </motion.div>
);

const StepCard = ({ 
  number, 
  title, 
  description,
  delay
}: { 
  number: string, 
  title: string, 
  description: string,
  delay: number
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <div className="w-12 h-12 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default Index;
