
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Trips</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
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
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No trips yet</h2>
          <p className="text-gray-600 mb-6">Start your adventure by creating your first trip!</p>
          <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
            <Link to="/create-trip">
              <Plus className="mr-2 h-4 w-4" /> Create New Trip
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Link key={trip.id} to={`/trip/${trip.id}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                <h2 className="text-xl font-semibold mb-2 text-indigo-600">{trip.name}</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{trip.destination}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Wallet className="h-4 w-4 mr-2" />
                    <span>{trip.budget} Tokens</span>
                  </div>
                  <div className="flex items-center text-gray-600">
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
  );
};

export default Dashboard;
