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

// ── i18n ─────────────────────────────────────────────────────────────────────
const t = {
  en: {
    tagline: "Law-layer systems for machines.",
    sub: "A hub for projects built on structural invariants — not policies. Binary outcomes, sealed interfaces, and fail-closed behavior.",
    copyLabel: "Copy domain",
    explore: "Explore",
    searchPlaceholder: "Search projects…",
    noMatch: (q) => <>No projects match <span className="text-foreground">"{q}"</span></>,
    viewDocs: "View docs",
    comingSoon: "Coming soon",
    constraintsTitle: "Operating constraints",
    constraintsSub: "Defaults for this ecosystem: sealed interfaces, determinism, and removal of feedback channels.",
    constraints: [
      { title: "Fail-closed by default", text: "If the actuator is absent or a write fails, the safe outcome is the only outcome." },
      { title: "Identity ≠ capacity", text: "Being authenticated does not grant the ability to perform irreversible actions." },
      { title: "No configuration knobs", text: "The fewer degrees of freedom, the fewer attack surfaces and misconfigurations." },
      { title: "Sealed & auditable", text: "Interfaces are fixed; behavior is validated by deterministic suites and artifacts." },
    ],
    terms: "Terms of Non-Use",
  },
  fr: {
    tagline: "Systèmes law-layer pour machines.",
    sub: "Un hub pour des projets fondés sur des invariants structurels — pas des politiques. Résultats binaires, interfaces scellées, comportement fail-closed.",
    copyLabel: "Copier le domaine",
    explore: "Explorer",
    searchPlaceholder: "Rechercher un projet…",
    noMatch: (q) => <>Aucun projet ne correspond à <span className="text-foreground">"{q}"</span></>,
    viewDocs: "Voir la doc",
    comingSoon: "Bientôt",
    constraintsTitle: "Contraintes opérationnelles",
    constraintsSub: "Défauts de cet écosystème : interfaces scellées, déterminisme, et suppression des canaux de feedback.",
    constraints: [
      { title: "Fail-closed par défaut", text: "Si l'actuator est absent ou qu'une écriture échoue, le résultat sûr est le seul résultat." },
      { title: "Identité ≠ capacité", text: "Être authentifié ne confère pas la capacité d'effectuer des actions irréversibles." },
      { title: "Zéro knob de configuration", text: "Moins de degrés de liberté = moins de surfaces d'attaque et de mauvaises configurations." },
      { title: "Scellé & auditable", text: "Les interfaces sont fixes ; le comportement est validé par des suites déterministes et des artefacts." },
    ],
    terms: "Conditions de Non-Usage",
  },
};

