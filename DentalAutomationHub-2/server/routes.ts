import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoRequestSchema, insertNewsletterSchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const sessionUser = (req.session as any)?.user;
      if (!sessionUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const user = await storage.getUser(sessionUser.id);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  // Demo request API
  app.post("/api/demo-request", async (req, res) => {
    try {
      const validatedData = insertDemoRequestSchema.parse(req.body);
      const demoRequest = await storage.createDemoRequest(validatedData);
      res.json({ success: true, data: demoRequest });
    } catch (error) {
      console.error("Error creating demo request:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid request data" 
      });
    }
  });

  // Get demo requests (admin only)
  app.get("/api/demo-requests", async (req, res) => {
    try {
      const demoRequests = await storage.getDemoRequests();
      res.json({ success: true, data: demoRequests });
    } catch (error) {
      console.error("Error fetching demo requests:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Newsletter subscription API
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.subscribeNewsletter(validatedData);
      res.json({ success: true, data: newsletter });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid email address" 
      });
    }
  });

  // Newsletter unsubscribe API
  app.post("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      await storage.unsubscribeNewsletter(email);
      res.json({ success: true, message: "Successfully unsubscribed" });
    } catch (error) {
      console.error("Error unsubscribing from newsletter:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Health check API
  app.get("/api/health", async (req, res) => {
    try {
      res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        database: "connected"
      });
    } catch (error) {
      console.error("Health check error:", error);
      res.status(500).json({ error: "Service unavailable" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
