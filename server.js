98// server.js
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";       // To fetch the target site HTML
import { JSDOM } from "jsdom";   
dotenv.config();

const app = express();

// --- CONFIG ---
const CLIENT_URLS = [
  "https://framer.com",
  "https://localhost:5173",
  "https://consentbitapp.onrender.com",
  process.env.CLIENT_ORIGIN || "",
];

const SERVER_URL = process.env.SERVER_URL; // e.g. https://your-app.onrender.com

// --- CORS ---
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || CLIENT_URLS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// --- PASSPORT (stateless) ---
app.use(passport.initialize());

// --- JWT Helpers ---
function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET || "secretkey", {
    expiresIn: "1h",
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "secretkey");
  } catch (err) {
    return null;
  }
}

// --- GOOGLE STRATEGY ---
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${SERVER_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
      };
      return done(null, user); // attaches to req.user
    }
  )
);

// --- ROUTES ---
// Trigger Google Login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

// Google Callback (sends JWT back via postMessage)
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/fail", session: false }),
  (req, res) => {
    const user = req.user;
    const token = generateToken(user);

    // Send token back to parent window
    res.send(`
      <script>
        if (window.opener) {
          window.opener.postMessage({
            type: "auth-success",
            token: "${token}"
          }, "*");
          window.close();
        } else {
          document.write("Login successful. You can close this window.");
        }
      </script>
    `);
  }
);

// Auth Fail
app.get("/auth/fail", (req, res) => res.status(401).json({ success: false }));

// Auth Me (used by frontend to verify token)
app.get("/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ loggedIn: false });
  }

  const token = authHeader.split(" ")[1];
  const user = verifyToken(token);

  if (user) {
    res.json({ loggedIn: true, user });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

// Logout — stateless, just for frontend UX (doesn't do anything server-side)
app.post("/auth/logout", (req, res) => {
  res.json({ success: true });
});


app.get("/api/fetch-scripts", async (req, res) => {
  try {
    const siteUrl = req.query.url;
    const response = await fetch(siteUrl);
    const html = await response.text();

    const dom = new JSDOM(html);
    const headScripts = dom.window.document.head.querySelectorAll("script");

    // Patterns for analytics scripts
    const analyticsPatterns = ["google-analytics.com", "gtag.js", "hotjar.com"];

    const allScripts = Array.from(headScripts).map((script) => {
      // Serialize all attributes on the script tag
      const attrs = Array.from(script.attributes)
        .map(attr => `${attr.name}="${attr.value}"`)
        .join(" ");
      const content = script.textContent?.trim() || "";

      // Recreate the script tag
      const scriptTag = content
        ? `<script ${attrs}>${content}</script>`
        : `<script ${attrs}></script>`;

      // Default category array
      let category = [];

      // Check analytics patterns
      const rawData = (script.getAttribute("src") || content);
      if (analyticsPatterns.some(p => rawData.includes(p))) {
        category.push("analytics");
      }

      // Check for data-category attribute and split it into array
      const dataCategory = script.getAttribute("data-category");
      if (dataCategory) {
        const categoriesFromAttr = dataCategory
          .split(",")               // split by comma
          .map(c => c.trim())        // trim spaces
          .filter(c => c.length > 0);
        category = [...category, ...categoriesFromAttr];
      }

      return {
        script: scriptTag,
        isChanged: false,
        isDismiss: false,
        isSaved: false,
        isEditing: false,
        category,
      };
    });

    res.json({
      scripts: allScripts,
      totalScripts: allScripts.length,
      totalAnalyticsScripts: allScripts.filter(s => s.category.includes("analytics")).length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch site" });
  }
});




// --- START SERVER ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on ${SERVER_URL}`));
