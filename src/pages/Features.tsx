
import { Card } from "@/components/ui/card";
import { MapIcon, WalletIcon, UsersIcon, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Features of <span className="text-indigo-600">TokenTrip</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover all the powerful features that make TokenTrip the ultimate travel planning tool.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8"
            asChild
          >
            <Link to="/start">Start Planning</Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
          <FeatureCard 
            icon={<MapIcon className="w-8 h-8 text-indigo-600" />}
            title="Route Planning"
            description="Plan your routes with interactive maps and save points of interest. Choose destinations and add waypoints for a complete travel plan."
          />
          <FeatureCard 
            icon={<WalletIcon className="w-8 h-8 text-indigo-600" />}
            title="Token System"
            description="Track expenses easily with our token system (1 Token = 1 INR). Set budgets, record expenses, and monitor your spending in real-time."
          />
          <FeatureCard 
            icon={<UsersIcon className="w-8 h-8 text-indigo-600" />}
            title="Multiple Admins"
            description="Share control with trusted companions for better coordination. Assign roles and permissions to ensure smooth trip management."
          />
          <FeatureCard 
            icon={<LineChart className="w-8 h-8 text-indigo-600" />}
            title="Reports & Analytics"
            description="Download detailed reports of your trip expenses and routes. Get insights into spending patterns and share costs with your travel companions."
          />
        </div>

        {/* Additional Features */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            More Amazing Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Temporary Cloud Storage</h3>
              <p className="text-gray-600">Your trip data is stored securely in the cloud for up to 7 days after your trip ends, ensuring privacy while remaining accessible.</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Expense Sharing</h3>
              <p className="text-gray-600">Automatically calculate who owes what based on expenses recorded during the trip, making settlement easy and transparent.</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Interactive Maps</h3>
              <p className="text-gray-600">Visualize your entire journey with interactive OpenStreetMap integration, complete with markers for important locations.</p>
            </Card>
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

export default Features;
