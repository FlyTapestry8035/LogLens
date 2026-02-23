import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { appId } = await params;

  // Verify ownership
  const { data: app } = await supabase
    .from("apps")
    .select("id")
    .eq("id", appId)
    .eq("user_id", session.user.id)
    .single();

  if (!app) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }

  const { data: analyses, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("app_id", appId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch analyses" },
      { status: 500 }
    );
  }

  return NextResponse.json(analyses);
}
