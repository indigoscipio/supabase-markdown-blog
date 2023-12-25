"use client";
import { supabaseCreateBrowserClient } from "@/lib/supabaseCreateBrowserClient";
import { useUser } from "@/store/store";
import React, { useEffect, useState } from "react";

const SessionProvider = () => {
  const setUser = useUser((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  const supabase = supabaseCreateBrowserClient();

  const readUserSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user);
    } catch (error) {
      console.error("Error fetching user session:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    readUserSession();
  }, []);

  return loading ? <div>Loading...</div> : null;
};

export default SessionProvider;
