import { users, dentists, demoRequests, newsletters, type User, type InsertUser, type UpsertUser, type Dentist, type InsertDentist, type DemoRequest, type InsertDemoRequest, type Newsletter, type InsertNewsletter } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods (for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Legacy user methods for demo/newsletter
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dentist methods
  getDentist(id: number): Promise<Dentist | undefined>;
  getDentistByUserId(userId: number): Promise<Dentist | undefined>;
  createDentist(dentist: InsertDentist): Promise<Dentist>;
  
  // Demo request methods
  createDemoRequest(demoRequest: InsertDemoRequest): Promise<DemoRequest>;
  getDemoRequests(): Promise<DemoRequest[]>;
  updateDemoRequestStatus(id: number, status: string): Promise<DemoRequest | undefined>;
  
  // Newsletter methods
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  unsubscribeNewsletter(email: string): Promise<void>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Legacy user methods
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        id: Math.random().toString(36).substring(2, 15),
        ...insertUser
      })
      .returning();
    return user;
  }

  // Dentist methods
  async getDentist(id: number): Promise<Dentist | undefined> {
    const [dentist] = await db.select().from(dentists).where(eq(dentists.id, id));
    return dentist || undefined;
  }

  async getDentistByUserId(userId: number): Promise<Dentist | undefined> {
    const [dentist] = await db.select().from(dentists).where(eq(dentists.userId, userId));
    return dentist || undefined;
  }

  async createDentist(insertDentist: InsertDentist): Promise<Dentist> {
    const [dentist] = await db
      .insert(dentists)
      .values(insertDentist)
      .returning();
    return dentist;
  }

  // Demo request methods
  async createDemoRequest(insertDemoRequest: InsertDemoRequest): Promise<DemoRequest> {
    const [demoRequest] = await db
      .insert(demoRequests)
      .values(insertDemoRequest)
      .returning();
    return demoRequest;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return await db.select().from(demoRequests);
  }

  async updateDemoRequestStatus(id: number, status: string): Promise<DemoRequest | undefined> {
    const [updated] = await db
      .update(demoRequests)
      .set({ status })
      .where(eq(demoRequests.id, id))
      .returning();
    return updated || undefined;
  }

  // Newsletter methods
  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db
      .insert(newsletters)
      .values(insertNewsletter)
      .onConflictDoNothing({ target: newsletters.email })
      .returning();
    
    if (!newsletter) {
      // If no insert due to conflict, update existing record
      const [updated] = await db
        .update(newsletters)
        .set({ isActive: true, subscribedAt: new Date() })
        .where(eq(newsletters.email, insertNewsletter.email))
        .returning();
      return updated;
    }
    
    return newsletter;
  }

  async unsubscribeNewsletter(email: string): Promise<void> {
    await db
      .update(newsletters)
      .set({ isActive: false })
      .where(eq(newsletters.email, email));
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return await db.select().from(newsletters).where(eq(newsletters.isActive, true));
  }
}

export const storage = new DatabaseStorage();
