import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUserId(session.user.id);
          setUserDetails(session.user);
        } else {
          setUserId(null);
          setUserDetails(null);
        }
      } catch (error) {
        console.error("Error getting current user:", error);
        setUserId(null);
        setUserDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  return { userId, userDetails, isLoading };
}
