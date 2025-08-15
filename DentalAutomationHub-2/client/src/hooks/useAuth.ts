import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  // Debug log to see what's happening
  console.log("useAuth - User:", user);
  console.log("useAuth - Loading:", isLoading);
  console.log("useAuth - Error:", error);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}