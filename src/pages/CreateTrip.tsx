
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CreateTrip = () => {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a trip.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // Create the trip document
      const tripData = {
        name: tripName,
        destination,
        startDate,
        endDate,
        budget: parseInt(budget, 10),
        createdBy: auth.currentUser.uid,
        participants: [auth.currentUser.uid],
        admins: [auth.currentUser.uid],
        createdAt: serverTimestamp(),
        expiresAt: new Date(new Date(endDate).getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days after end date
      };

      const tripRef = await addDoc(collection(db, "trips"), tripData);

      toast({
        title: "Trip created successfully!",
        description: "You can now start planning your journey.",
      });

      navigate(`/trip/${tripRef.id}`);
    } catch (error: any) {
      toast({
        title: "Error creating trip",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create New Trip</h1>

      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tripName">Trip Name</Label>
            <Input
              id="tripName"
              placeholder="Summer Vacation 2025"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="Goa, India"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (in Tokens)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="10000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500">1 Token = 1 INR</p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Trip"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateTrip;
