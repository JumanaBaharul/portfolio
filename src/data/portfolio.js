// ─────────────────────────────────────────────────────────────
// THE DIVE LOG — a portfolio staged as a deep-sea descent.
// The framing is a dive; the substance is honest. Finds are
// capabilities, roles are dive sites, tools are the gear
// locker, and contact is the lit habitat on the seafloor.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Jumana Baharul",
  roles: ["AI ENGINEER", "LLM SYSTEMS", "DEEP LEARNING", "FULL-STACK"],
  focus: "Machine learning · Language systems · Full-stack",
  location: "Chennai, India",
  email: "jumanabaharul@gmail.com",
  phone: "+91-9003710728",
  github: "https://github.com/JumanaBaharul/",
  linkedin: "https://linkedin.com/in/jumana-baharul/",
  leetcode: "https://leetcode.com/u/Jumana_Baharul/",
  education: {
    school: "Shiv Nadar University, Chennai",
    degree: "B.Tech — Artificial Intelligence & Data Science",
    period: "2022 — 2026",
    cgpa: "8.845 / 10",
  },
};

export const title = {
  label: "DIVE LOG · SURFACE INTERVAL OVER",
  name: "JUMANA BAHARUL",
  tagline: "The good work is deep in the data. I go get it.",
  sub: "Scroll to descend. Every treasure pod on the way down is a capability logged from a real system — what the problem was, how it was solved, and the numbers behind it. Anyone can skim the surface; the hold is where the work lives.",
  pressStart: "START THE DIVE",
  skip: "Skip to the habitat",
  hint: "scroll to swim deeper · open every pod to log the finds",
};

// HUD stats — the dive board.
export const stats = [
  { value: 6, suffix: "", label: "Systems in daily use", pct: 60 },
  { value: 8, suffix: "", label: "Model providers orchestrated", pct: 80 },
  { value: 94, suffix: "%", label: "Peak model accuracy", pct: 94 },
  { value: 250, suffix: "+", label: "Algorithmic problems solved", pct: 78 },
];

