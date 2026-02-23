type LogLevel = "info" | "warn" | "error";

interface LogLensOptions {
  endpoint?: string;
}

export class LogLens {
  private apiKey: string;
  private endpoint: string;

  constructor(apiKey: string, options?: LogLensOptions) {
    this.apiKey = apiKey;
    this.endpoint = options?.endpoint || "https://your-app.vercel.app/api/ingest";
  }

  private async send(level: LogLevel, message: string, metadata?: Record<string, unknown>): Promise<void> {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
        body: JSON.stringify({ level, message, metadata }),
      });

      if (!response.ok) {
        const body = await response.text();
        console.error(`[LogLens] Failed to send log: ${response.status} ${body}`);
      }
    } catch (error) {
      console.error("[LogLens] Failed to send log:", error);
    }
  }

  async info(message: string, metadata?: Record<string, unknown>): Promise<void> {
    return this.send("info", message, metadata);
  }

  async warn(message: string, metadata?: Record<string, unknown>): Promise<void> {
    return this.send("warn", message, metadata);
  }

  async error(message: string, metadata?: Record<string, unknown>): Promise<void> {
    return this.send("error", message, metadata);
  }
}

export default LogLens;
