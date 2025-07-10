import session from "express-session";
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";

// Simple demo authentication for development
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  return session({
    secret: process.env.SESSION_SECRET || "demo-secret-key-for-development-12345",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // Set to false for development
      maxAge: sessionTtl,
    },
  });
}

// Demo auth for development - using simple session storage
export async function setupAuth(app: Express) {
  app.use(getSession());

  // Simple demo user for development
  const demoUser = {
    id: "demo-user-123",
    email: "demo@dentalautomations.io",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    profileImageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=faces",
    expires_at: Math.floor(Date.now() / 1000) + 86400 // 24 hours from now
  };

  // Demo login - creates a session with demo user
  app.get("/api/login", async (req, res) => {
    try {
      // Store demo user in database
      await storage.upsertUser({
        id: demoUser.id,
        email: demoUser.email,
        firstName: demoUser.firstName,
        lastName: demoUser.lastName,
        profileImageUrl: demoUser.profileImageUrl
      });

      // Set user in session
      (req.session as any).user = demoUser;
      
      console.log("User logged in:", demoUser.email);
      
      // Save the session before redirecting
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.redirect("/?error=session_error");
        }
        console.log("Session saved successfully");
        res.redirect("/dashboard");
      });
    } catch (error) {
      console.error("Auth setup error:", error);
      res.redirect("/?error=auth_error");
    }
  });

  app.get("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
      }
      res.redirect("/");
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = (req.session as any)?.user;

  console.log("Auth check - Session user:", user ? "exists" : "missing");
  console.log("Auth check - Session ID:", req.sessionID);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if session is still valid
  const now = Math.floor(Date.now() / 1000);
  if (user.expires_at && now > user.expires_at) {
    return res.status(401).json({ message: "Session expired" });
  }

  return next();
};