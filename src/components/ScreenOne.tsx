import { useEffect } from "react";
type User = {
  id: string;
  displayName: string;
  email?: string;
};
// utils/api.ts
export async function saveUserData(siteId: string, userData: object|null) {
  try {
    console.log("Saving user data for siteId:", siteId, userData);
    const response = await fetch(`https://framer-consentbit.web-8fb.workers.dev/auth/user/${siteId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ siteId, userData }),
    });

    const text = await response.text();
    console.log("Response text:", text);
    return text;
  } catch (error) {
    console.error("Error saving user data:", error);
    return null;
  }
}

const MainContent = ({
  onClick,
  setUser,
  user,
  setLoading,
  loading,
    siteId,
    siteUrl,
    setscreen
}: {
  onClick: () => void;
  setUser: (user: User | null) => void;
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  siteId: string;
  siteUrl: string;
  setscreen: (screen: number) => void;

}) => {
  // ✅ Fetch profile using stored JWT token
//  const saveUserSite = async (userData: User, siteId: string, siteUrl: string) => {
//     try {
//       const token = localStorage.getItem("auth_token");
//       if (!token) return;

//       const res = await fetch(
//         `http://127.0.0.1:8787/auth/user/${siteId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ ...userData, siteId, siteUrl }),
//         }
//       );

//       if (!res.ok) {
//         console.error("❌ Failed to save user site info:", await res.text());
//         return;
//       }

//       console.log("✅ User + siteUrl saved to KV");
//     } catch (err) {
//       console.error("❌ Failed to save user site info:", err);
//     }
//   };

//  const handleLogin = () => {
//     const popup = window.open(
//       `http://127.0.0.1:8787/auth/google?siteUrl=${encodeURIComponent(
//         siteUrl || ""
//       )}`,
//       "Login with Google",
//       "width=500,height=600"
//     );

//     const listener = async (event: MessageEvent) => {
//       if (
//         event.origin === "http://127.0.0.1:8787/" &&
//         event.data?.type === "auth-success" &&
//         event.data.token
//       ) {
//         const token = event.data.token;
//         localStorage.setItem("auth_token", token);
// setUser(event.data.user);
//         if (event.data.user) setUser(event.data.user);
// // 🔹 Add this line to debug
//     console.log("Listener siteId:", siteId, "siteUrl:", siteUrl);
//         // ✅ Save user + siteUrl to KV immediately after login
//         if (siteId && siteUrl) {
//           await saveUserSite(event.data.user, siteId, siteUrl);
//         }

//         popup?.close();
//          setscreen(2);
//         // move to ScreenTwo
//         window.removeEventListener("message", listener);
//       }
//     };

//     window.addEventListener("message", listener);
//   };

//   const fetchAuthMe = async (token: string) => {
//     try {
//       const res = await fetch("http://127.0.0.1:8787/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.loggedIn) {
//         setUser(data.user);
//         setscreen(2);
//         setLoading(false);
//       } else {
//         localStorage.removeItem("auth_token");
//       }
//     } catch (err) {
//       console.error("❌ Error fetching /auth/me:", err);
//     }
//   };

  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://framer-consentbit.web-8fb.workers.dev/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.loggedIn) {
        console.log("✅ User is logged in:", data.user);
        setUser(data.user);
      } else {
        console.log("⚠️ Token invalid or expired");
        setUser(null);
        localStorage.removeItem("auth_token");
      }
    } catch (err) {
      console.error("❌ Profile fetch failed:", err);
      setUser(null);
      localStorage.removeItem("auth_token");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Trigger Google login popup
  const triggerGoogleLogin = () => {
    window.open(
      "https://framer-consentbit.web-8fb.workers.dev/auth/google",
      "_blank",
      "width=500,height=600"
    );
  };

  // ✅ Stateless logout — just delete token
  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  // ✅ Listen for JWT token via postMessage
  useEffect(() => {
    fetchProfile();

    const listener = (event: MessageEvent) => {
      console.log("📩 Message received:", event.origin, event.data);

      // Expecting: { type: "auth-success", token: "..." }
      if (event.data?.type === "auth-success" && event.data.token) {
        const token = event.data.token;
        localStorage.setItem("auth_token", token);
        console.log("✅ Token received and saved:", token);
        fetchProfile(); // refresh
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

 useEffect(() => {
    console.log("User state changed:", user);
      if (user) {
async function savedata(){
const data={
  ...user,
  stagingUrl: siteUrl,
  test:"jj"
}
saveUserData(siteId, data);

}
savedata()
        onClick();
      }
    }, [user, onClick]);

  return (
    <div className="main">
    <div className="main bg-screen">
      <h1>
        Welcome to <span className="highlight">Consentbit</span>
      </h1>
      <p className="description">
        Scan your Webflow site, review detected scripts, add backend, 
        and publish when you’re ready
      </p>

      

      <button className="authorize-btn" onClick={triggerGoogleLogin}>{loading?"Authorized":"Authorized"}</button>
     
    </div>
    </div>
  );
};

export default MainContent;
