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

  const { data: logs, error } = await supabase
    .from("logs")
    .select("*")
    .eq("app_id", appId)
    .order("timestamp", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch logs" },
      { status: 500 }
    );
  }

  return NextResponse.json(logs);
}
