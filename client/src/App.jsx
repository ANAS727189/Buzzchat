import Navbar from "./components/Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import { HomePage, LoginPage, SignUpPage, SettingsPage, ProfilePage } from "./pages/index.pages.js"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
const {theme}  = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  // if (isCheckingAuth)
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       {/* <Loader className="size-10 animate-spin" /> */}
  //       <span className="loading loading-infinity loading-xl"></span>
  //     </div>
  //   );

  return (
    <>  
        <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage />: <Navigate to="/login" />}/>
          <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to="/" />}/>
          <Route path="/login" element={!authUser ?<LoginPage />: <Navigate to="/" />}/>
          <Route path="/settings" element={<SettingsPage />}/>
          <Route path="/profile" element={authUser ? <ProfilePage />: <Navigate to="/login" />}/>
        </Routes>

        <Toaster />
        </div>
    </>
  )
}

export default App;