// ── Products (bilingual) ──────────────────────────────────────────────────────
const products = [
  {
    slug: "/slime",
    name: "SLIME",
    icon: Shield,
    status: "Sealed v0.1",
    tags: ["fail-closed", "no config", "32-byte egress"],
    en: { subtitle: "Law-layer appliance (binary actuation gate)", blurb: "A minimal enforcement membrane: ingress → {AUTHORIZED | IMPOSSIBLE}. External actuator owns effects; SLIME only emits fixed 32-byte frames." },
    fr: { subtitle: "Appliance law-layer (portail d'actuation binaire)", blurb: "Une membrane d'enforcement minimale : ingress → {AUTORISÉ | IMPOSSIBLE}. L'actuator externe possède les effets ; SLIME n'émet que des frames fixes de 32 bytes." },
  },
  {
    slug: "/anathema",
    name: "ANATHEMA",
    icon: Cpu,
    status: "P0 canon",
    tags: ["present-only", "no feedback", "impossibility"],
    en: { subtitle: "Present-only cybernetic architecture", blurb: "A coherent safety trajectory for agents and systems: observation-first, law-layer actuation, and structural limits that resist learning-by-feedback." },
    fr: { subtitle: "Architecture cybernétique present-only", blurb: "Une trajectoire de sécurité cohérente pour agents et systèmes : observation d'abord, actuation law-layer, et limites structurelles résistant à l'apprentissage par feedback." },
  },
  {
    slug: "/gate",
    name: "SYF Gate",
    icon: Fingerprint,
    status: "Core concept sealed",
    tags: ["capacity budgeting", "fail-closed", "oracle-free"],
    en: { subtitle: "Identity ≠ capacity (law-layer separation)", blurb: "A security primitive: cryptographic identity is not enough to act. High-risk actions are gated through invariants — not policies." },
    fr: { subtitle: "Identité ≠ capacité (séparation law-layer)", blurb: "Un primitif de sécurité : l'identité cryptographique ne suffit pas pour agir. Les actions à haut risque sont filtrées par des invariants — pas des politiques." },
  },
  {
    slug: "/shield",
    name: "SYF Shield",
    icon: Lock,
    status: "Defined",
    tags: ["law-of-impossibility", "local templates", "machine-only"],
    en: { subtitle: "Defense templates derived from Gate", blurb: "A deployable pattern: implement defense by removing paths, not adding rules. Same invariants; different operational envelopes." },
    fr: { subtitle: "Templates de défense dérivés de Gate", blurb: "Un pattern déployable : implémenter la défense en supprimant des chemins, pas en ajoutant des règles. Mêmes invariants ; enveloppes opérationnelles différentes." },
  },
  {
    slug: "/wmn",
    name: "WMN",
    icon: Globe,
    status: "Concept vault",
    tags: ["non-TCP", "clusters", "teleportation"],
    en: { subtitle: "World Machine Network (machine ecology)", blurb: "A network model for machines: spores, pheromones, mycelium, and coherence filtering via thermodynamic invariants." },
    fr: { subtitle: "World Machine Network (écologie machine)", blurb: "Un modèle réseau pour machines : spores, phéromones, mycélium, et filtrage de cohérence via invariants thermodynamiques." },
  },
  {
    slug: "/lab",
    name: "SYF Lab",
    icon: FlaskConical,
    status: "Active",
    tags: ["PoM", "vectors", "AVP"],
    en: { subtitle: "Research + proofs + adversarial validation", blurb: "Where we test the claims: deterministic suites, sealed artifacts, and documentation that survives hostile interpretation." },
    fr: { subtitle: "Recherche + preuves + validation adversariale", blurb: "Là où on teste les affirmations : suites déterministes, artefacts scellés, et documentation qui survit à une interprétation hostile." },
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
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
        } catch { /* no-op */ }
      }}
    >
      <Terminal className="h-4 w-4" />
      {copied ? "Copied!" : label}
    </Button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SyfcorpHomepage() {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("en");
  const tx = t[lang];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const hay = [p.name, p[lang].subtitle, p.status, p[lang].blurb, ...(p.tags || [])]
        .join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query, lang]);

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
              {/* Logo + wordmark */}
              <div className="inline-flex items-center gap-3">
                <img
                  src="/syfcorp-logo.png"
                  alt="SYFCORP logo"
                  className="h-9 w-9 object-contain invert"
                />
                <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground font-bold">
                  SYFCORP
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
                {tx.tagline}
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                {tx.sub}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 shrink-0">
              {/* FR/EN toggle */}
              <div className="flex items-center border border-border rounded-lg overflow-hidden text-xs font-mono">
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("fr")}
                  className={`px-3 py-1.5 transition-colors ${lang === "fr" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                >
                  FR
                </button>
              </div>
              <CopyButton text="syfcorp.com" label={tx.copyLabel} />
              <Button className="gap-2" onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
                <Zap className="h-4 w-4" />
                {tx.explore}
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
            <div className="flex items-center gap-2">
              {/* Mobile lang toggle */}
              <div className="flex sm:hidden items-center border border-border rounded-lg overflow-hidden text-xs font-mono">
                <button onClick={() => setLang("en")} className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground"}`}>EN</button>
                <button onClick={() => setLang("fr")} className={`px-3 py-1.5 transition-colors ${lang === "fr" ? "bg-foreground text-background" : "text-muted-foreground"}`}>FR</button>
              </div>
              <div className="relative w-full sm:w-[320px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={tx.searchPlaceholder}
                  className="w-full rounded-xl border border-border bg-background px-9 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* ── Main ── */}
      <main id="projects" className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-10">

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-muted-foreground text-sm">
              {tx.noMatch(query)}
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
                <Card className={`rounded-2xl shadow-sm hover:shadow-lg transition-all hover:border-primary/40 h-full ${isSlime ? "border-primary/30" : ""}`}>
                  <CardContent className="p-5 flex flex-col gap-4 h-full">
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${isSlime ? "border-primary/50 bg-primary/10" : "border-border bg-foreground/5"}`}>
                        <Icon className={`h-5 w-5 ${isSlime ? "text-blue-400" : ""}`} />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-semibold tracking-tight text-foreground">{p.name}</h2>
                          <span className="text-xs rounded-full border border-border px-2 py-0.5 text-muted-foreground">{p.status}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{p[lang].subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-foreground/70 flex-1">{p[lang].blurb}</p>

                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1 mt-auto">
                      <span className="text-xs text-muted-foreground font-mono">{p.slug}</span>
                      {isSlime ? (
                        <Link to="/slime">
                          <Button variant="outline" className="rounded-xl gap-2 text-xs">
                            {tx.viewDocs}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" className="rounded-xl gap-2 text-xs opacity-40 cursor-not-allowed" disabled>
                          {tx.comingSoon}
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
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{tx.constraintsTitle}</h3>
                <p className="text-sm text-muted-foreground">{tx.constraintsSub}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[Shield, Fingerprint, Lock, Terminal].map((I, i) => (
                  <div key={i} className="rounded-xl border border-border p-4 flex gap-3 hover:border-border/80 transition-colors">
                    <div className="h-9 w-9 rounded-xl border border-border bg-foreground/5 flex items-center justify-center shrink-0">
                      <I className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-foreground">{tx.constraints[i].title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{tx.constraints[i].text}</div>
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
              <img src="/syfcorp-logo.png" alt="" className="h-4 w-4 object-contain invert opacity-40" />
              <span className="font-mono">SYFCORP — syfcorp.com</span>
            </div>
            <div className="flex items-center gap-4">
              <a className="hover:text-foreground transition-colors underline underline-offset-4" href="/terms">{tx.terms}</a>
              <a className="hover:text-foreground transition-colors underline underline-offset-4" href="https://github.com/AnathemaOfficial" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
