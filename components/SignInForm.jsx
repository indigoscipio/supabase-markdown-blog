"use client";
import { supabaseCreateBrowserClient } from "@/lib/supabaseCreateBrowserClient";
import { usePathname } from "next/navigation";
import React from "react";

const SignInForm = () => {
  const supabase = supabaseCreateBrowserClient();
  const pathname = usePathname();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        className="p-2 rounded-full bg-green-500 font-bold text-white"
      >
        Sign In
      </button>
    </div>
  );
};

export default SignInForm;
