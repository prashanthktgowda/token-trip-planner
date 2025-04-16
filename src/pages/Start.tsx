
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

const Start = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get Started with <span className="text-indigo-600">TokenTrip</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Follow these simple steps to begin planning your trip and managing expenses with ease.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8">
              <StepCard 
                number="1"
                title="Create an Account"
                description="Sign up for free to access all TokenTrip features."
                buttonText="Sign Up"
                buttonLink="/register"
              />
              <StepCard 
                number="2"
                title="Create a Trip"
                description="Set your destination, dates, and initial budget."
                buttonText="New Trip"
                buttonLink="/login"
              />
              <StepCard 
                number="3"
                title="Invite Friends"
                description="Share your trip with friends to collaborate."
                buttonText="Learn More"
                buttonLink="/features"
              />
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Why TokenTrip?</h2>
            <div className="space-y-4">
              <BenefitItem>
                All-in-one platform for route planning, budgeting, and expense tracking
              </BenefitItem>
              <BenefitItem>
                Transparent token system (1 Token = 1 INR) for clear financial management
              </BenefitItem>
              <BenefitItem>
                Collaborative features with role-based access control
              </BenefitItem>
              <BenefitItem>
                Interactive maps to visualize your journey
              </BenefitItem>
              <BenefitItem>
                Detailed reports for expense analysis and settlement
              </BenefitItem>
              <BenefitItem>
                Temporary cloud storage ensures your data isn't stored indefinitely
              </BenefitItem>
            </div>

            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8"
                asChild
              >
                <Link to="/register">
                  Get Started Now <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ 
  number, 
  title, 
  description, 
  buttonText, 
  buttonLink 
}: { 
  number: string, 
  title: string, 
  description: string,
  buttonText: string,
  buttonLink: string
}) => (
  <div className="text-center">
    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Button asChild variant="outline">
      <Link to={buttonLink}>{buttonText}</Link>
    </Button>
  </div>
);

const BenefitItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1">
      <CheckIcon className="h-5 w-5 text-green-500" />
    </div>
    <p className="ml-3 text-gray-700">{children}</p>
  </div>
);

export default Start;
