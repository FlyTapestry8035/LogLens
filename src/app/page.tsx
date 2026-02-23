"use client";

import { signIn } from "next-auth/react";

const features = [
  {
    title: "Drop-in SDK",
    description:
      "One line of code to start shipping logs. Works with Node.js, Python, or any HTTP client.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Analysis",
    description:
      "Claude reads your logs and tells you what's wrong in plain English. No more grep-ing through walls of text.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    title: "Anomaly Alerts",
    description:
      "Get emailed the moment something looks off. Know about issues before your users report them.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
  {
    title: "Built for Indie Devs",
    description:
      "No 50-page docs. No enterprise sales calls. Just sign in with GitHub and start shipping.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For side projects and experiments",
    features: [
      "1 app",
      "1,000 logs/month",
      "5 AI analyses/month",
      "7-day log retention",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Solo",
    price: "$9",
    period: "/mo",
    description: "For indie devs shipping real products",
    features: [
      "5 apps",
      "50,000 logs/month",
      "Unlimited AI analyses",
      "30-day log retention",
      "Email alerts",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/mo",
    description: "For small teams who need more",
    features: [
      "Unlimited apps",
      "500,000 logs/month",
      "Unlimited AI analyses",
      "90-day log retention",
      "Email alerts",
      "Team members (up to 5)",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-20 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium">
          Now in beta
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Your logs, finally
          <br />
          <span className="text-emerald-400">making sense.</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          LogLens watches your app 24/7 and tells you what&apos;s wrong in plain
          English — before your users do.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => signIn("github")}
            className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 px-6 py-3 rounded-lg text-base font-medium hover:bg-zinc-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Sign in with GitHub
          </button>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors"
          >
            Learn more
          </a>
        </div>
      </section>

      {/* Code example */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="text-xs text-zinc-500 ml-2">app.js</span>
          </div>
          <pre className="p-6 text-sm font-mono overflow-x-auto">
            <code>
              <span className="text-zinc-500">// Install: npm install loglens-sdk</span>
              {"\n"}
              <span className="text-purple-400">import</span>
              <span className="text-zinc-300"> {"{ LogLens }"} </span>
              <span className="text-purple-400">from</span>
              <span className="text-emerald-400"> &apos;loglens-sdk&apos;</span>
              {"\n\n"}
              <span className="text-purple-400">const</span>
              <span className="text-zinc-300"> logger = </span>
              <span className="text-purple-400">new</span>
              <span className="text-yellow-300"> LogLens</span>
              <span className="text-zinc-300">(</span>
              <span className="text-emerald-400">&apos;ll_your_api_key&apos;</span>
              <span className="text-zinc-300">)</span>
              {"\n\n"}
              <span className="text-zinc-300">logger.</span>
              <span className="text-blue-400">info</span>
              <span className="text-zinc-300">(</span>
              <span className="text-emerald-400">&apos;User signed up&apos;</span>
              <span className="text-zinc-300">, {"{ userId: 42 }"})</span>
              {"\n"}
              <span className="text-zinc-300">logger.</span>
              <span className="text-yellow-400">warn</span>
              <span className="text-zinc-300">(</span>
              <span className="text-emerald-400">&apos;Payment retry #3&apos;</span>
              <span className="text-zinc-300">)</span>
              {"\n"}
              <span className="text-zinc-300">logger.</span>
              <span className="text-red-400">error</span>
              <span className="text-zinc-300">(</span>
              <span className="text-emerald-400">&apos;Database connection failed&apos;</span>
              <span className="text-zinc-300">)</span>
              {"\n\n"}
              <span className="text-zinc-500">// LogLens takes it from here</span>
            </code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="text-zinc-400">
            Built for developers who ship fast and fix faster.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
            >
              <div className="w-10 h-10 bg-emerald-400/10 text-emerald-400 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Simple pricing for real developers
          </h2>
          <p className="text-zinc-400">
            Start free. Upgrade when your side project becomes a real business.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-6 ${
                tier.highlighted
                  ? "bg-emerald-400/5 border-2 border-emerald-400/30"
                  : "bg-zinc-900 border border-zinc-800"
              }`}
            >
              {tier.highlighted && (
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold text-white mt-2">
                {tier.name}
              </h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold text-white">
                  {tier.price}
                </span>
                <span className="text-zinc-400">{tier.period}</span>
              </div>
              <p className="text-sm text-zinc-500 mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => signIn("github")}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  tier.highlighted
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-zinc-500">
          <span className="text-emerald-400 font-semibold">Log</span>
          <span className="text-white font-semibold">Lens</span>
          <span className="mx-2">&middot;</span>
          Built for developers who ship.
        </div>
      </footer>
    </div>
  );
}
