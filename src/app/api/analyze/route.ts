import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { analyzeLogs } from "@/lib/claude";
import { sendAnomalyAlert } from "@/lib/resend";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { appId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { appId } = body;
  if (!appId) {
    return NextResponse.json(
      { error: "Missing required field: appId" },
      { status: 400 }
    );
  }

  // Verify ownership
  const { data: app, error: appError } = await supabase
    .from("apps")
    .select("id, name, user_id")
    .eq("id", appId)
    .eq("user_id", session.user.id)
    .single();

  if (appError || !app) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }

  // Fetch last 100 logs
  const { data: logs, error: logsError } = await supabase
    .from("logs")
    .select("level, message, metadata, timestamp")
    .eq("app_id", appId)
    .order("timestamp", { ascending: false })
    .limit(100);

  if (logsError) {
    return NextResponse.json(
      { error: "Failed to fetch logs" },
      { status: 500 }
    );
  }

  if (!logs || logs.length === 0) {
    return NextResponse.json(
      { error: "No logs found for this app" },
      { status: 404 }
    );
  }

  // Analyze with Claude
  const analysis = await analyzeLogs(logs);

  // Store analysis
  const { data: savedAnalysis, error: saveError } = await supabase
    .from("analyses")
    .insert({
      app_id: appId,
      summary: analysis.summary,
      anomalies_detected: analysis.anomalies_detected,
      raw_response: analysis.raw_response,
    })
    .select()
    .single();

  if (saveError) {
    console.error("Error saving analysis:", saveError);
    return NextResponse.json(
      { error: "Failed to save analysis" },
      { status: 500 }
    );
  }

  // Send email alert if anomaly detected
  if (analysis.anomalies_detected && session.user.email) {
    try {
      await sendAnomalyAlert({
        to: session.user.email,
        appName: app.name,
        summary: analysis.summary,
      });
    } catch (emailError) {
      console.error("Failed to send alert email:", emailError);
    }
  }

  return NextResponse.json(savedAnalysis);
}
