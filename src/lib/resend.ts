import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAnomalyAlert({
  to,
  appName,
  summary,
}: {
  to: string;
  appName: string;
  summary: string;
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "LogLens <alerts@loglens.dev>",
    to,
    subject: `[LogLens] Anomaly detected in ${appName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">Anomaly Detected</h2>
        <p>LogLens detected an anomaly in your app <strong>${appName}</strong>.</p>
        <div style="background: #1e1e2e; color: #cdd6f4; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <pre style="white-space: pre-wrap; margin: 0;">${summary}</pre>
        </div>
        <p style="color: #666;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard">View in Dashboard</a>
        </p>
      </div>
    `,
  });
}
