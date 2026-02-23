import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface LogEntry {
  level: string;
  message: string;
  metadata: unknown;
  timestamp: string;
}

interface AnalysisResult {
  summary: string;
  anomalies_detected: boolean;
  raw_response: string;
}

export async function analyzeLogs(logs: LogEntry[]): Promise<AnalysisResult> {
  const logsText = logs
    .map(
      (log) =>
        `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}${
          log.metadata ? ` | metadata: ${JSON.stringify(log.metadata)}` : ""
        }`
    )
    .join("\n");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a log analysis AI. Below are the most recent logs from a developer's application. Identify any anomalies, unusual patterns, or potential issues. Respond with:
1) A plain-English summary of what's happening in the logs
2) Whether any anomalies were detected (true/false)
3) A brief description of each anomaly if any exist

Be concise and developer-friendly. Format your response as JSON with the keys "summary" (string), "anomalies_detected" (boolean), and "anomalies" (array of strings, can be empty).

Logs:
${logsText}`,
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  let parsed: { summary: string; anomalies_detected: boolean };
  try {
    parsed = JSON.parse(responseText);
  } catch {
    parsed = {
      summary: responseText,
      anomalies_detected: false,
    };
  }

  return {
    summary: parsed.summary,
    anomalies_detected: parsed.anomalies_detected,
    raw_response: responseText,
  };
}
