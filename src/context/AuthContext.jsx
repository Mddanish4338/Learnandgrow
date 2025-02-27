import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged, signOut, getIdTokenResult } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          let role = null;

          const idTokenResult = await firebaseUser.getIdTokenResult();
          role = idTokenResult.claims.role;

          if (!role) {
            const roleCollections = ["students", "trainers", "companies"];
            for (const collection of roleCollections) {
              const docRef = doc(db, collection, firebaseUser.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                role = collection;
                break;
              }
            }
          }

          const updatedUser = { ...firebaseUser, role };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
