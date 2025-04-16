
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent <span className="text-indigo-600">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TokenTrip is free to use with all core features included. We believe in making travel planning accessible to everyone.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-indigo-600 mb-2">Free Forever</h2>
              <p className="text-gray-600 mb-4">No hidden fees, no subscriptions</p>
              <div className="text-5xl font-bold mb-6">₹0</div>
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 mb-8"
                asChild
              >
                <Link to="/start">Get Started</Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Core Features</h3>
                <ul className="space-y-3">
                  <FeatureItem>Route planning with OpenStreetMap</FeatureItem>
                  <FeatureItem>Token-based expense tracking</FeatureItem>
                  <FeatureItem>Multiple trip admins</FeatureItem>
                  <FeatureItem>Expense reports and downloads</FeatureItem>
                  <FeatureItem>7-day cloud storage</FeatureItem>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Additional Benefits</h3>
                <ul className="space-y-3">
                  <FeatureItem>No credit card required</FeatureItem>
                  <FeatureItem>No usage limits</FeatureItem>
                  <FeatureItem>Regular feature updates</FeatureItem>
                  <FeatureItem>Community support</FeatureItem>
                  <FeatureItem>Works on all devices</FeatureItem>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

export default Pricing;
