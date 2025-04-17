
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const JoinTrip = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [tripName, setTripName] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTripAccess = async () => {
      if (!id || !auth.currentUser) {
        navigate("/login");
        return;
      }

      try {
        const tripDoc = await getDoc(doc(db, "trips", id));
        
        if (!tripDoc.exists()) {
          toast({
            title: "Trip not found",
            description: "This trip doesn't exist or the invitation has expired.",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }

        const tripData = tripDoc.data();
        setTripName(tripData.name);

        if (tripData.participants.includes(auth.currentUser.uid)) {
          toast({
            title: "Already a participant",
            description: "You are already part of this trip.",
          });
          navigate(`/trip/${id}`);
          return;
        }

        setLoading(false);
      } catch (error: any) {
        toast({
          title: "Error checking trip access",
          description: error.message,
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    };

    checkTripAccess();
  }, [id, navigate, toast]);

  const handleJoinTrip = async () => {
    if (!id || !auth.currentUser) return;

    try {
      const tripRef = doc(db, "trips", id);
      await updateDoc(tripRef, {
        participants: arrayUnion(auth.currentUser.uid),
      });

      toast({
        title: "Welcome aboard!",
        description: "You have successfully joined the trip.",
      });

      navigate(`/trip/${id}`);
    } catch (error: any) {
      toast({
        title: "Error joining trip",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-background to-accent/20 flex items-center justify-center">
      <Card className="p-8 max-w-md w-full backdrop-blur-sm bg-background/80 border border-accent/20">
        <h1 className="text-2xl font-bold text-center mb-6">Join Trip</h1>
        <p className="text-center mb-6">
          You've been invited to join <span className="font-semibold">{tripName}</span>
        </p>
        <div className="flex justify-center">
          <Button
            className="bg-primary/90 hover:bg-primary transition-colors duration-300 shadow-lg"
            onClick={handleJoinTrip}
          >
            Accept Invitation
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default JoinTrip;
