# LogLens

**Your logs, finally making sense.**

LogLens is an AI-powered log analysis tool built for indie developers and small dev teams. It watches your app logs, learns what "normal" looks like, and surfaces anomalies in plain English using the Claude API.

## Stack

- **Next.js** (App Router) — marketing site + dashboard
- **NextAuth.js** — GitHub OAuth authentication
- **Supabase** (PostgreSQL) — database
- **Claude API** (claude-sonnet-4-6) — AI log analysis
- **Resend** — email alerts
- **Tailwind CSS** — styling

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-org/loglens.git
cd loglens
npm install
```

### 2. Set up Supabase

Create a new project at [supabase.com](https://supabase.com) and run the schema in `supabase/schema.sql` in the SQL editor.

### 3. Set up GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set the callback URL to `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in all the values in `.env.local`:

| Variable | Description |
|---|---|
| `NEXTAUTH_SECRET` | Random string for session encryption (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `http://localhost:3000` for local dev |
| `GITHUB_CLIENT_ID` | From GitHub OAuth app |
| `GITHUB_CLIENT_SECRET` | From GitHub OAuth app |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_EMAIL` | Verified sender email in Resend |

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Log Ingestion API

Send logs to LogLens from any application using the REST API.

**Endpoint:** `POST /api/ingest`

**Headers:**
- `Content-Type: application/json`
- `x-api-key: your_api_key`

**Body:**
```json
{
  "level": "info | warn | error",
  "message": "Your log message",
  "metadata": { "optional": "json data" }
}
```

### Node.js Example

```javascript
const { LogLens } = require('loglens-sdk');

const logger = new LogLens('ll_your_api_key', {
  endpoint: 'http://localhost:3000/api/ingest'
});

await logger.info('User signed up', { userId: 42 });
await logger.warn('Payment retry', { attempt: 3 });
await logger.error('Database connection failed', { host: 'db.example.com' });
```

Or with plain `fetch`:

```javascript
await fetch('http://localhost:3000/api/ingest', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'll_your_api_key'
  },
  body: JSON.stringify({
    level: 'error',
    message: 'Something went wrong',
    metadata: { requestId: 'abc-123' }
  })
});
```

### Python Example

```python
import requests

response = requests.post(
    "http://localhost:3000/api/ingest",
    headers={
        "Content-Type": "application/json",
        "x-api-key": "ll_your_api_key"
    },
    json={
        "level": "error",
        "message": "Database connection timeout",
        "metadata": {"host": "db.example.com", "timeout_ms": 5000}
    }
)

print(response.json())
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/          # POST - trigger AI analysis
│   │   ├── apps/             # GET/POST - manage apps
│   │   ├── auth/             # NextAuth handlers
│   │   ├── ingest/           # POST - receive logs
│   │   ├── logs/[appId]/     # GET - fetch logs
│   │   └── analyses/[appId]/ # GET - fetch analyses
│   ├── dashboard/
│   │   ├── [appId]/          # App detail page
│   │   └── page.tsx          # Dashboard home
│   ├── layout.tsx
│   └── page.tsx              # Marketing landing page
├── components/
│   ├── AnalysisList.tsx
│   ├── AppCard.tsx
│   ├── CreateAppModal.tsx
│   ├── LogTable.tsx
│   ├── Navbar.tsx
│   └── SessionProvider.tsx
└── lib/
    ├── auth.ts               # NextAuth config
    ├── claude.ts             # Claude API client
    ├── database.types.ts     # Supabase types
    ├── resend.ts             # Email client
    └── supabase.ts           # Supabase client
sdk/
└── src/
    └── index.ts              # LogLens SDK
supabase/
└── schema.sql               # Database schema
```

## Deploying to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Update `NEXTAUTH_URL` to your production URL
5. Update your GitHub OAuth callback URL to `https://your-domain.vercel.app/api/auth/callback/github`

## License

MIT
