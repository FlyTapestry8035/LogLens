import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Json } from "@/lib/database.types";

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing x-api-key header" },
      { status: 401 }
    );
  }

  const { data: app, error: appError } = await supabase
    .from("apps")
    .select("id")
    .eq("api_key", apiKey)
    .single();

  if (appError || !app) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  let body: { level?: string; message?: string; metadata?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { level, message, metadata } = body;

  if (!level || !message) {
    return NextResponse.json(
      { error: "Missing required fields: level, message" },
      { status: 400 }
    );
  }

  if (!["info", "warn", "error"].includes(level)) {
    return NextResponse.json(
      { error: "Invalid level. Must be info, warn, or error" },
      { status: 400 }
    );
  }

  const { error: insertError } = await supabase.from("logs").insert({
    app_id: app.id,
    level: level as "info" | "warn" | "error",
    message,
    metadata: (metadata as Json) ?? null,
  });

  if (insertError) {
    console.error("Error inserting log:", insertError);
    return NextResponse.json(
      { error: "Failed to store log" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
