"use client";
import React from "react";
import Link from "next/link";
import SignInForm from "./SignInForm";
import { useUser } from "@/store/store";
import Profile from "./Profile";
import { supabaseCreateBrowserClient } from "@/lib/supabaseCreateBrowserClient";

const Navbar = () => {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const supabase = supabaseCreateBrowserClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/">
        <p>MyBlog</p>
      </Link>

      {user ? (
        <div className="flex gap-4">
          <Profile />
          {user.user_metadata.role === "admin" && (
            <Link href="/dashboard">
              <button className="cursor-pointer p-2 font-bold bg-green-500 rounded-full text-white">
                Dashboard
              </button>
            </Link>
          )}

          <button
            onClick={handleSignOut}
            className="cursor-pointer p-2 font-bold bg-red-500 rounded-full text-white"
          >
            Log Out
          </button>
        </div>
      ) : (
        <SignInForm />
      )}
    </nav>
  );
};

export default Navbar;
