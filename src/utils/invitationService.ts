
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";

export const generateInviteLink = (tripId: string) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/trip/${tripId}/join`;
};

export const sendInvitation = async (tripId: string, email: string, isAdmin: boolean = false) => {
  if (!auth.currentUser) throw new Error("No authenticated user");

  // Create invitation record
  const inviteRef = await addDoc(collection(db, "invitations"), {
    tripId,
    email,
    isAdmin,
    status: "pending",
    createdBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  // In a real app, you would send an email here using a backend service
  // For now, we'll just update the trip document with the invitation
  const tripRef = doc(db, "trips", tripId);
  await updateDoc(tripRef, {
    invitations: {
      [inviteRef.id]: {
        email,
        status: "pending",
        isAdmin
      }
    }
  });

  return inviteRef.id;
};
