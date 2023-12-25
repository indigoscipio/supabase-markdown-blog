import { checkout } from "@/lib/stripeActions";
import { useUser } from "@/store/store";
import { usePathname } from "next/navigation";
import React from "react";

export default function Checkout() {
  const user = useUser((state) => state.user);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const pathname = usePathname();

    const result = await checkout(user?.user_metadata?.email, pathname);
    console.log(result);
  };

  if (!user) {
    return (
      <h1 className="font-bold text-center ">
        Please Sign in to see this article! 🙌
      </h1>
    );
  }

  return (
    <form>
      <button onClick={handleCheckout}>
        {" "}
        <h2>Upgrade To Pro! ⚡</h2>{" "}
      </button>
      <button>Subscribe to Unlock 🔒</button>
    </form>
  );
}
