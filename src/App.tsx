import { framer, CanvasNode } from "framer-plugin";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

// --- Optional screens/modals ---
import MainContent from "./components/ScreenOne";
import ScreenTwo from "./components/ScreenTwo";
import ScreenThird from "./components/ScreenThird";
import Screen5 from "./components/Screen5";
import ConfirmModal from "./components/ConfirmModal";
import SuccessModal from "./components/SuccessModal";
import InstallBannerPopup from "./components/InstallBannerPopup";
import ChoosePlan from "./components/ChoosePlan";
import AdvancedCSVExportModal from "./components/ExportDataModal";
import OpenGuide from "./components/OpenGuide";
import PulseAnimation from "./components/PulseAnimation";

framer.showUI({
  width: 800,
  height: 591,
  position: "top right",
});

type User = {
  id: string;
  displayName: string;
  email?: string;
};
type ScriptData = {
  script: string;
  isChanged: boolean;
  isDismiss: boolean;
  isSaved?: boolean;
  isEditing?: boolean;
   category: string[];
};
function useSelection() {
  const [selection, setSelection] = useState<CanvasNode[]>([]);
  useEffect(() => {
    return framer.subscribeToSelection(setSelection);
  }, []);
  return selection;
}
const projectInfo = await framer.getProjectInfo();

const siteId = projectInfo.id; 


async function fetchScript(){
const publishInfo = await framer.getPublishInfo();
console.log(publishInfo);
const siteUrl = publishInfo?.production?.url || "Not Published";
const result = await fetch(`https://consentbitapp-74kq.onrender.com/api/fetch-scripts?url=${encodeURIComponent(siteUrl)}`);
const data = await result.json();
console.log("Fetched Script Data:", data);
// return data.scripts.map((item:any, index: number) => ({
//   script: item[index],
//   isChanged: false,
//   isSaved: false,
//   isEditing: true,
//   isDismiss: false,
//   category: [],
// })); 

const update=data.scripts.map((item:any, index: number) => ({
  ...item,
  category: [],
}));
console.log("Updated Script Data with category:", { ...data, scripts: update});
return { ...data, scripts: update};

}
export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
   const [check , setCheck] = useState(false);
const [scripts, setScripts] = useState<ScriptData[]>([])
const [screen, setScreen] = useState(1);
  // ✅ Fetch profile using stored JWT token
  // const fetchProfile = async () => {
  //   setLoading(true);
  //   const token = localStorage.getItem("auth_token");
  //   if (!token) {
  //     setUser(null);
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const res = await fetch("https://consentbitapp.onrender.com/auth/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await res.json();

  //     if (data.loggedIn) {
  //       console.log("✅ User is logged in:", data.user);
  //       setUser(data.user);
  //     } else {
  //       console.log("⚠️ Token invalid or expired");
  //       setUser(null);
  //       localStorage.removeItem("auth_token");
  //     }
  //   } catch (err) {
  //     console.error("❌ Profile fetch failed:", err);
  //     setUser(null);
  //     localStorage.removeItem("auth_token");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // ✅ Trigger Google login popup
  // const triggerGoogleLogin = () => {
  //   window.open(
  //     "https://consentbitapp.onrender.com/auth/google",
  //     "_blank",
  //     "width=500,height=600"
  //   );
  // };

  // ✅ Stateless logout — just delete token
  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    setScreen(1);
  };

  // // ✅ Listen for JWT token via postMessage
  // useEffect(() => {
  //   fetchProfile();

  //   const listener = (event: MessageEvent) => {
  //     console.log("📩 Message received:", event.origin, event.data);

  //     // Expecting: { type: "auth-success", token: "..." }
  //     if (event.data?.type === "auth-success" && event.data.token) {
  //       const token = event.data.token;
  //       localStorage.setItem("auth_token", token);
  //       console.log("✅ Token received and saved:", token);
  //       fetchProfile(); // refresh
  //     }
  //   };

  //   window.addEventListener("message", listener);
  //   return () => window.removeEventListener("message", listener);
  // }, []);

  // --- UI States ---
  // if (loading) return <LoadingScreen />;

  // if (!user) {
  //   return (
  //     <div style={{ padding: "20px", textAlign: "center" }}>
  //       <p>Please log in to use this plugin</p>
  //       <button
  //         onClick={triggerGoogleLogin}
  //         style={{
  //           padding: "10px 20px",
  //           background: "#4285F4",
  //           color: "#fff",
  //           border: "none",
  //           borderRadius: "6px",
  //           cursor: "pointer",
  //         }}
  //       >
  //         Login with Google
  //       </button>
  //     </div>
  //   );
  // }
const handleCheck = () => {
    setCheck(!check);
  }
  return (
    <>
      <Header />
   {screen === 1 &&   <MainContent onClick={() => {setScreen(2)}} setUser={setUser} user={user} loading={loading}   setLoading={setLoading} />}
     { screen === 2 &&  <ScreenTwo onClick={async () => {
  try {
    
    setLoading(true);

    const data = await fetchScript();
    console.log("Fetched Script Data in useEffect:", data);

    if (data && data.scripts) {
      setScripts(data.scripts);
      setScreen(3);
    } else {
      console.warn("No scripts found in response:", data);
    }
  } catch (error) {
    console.error("Error fetching scripts:", error);
  } finally {
    // always runs, whether success or error
    setLoading(false);
  }
}} />}


         { loading && <PulseAnimation/> }
               {screen === 3 && <ScreenThird siteId={siteId} isPanel={true} scripts={scripts} setScripts={setScripts} onClick={() => {setScreen(4)}}/> }



 {screen === 4 && <ConfirmModal 
      checked={check}
      onCheck={handleCheck}
      onProceed={() => {setScreen(5)}}
      onGoBack={() => {setScreen(3)}}
      />  }


            {screen === 5 && <Screen5 onBack={() => {setScreen(4)}} onNext={() => {setScreen(6)}}/> }
  {screen === 6 && <SuccessModal onCustomize={() => { setScreen(7) }} /> }
   
        {screen === 7 && <SettingsPanel scripts={scripts} setScripts={setScripts} /> }
     {/* <ScreenThird />
      <Screen5 />
      <SettingsPanel />
      <InstallBannerPopup />
      <ChoosePlan />
      <AdvancedCSVExportModal />
      <OpenGuide />
      <ConfirmModal />
      <SuccessModal /> */}
      
 
     {user && <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>
          ✅ Logged in as <b>{user.displayName}</b> ({user.email})
        </p>
        <button
          onClick={logout}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "#F44336",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>}
    </>
  );
}
