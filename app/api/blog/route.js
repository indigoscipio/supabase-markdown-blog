import { supabaseCreateBrowserClient } from "@/lib/supabaseCreateBrowserClient";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const supabase = supabaseCreateBrowserClient();
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (id === "*") {
    const result = await supabase.from("blog").select("id").limit(10);
    return NextResponse.json({ ...result });
  }
  if (id) {
    const result = await supabase
      .from("blog")
      .select("*")
      .eq("id", id)
      .single();

    return Response.json({ ...result });
  }
  return NextResponse.json({});
};
