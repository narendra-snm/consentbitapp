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
    const response = await fetch("https://usersave.narendra-3c5.workers.dev/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ siteId, userData }),
    });

    const text = await response.text();
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
    siteUrl
}: {
  onClick: () => void;
  setUser: (user: User | null) => void;
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  siteId: string;
  siteUrl: string;

}) => {
  // ✅ Fetch profile using stored JWT token






  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://consentbitapp.onrender.com/auth/me", {
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
      "https://consentbitapp.onrender.com/auth/google",
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
  stagingUrl: siteUrl
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

      

      <button className="authorize-btn" onClick={triggerGoogleLogin}>Authorized</button>
     
    </div>
    </div>
  );
};

export default MainContent;
