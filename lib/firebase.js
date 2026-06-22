import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOKgjXI1UnFJQmt7pl0OFDKNld_orrM2M",
  authDomain: "mir-notebook.firebaseapp.com",
  projectId: "mir-notebook",
  storageBucket: "mir-notebook.firebasestorage.app",
  messagingSenderId: "25508087145",
  appId: "1:25508087145:web:1d27e1d0ef3c506736e9f8"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
