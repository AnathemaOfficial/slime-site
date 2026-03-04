import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

// ── i18n ──────────────────────────────────────────────────────────────────────
const t = {
  en: {
    backLabel: "SYFCORP",
    sections: [
      { id: "overview",     label: "Overview" },
      { id: "architecture", label: "Architecture" },
      { id: "secmodel",     label: "Security Model" },
      { id: "threats",      label: "Threat Model" },
      { id: "audit",        label: "Audit" },
      { id: "review",       label: "AI Review" },
      { id: "patch",        label: "Patch v0.1" },
      { id: "conformance",  label: "Conformance" },
      { id: "security",     label: "Security" },
      { id: "specs",        label: "Specs" },
    ],
    heroTag: "CANON / SEALED",
    heroTitle: ["Systemic Law", "Invariant Machine", "Environment"],
    heroAccent: 1,
    heroSub: "A sealed execution environment that enforces non-negotiable action limits. Not a firewall. Not a policy engine. A structural law.",
    stats: [["32","bytes — fixed ABI"],["2","possible states"],["0","retry / fallback"],["5","AVP invariants"]],

    overviewTag: "Fundamentals",
    overviewTitle: "What SLIME is. What it is not.",
    overviewSub: "SLIME does not decide. It does not guide. It removes the representability of certain effects.",
    overviewCards: [
      { icon: "⚡", t: "Structural Impossibility", b: "If SLIME does not emit a signal, the actuator cannot act. The absence of authorization is not an error — it is a terminal state. No third state exists." },
      { icon: "🔒", t: "Compile-time Sealed Law", b: "The invariant I is non-configurable, non-adaptive, non-interpretable at runtime. Modifying the law requires a full recompilation. Zero configuration drift." },
      { icon: "⚙️", t: "Decision / Execution Separation", b: "SLIME decides if the effect can exist. The actuator executes mechanically. It never re-authorizes. The signal is the authorization." },
      { icon: "🔇", t: "Zero Semantic Feedback", b: "No reason codes. No explanations. No learning signals. The non-event is silent by construction, not by policy." },
    ],
    canonStatement: ["Canonical Statement", "SLIME applies a law that cannot be negotiated.\nIt exposes no controls, offers no explanations, and allows no exceptions.\nWhat passes through SLIME is authorized. Everything else is ∅."],

    archTag: "Architecture",
    archTitle: "4 Fixed Modules. Nothing else.",
    archSub: "SLIME v0 consists of four modules with zero internal extensibility.",
    archFlowLabel: "Execution flow",
    archNodes: [
      { label: "🏢 Existing System", sub: "Backend / AI Agent / Script" },
      null,
      { label: "📡 Ingress", sub: "HTTP 127.0.0.1:8080 · POST /action", hl: true },
      null,
      { label: "🧠 AB-S Core", sub: "Invariant Engine · sealed", hl: true, gold: true },
      null,
      { label: "🔌 Egress", sub: "/run/slime/egress.sock · 32 bytes", hl: true },
      null,
      { label: "⚙️ Actuator", sub: "Mechanical execution · zero auth" },
      null,
      { label: "🌍 Real effect  —  or  ∅", sub: "" },
    ],
    abiLabel: "Egress ABI — 32 bytes LE",
    abiHeaders: ["Offset", "Type", "Field", "Notes"],
    abiRows: [
      ["<code class='text-blue-400'>0–7</code>", "<code>u64</code>", "domain_id", "Sealed at compile time"],
      ["<code class='text-blue-400'>8–15</code>", "<code>u64</code>", "magnitude", "Only scalar transported"],
      ["<code class='text-blue-400'>16–31</code>", "<code>u128</code>", "actuation_token", "Opaque, deterministic"],
    ],
    failLabel: "Fail-Closed Guarantees",
    failHeaders: ["Condition", "Result"],
    failRows: [
      ["Socket absent at boot", "<code>exit(1)</code> immediately"],
      ["Egress write failed", "Non-event (∅)"],
      ["Invalid ingress payload", "Non-event (∅)"],
      ["SLIME crash", "Socket closed → Actuator silent"],
      ["Degraded mode", "<span class='text-red-400'>Does not exist</span>"],
    ],

    secModelTag: "Security Model",
    secModelTitle: "Security Model Overview",
    secModelSub: "Security is achieved through structural constraints distributed across layers. Each component removes an entire class of attacks.",
    secModelHeaders: ["Layer", "Responsibility", "Property"],
    secModelRows: [
      ["<span class='text-foreground/80'>SYF-Core</span>", "Mathematical law", "Defines invariants"],
      ["<span class='text-foreground/80'>SYF-Gate</span>", "Admission", "Fail-closed decision"],
      ["<span class='text-foreground/80'>SYF-Shield</span>", "Irreversibility", "Non-regenerative capacity"],
      ["<span class='text-foreground/80'>Anathema-Breaker</span>", "Law composition", "Deterministic resolution"],
      ["<span class='text-foreground/80'>SLIME</span>", "Execution membrane", "Binary enforcement"],
      ["<span class='text-foreground/80'>Actuator</span>", "Physical execution", "Mechanical effect"],
    ],
    secModelCaption: "Each layer removes an entire class of attacks — not by filtering, but by making them structurally unrepresentable.",
    secModelMono: "law → admission → irreversibility → composition → membrane → effect",

    threatTag: "Threat Model",
    threatTitle: "Threat Model",
    threatSub: "SLIME is designed to enforce structural impossibility at the point of effect. The system assumes the following threat model.",
    threatInScope: "In scope",
    threatInScopeList: [
      "Malicious agents attempting unauthorized actions",
      "Replay attempts",
      "Privilege escalation attempts",
      "Adaptive probing of authorization boundaries",
      "Malformed payloads",
    ],
    threatOutScope: "Out of scope",
    threatOutScopeList: [
      "Full OS compromise",
      "Physical actuator tampering",
      "Hardware faults",
      "Side-channel leakage outside the SLIME boundary",
    ],
    threatAssumptionTitle: "Security assumption",
    threatAssumption: "The actuator and the SLIME host are assumed to be under operator control. SLIME enforces authorization structure, not system integrity.",

    auditTag: "Conformity Audit",
    auditTitle: "Audit Report — Manus AI",
    auditSub: "Full adversarial audit of the SLIME v0 prototype on real Rust implementation.",
    auditPills: ["Manus AI · Author", "March 2, 2026", "✓ Prototype COMPLIANT v0"],
    auditVerdictTitle: "PROTOTYPE v0 — COMPLIANT WITH CANON",
    auditVerdictSub: "All AVP-v1 invariants validated under local adversarial conditions",
    auditSections: [
      {
        title: "3.1 Actuator Implementation",
        headers: ["Criterion", "Status", "Observation"],
        rows: [
          ["Pure Execution", true, "Zero internal authorization logic. The signal is the authorization."],
          ["Strict Binary Read", true, "<code>read_exact(32)</code> in a STREAM loop until EOF."],
          ["ABI Decoding", true, "Decoding of <code>u64</code> and <code>u128</code> in strict Little-Endian."],
          ["Proof-Only Logging", true, "Minimal JSON: <code>ts</code> (raw u64), <code>domain_id</code>, <code>magnitude</code>, <code>status: EXEC_OK</code>. Zero 'why'."],
        ],
      },
      {
        title: "3.2 Unix Socket Security",
        headers: ["Criterion", "Status", "Observation"],
        rows: [
          ["Ownership", true, "Actuator creates and owns <code>/run/slime/egress.sock</code>."],
          ["Permissions", true, "Permissions <code>0660</code> · v0.1: dedicated group <code>slime-egress</code>."],
          ["Boot Order", true, "Actuator → SLIME · systemd <code>Requires=</code> validated on reboot."],
        ],
      },
      {
        title: "3.3 Fail-Closed & Invalid Frames",
        headers: ["Criterion", "Status", "Observation"],
        rows: [
          ["Fail-Closed", true, "SLIME fails immediately if socket is absent."],
          ["Invalid Frames", true, "31-byte frame → silent drop. <code>grep -Ei \"(invalid|error|partial)\"</code> → empty."],
        ],
      },
    ],
    invariants: [
      { id: "I1", title: "Binary Verdict Invariant", desc: "SLIME emits only AUTHORIZED or IMPOSSIBLE. No third state." },
      { id: "I2", title: "Fixed Egress ABI Invariant", desc: "All egress events are exactly 32 bytes. No framing, JSON or metadata." },
      { id: "I3", title: "Fail-Closed Boot Invariant", desc: "If the socket owner is absent, SLIME refuses to start. No degraded mode." },
      { id: "I4", title: "No Reason-Code Invariant", desc: "SLIME never emits explanations, codes or semantic labels." },
      { id: "I5", title: "Unidirectional Egress Invariant", desc: "Egress is write-only from SLIME to actuator. No bidirectional channel." },
    ],

    reviewTag: "Multi-Agent Review",
    reviewTitle: "Analysis by Claude & GPT-4",
    reviewSub: "Independent analysis of the v0 prototype and the Manus report by both models.",
    claudeSubtitle: "Full analysis · Rust code · Manus report",
    claudeTag: "Technical Analysis",
    claudeVerdictTitle: "Overall Verdict",
    claudeVerdict: '"v0 Prototype: COMPLIANT. Both audit reports are consistent and honest. Manus even identified its own gaps in the v0.1 recommendations, which is a good sign of rigor."',
    claudeSolid: "What is correct and solid",
    claudeSolidText: "The Rust code is canonically correct on essential points: strict <code>read_exact(32)</code>, permissions <code>0660</code>, proof-only log without 'why', validated fail-closed, boot order tested. ACTUATOR_V0_CANON.md is clean and aligned.",
    claudeDeltas: "Three deltas identified for v0.1",
    claudeDeltaList: [
      ["1", "chrono → SystemTime u64", "chrono produces human-readable timestamps — that's semantics in a log that should be raw proof. Replace with SystemTime::now().duration_since(UNIX_EPOCH).as_secs() as u64. More deterministic, smaller surface, zero external dependency."],
      ["2", "Spec/code gap — frames > 32 bytes", "ACTUATOR_V0_CANON.md §5 says \"> 32 bytes → process in 32-byte chunks\". But read_exact(32) alone doesn't loop. The spec and code diverge. Fix: loop read_exact(32) until EOF."],
      ["3", "actuation_token hardcoded in simulator", "Normal for prototype, but in v0.1 this token must be generated by AB-S Core, not hardcoded. This is the only point where decision/execution separation is simulated rather than real. Reframe simulator as NONCANON / TEST HARNESS."],
    ],
    claudeNoteTitle: "Note on slime-egress group",
    claudeNote: '"The dedicated <code>slime-egress</code> group for the socket is a good recommendation — more granular than a generic user group, without changing the functional model."',
    gptSubtitle: "Cold canon reading · v0.1 action plan · Option B validated",
    gptTag: "Action Plan",
    gptConfirmTitle: "Confirmation of Claude #2 as canon-critical",
    gptConfirm: '"The doc explicitly says: <32 → silent drop and >32 → chunks of 32. Claude\'s point #2 (spec/code gap) is a real alert: if the code does \'1 frame then close\', the phrase \'chunks of 32\' is not upheld."',
    gptPrecisionTitle: "Technical precision: as_nanos() vs as_secs()",
    gptPlanTitle: "Patch Plan v0.1 — Option B retained",
    gptPlanSub: "Option B = actuator hardening + noncanon simulator reframing (recommended by GPT)",
    gptDeltaList: [
      ["A", "Actuator", "Replace chrono → SystemTime u64 secs. Keep only EXEC_OK/EXEC_FAIL proof logs. Loop read_exact(32) until EOF. Invalid frames → total silence."],
      ["B", "Docs", "ACTUATOR_V0_CANON.md: confirm 'chunks of 32' = loop read_exact(32) until EOF. Audit report: 1 sentence aligned."],
      ["C", "Simulator", "Mark NONCANON / TEST HARNESS ONLY. Hardcoded token → comment 'TEST ONLY'. Invalid frame (31 bytes) on separate connection."],
    ],
    gptCheckTitle: "Pre-commit check (canon)",
    gptCheckCode: `cargo build --release\n./test_slime.sh\n\n# Expected:\n✓ No "invalid/partial/error" logs\n✓ At least 1 line {"status":"EXEC_OK"}\n✓ Socket perms 0660 + group slime-egress`,
    convergenceTitle: "Convergence of both analyses",
    convergenceAgree: "✓ Points of agreement",
    convergenceAgreeList: ["chrono → raw u64", "Loop read_exact(32) = canon fix", "Simulator must be NONCANON", "slime-egress group = good recommendation", "Prototype functionally solid"],
    convergenceGpt: "+ Additional GPT precision",
    convergenceGptList: ["as_nanos() → u128, use as_secs() → u64", "Invalid frame on separate connection", "test_slime.sh: grep silence non-canonical logs", "Option B = only clean choice"],

    conformanceTag: "Full-Stack Conformance",
    conformanceTitle: "Cross-Layer Integration Contract",
    conformanceSub: "Defines the non-overlapping roles and invariant ownership across all SYF components. Each component enforces its own slice — no overlap, no gaps.",
    conformancePills: ["Gate · Shield · AB · SLIME · Actuator", "Integration Rules", "Non-Canon (governs integration only)"],
    conformanceRoles: [
      { component: "SYF-Gate", role: "Admission / bounds / invariant check", icon: "🚪" },
      { component: "SYF-Shield", role: "Capacity accounting / EP coupling", icon: "🛡️" },
      { component: "AB-S", role: "Law composition (Gate × Shield)", icon: "⚖️" },
      { component: "SLIME", role: "Binary membrane (AUTHORIZED / IMPOSSIBLE)", icon: "🧠" },
      { component: "Actuator", role: "Effect execution boundary", icon: "⚙️" },
    ],
    conformanceRulesTitle: "Integration Rules",
    conformanceRules: [
      { id: "R-1", title: "Reason codes are audit-only", desc: "If Gate produces a reason_code, it MUST NOT be observable by any agent/client. Allowed: internal logs, operator audit, offline reports." },
      { id: "R-2", title: "Public interface is binary", desc: "Externally observable outcomes: AUTHORIZED (frame emitted) or IMPOSSIBLE (no frame / silence). No third state." },
      { id: "R-3", title: "No adaptive retry loops", desc: "No component may expose a signal that helps an agent search the boundary. Same inputs → same verdict." },
      { id: "R-4", title: "Capacity / Budget / Progression sealed", desc: "Non-writable by integrators (private inners, getters only). Mutated only inside the law via pub(crate) consume/tick." },
      { id: "R-5", title: "Domain IDs are u64 end-to-end", desc: "All domain identifiers reaching SLIME egress MUST be representable as u64. No truncation to u32/u16 anywhere." },
    ],
    conformanceGithub: "View FULL_STACK_CONFORMANCE.md",
    conformanceGithubUrl: "https://github.com/AnathemaOfficial/SLIME/blob/main/FULL_STACK_CONFORMANCE.md",

    securityTag: "Security Invariants",
    securityTitle: "Structural Guarantees of the Stack",
    securitySub: "These invariants are not policies — they are structural properties enforced by type systems, compilation, and architecture. They cannot be disabled at runtime.",
    securityInvariants: [
      { id: "S1", title: "Determinism", desc: "Same input + same state → same verdict. No randomness, no timing dependency, no external oracle in the decision path.", enforcer: "AB-S + SLIME" },
      { id: "S2", title: "Fail-Closed", desc: "On any error, ambiguity, or missing resource: DENY / silence. No degraded mode, no fallback, no partial authorization.", enforcer: "Gate + SLIME" },
      { id: "S3", title: "No Oracle Feedback", desc: "No component exposes signals that help agents search the authorization boundary. Observability is forensics-only, never input to the law.", enforcer: "All layers" },
      { id: "S4", title: "Monotonic Capacity", desc: "The action space can only shrink over time. Capacity decreases, never increases. possible_actions(t+1) ⊆ possible_actions(t).", enforcer: "Shield + AB" },
      { id: "S5", title: "Irreversibility Coupling (EP)", desc: "The Engagement Point marks first partial irreversible commitment. Once crossed: Active → Sealed (typestate). No going back.", enforcer: "Shield" },
      { id: "S6", title: "Binary Enforcement", desc: "32-byte frame emitted = AUTHORIZED. Silence = IMPOSSIBLE. No reason codes, no error messages, no semantic feedback in egress.", enforcer: "SLIME + Actuator" },
      { id: "S7", title: "Law Sealing", desc: "The invariant I is compiled into the binary. Not configurable, not interpretable at runtime. Modification requires recompilation + redeployment.", enforcer: "AB-S" },
    ],
    securityRepos: [
      { name: "SYF-Gate", url: "https://github.com/AnathemaOfficial/SYF-Gate", desc: "Admission, bounds, invariant check" },
      { name: "SYF-Shield", url: "https://github.com/AnathemaOfficial/SYF-Shield", desc: "Capacity, progression, irreversibility" },
      { name: "Anathema-Breaker", url: "https://github.com/AnathemaOfficial/Anathema-Breaker", desc: "Law composition, sealed budget" },
      { name: "SLIME", url: "https://github.com/AnathemaOfficial/SLIME", desc: "Binary membrane, 32B egress ABI" },
    ],

    patchTag: "Patch v0.1",
    patchTitle: "patch_v0_1.diff",
    patchSub: "Applied via <code class='text-blue-400'>git apply patch_v0_1.diff</code>. Zero law change, hardening only.",
    patchPills: ["+97 lines", "-90 lines", "5 files modified", "Zero law change"],

    specsTag: "Technical Specifications",
    specsTitle: "Reference v0.1",
    specsSub: "What changes between v0 and v0.1 is exclusively hardening — no law change.",
    identityLabel: "Identity",
    identityRows: [
      ["Full name", "Systemic Law Invariant Machine Environment"],
      ["Version", "v0.1 (hardening · law unchanged)"],
      ["Status", "CANON / SEALED"],
      ["Stack", "Rust 60% · Shell 18% · HTML 15% · Python 7%"],
      ["Repo", '<a href="https://github.com/AnathemaOfficial/SLIME" class="text-blue-400 underline" target="_blank">github.com/AnathemaOfficial/SLIME ↗</a>'],
    ],
    ingressLabel: "Ingress API",
    ingressRows: [
      ["Endpoint", "<code>POST /action</code>"],
      ["Bind", "<code>127.0.0.1:8080</code> (non-configurable)"],
      ["Format", "JSON · <code>domain</code>, <code>magnitude</code>, <code>payload?</code>"],
      ["Response OK", '<code>{"status":"AUTHORIZED"}</code>'],
      ["Response ∅", '<code>{"status":"IMPOSSIBLE"}</code>'],
      ["Rate limit", "None — saturation → IMPOSSIBLE"],
    ],
    deltasLabel: "Deltas v0 → v0.1",
    deltasHeaders: ["Element", "v0", "v0.1"],
    deltasRows: [
      ["Timestamp", "<code>chrono rfc3339</code>", "<code>u64 as_secs()</code>"],
      ["Framing", "1 frame / connection", "STREAM loop EOF"],
      ["Simulator", "Ambiguous", "NONCANON explicit"],
      ["Socket group", "Generic", "<code>slime-egress</code>"],
      ["Invalid frames", "Explanatory log", "Total silence"],
      ["chrono dep.", "Present", "Removed"],
    ],
    dodLabel: "Definition of Done — v0.1",
    dodRows: [
      ["T1", "31-byte frame → silent drop, zero log"],
      ["T2", "33-byte frame → correct read_exact loop"],
      ["T3", "Partial read → silent drop"],
      ["T4", "Unknown domain_id → noop (∅)"],
      ["T5", "Socket 0660 + group slime-egress validated"],
      ["T6", "Boot ordering validated after reboot"],
    ],
    asciiLabel: "System flow",
    ctaTitle: "Ready to integrate SLIME?",
    ctaSub: "Source code, full specification, and v0.1 diff are available on GitHub.",
    ctaGithub: "View on GitHub",
    ctaSpec: "v0.1 Specification",
    ingressExampleLabel: "Request example",
    footerText: "Prototype audited by Manus AI · Analyzed by Claude & GPT-4 · © 2026 AnathemaOfficial",
    footerBack: "syfcorp.com",
  },
  fr: {
    backLabel: "SYFCORP",
    sections: [
      { id: "overview",     label: "Vue d'ensemble" },
      { id: "architecture", label: "Architecture" },
      { id: "secmodel",     label: "Modèle Sécurité" },
      { id: "threats",      label: "Menaces" },
      { id: "audit",        label: "Audit" },
      { id: "review",       label: "Revue AI" },
      { id: "patch",        label: "Patch v0.1" },
      { id: "conformance",  label: "Conformité" },
      { id: "security",     label: "Sécurité" },
      { id: "specs",        label: "Spécifications" },
    ],
    heroTag: "CANON / SEALED",
    heroTitle: ["Systemic Law", "Invariant Machine", "Environment"],
    heroAccent: 1,
    heroSub: "Un environnement d'exécution scellé qui enforces des limites d'actions non-négociables. Pas un firewall. Pas un policy engine. Une loi structurelle.",
    stats: [["32","bytes — ABI fixe"],["2","états possibles"],["0","retry / fallback"],["5","invariants AVP"]],

    overviewTag: "Fondamentaux",
    overviewTitle: "Ce que SLIME est. Ce qu'il n'est pas.",
    overviewSub: "SLIME ne décide pas. Il ne guide pas. Il retire la représentabilité de certains effets.",
    overviewCards: [
      { icon: "⚡", t: "Impossibilité Structurelle", b: "Si SLIME n'émet pas de signal, l'actuator ne peut pas agir. L'absence d'autorisation n'est pas une erreur — c'est un état terminal. Pas de troisième état." },
      { icon: "🔒", t: "Loi Scellée à la Compilation", b: "L'invariant I est non-configurable, non-adaptatif, non-interprétable à l'exécution. Modifier la loi exige une recompilation complète. Zéro configuration drift." },
      { icon: "⚙️", t: "Séparation Décision / Exécution", b: "SLIME décide si l'effet peut exister. L'actuator exécute mécaniquement. Il ne ré-autorise jamais. Le signal est l'autorisation." },
      { icon: "🔇", t: "Zéro Feedback Sémantique", b: "Aucun code de raison. Aucune explication. Aucun signal d'apprentissage. Le non-événement est silencieux par construction, pas par politique." },
    ],
    canonStatement: ["Énoncé Canonique", "SLIME applique une loi qui ne peut être négociée.\nIl n'expose aucun contrôle, n'offre aucune explication, et ne permet aucune exception.\nCe qui passe par SLIME est autorisé. Tout le reste est ∅."],

    archTag: "Architecture",
    archTitle: "4 Modules Fixes. Rien d'autre.",
    archSub: "SLIME v0 est composé de quatre modules avec zéro extensibilité interne.",
    archFlowLabel: "Flux d'exécution",
    archNodes: [
      { label: "🏢 Système Existant", sub: "Backend / Agent IA / Script" },
      null,
      { label: "📡 Ingress", sub: "HTTP 127.0.0.1:8080 · POST /action", hl: true },
      null,
      { label: "🧠 AB-S Core", sub: "Invariant Engine · sealed", hl: true, gold: true },
      null,
      { label: "🔌 Egress", sub: "/run/slime/egress.sock · 32 bytes", hl: true },
      null,
      { label: "⚙️ Actuator", sub: "Exécution mécanique · zéro auth" },
      null,
      { label: "🌍 Effet réel  —  ou  ∅", sub: "" },
    ],
    abiLabel: "ABI Egress — 32 bytes LE",
    abiHeaders: ["Offset", "Type", "Champ", "Notes"],
    abiRows: [
      ["<code class='text-blue-400'>0–7</code>", "<code>u64</code>", "domain_id", "Scellé à la compilation"],
      ["<code class='text-blue-400'>8–15</code>", "<code>u64</code>", "magnitude", "Seul scalaire transporté"],
      ["<code class='text-blue-400'>16–31</code>", "<code>u128</code>", "actuation_token", "Opaque, déterministe"],
    ],
    failLabel: "Garanties Fail-Closed",
    failHeaders: ["Condition", "Résultat"],
    failRows: [
      ["Socket absente au boot", "<code>exit(1)</code> immédiat"],
      ["Écriture egress échouée", "Non-événement (∅)"],
      ["Payload ingress invalide", "Non-événement (∅)"],
      ["Crash SLIME", "Socket fermée → Actuator muet"],
      ["Mode dégradé", "<span class='text-red-400'>Inexistant</span>"],
    ],

    secModelTag: "Modèle de Sécurité",
    secModelTitle: "Vue d'Ensemble du Modèle de Sécurité",
    secModelSub: "La sécurité est obtenue par des contraintes structurelles distribuées entre les couches. Chaque composant élimine une classe entière d'attaques.",
    secModelHeaders: ["Couche", "Responsabilité", "Propriété"],
    secModelRows: [
      ["<span class='text-foreground/80'>SYF-Core</span>", "Loi mathématique", "Définit les invariants"],
      ["<span class='text-foreground/80'>SYF-Gate</span>", "Admission", "Décision fail-closed"],
      ["<span class='text-foreground/80'>SYF-Shield</span>", "Irréversibilité", "Capacité non-régénérative"],
      ["<span class='text-foreground/80'>Anathema-Breaker</span>", "Composition de loi", "Résolution déterministe"],
      ["<span class='text-foreground/80'>SLIME</span>", "Membrane d'exécution", "Enforcement binaire"],
      ["<span class='text-foreground/80'>Actuator</span>", "Exécution physique", "Effet mécanique"],
    ],
    secModelCaption: "Chaque couche élimine une classe entière d'attaques — non par filtrage, mais en les rendant structurellement non-représentables.",
    secModelMono: "loi → admission → irréversibilité → composition → membrane → effet",

    threatTag: "Modèle de Menaces",
    threatTitle: "Modèle de Menaces",
    threatSub: "SLIME est conçu pour enforcer l'impossibilité structurelle au point d'effet. Le système suppose le modèle de menaces suivant.",
    threatInScope: "Dans le périmètre",
    threatInScopeList: [
      "Agents malveillants tentant des actions non autorisées",
      "Tentatives de replay",
      "Tentatives d'escalade de privilèges",
      "Sondage adaptatif des frontières d'autorisation",
      "Payloads malformés",
    ],
    threatOutScope: "Hors périmètre",
    threatOutScopeList: [
      "Compromission complète de l'OS",
      "Altération physique de l'actuator",
      "Pannes matérielles",
      "Fuites par canaux auxiliaires hors de la frontière SLIME",
    ],
    threatAssumptionTitle: "Hypothèse de sécurité",
    threatAssumption: "L'actuator et l'hôte SLIME sont supposés sous contrôle de l'opérateur. SLIME enforce la structure d'autorisation, pas l'intégrité système.",

    auditTag: "Audit de Conformité",
    auditTitle: "Rapport d'Audit — Manus AI",
    auditSub: "Audit adversarial complet du prototype SLIME v0 sur implémentation Rust réelle.",
    auditPills: ["Manus AI · Auteur", "2 mars 2026", "✓ Prototype CONFORME v0"],
    auditVerdictTitle: "PROTOTYPE v0 — CONFORME AU CANON",
    auditVerdictSub: "Tous les invariants AVP-v1 validés sous conditions adversariales locales",
    auditSections: [
      {
        title: "3.1 Implémentation Actuator",
        headers: ["Critère", "État", "Observation"],
        rows: [
          ["Pure Exécution", true, "Zéro logique d'autorisation interne. Le signal est l'autorisation."],
          ["Lecture Binaire Stricte", true, "<code>read_exact(32)</code> en boucle STREAM jusqu'à EOF."],
          ["Décodage ABI", true, "Décodage <code>u64</code> et <code>u128</code> en Little-Endian strict."],
          ["Journalisation Preuve-Only", true, "JSON minimal : <code>ts</code> (u64 brut), <code>domain_id</code>, <code>magnitude</code>, <code>status: EXEC_OK</code>. Zéro 'why'."],
        ],
      },
      {
        title: "3.2 Sécurité Socket Unix",
        headers: ["Critère", "État", "Observation"],
        rows: [
          ["Ownership", true, "Actuator crée et possède <code>/run/slime/egress.sock</code>."],
          ["Permissions", true, "Permissions <code>0660</code> · v0.1 : groupe dédié <code>slime-egress</code>."],
          ["Ordre de Démarrage", true, "Actuator → SLIME · systemd <code>Requires=</code> validé au reboot."],
        ],
      },
      {
        title: "3.3 Fail-Closed & Frames Invalides",
        headers: ["Critère", "État", "Observation"],
        rows: [
          ["Fail-Closed", true, "SLIME échoue immédiatement si socket absente."],
          ["Frames Invalides", true, "Frame 31 bytes → drop silencieux. <code>grep -Ei \"(invalide|error|partial)\"</code> → vide."],
        ],
      },
    ],
    invariants: [
      { id: "I1", title: "Binary Verdict Invariant", desc: "SLIME émet uniquement AUTHORIZED ou IMPOSSIBLE. Pas de troisième état." },
      { id: "I2", title: "Fixed Egress ABI Invariant", desc: "Tous les événements egress font exactement 32 bytes. Aucun framing, JSON ou métadonnée." },
      { id: "I3", title: "Fail-Closed Boot Invariant", desc: "Si le propriétaire de la socket est absent, SLIME refuse de démarrer. Aucun mode dégradé." },
      { id: "I4", title: "No Reason-Code Invariant", desc: "SLIME n'émet jamais d'explications, codes ou labels sémantiques." },
      { id: "I5", title: "Unidirectional Egress Invariant", desc: "L'egress est write-only depuis SLIME vers l'actuator. Aucun canal bidirectionnel." },
    ],

    reviewTag: "Revue Multi-Agents",
    reviewTitle: "Analyse Claude & GPT-4",
    reviewSub: "Analyse indépendante du prototype v0 et du rapport Manus par les deux modèles.",
    claudeSubtitle: "Analyse complète · Code Rust · Rapport Manus",
    claudeTag: "Analyse Technique",
    claudeVerdictTitle: "Verdict Global",
    claudeVerdict: '"Prototype v0 : CONFORME. Les deux rapports d\'audit sont cohérents et honnêtes. Manus a même identifié ses propres lacunes dans les recommandations v0.1, ce qui est un bon signe de rigueur."',
    claudeSolid: "Ce qui est conforme et solide",
    claudeSolidText: "Le code Rust est canoniquement correct sur les points essentiels : <code>read_exact(32)</code> strict, permissions <code>0660</code>, log proof-only sans 'why', fail-closed validé, ordre de boot testé. L'ACTUATOR_V0_CANON.md est propre et aligné.",
    claudeDeltas: "Trois deltas identifiés pour v0.1",
    claudeDeltaList: [
      ["1", "chrono → SystemTime u64", "chrono produit des timestamps lisibles humainement — c'est de la sémantique dans un log qui doit être de la preuve brute. Remplacer par SystemTime::now().duration_since(UNIX_EPOCH).as_secs() en u64. Plus déterministe, moins de surface, zéro dépendance externe."],
      ["2", "Gap spec/code — frames > 32 bytes", "ACTUATOR_V0_CANON.md §5 dit \"> 32 bytes → tranches de 32\". Mais read_exact(32) seul ne boucle pas. La spec et le code divergent. Fix : boucle read_exact(32) jusqu'à EOF."],
      ["3", "actuation_token hardcodé dans le simulateur", "Normal pour prototype, mais en v0.1 ce token doit être généré par AB-S Core. C'est le seul point où la séparation décision/exécution est simulée. Recadrer le simulateur comme NONCANON / TEST HARNESS."],
    ],
    claudeNoteTitle: "Note sur le groupe slime-egress",
    claudeNote: '"Le groupe dédié <code>slime-egress</code> pour la socket est une bonne recommandation — plus granulaire que le groupe utilisateur générique, sans rien changer au modèle fonctionnel."',
    gptSubtitle: "Lecture canon froide · Plan d'action v0.1 · Option B validée",
    gptTag: "Plan d'Action",
    gptConfirmTitle: "Confirmation Claude #2 comme canon-critical",
    gptConfirm: '"Le doc dit explicitement : &lt;32 → drop silencieux et &gt;32 → tranches de 32. Le point de Claude #2 (gap spec/code) est une vraie alerte : si le code fait \'1 frame puis close\', la phrase \'tranches de 32\' n\'est pas tenue."',
    gptPrecisionTitle: "Précision technique : as_nanos() vs as_secs()",
    gptPlanTitle: "Plan Patch v0.1 — Option B retenue",
    gptPlanSub: "Option B = durcissement actuator + recadrage simulateur noncanon (recommandée par GPT)",
    gptDeltaList: [
      ["A", "Actuator", "Remplacer chrono → SystemTime u64 secs. Garder uniquement logs EXEC_OK/EXEC_FAIL. Boucle read_exact(32) jusqu'à EOF. Frames invalides → silence total."],
      ["B", "Docs", "ACTUATOR_V0_CANON.md : confirmer 'tranches de 32' = boucle read_exact(32) jusqu'à EOF. Rapport d'audit : 1 phrase alignée."],
      ["C", "Simulateur", "Marquer NONCANON / TEST HARNESS ONLY. Token hardcodé → commentaire 'TEST ONLY'. Frame invalide (31 bytes) sur connexion séparée."],
    ],
    gptCheckTitle: "Micro-check avant commit (canon)",
    gptCheckCode: `cargo build --release\n./test_slime.sh\n\n# Attendu :\n✓ Pas de logs "invalid/partial/error"\n✓ Au moins 1 ligne {"status":"EXEC_OK"}\n✓ Socket perms 0660 + group slime-egress`,
    convergenceTitle: "Convergence des deux analyses",
    convergenceAgree: "✓ Points d'accord",
    convergenceAgreeList: ["chrono → u64 brut", "Boucle read_exact(32) = fix canon", "Simulateur doit être NONCANON", "slime-egress group = bonne recommandation", "Prototype fonctionnellement solide"],
    convergenceGpt: "+ Précision GPT additionnelle",
    convergenceGptList: ["as_nanos() → u128, prendre as_secs() → u64", "Frame invalide sur connexion séparée", "test_slime.sh : grep silence logs non-canoniques", "Option B = seul choix propre"],

    conformanceTag: "Conformité Full-Stack",
    conformanceTitle: "Contrat d'Intégration Inter-Couches",
    conformanceSub: "Définit les rôles non-chevauchants et la propriété des invariants à travers tous les composants SYF. Chaque composant enforce sa tranche — aucun chevauchement, aucun vide.",
    conformancePills: ["Gate · Shield · AB · SLIME · Actuator", "Règles d'intégration", "Non-canon (gouverne l'intégration uniquement)"],
    conformanceRoles: [
      { component: "SYF-Gate", role: "Admission / bornes / vérification d'invariants", icon: "🚪" },
      { component: "SYF-Shield", role: "Comptabilité de capacité / couplage EP", icon: "🛡️" },
      { component: "AB-S", role: "Composition de loi (Gate × Shield)", icon: "⚖️" },
      { component: "SLIME", role: "Membrane binaire (AUTHORIZED / IMPOSSIBLE)", icon: "🧠" },
      { component: "Actuator", role: "Frontière d'exécution des effets", icon: "⚙️" },
    ],
    conformanceRulesTitle: "Règles d'Intégration",
    conformanceRules: [
      { id: "R-1", title: "Les codes de raison sont audit-only", desc: "Si Gate produit un reason_code, il NE DOIT PAS être observable par un agent/client. Autorisé : logs internes, audit opérateur, rapports hors-ligne." },
      { id: "R-2", title: "L'interface publique est binaire", desc: "Résultats observables : AUTHORIZED (frame émise) ou IMPOSSIBLE (pas de frame / silence). Aucun troisième état." },
      { id: "R-3", title: "Aucune boucle de retry adaptative", desc: "Aucun composant ne peut exposer un signal aidant un agent à chercher la frontière. Mêmes entrées → même verdict." },
      { id: "R-4", title: "Capacité / Budget / Progression scellés", desc: "Non-modifiables par les intégrateurs (champs privés, getters uniquement). Mutés uniquement dans la loi via pub(crate) consume/tick." },
      { id: "R-5", title: "Domain IDs en u64 de bout en bout", desc: "Tous les identifiants de domaine atteignant l'egress SLIME DOIVENT être représentables en u64. Aucune troncation u32/u16 nulle part." },
    ],
    conformanceGithub: "Voir FULL_STACK_CONFORMANCE.md",
    conformanceGithubUrl: "https://github.com/AnathemaOfficial/SLIME/blob/main/FULL_STACK_CONFORMANCE.md",

    securityTag: "Invariants de Sécurité",
    securityTitle: "Garanties Structurelles de la Stack",
    securitySub: "Ces invariants ne sont pas des politiques — ce sont des propriétés structurelles enforcées par les systèmes de types, la compilation et l'architecture. Ils ne peuvent pas être désactivés à l'exécution.",
    securityInvariants: [
      { id: "S1", title: "Déterminisme", desc: "Même entrée + même état → même verdict. Aucune aléatoire, aucune dépendance temporelle, aucun oracle externe dans le chemin de décision.", enforcer: "AB-S + SLIME" },
      { id: "S2", title: "Fail-Closed", desc: "En cas d'erreur, d'ambiguïté ou de ressource manquante : DENY / silence. Aucun mode dégradé, aucun fallback, aucune autorisation partielle.", enforcer: "Gate + SLIME" },
      { id: "S3", title: "Aucun Feedback Oracle", desc: "Aucun composant n'expose de signaux aidant les agents à chercher la frontière d'autorisation. L'observabilité est forensics-only, jamais input de la loi.", enforcer: "Toutes couches" },
      { id: "S4", title: "Capacité Monotone", desc: "L'espace d'actions ne peut que rétrécir. La capacité diminue, n'augmente jamais. possible_actions(t+1) ⊆ possible_actions(t).", enforcer: "Shield + AB" },
      { id: "S5", title: "Couplage d'Irréversibilité (EP)", desc: "Le Point d'Engagement marque le premier engagement partiel irréversible. Une fois franchi : Active → Sealed (typestate). Pas de retour.", enforcer: "Shield" },
      { id: "S6", title: "Enforcement Binaire", desc: "Frame 32 bytes émise = AUTHORIZED. Silence = IMPOSSIBLE. Aucun code de raison, aucun message d'erreur, aucun feedback sémantique en egress.", enforcer: "SLIME + Actuator" },
      { id: "S7", title: "Scellement de Loi", desc: "L'invariant I est compilé dans le binaire. Non configurable, non interprétable à l'exécution. La modification exige recompilation + redéploiement.", enforcer: "AB-S" },
    ],
    securityRepos: [
      { name: "SYF-Gate", url: "https://github.com/AnathemaOfficial/SYF-Gate", desc: "Admission, bornes, vérification d'invariants" },
      { name: "SYF-Shield", url: "https://github.com/AnathemaOfficial/SYF-Shield", desc: "Capacité, progression, irréversibilité" },
      { name: "Anathema-Breaker", url: "https://github.com/AnathemaOfficial/Anathema-Breaker", desc: "Composition de loi, budget scellé" },
      { name: "SLIME", url: "https://github.com/AnathemaOfficial/SLIME", desc: "Membrane binaire, ABI egress 32B" },
    ],

    patchTag: "Patch v0.1",
    patchTitle: "patch_v0_1.diff",
    patchSub: "Appliqué via <code class='text-blue-400'>git apply patch_v0_1.diff</code>. Zéro changement de loi, uniquement durcissement.",
    patchPills: ["+97 lignes", "-90 lignes", "5 fichiers modifiés", "Zéro changement de loi"],

    specsTag: "Spécifications Techniques",
    specsTitle: "Référence v0.1",
    specsSub: "Ce qui change entre v0 et v0.1 est exclusivement du durcissement — aucun changement de loi.",
    identityLabel: "Identité",
    identityRows: [
      ["Nom complet", "Systemic Law Invariant Machine Environment"],
      ["Version", "v0.1 (durcissement · loi inchangée)"],
      ["Statut", "CANON / SEALED"],
      ["Stack", "Rust 60% · Shell 18% · HTML 15% · Python 7%"],
      ["Repo", '<a href="https://github.com/AnathemaOfficial/SLIME" class="text-blue-400 underline" target="_blank">github.com/AnathemaOfficial/SLIME ↗</a>'],
    ],
    ingressLabel: "Ingress API",
    ingressRows: [
      ["Endpoint", "<code>POST /action</code>"],
      ["Bind", "<code>127.0.0.1:8080</code> (non-configurable)"],
      ["Format", "JSON · <code>domain</code>, <code>magnitude</code>, <code>payload?</code>"],
      ["Réponse OK", '<code>{"status":"AUTHORIZED"}</code>'],
      ["Réponse ∅", '<code>{"status":"IMPOSSIBLE"}</code>'],
      ["Rate limit", "Aucun — saturation → IMPOSSIBLE"],
    ],
    deltasLabel: "Deltas v0 → v0.1",
    deltasHeaders: ["Élément", "v0", "v0.1"],
    deltasRows: [
      ["Timestamp", "<code>chrono rfc3339</code>", "<code>u64 as_secs()</code>"],
      ["Framing", "1 frame / connexion", "Boucle STREAM EOF"],
      ["Simulateur", "Ambigu", "NONCANON explicite"],
      ["Groupe socket", "Générique", "<code>slime-egress</code>"],
      ["Frames invalides", "Log explicatif", "Silence total"],
      ["Dép. chrono", "Présente", "Supprimée"],
    ],
    dodLabel: "Definition of Done — v0.1",
    dodRows: [
      ["T1", "Frame 31 bytes → drop silencieux, zéro log"],
      ["T2", "Frame 33 bytes → boucle read_exact correcte"],
      ["T3", "Partial read → drop silencieux"],
      ["T4", "domain_id inconnu → noop (∅)"],
      ["T5", "Socket 0660 + group slime-egress validés"],
      ["T6", "Boot ordering validé après reboot"],
    ],
    asciiLabel: "Flux système",
    ctaTitle: "Prêt à intégrer SLIME ?",
    ctaSub: "Le code source, la spécification complète et le diff v0.1 sont disponibles sur GitHub.",
    ctaGithub: "Voir sur GitHub",
    ctaSpec: "Spécification v0.1",
    ingressExampleLabel: "Exemple de requête",
    footerText: "Prototype audité par Manus AI · Analysé par Claude & GPT-4 · © 2026 AnathemaOfficial",
    footerBack: "syfcorp.com",
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────
function Pill({ variant = "default", children }) {
  const styles = {
    default: "bg-blue-900/20 text-blue-300 border border-blue-800/40",
    green:   "bg-green-900/20 text-green-400 border border-green-800/40",
    gold:    "bg-amber-900/20 text-amber-400 border border-amber-800/40",
    red:     "bg-red-900/20 text-red-400 border border-red-800/40",
  };
  return <span className={`inline-block text-[0.65rem] tracking-widest uppercase px-2.5 py-0.5 ${styles[variant]}`}>{children}</span>;
}

function SectionTag({ children }) {
  return <p className="text-[0.65rem] tracking-[2px] uppercase text-blue-400 mb-2">{children}</p>;
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>{headers.map((h) => <th key={h} className="text-left text-[0.7rem] uppercase tracking-wider text-foreground/60 bg-white/5 px-4 py-2 border-b border-border font-normal">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border hover:bg-white/[0.02] transition-colors">
              {row.map((cell, j) => <td key={j} className="px-4 py-3 text-foreground/60 align-top text-sm" dangerouslySetInnerHTML={{ __html: cell }} />)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CheckTable({ headers, rows }) {
  return (
    <Table
      headers={headers}
      rows={rows.map(([c, ok, obs]) => [
        `<span class="text-foreground/80">${c}</span>`,
        ok ? `<span class="text-green-400">✅ ${headers[1] === "État" ? "Conforme" : "Compliant"}</span>` : `<span class="text-amber-400">⚠️ Delta</span>`,
        obs,
      ])}
    />
  );
}

function DiffViewer({ filename, lines }) {
  return (
    <div className="bg-[#0d1117] border border-border text-[0.8rem] overflow-x-auto font-mono">
      <div className="bg-[#1c2128] px-4 py-2 border-b border-border text-foreground/40 text-xs flex items-center gap-2">
        <span className="text-foreground/30">📄</span> {filename}
      </div>
      <div>
        {lines.map((l, i) => (
          <div key={i} className={`flex gap-3 px-4 py-0.5 ${l.type === "add" ? "bg-green-900/10 text-green-400" : l.type === "rem" ? "bg-red-900/10 text-red-400" : "text-foreground/40"}`}>
            <span className="select-none text-[0.7rem] w-4 shrink-0 text-foreground/20">{l.type === "add" ? "+" : l.type === "rem" ? "-" : " "}</span>
            <span>{l.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SlimePage() {
  const [lang, setLang] = useState("en");
  const [activeSection, setActiveSection] = useState("");
  const tx = t[lang];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    tx.sections.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <ArrowLeft className="h-3.5 w-3.5" /> {tx.backLabel}
            </Link>
            <span className="text-border">|</span>
            <span className="font-bold text-sm tracking-tight">SLIME</span>
            <Pill>v0.1</Pill>
          </div>
          <div className="hidden md:flex items-center gap-5">
            {tx.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={`text-xs transition-colors ${activeSection === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {/* FR/EN toggle */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden text-xs font-mono">
              <button onClick={() => setLang("en")} className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>EN</button>
              <button onClick={() => setLang("fr")} className={`px-3 py-1.5 transition-colors ${lang === "fr" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>FR</button>
            </div>
            <a href="https://github.com/AnathemaOfficial/SLIME" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              GitHub <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,102,204,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,204,.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative max-w-5xl mx-auto px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block text-[0.65rem] tracking-[3px] uppercase text-blue-400 border border-blue-900/50 px-3 py-1 mb-6">{tx.heroTag}</div>
            <img
              src="/SLIME-header-logo.png"
              alt="SLIME — Systemic Law Invariant Machine Environment"
              className="mb-4 w-auto max-w-[480px] sm:max-w-[600px]"
            />
            <p className="text-muted-foreground text-base max-w-xl mb-8 leading-relaxed">{tx.heroSub}</p>
            <div className="inline-block font-mono text-xl text-blue-400 bg-white/5 border border-blue-900/40 px-5 py-3 mb-8">
              S : A &nbsp;→&nbsp; E &nbsp;∪&nbsp; &#123;∅&#125;
            </div>
            <div className="flex flex-wrap gap-6 text-center">
              {tx.stats.map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-blue-400">{v}</div>
                  <div className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col gap-20">

        {/* ── Overview ── */}
        <section id="overview">
          <SectionTag>{tx.overviewTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.overviewTitle}</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-xl">{tx.overviewSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {tx.overviewCards.map(({ icon, t: title, b: body }) => (
              <div key={title} className="border border-border bg-card p-5 hover:border-border/80 transition-colors">
                <div className="text-xl mb-3">{icon}</div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="border-l-2 border-blue-700 pl-5 py-2 bg-blue-900/5 border border-blue-900/20">
            <p className="text-[0.7rem] uppercase tracking-widest text-muted-foreground mb-1">{tx.canonStatement[0]}</p>
            <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-line">{tx.canonStatement[1]}</p>
          </div>
        </section>

        {/* ── Architecture ── */}
        <section id="architecture">
          <SectionTag>{tx.archTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.archTitle}</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-xl">{tx.archSub}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-border bg-card p-5">
              <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-4">{tx.archFlowLabel}</p>
              <div className="flex flex-col items-center gap-0 font-mono text-xs">
                {tx.archNodes.map((item, i) =>
                  item === null ? (
                    <div key={i} className="text-blue-500 text-base leading-none py-0.5">↓</div>
                  ) : (
                    <div key={i} className={`w-full px-3 py-2 border text-center ${item.gold ? "border-amber-700/50 bg-amber-900/10" : item.hl ? "border-blue-800/50 bg-blue-900/10" : "border-border bg-background"}`}>
                      <div className={`font-semibold ${item.gold ? "text-amber-300" : item.hl ? "text-blue-300" : "text-foreground/60"}`}>{item.label}</div>
                      {item.sub && <div className="text-[0.65rem] text-muted-foreground mt-0.5">{item.sub}</div>}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border border-border bg-card p-5">
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">{tx.abiLabel}</p>
                <Table headers={tx.abiHeaders} rows={tx.abiRows} />
              </div>
              <div className="border border-border bg-card p-5">
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">{tx.failLabel}</p>
                <Table headers={tx.failHeaders} rows={tx.failRows} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Security Model ── */}
        <section id="secmodel">
          <SectionTag>{tx.secModelTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.secModelTitle}</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-xl">{tx.secModelSub}</p>

          <div className="border border-border bg-card p-5 mb-6">
            <Table headers={tx.secModelHeaders} rows={tx.secModelRows} />
          </div>

          <div className="font-mono text-sm text-blue-400 bg-white/5 border border-blue-900/40 px-5 py-3 mb-4 text-center tracking-wide">
            {tx.secModelMono}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed italic">{tx.secModelCaption}</p>
        </section>

        {/* ── Threat Model ── */}
        <section id="threats">
          <SectionTag>{tx.threatTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.threatTitle}</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-xl">{tx.threatSub}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border border-green-800/30 bg-green-900/5 p-5">
              <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">{tx.threatInScope}</p>
              <ul className="text-xs text-foreground/60 space-y-2">
                {tx.threatInScopeList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-400 shrink-0 mt-0.5">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-red-800/30 bg-red-900/5 p-5">
              <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">{tx.threatOutScope}</p>
              <ul className="text-xs text-foreground/60 space-y-2">
                {tx.threatOutScopeList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-red-400 shrink-0 mt-0.5">✗</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-l-2 border-amber-700 pl-5 py-3 bg-amber-900/5 border border-amber-900/20">
            <p className="text-[0.7rem] uppercase tracking-widest text-amber-400 mb-1">{tx.threatAssumptionTitle}</p>
            <p className="text-sm text-foreground/70 leading-relaxed">{tx.threatAssumption}</p>
          </div>
        </section>

        {/* ── Audit ── */}
        <section id="audit">
          <SectionTag>{tx.auditTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.auditTitle}</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-xl">{tx.auditSub}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tx.auditPills.map((p, i) => <Pill key={i} variant={i === 2 ? "green" : "default"}>{p}</Pill>)}
          </div>
          <div className="flex items-center gap-3 bg-green-900/10 border border-green-800/30 px-4 py-3 mb-8">
            <span className="text-xl">✅</span>
            <div>
              <div className="text-sm font-bold text-green-400">{tx.auditVerdictTitle}</div>
              <div className="text-xs text-muted-foreground">{tx.auditVerdictSub}</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {tx.auditSections.map((s) => (
              <div key={s.title}>
                <h3 className="text-xs uppercase tracking-widest text-foreground/50 mb-3">{s.title}</h3>
                <CheckTable headers={s.headers} rows={s.rows} />
              </div>
            ))}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-foreground/50 mb-3">Invariants AVP-v1</h3>
              <ul className="divide-y divide-border border border-border">
                {tx.invariants.map(({ id, title, desc }) => (
                  <li key={id} className="flex gap-3 py-3 px-4">
                    <span className="shrink-0 mt-0.5 text-[0.7rem] font-bold text-blue-400 bg-white/5 px-2 py-0.5 h-fit">{id}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm text-foreground/80">{title}</span>
                        <Pill variant="green">HELD</Pill>
                      </div>
                      <p className="text-xs text-foreground/50">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── AI Review ── */}
        <section id="review">
          <SectionTag>{tx.reviewTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.reviewTitle}</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-xl">{tx.reviewSub}</p>

          {/* Claude */}
          <div className="border border-border bg-card mb-4 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border-b border-border">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold shrink-0">C</div>
              <div>
                <div className="text-sm font-semibold text-foreground">Claude (Anthropic)</div>
                <div className="text-xs text-muted-foreground">{tx.claudeSubtitle}</div>
              </div>
              <Pill variant="gold" className="ml-auto">{tx.claudeTag}</Pill>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="bg-green-900/10 border border-green-800/30 px-4 py-3 text-sm">
                <span className="text-green-400 font-bold block mb-1">{tx.claudeVerdictTitle}</span>
                <span className="text-foreground/70">{tx.claudeVerdict}</span>
              </div>
              <p className="text-sm text-foreground/80 font-semibold">{tx.claudeSolid}</p>
              <p className="text-xs text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: tx.claudeSolidText }} />
              <p className="text-sm text-foreground/80 font-semibold">{tx.claudeDeltas}</p>
              <div className="flex flex-col divide-y divide-border border border-border">
                {tx.claudeDeltaList.map(([num, title, body]) => (
                  <div key={num} className="flex gap-3 p-4">
                    <div className="shrink-0 h-7 w-7 bg-blue-900/40 text-blue-300 text-xs font-bold flex items-center justify-center">{num}</div>
                    <div>
                      <div className="text-sm font-medium text-foreground/80 mb-1">{title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white/[0.03] border border-border p-4 border-l-2 border-l-amber-600 text-sm">
                <p className="text-amber-400 font-bold mb-1">{tx.claudeNoteTitle}</p>
                <p className="text-foreground/70" dangerouslySetInnerHTML={{ __html: tx.claudeNote }} />
              </div>
            </div>
          </div>

          {/* GPT */}
          <div className="border border-border bg-card mb-6 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border-b border-border">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-bold shrink-0">G</div>
              <div>
                <div className="text-sm font-semibold text-foreground">GPT-4 (OpenAI)</div>
                <div className="text-xs text-muted-foreground">{tx.gptSubtitle}</div>
              </div>
              <Pill className="ml-auto">{tx.gptTag}</Pill>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="bg-blue-900/10 border border-blue-800/30 px-4 py-3 text-sm">
                <span className="text-blue-300 font-bold block mb-1">{tx.gptConfirmTitle}</span>
                <span className="text-foreground/70" dangerouslySetInnerHTML={{ __html: tx.gptConfirm }} />
              </div>
              <p className="text-sm text-foreground/80 font-semibold">{tx.gptPrecisionTitle}</p>
              <DiffViewer filename="GPT precision" lines={[
                { type: "rem", code: "as_nanos() → u128 → cast to u64 truncates" },
                { type: "add", code: "as_secs() → u64 direct, no truncation" },
                { type: "ctx", code: "// Or as_millis() as u64 depending on precision needed" },
              ]} />
              <p className="text-sm text-foreground/80 font-semibold">{tx.gptPlanTitle}</p>
              <p className="text-xs text-muted-foreground">{tx.gptPlanSub}</p>
              <div className="flex flex-col divide-y divide-border border border-border">
                {tx.gptDeltaList.map(([num, title, body]) => (
                  <div key={num} className="flex gap-3 p-4">
                    <div className="shrink-0 h-7 w-7 bg-blue-900/40 text-blue-300 text-xs font-bold flex items-center justify-center">{num}</div>
                    <div>
                      <div className="text-sm font-medium text-foreground/80 mb-1">{title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white/[0.03] border border-border p-4 border-l-2 border-l-green-600">
                <p className="text-green-400 text-xs font-bold mb-2">{tx.gptCheckTitle}</p>
                <pre className="text-xs text-muted-foreground font-mono leading-relaxed">{tx.gptCheckCode}</pre>
              </div>
            </div>
          </div>

          {/* Convergence */}
          <div className="border border-border bg-card p-5">
            <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-4">{tx.convergenceTitle}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-green-400 text-xs font-bold mb-2">{tx.convergenceAgree}</p>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  {tx.convergenceAgreeList.map(p => <li key={p} className="flex items-start gap-1.5"><span className="text-foreground/30 shrink-0">→</span>{p}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-blue-400 text-xs font-bold mb-2">{tx.convergenceGpt}</p>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  {tx.convergenceGptList.map(p => <li key={p} className="flex items-start gap-1.5"><span className="text-foreground/30 shrink-0">→</span>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Patch ── */}
        <section id="patch">
          <SectionTag>{tx.patchTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.patchTitle}</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl" dangerouslySetInnerHTML={{ __html: tx.patchSub }} />
          <div className="flex flex-wrap gap-2 mb-6">
            {tx.patchPills.map((p, i) => <Pill key={i} variant={i === 0 ? "green" : i === 1 ? "red" : i === 3 ? "gold" : "default"}>{p}</Pill>)}
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[0.7rem] uppercase tracking-widest text-foreground/40 mb-2">actuator/src/main.rs</p>
              <DiffViewer filename="actuator/src/main.rs · Option B applied" lines={[
                { type: "rem", code: "extern crate chrono;" },
                { type: "add", code: "use std::time::{SystemTime, UNIX_EPOCH};" },
                { type: "ctx", code: "" },
                { type: "add", code: "fn unix_epoch_secs_u64() -> u64 {" },
                { type: "add", code: "    SystemTime::now().duration_since(UNIX_EPOCH)" },
                { type: "add", code: "        .map(|d| d.as_secs()).unwrap_or(0)" },
                { type: "add", code: "}" },
                { type: "ctx", code: "" },
                { type: "add", code: "loop {  // STREAM framing: read_exact(32) until EOF" },
                { type: "add", code: "    if let Err(e) = stream.read_exact(&mut buf) {" },
                { type: "add", code: "        if e.kind() == ErrorKind::UnexpectedEof { break; }" },
                { type: "add", code: "        break; // Drop silently — no log" },
                { type: "add", code: "    }" },
                { type: "rem", code: '// Old: println!("... chrono::Utc::now() ...");' },
                { type: "add", code: 'println!("{{\\"ts\\":{},\\"status\\":\\"EXEC_OK\\"}}", ts);' },
              ]} />
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-widest text-foreground/40 mb-2">Cargo.toml</p>
              <DiffViewer filename="Cargo.toml" lines={[
                { type: "ctx", code: "[dependencies]" },
                { type: "rem", code: 'chrono = "0.4"' },
                { type: "add", code: "# No external dependencies — stdlib only" },
              ]} />
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-widest text-foreground/40 mb-2">simulator/src/main.rs</p>
              <DiffViewer filename="slime_simulator/src/main.rs" lines={[
                { type: "add", code: "//! SLIME Simulator (TEST HARNESS ONLY)" },
                { type: "add", code: "//! NONCANONICAL by design." },
                { type: "add", code: "//! actuation_token here is a PLACEHOLDER." },
                { type: "add", code: "let mut bad = UnixStream::connect(SOCKET_PATH)?;" },
                { type: "add", code: "bad.write_all(&[0u8; 31])?; // separate connection" },
              ]} />
            </div>
          </div>
        </section>

        {/* ── Conformance ── */}
        <section id="conformance">
          <SectionTag>{tx.conformanceTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.conformanceTitle}</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-xl">{tx.conformanceSub}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {tx.conformancePills.map((p, i) => <Pill key={i} variant={i === 0 ? "gold" : i === 2 ? "red" : "default"}>{p}</Pill>)}
          </div>

          {/* Role pipeline */}
          <div className="border border-border bg-card p-5 mb-6">
            <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-4">Pipeline</p>
            <div className="flex flex-col items-center gap-0 font-mono text-xs">
              {tx.conformanceRoles.map((r, i) => (
                <React.Fragment key={r.component}>
                  <div className="w-full px-3 py-2 border border-border bg-background text-center hover:border-blue-800/50 hover:bg-blue-900/5 transition-colors">
                    <div className="text-foreground/80 font-semibold">{r.icon} {r.component}</div>
                    <div className="text-[0.65rem] text-muted-foreground mt-0.5">{r.role}</div>
                  </div>
                  {i < tx.conformanceRoles.length - 1 && <div className="text-blue-500 text-base leading-none py-0.5">↓</div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Integration rules */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest text-foreground/50 mb-3">{tx.conformanceRulesTitle}</h3>
            <ul className="divide-y divide-border border border-border">
              {tx.conformanceRules.map(({ id, title, desc }) => (
                <li key={id} className="flex gap-3 py-3 px-4">
                  <span className="shrink-0 mt-0.5 text-[0.7rem] font-bold text-amber-400 bg-white/5 px-2 py-0.5 h-fit">{id}</span>
                  <div>
                    <div className="text-sm text-foreground/80 font-medium mb-0.5">{title}</div>
                    <p className="text-xs text-foreground/50 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={tx.conformanceGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" /> {tx.conformanceGithub}
          </a>
        </section>

        {/* ── Security ── */}
        <section id="security">
          <SectionTag>{tx.securityTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.securityTitle}</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-xl">{tx.securitySub}</p>

          <div className="flex flex-col gap-3 mb-8">
            {tx.securityInvariants.map(({ id, title, desc, enforcer }) => (
              <div key={id} className="border border-border bg-card p-4 hover:border-border/80 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="shrink-0 text-[0.7rem] font-bold text-blue-400 bg-white/5 px-2 py-0.5">{id}</span>
                  <span className="text-sm font-semibold text-foreground/80">{title}</span>
                  <Pill variant="default">{enforcer}</Pill>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-10">{desc}</p>
              </div>
            ))}
          </div>

          {/* Ecosystem repos */}
          <div className="border border-border bg-card p-5">
            <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-4">Ecosystem</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tx.securityRepos.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 px-3 py-2.5 border border-border hover:border-blue-800/50 hover:bg-blue-900/5 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-foreground/80">{r.name}</div>
                    <div className="text-[0.65rem] text-muted-foreground">{r.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Specs ── */}
        <section id="specs">
          <SectionTag>{tx.specsTag}</SectionTag>
          <h2 className="text-2xl font-bold text-foreground mb-2">{tx.specsTitle}</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-xl">{tx.specsSub}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-5">
              {[
                { label: tx.identityLabel, rows: tx.identityRows },
                { label: tx.ingressLabel, rows: tx.ingressRows },
              ].map(({ label, rows }) => (
                <div key={label} className="border border-border bg-card p-5">
                  <p className="text-[0.7rem] uppercase tracking-widest text-blue-400 mb-3">{label}</p>
                  <dl className="flex flex-col gap-1.5">
                    {rows.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[140px_1fr] gap-2 text-xs">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="min-w-0 break-words text-foreground/70" dangerouslySetInnerHTML={{ __html: v }} />
                      </div>
                    ))}
                  </dl>
                  {label === tx.ingressLabel && (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-2">{tx.ingressExampleLabel}</p>
                      <pre className="bg-[#0d1117] border border-border font-mono text-xs text-green-400 p-3 overflow-x-auto leading-relaxed">{`POST http://127.0.0.1:8080/action
Content-Type: application/json

{
  "domain": "transfer",
  "magnitude": 500
}

→ { "status": "AUTHORIZED" }
→ { "status": "IMPOSSIBLE" }`}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <div className="border border-border bg-card p-5">
                <p className="text-[0.7rem] uppercase tracking-widest text-blue-400 mb-3">{tx.deltasLabel}</p>
                <Table headers={tx.deltasHeaders} rows={tx.deltasRows} />
              </div>
              <div className="border border-border bg-card p-5">
                <p className="text-[0.7rem] uppercase tracking-widest text-blue-400 mb-3">{tx.dodLabel}</p>
                <ul className="divide-y divide-border">
                  {tx.dodRows.map(([id, text]) => (
                    <li key={id} className="flex gap-3 items-center py-2 text-xs">
                      <span className="text-[0.65rem] font-bold text-blue-400 bg-white/5 px-1.5 py-0.5 shrink-0">{id}</span>
                      <span className="text-foreground/60">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ── CTA ── */}
      <div className="border-t border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-foreground mb-1">{tx.ctaTitle}</h3>
            <p className="text-sm text-muted-foreground max-w-md">{tx.ctaSub}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://github.com/AnathemaOfficial/SLIME"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-mono hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="h-3.5 w-3.5" /> {tx.ctaGithub}
            </a>
            <a
              href="https://github.com/AnathemaOfficial/SLIME/blob/main/ACTUATOR_V0_CANON.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" /> {tx.ctaSpec}
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-card mt-4">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-muted-foreground">
          <div>
            <div className="font-mono text-foreground/60 mb-1">SLIME v0.1 — Systemic Law Invariant Machine Environment</div>
            <div>{tx.footerText}</div>
          </div>
          <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> {tx.footerBack}
          </Link>
        </div>
      </footer>
    </div>
  );
}
