import { auth, db } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const registerUser = async (
  email,
  password,
  role,
  additionalData = {}
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // it will set userProfile
    const userRef = doc(db, role + "s", user.uid); // Collection name: students, teachers, companies
    await setDoc(userRef, {
      id: user.uid,
      email,
      role,
      ...additionalData,
    });

    console.log("User registered successfully!");
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully!");
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};

export const getUserProfile = async (userId, role) => {
  try {
    const userRef = doc(db, role + "s", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.error("User profile not found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
