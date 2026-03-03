import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Globe,
  FlaskConical,
  Cpu,
  ArrowRight,
  Search,
  Terminal,
  Lock,
  Zap,
  Fingerprint,
} from "lucide-react";

// ── Products ────────────────────────────────────────────────────────────────
// Note: lucide-react has no "Gate" icon — replaced with Fingerprint (identity gate concept)
const products = [
  {
    slug: "/slime",
    name: "SLIME",
    subtitle: "Law-layer appliance (binary actuation gate)",
    icon: Shield,
    status: "Sealed v0.1",
    tags: ["fail-closed", "no config", "32-byte egress"],
    blurb:
      "A minimal enforcement membrane: ingress → {AUTHORIZED | IMPOSSIBLE}. External actuator owns effects; SLIME only emits fixed 32-byte frames.",
  },
  {
    slug: "/anathema",
    name: "ANATHEMA",
    subtitle: "Present-only cybernetic architecture",
    icon: Cpu,
    status: "P0 canon",
    tags: ["present-only", "no feedback", "impossibility"],
    blurb:
      "A coherent safety trajectory for agents and systems: observation-first, law-layer actuation, and structural limits that resist learning-by-feedback.",
  },
  {
    slug: "/gate",
    name: "SYF Gate",
    subtitle: "Identity ≠ capacity (law-layer separation)",
    icon: Fingerprint,
    status: "Core concept sealed",
    tags: ["capacity budgeting", "fail-closed", "oracle-free"],
    blurb:
      "A security primitive: cryptographic identity is not enough to act. High-risk actions are gated through invariants — not policies.",
  },
  {
    slug: "/shield",
    name: "SYF Shield",
    subtitle: "Defense templates derived from Gate",
    icon: Lock,
    status: "Defined",
    tags: ["law-of-impossibility", "local templates", "machine-only"],
    blurb:
      "A deployable pattern: implement defense by removing paths, not adding rules. Same invariants; different operational envelopes.",
  },
  {
    slug: "/wmn",
    name: "WMN",
    subtitle: "World Machine Network (machine ecology)",
    icon: Globe,
    status: "Concept vault",
    tags: ["non-TCP", "clusters", "teleportation"],
    blurb:
      "A network model for machines: spores, pheromones, mycelium, and coherence filtering via thermodynamic invariants.",
  },
  {
    slug: "/lab",
    name: "SYF Lab",
    subtitle: "Research + proofs + adversarial validation",
    icon: FlaskConical,
    status: "Active",
    tags: ["PoM", "vectors", "AVP"],
    blurb:
      "Where we test the claims: deterministic suites, sealed artifacts, and documentation that survives hostile interpretation.",
  },
];

// ── Helper components ────────────────────────────────────────────────────────
function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs tracking-wide text-muted-foreground">
      {children}
    </span>
  );
}

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 900);
        } catch {
          // no-op
        }
      }}
    >
      <Terminal className="h-4 w-4" />
      {copied ? "Copied!" : label}
    </Button>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function SyfcorpHomepage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const hay = [p.name, p.subtitle, p.status, p.blurb, ...(p.tags || [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top ambient glow */}
      <div className="pointer-events-none fixed inset-x-0 -top-24 h-72 opacity-40 blur-3xl">
        <div className="mx-auto h-full w-[min(900px,92vw)] rounded-full bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-blue-900/30" />
      </div>

      {/* ── Header ── */}
      <header className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg border border-border bg-foreground/5 flex items-center justify-center">
                  <span className="text-xs font-bold text-foreground/60">S</span>
                </div>
                <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  SYF Corp
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
                Law-layer systems for machines.
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                A hub for projects built on structural invariants — not policies. Binary
                outcomes, sealed interfaces, and fail-closed behavior.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <CopyButton text="syfcorp.com" label="Copy domain" />
              <Button className="gap-2" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                <Zap className="h-4 w-4" />
                Explore
              </Button>
            </div>
          </div>

          {/* Pills + Search */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Pill>fail-closed</Pill>
              <Pill>no governance</Pill>
              <Pill>no feedback</Pill>
              <Pill>oracle-free</Pill>
              <Pill>Proof of Math</Pill>
            </div>

            <div className="relative w-full sm:w-[360px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="w-full rounded-xl border border-border bg-background px-9 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </motion.div>
      </header>

      {/* ── Main ── */}
      <main id="projects" className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-10">

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-muted-foreground text-sm">
              No projects match <span className="text-foreground">"{query}"</span>
            </div>
          )}
          {filtered.map((p, idx) => {
            const Icon = p.icon;
            const isSlime = p.slug === "/slime";
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <Card className={`rounded-2xl shadow-sm hover:shadow-lg transition-all hover:border-primary/40 h-full ${isSlime ? 'border-primary/30' : ''}`}>
                  <CardContent className="p-5 flex flex-col gap-4 h-full">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${isSlime ? 'border-primary/50 bg-primary/10' : 'border-border bg-foreground/5'}`}>
                          <Icon className={`h-5 w-5 ${isSlime ? 'text-blue-400' : ''}`} />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <h2 className="text-base font-semibold tracking-tight text-foreground">
                              {p.name}
                            </h2>
                            <span className="text-xs rounded-full border border-border px-2 py-0.5 text-muted-foreground">
                              {p.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-foreground/70 flex-1">
                      {p.blurb}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1 mt-auto">
                      <span className="text-xs text-muted-foreground font-mono">{p.slug}</span>
                      {isSlime ? (
                        <Link to="/slime">
                          <Button variant="outline" className="rounded-xl gap-2 text-xs">
                            View docs
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" className="rounded-xl gap-2 text-xs opacity-40 cursor-not-allowed" disabled>
                          Coming soon
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Operating Constraints */}
        <section className="mt-10">
          <Card className="rounded-2xl">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  Operating constraints
                </h3>
                <p className="text-sm text-muted-foreground">
                  Defaults for this ecosystem: sealed interfaces, determinism, and removal of feedback channels.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    icon: Shield,
                    title: "Fail-closed by default",
                    text: "If the actuator is absent or a write fails, the safe outcome is the only outcome.",
                  },
                  {
                    icon: Fingerprint,
                    title: "Identity ≠ capacity",
                    text: "Being authenticated does not grant the ability to perform irreversible actions.",
                  },
                  {
                    icon: Lock,
                    title: "No configuration knobs",
                    text: "The fewer degrees of freedom, the fewer attack surfaces and misconfigurations.",
                  },
                  {
                    icon: Terminal,
                    title: "Sealed & auditable",
                    text: "Interfaces are fixed; behavior is validated by deterministic suites and artifacts.",
                  },
                ].map(({ icon: I, title, text }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-border p-4 flex gap-3 hover:border-border/80 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-xl border border-border bg-foreground/5 flex items-center justify-center shrink-0">
                      <I className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-foreground">{title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-10 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border pt-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-foreground/20" />
              <span className="font-mono">SYF Corp — syfcorp.com</span>
            </div>
            <div className="flex items-center gap-4">
              <a className="hover:text-foreground transition-colors underline underline-offset-4" href="/terms">
                Terms of Non-Use
              </a>
              <a className="hover:text-foreground transition-colors underline underline-offset-4" href="https://github.com/AnathemaOfficial" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
