import { Card } from "@/components/ui/card";
import { MapIcon, WalletIcon, UsersIcon, LineChart, Heart, Star, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";

const backgroundImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // nature
  "https://images.unsplash.com/photo-1501854140801-50d01698950b", // mountains
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843", // forest
];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedView, setSelectedView] = useState("all");
  const [showAnimations, setShowAnimations] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] transition-opacity duration-1000 ease-in-out bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          filter: 'grayscale(50%) blur(2px)',
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <ToggleGroup type="single" value={selectedView} onValueChange={(value) => value && setSelectedView(value)}>
            <ToggleGroupItem value="all">All Features</ToggleGroupItem>
            <ToggleGroupItem value="core">Core Features</ToggleGroupItem>
            <ToggleGroupItem value="advanced">Advanced Features</ToggleGroupItem>
          </ToggleGroup>
          
          <div className="flex items-center gap-2">
            <Switch id="animations" checked={showAnimations} onCheckedChange={setShowAnimations} />
            <label htmlFor="animations">Animations</label>
          </div>
          
          <Toggle pressed={isExpanded} onPressedChange={setIsExpanded}>
            {isExpanded ? "Collapse" : "Expand"} Details
          </Toggle>
        </div>

        <div className={`text-center mb-16 backdrop-blur-lg bg-background/30 rounded-2xl p-8 shadow-xl transition-all duration-300 ${showAnimations ? 'animate-fade-in' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-primary hover:text-primary/90 transition-colors">TokenTrip</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simplifying travel planning and expense management for groups.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-20">
          <div className={`backdrop-blur-lg bg-background/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${showAnimations ? 'animate-fade-in delay-100' : ''}`}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              TokenTrip was created to solve the common challenges of planning trips with friends and family. We believe that travel should be about creating memories, not stressing over logistics and finances.
            </p>
            <p className="text-gray-600">
              Our mission is to provide an intuitive platform that combines route planning, budget management, and expense tracking in one place, making group travel seamless and enjoyable for everyone involved.
            </p>
          </div>
          <div className={`backdrop-blur-lg bg-background/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${showAnimations ? 'animate-fade-in delay-200' : ''}`}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Approach</h2>
            <p className="text-gray-600 mb-4">
              We've taken a unique approach with our token system, where 1 Token equals 1 INR, making it easy to visualize and track expenses. Combined with our interactive mapping and multi-admin capabilities, TokenTrip becomes your all-in-one travel companion.
            </p>
            <p className="text-gray-600">
              Privacy is important to us, which is why we only store your trip data for 7 days after your journey ends, giving you enough time to settle expenses without compromising your privacy.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose TokenTrip?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <MapIcon className="w-8 h-8 text-primary" />, title: "All-in-One Platform", description: "Everything you need in one place - no switching between multiple apps." },
              { icon: <WalletIcon className="w-8 h-8 text-primary" />, title: "Transparent Finances", description: "Clear expense tracking with our unique token system." },
              { icon: <UsersIcon className="w-8 h-8 text-primary" />, title: "Collaborative", description: "True multi-user collaboration with role-based permissions." },
              { icon: <LineChart className="w-8 h-8 text-primary" />, title: "Free to Use", description: "All features available at no cost, for everyone." },
              { icon: <Heart className="w-8 h-8 text-primary" />, title: "User-Friendly", description: "Intuitive interface for the best user experience." },
              { icon: <Star className="w-8 h-8 text-primary" />, title: "Premium Features", description: "Advanced features for power users." },
              { icon: <Shield className="w-8 h-8 text-primary" />, title: "Secure", description: "Your data is always protected." },
            ].filter(item => 
              selectedView === "all" || 
              (selectedView === "core" && ["All-in-One Platform", "Transparent Finances", "Collaborative", "Free to Use"].includes(item.title)) ||
              (selectedView === "advanced" && ["User-Friendly", "Premium Features", "Secure"].includes(item.title))
            ).map((item, index) => (
              <ReasonCard 
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                isExpanded={isExpanded}
                showAnimations={showAnimations}
                delay={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReasonCard = ({ 
  icon, 
  title, 
  description, 
  isExpanded, 
  showAnimations, 
  delay 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  isExpanded: boolean;
  showAnimations: boolean;
  delay: number;
}) => (
  <Card className={`
    p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 
    backdrop-blur-lg bg-background/30 border-none
    ${showAnimations ? `animate-fade-in delay-[${delay * 100}ms]` : ''}
  `}>
    <div className="mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-foreground text-center">{title}</h3>
    <p className={`text-muted-foreground text-center transition-all duration-300 ${isExpanded ? 'h-auto opacity-100' : 'h-12 overflow-hidden opacity-70'}`}>
      {description}
    </p>
  </Card>
);

export default About;
