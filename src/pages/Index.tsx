
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapIcon, WalletIcon, UsersIcon, LineChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Your Trip with
            <span className="text-indigo-600"> TokenTrip</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The all-in-one platform for planning routes, managing budgets, and collaborating with your travel companions.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8"
          >
            Start Planning
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
          <FeatureCard 
            icon={<MapIcon className="w-8 h-8 text-indigo-600" />}
            title="Route Planning"
            description="Plan your routes with interactive maps and save points of interest."
          />
          <FeatureCard 
            icon={<WalletIcon className="w-8 h-8 text-indigo-600" />}
            title="Token System"
            description="Track expenses easily with our token system (1 Token = 1 INR)."
          />
          <FeatureCard 
            icon={<UsersIcon className="w-8 h-8 text-indigo-600" />}
            title="Multiple Admins"
            description="Share control with trusted companions for better coordination."
          />
          <FeatureCard 
            icon={<LineChart className="w-8 h-8 text-indigo-600" />}
            title="Reports & Analytics"
            description="Download detailed reports of your trip expenses and routes."
          />
        </div>

        {/* How It Works Section */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Create a Trip"
              description="Set up your trip with initial budget and invite companions."
            />
            <StepCard 
              number="2"
              title="Plan & Track"
              description="Map your route, add expenses, and manage tokens in real-time."
            />
            <StepCard 
              number="3"
              title="Share & Download"
              description="Generate reports and share expenses with your group."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="text-center">
    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;
