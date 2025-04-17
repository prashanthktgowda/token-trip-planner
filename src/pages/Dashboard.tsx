
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, MapPin, Wallet, Clock, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { onAuthStateChanged } from "firebase/auth";

type Trip = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  destination: string;
  participants: number;
};

const Dashboard = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      const fetchTrips = async () => {
        try {
          const q = query(
            collection(db, "trips"),
            where("participants", "array-contains", user.uid)
          );
          const querySnapshot = await getDocs(q);
          
          const tripsData: Trip[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            tripsData.push({
              id: doc.id,
              name: data.name,
              startDate: data.startDate,
              endDate: data.endDate,
              budget: data.budget,
              destination: data.destination,
              participants: data.participants.length,
            });
          });
          
          setTrips(tripsData);
        } catch (error: any) {
          toast({
            title: "Error fetching trips",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchTrips();
    });

    return () => unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen gradient-bg px-4 py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Trips
          </h1>
          <Button className="glass-card hover:bg-accent/20 transition-all duration-300" asChild>
            <Link to="/create-trip">
              <Plus className="mr-2 h-4 w-4" /> Create New Trip
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading your trips...</p>
          </div>
        ) : trips.length === 0 ? (
          <Card className="glass-card p-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">No trips yet</h2>
            <p className="text-muted-foreground mb-6">Start your adventure by creating your first trip!</p>
            <Button className="glass-card hover:bg-accent/20 transition-all duration-300" asChild>
              <Link to="/create-trip">
                <Plus className="mr-2 h-4 w-4" /> Create New Trip
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Link key={trip.id} to={`/trip/${trip.id}`}>
                <Card className="glass-card p-6 hover:scale-105 transition-all duration-300 h-full">
                  <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {trip.name}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Wallet className="h-4 w-4 mr-2" />
                      <span>{trip.budget} Tokens</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{trip.participants} Participants</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
