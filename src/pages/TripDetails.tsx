import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "@/lib/firebase";
import { 
  doc, getDoc, collection, addDoc, getDocs, 
  query, where, serverTimestamp, updateDoc, arrayUnion 
} from "firebase/firestore";
import { 
  MapPin, Calendar, Users, Wallet, Plus, Download,
  Map as MapIcon, Receipt, UserPlus, ChevronDown 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTrigger, DialogClose 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { generateInviteLink, sendInvitation } from "@/utils/invitationService";

// Trip and Expense types
type Trip = {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  participants: string[];
  admins: string[];
  createdBy: string;
};

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  paidBy: string;
  participants: string[];
  location?: string;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [participants, setParticipants] = useState<{ id: string, email: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "food",
    location: "",
  });
  
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteAsAdmin, setInviteAsAdmin] = useState(false);

  useEffect(() => {
    const fetchTripDetails = async () => {
      if (!id || !auth.currentUser) {
        navigate("/dashboard");
        return;
      }

      try {
        // Fetch trip data
        const tripDoc = await getDoc(doc(db, "trips", id));
        
        if (!tripDoc.exists()) {
          toast({
            title: "Trip not found",
            description: "The requested trip does not exist or you don't have access.",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }

        const tripData = tripDoc.data();
        
        // Check if current user is a participant
        if (!tripData.participants.includes(auth.currentUser.uid)) {
          toast({
            title: "Access denied",
            description: "You are not a participant in this trip.",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }

        // Set trip data
        setTrip({
          id: tripDoc.id,
          name: tripData.name,
          destination: tripData.destination,
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          budget: tripData.budget,
          participants: tripData.participants,
          admins: tripData.admins,
          createdBy: tripData.createdBy,
        });

        // Check if user is admin
        setIsAdmin(tripData.admins.includes(auth.currentUser.uid));

        // Fetch participants info
        const participantsData = [];
        for (const participantId of tripData.participants) {
          // In a real app, you would fetch user details from Firebase Auth
          // For now, we'll use placeholder data with the ID
          participantsData.push({
            id: participantId,
            email: `user${participantId.substring(0, 5)}@example.com`,
          });
        }
        setParticipants(participantsData);

        // Fetch expenses
        const expensesQuery = query(
          collection(db, "expenses"),
          where("tripId", "==", id)
        );
        const expensesSnapshot = await getDocs(expensesQuery);
        
        const expensesData: Expense[] = [];
        let totalExpenses = 0;
        
        expensesSnapshot.forEach((doc) => {
          const data = doc.data();
          expensesData.push({
            id: doc.id,
            description: data.description,
            amount: data.amount,
            date: data.date,
            category: data.category,
            paidBy: data.paidBy,
            participants: data.participants,
            location: data.location,
          });
          
          totalExpenses += data.amount;
        });
        
        setExpenses(expensesData);
        setRemainingBudget(tripData.budget - totalExpenses);

      } catch (error: any) {
        toast({
          title: "Error loading trip",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id, navigate, toast]);

  const handleAddExpense = async () => {
    if (!id || !auth.currentUser || !trip) return;

    try {
      const expenseData = {
        tripId: id,
        description: newExpense.description,
        amount: parseInt(newExpense.amount, 10),
        date: newExpense.date,
        category: newExpense.category,
        paidBy: auth.currentUser.uid,
        participants: trip.participants, // By default, expense is split among all participants
        location: newExpense.location,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "expenses"), expenseData);

      toast({
        title: "Expense added successfully",
        description: `${newExpense.amount} tokens added for ${newExpense.description}`,
      });

      // Reset form
      setNewExpense({
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "food",
        location: "",
      });

      // Reload expenses
      const expensesQuery = query(
        collection(db, "expenses"),
        where("tripId", "==", id)
      );
      const expensesSnapshot = await getDocs(expensesQuery);
      
      const expensesData: Expense[] = [];
      let totalExpenses = 0;
      
      expensesSnapshot.forEach((doc) => {
        const data = doc.data();
        expensesData.push({
          id: doc.id,
          description: data.description,
          amount: data.amount,
          date: data.date,
          category: data.category,
          paidBy: data.paidBy,
          participants: data.participants,
          location: data.location,
        });
        
        totalExpenses += data.amount;
      });
      
      setExpenses(expensesData);
      setRemainingBudget(trip.budget - totalExpenses);
    } catch (error: any) {
      toast({
        title: "Error adding expense",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInviteParticipant = async () => {
    if (!id || !auth.currentUser || !isAdmin) return;

    try {
      const inviteId = await sendInvitation(id, inviteEmail, inviteAsAdmin);
      const inviteLink = generateInviteLink(id);

      // In a real app, this would be sent via email
      // For demo purposes, we'll show it in a toast
      toast({
        title: "Invitation sent!",
        description: (
          <div className="mt-2 space-y-2">
            <p>Invitation sent to {inviteEmail}</p>
            <p className="text-xs text-muted-foreground break-all">
              Invite link: {inviteLink}
            </p>
          </div>
        ),
      });

      setInviteEmail("");
      setInviteAsAdmin(false);

      // Update participants list (simulated)
      setParticipants([
        ...participants,
        { id: inviteId, email: inviteEmail }
      ]);
    } catch (error: any) {
      toast({
        title: "Error sending invitation",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const downloadExpensesReport = () => {
    if (!expenses.length || !trip) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Description,Amount,Date,Category,Paid By,Location\n";

    expenses.forEach(expense => {
      const paidByUser = participants.find(p => p.id === expense.paidBy);
      const row = [
        expense.description,
        expense.amount,
        expense.date,
        expense.category,
        paidByUser ? paidByUser.email : "Unknown",
        expense.location || "N/A"
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${trip.name}-expenses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Report downloaded",
      description: "Your expenses report has been downloaded.",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center h-96">
        <p>Loading trip details...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center h-96">
        <p>Trip not found or you don't have access.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Card className="p-6 mb-8 backdrop-blur-sm bg-background/80 border border-accent/20">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">{trip.name}</h1>
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{participants.length} Participants</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900">Budget Status</h2>
              <div className="mt-2 flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-indigo-600" />
                <span className="text-2xl font-bold text-indigo-600">{remainingBudget}</span>
                <span className="text-gray-600 ml-2">/ {trip.budget} Tokens remaining</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <Button 
            className="bg-primary/90 hover:bg-primary transition-colors duration-300 shadow-lg" 
            asChild
          >
            <Dialog>
              <DialogTrigger>
                <Plus className="mr-2 h-4 w-4" /> Add Expense
              </DialogTrigger>
              <DialogContent className="bg-background/95 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>
                    Record a new expense for this trip.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Hotel stay, Dinner, etc."
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (Tokens)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="500"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                      >
                        <option value="food">Food</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="transportation">Transportation</option>
                        <option value="activities">Activities</option>
                        <option value="shopping">Shopping</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      placeholder="Restaurant name, store, etc."
                      value={newExpense.location}
                      onChange={(e) => setNewExpense({...newExpense, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button 
                      className="bg-indigo-600 hover:bg-indigo-700" 
                      onClick={handleAddExpense}
                    >
                      Add Expense
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </Button>

          {isAdmin && (
            <Button 
              className="bg-primary/90 hover:bg-primary transition-colors duration-300 shadow-lg"
              asChild
            >
              <Dialog>
                <DialogTrigger>
                  <UserPlus className="mr-2 h-4 w-4" /> Invite
                </DialogTrigger>
                <DialogContent className="bg-background/95 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle>Invite Participant</DialogTitle>
                    <DialogDescription>
                      Send an invitation link to join this trip.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="friend@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="bg-background/50"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="admin"
                        checked={inviteAsAdmin}
                        onChange={(e) => setInviteAsAdmin(e.target.checked)}
                        className="rounded border-accent"
                      />
                      <Label htmlFor="admin">Invite as Admin</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        className="bg-primary/90 hover:bg-primary"
                        onClick={handleInviteParticipant}
                      >
                        Send Invitation
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </Button>
          )}

          <Button 
            variant="outline" 
            onClick={downloadExpensesReport}
            disabled={expenses.length === 0}
          >
            <Download className="mr-2 h-4 w-4" /> Export Expenses
          </Button>
        </div>

        <Tabs defaultValue="expenses" className="bg-background/40 p-4 rounded-lg backdrop-blur-sm">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="expenses" className="pt-4">
            {expenses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No expenses recorded yet.</p>
                <Button 
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                  asChild
                >
                  <Dialog>
                    <DialogTrigger>
                      <Plus className="mr-2 h-4 w-4" /> Add First Expense
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Expense</DialogTitle>
                        <DialogDescription>
                          Record a new expense for this trip.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            placeholder="Hotel stay, Dinner, etc."
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount (Tokens)</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="500"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={newExpense.date}
                              onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                              id="category"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={newExpense.category}
                              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                            >
                              <option value="food">Food</option>
                              <option value="accommodation">Accommodation</option>
                              <option value="transportation">Transportation</option>
                              <option value="activities">Activities</option>
                              <option value="shopping">Shopping</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location (Optional)</Label>
                          <Input
                            id="location"
                            placeholder="Restaurant name, store, etc."
                            value={newExpense.location}
                            onChange={(e) => setNewExpense({...newExpense, location: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button 
                            className="bg-indigo-600 hover:bg-indigo-700" 
                            onClick={handleAddExpense}
                          >
                            Add Expense
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="grid grid-cols-7 font-medium p-4 border-b bg-muted text-muted-foreground">
                  <div className="col-span-2">Description</div>
                  <div>Amount</div>
                  <div>Date</div>
                  <div>Category</div>
                  <div>Paid By</div>
                  <div>Actions</div>
                </div>
                {expenses.map((expense) => {
                  const paidByUser = participants.find(p => p.id === expense.paidBy);
                  return (
                    <div key={expense.id} className="grid grid-cols-7 p-4 border-b items-center">
                      <div className="col-span-2 font-medium">{expense.description}</div>
                      <div>{expense.amount} Tokens</div>
                      <div>{formatDate(expense.date)}</div>
                      <div className="capitalize">{expense.category}</div>
                      <div>{paidByUser ? paidByUser.email.split('@')[0] : 'Unknown'}</div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            {isAdmin && <DropdownMenuItem>Edit</DropdownMenuItem>}
                            {isAdmin && <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="participants" className="pt-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-3 font-medium p-4 border-b bg-muted text-muted-foreground">
                <div>User</div>
                <div>Role</div>
                <div>Actions</div>
              </div>
              {participants.map((participant) => (
                <div key={participant.id} className="grid grid-cols-3 p-4 border-b items-center">
                  <div>{participant.email}</div>
                  <div>
                    {trip.admins.includes(participant.id) ? 
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Admin</span> : 
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Participant</span>
                    }
                  </div>
                  <div>
                    {isAdmin && participant.id !== auth.currentUser?.uid && (
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="pt-4">
            <div className="p-12 rounded-md border text-center">
              <MapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Map Coming Soon</h3>
              <p className="text-gray-500">
                The interactive map feature will be available soon. This will allow you to visualize your trip route and mark expenses at specific locations.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TripDetails;