// ── WORLD 1-1 · FINDS — six capabilities ────────────────────
export const records = [
  {
    id: "grounding",
    block: "FIND-01",
    title: "Grounding a language model in live operational truth",
    question: "How does a system answer questions about live operations without inventing a single number?",
    approach:
      "A query-orchestration pipeline classifies intent, selects the right data collections, expands vague phrasing into precise terms, then runs real analytics. Every generated answer is cross-validated against live database results before it is shown. Voice input is transcribed with silence detection, and eight model providers sit behind one client with automatic failover, per-call latency, token and cost telemetry, and a response cache that removes repeat round trips.",
    evidence: "Built as Voxa, an AI platform for manufacturing plants, serving five domain dashboards.",
    metrics: [
      { k: "Providers, one client", v: "8", pct: 80 },
      { k: "Domain dashboards", v: "5", pct: 50 },
      { k: "Chart types live", v: "13+", pct: 87 },
      { k: "Hallucinations tolerated", v: "0", pct: 4 },
    ],
    stack: ["FastAPI", "MongoDB", "React", "Whisper", "Cross-validated RAG"],
    status: "Running today",
    repo: null,
  },
  {
    id: "remote-sensing",
    block: "FIND-02",
    title: "Reading a field from a distance, then acting on it",
    question: "A diagnosis nobody can act on solves nothing — how do you close the gap between detection and treatment?",
    approach:
      "A multi-task temporal convolutional model reads twelve time steps of nine-band multispectral imagery: one head classifies three stress types, the other produces a pixel-level treatment mask. Five route-planning algorithms then race over the same cost surface and the winner is chosen by gain per unit distance travelled, with the output converted from image coordinates into real geographic waypoints.",
    evidence: "Built as AgroScan, where pixel predictions become drone-ready treatment routes.",
    metrics: [
      { k: "Spectral bands", v: "9", pct: 90 },
      { k: "Time steps per plot", v: "12", pct: 75 },
      { k: "Routing algorithms raced", v: "5", pct: 50 },
      { k: "Output precision", v: "GPS", pct: 88 },
    ],
    stack: ["TensorFlow", "ConvLSTM2D", "OpenCV", "A* · TSP · SA", "Streamlit"],
    status: "Complete",
    repo: "https://github.com/JumanaBaharul/AgroScan",
  },
  {
    id: "motion",
    block: "FIND-03",
    title: "Measuring a body in motion",
    question: "How do you turn a phone video into a biomechanical judgement someone can trust?",
    approach:
      "Pose estimation tracks thirty-three landmarks per frame across twelve movement types. From those trajectories the system computes six biomechanical risk metrics — knee valgus, trunk lean, bilateral asymmetry, hip drop — plus automatic rep counting and fatigue detection. A language model turns the numbers into coaching guidance, but the deterministic vision output stays the source of truth, with a clinically-informed fallback when the model is unavailable.",
    evidence: "Built as InjuryLens: upload a workout video, receive an injury-risk report and a five-day plan.",
    metrics: [
      { k: "Landmarks per frame", v: "33", pct: 92 },
      { k: "Risk metrics", v: "6", pct: 60 },
      { k: "Movement types", v: "12", pct: 75 },
      { k: "Truth source", v: "CV", pct: 95 },
    ],
    stack: ["FastAPI", "React", "MediaPipe", "OpenCV", "Recharts"],
    status: "Complete",
    repo: "https://github.com/deepuzz11/InjuryLens",
  },
  {
    id: "arithmetic",
    block: "FIND-04",
    title: "Keeping the arithmetic away from the model",
    question: "Models write well and calculate badly — so where does the money maths belong?",
    approach:
      "Voice notes and unstructured briefs are transcribed and turned into structured scope, but every generated output must pass a strict schema before it is used, and all pricing is computed server-side where a model cannot influence it. High-severity risks gate a proposal before it can leave the building; sharing happens through tokenised accept links on a row-level-secured backend.",
    evidence: "Built as ScopeSmith, where pricing is model-proof by construction.",
    metrics: [
      { k: "Pricing computed", v: "Server", pct: 100 },
      { k: "Output validation", v: "Schema", pct: 100 },
      { k: "Risk gating", v: "Pre-send", pct: 90 },
      { k: "Sharing", v: "Tokens", pct: 85 },
    ],
    stack: ["Next.js", "TypeScript", "Gemini", "Zod", "Supabase RLS"],
    status: "Complete",
    repo: "https://github.com/JumanaBaharul/Scope-Smith",
  },
  {
    id: "trust",
    block: "FIND-05",
    title: "Scoring trust from nine weak signals",
    question: "No single signal catches a bad actor — what happens when you fuse them honestly?",
    approach:
      "Nine independent detectors run and fail separately: domain age, certificate history, DNS health, automated site fingerprinting, brand-impersonation heuristics, redirect chains, review sentiment and moderated reports. A language model weaves the evidence into an explanation while a deterministic scorer guards the number underneath, so the score survives even when the model doesn't.",
    evidence: "Built as CredCheck, with live streaming scans, caching and end-to-end tests.",
    metrics: [
      { k: "Independent signals", v: "9+", pct: 95 },
      { k: "Score range", v: "0–100", pct: 100 },
      { k: "Result cache", v: "48h", pct: 70 },
      { k: "Test coverage", v: "E2E", pct: 85 },
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL", "LLM synthesis", "Playwright"],
    status: "Complete",
    repo: "https://github.com/deepuzz11/CredCheck",
  },
  {
    id: "refusal",
    block: "FIND-06",
    title: "Teaching retrieval when to refuse",
    question: "A retrieval system that sounds confident when the corpus is silent is the most dangerous kind — how do you fix that?",
    approach:
      "Exact vector search over compact sentence embeddings with an explicit noise threshold, a constrained system prompt, zero-temperature generation, and standing permission to answer that something is not in the dataset. Four separate layers stand between a user and a confident wrong answer, and every response traces back to the passage it came from.",
    evidence: "Built as a vehicle-intelligence service: search, grounded answering and recommendation.",
    metrics: [
      { k: "Defence layers", v: "4", pct: 80 },
      { k: "Search", v: "Exact", pct: 100 },
      { k: "Generation", v: "T=0", pct: 100 },
      { k: "Refusals allowed", v: "Yes", pct: 100 },
    ],
    stack: ["FastAPI", "FAISS", "MiniLM", "Groq", "Docker"],
    status: "Complete",
    repo: "https://github.com/JumanaBaharul/ford-ai-system",
  },
];

// ── WORLD 1-2 · DIVE PLAN — what repeats ────────────────────
export const method = [
  { n: "01", title: "Ground before you generate", body: "An answer is only as good as the evidence beneath it. A system that admits uncertainty is worth more than one that sounds confident." },
  { n: "02", title: "The model is not the product", body: "Irreversible logic — pricing, validation, safety thresholds — belongs where a model cannot reach it. Models write; the code decides." },
  { n: "03", title: "Design the fallback first", body: "Multiple providers behind one client, deterministic scorers under generative ones. Degrading gracefully is a design skill, not an afterthought." },
  { n: "04", title: "Ship the unglamorous half", body: "Caching, cost telemetry, validation schemas, CI gates: the parts nobody demos are why the demoed parts survive production." },
];

// ── WORLD 1-3 · DIVE SITES — every role ─────────────────────
export const courses = [
  {
    code: "SITE-1",
    period: "Apr 2026 — Present",
    org: "Sorim Technologies",
    role: "Software Engineer — AI Platform",
    current: true,
    frame: "The site being charted now",
    summary: "Own the AI surface of an operations platform end to end: query orchestration, provider-agnostic model orchestration, retrieval grounded in live data, and the interface on top.",
    learned: [
      "Eight model providers behind one client with automatic failover and per-call cost telemetry",
      "Cross-validating retrieved documents against live database results before an answer is shown",
      "CI quality gates — linting, security scanning, complexity and diff coverage — on every change",
    ],
    stack: ["FastAPI", "MongoDB", "React", "Whisper"],
  },
  {
    code: "SITE-2",
    period: "Aug — Oct 2025",
    org: "Infosys Springboard",
    role: "Artificial Intelligence Intern",
    frame: "Machine learning in front of a real business",
    summary: "Built a delivery-punctuality predictor for logistics operations and the interface that let non-technical teams use it.",
    learned: [
      "94% accuracy with risk scoring and automated delay-reason analysis",
      "Shipped both real-time and batch prediction modes",
    ],
    stack: ["Python", "XGBoost", "Streamlit"],
  },
  {
    code: "SITE-3",
    period: "Jun — Jul 2025",
    org: "AICTE",
    role: "Artificial Intelligence Intern",
    frame: "The full machine-learning loop",
    summary: "Took a prediction problem from raw tabular data to a deployed dashboard: cleaning, feature engineering, model selection, interface.",
    learned: [
      "End-to-end salary prediction with automated preprocessing and feature engineering",
      "Single and batch prediction paths through an interactive dashboard",
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
  },
  {
    code: "SITE-4",
    period: "May — Jul 2025",
    org: "Outlook Publishing",
    role: "Data Analyst Intern",
    frame: "Learning to read a business in its numbers",
    summary: "Analysed subscription behaviour for a print and digital publisher, then forecast where the revenue cliff was hiding.",
    learned: [
      "Dashboards covering 12% of the subscription base, surfacing brand and demographic patterns",
      "Three-year churn forecasting that identified critical expiry windows",
    ],
    stack: ["Tableau", "Forecasting", "SQL"],
  },
  {
    code: "SITE-5",
    period: "Dec 2024 — Apr 2025",
    org: "LedgerBooks",
    role: "Junior Web Developer Intern",
    frame: "Where the interface met the ledger",
    summary: "Worked on a finance product where correctness and auditability were the whole point.",
    learned: [
      "React front end for a crypto-accounting module",
      "Node.js services and data handling in a Cassandra environment",
    ],
    stack: ["React", "Node.js", "Cassandra"],
  },
  {
    code: "SITE-6",
    period: "Dec 2023 — Nov 2024",
    org: "SportJacks",
    role: "Full Stack Developer Intern",
    frame: "A year of shipping to real users",
    summary: "My longest stretch in pure product engineering — interfaces, API work, and the maintenance that follows a release.",
    learned: [
      "Next.js interfaces alongside Node.js and Express services",
      "Responsiveness and performance improvements across devices",
    ],
    stack: ["Next.js", "Node.js", "Express"],
  },
];

// ── WORLD 1-4 · GEAR LOCKER — tools as equipment ────────────
export const inventory = [
  { item: "mask", name: "Models & learning", note: "Training, evaluating and shipping learned systems", items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "XGBoost", "OpenCV"] },
  { item: "tank", name: "Language systems", note: "Grounding, retrieval, orchestration, evaluation", items: ["OpenAI", "Anthropic", "Gemini", "Groq", "RAG", "Embeddings", "Whisper"] },
  { item: "sonar", name: "Engineering", note: "The services and interfaces around the model", items: ["Python", "TypeScript", "FastAPI", "React", "Next.js", "Node.js"] },
  { item: "chest", name: "Data & operations", note: "Storage, delivery and the checks that keep it honest", items: ["MongoDB", "PostgreSQL", "Supabase", "Docker", "GitHub Actions", "Playwright"] },
];

// ── Side quests — earlier work, kept short ──────────────────
export const bonus = [
  { name: "ShipmentSure", note: "Delivery punctuality prediction, 94% accuracy", repo: "https://github.com/JumanaBaharul/ShipmentSure" },
  { name: "MedBot", note: "Embeddings versus a fine-tuned transformer — 90.62%", repo: "https://github.com/JumanaBaharul/Health-Diagnosis-Assisstant" },
  { name: "Chest X-ray screening", note: "Multi-architecture CNN comparison — 89.58%", repo: "https://github.com/JumanaBaharul/COVID-19-Diagnosis-Using-Chest-X-rays" },
  { name: "Tamper detection", note: "Error-level analysis with CNNs — 94.05%", repo: "https://github.com/JumanaBaharul/Image-Forgery-Detection" },
  { name: "Behavioural risk", note: "Sparse autoencoder with gradient boosting", repo: "https://github.com/JumanaBaharul/Child-Mind-Institute---Problematic-Internet-Use" },
  { name: "Demand forecasting", note: "Classical and recurrent baselines — 87%", repo: "https://github.com/JumanaBaharul/Demand-Forecasting" },
  { name: "Information spread", note: "Graph neural networks over claim propagation", repo: "https://github.com/JumanaBaharul/Graph-Based-Rumor-and-Misinformation-Propagation" },
  { name: "Salary prediction", note: "End-to-end tabular pipeline with a dashboard", repo: "https://github.com/JumanaBaharul/Employee-Salary-Prediction" },
];

export const clear = {
  stamp: "DIVE LOGGED",
  headline: "Bottom reached.",
  body: "I'm happiest on problems where the data is messy, the answer has to be trustworthy, and someone will actually use the result. If that sounds like yours, write to me — I answer every message.",
  availability: "Available for the next descent",
  quote: "If it can't say \"I don't know\", it isn't done.",
  nextLevel: "NEXT DIVE: YOUR TEAM",
};

export const footer = {
  note: "© 2026 Jumana Baharul · Every sprite on this page is original, drawn in code — no game assets were borrowed.",
};
