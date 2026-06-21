import { useState, type SVGProps } from "react";

/* Lightweight inline icons — no external icon package required. */
interface IconProps {
  size?: number;
  className?: string;
}

function iconProps(size: number): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
}

function Copy({ size = 14 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function Check({ size = 14 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Sparkles({ size = 22, className }: IconProps) {
  return (
    <svg {...iconProps(size)} className={className}>
      <path d="M12 3l1.9 4.9L19 9.8l-5.1 1.9L12 17l-1.9-5.3L5 9.8l5.1-1.9L12 3z" />
      <path d="M19 17l.8 2.1L22 20l-2.2.9L19 23l-.8-2.1L16 20l2.2-.9L19 17z" />
    </svg>
  );
}

function Wand2({ size = 16 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M15 9h.01M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5" />
    </svg>
  );
}

function Hash({ size = 12 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}

/* =====================================================================================
   VIRAL HOOK & CAPTION GENERATOR
   -------------------------------------------------------------------------------------
   Internal copywriting framework:
   - UNIVERSAL_HOOKS / UNIVERSAL_CAPTIONS: 12 + 8 high-converting structural templates,
     proven across short-form platforms, written as mad-lib frameworks.
   - NICHES: 15 content verticals, each carrying its own vocabulary bank (audience,
     desired result, pain point, power words) so the SAME structural template reads as
     a completely different, niche-native line depending on who picked it.
   - Each niche also ships 2 hand-tuned "signature" hooks unique to that vertical.
   - fillTemplate() does the algorithmic string manipulation: case transforms,
     pluralization, and slot injection turn ~20 raw templates x 15 niches into
     thousands of distinct, on-voice outputs.
   ===================================================================================== */

interface Niche {
  id: string;
  label: string;
  icon: string;
  audience: string;
  result: string;
  pain: string;
  example: string;
  power: string[];
  chipActive: string;
  tagBg: string;
  bar: string;
  bonusHooks: string[];
}

interface CardData {
  id: string;
  text: string;
  score: number;
}

interface ResultsState {
  hooks: CardData[];
  captions: CardData[];
  niche: Niche;
  topic: string;
}

const EMOJIS = ["🔥", "✨", "👇", "🚀", "💡", "😭", "🙌", "💯"];

const NICHES: Niche[] = [
  { id: "tech", label: "Tech", icon: "💻", audience: "developers", result: "shipping speed", pain: "tech debt", example: "AI coding assistants", power: ["game-changing", "next-level", "mind-blowing", "underrated", "revolutionary", "overpowered"], chipActive: "bg-cyan-500 border-cyan-400 text-slate-900", tagBg: "bg-cyan-950 border-cyan-800 text-cyan-300", bar: "bg-cyan-400", bonusHooks: ["I gave {topic} 24 hours and it broke my workflow (in the best way).", "Every developer needs to see this {topic} trick before 2027."] },
  { id: "fitness", label: "Fitness", icon: "🏋️", audience: "lifters", result: "gains", pain: "plateaus", example: "progressive overload", power: ["brutal", "no-BS", "next-level", "underrated", "elite", "unstoppable"], chipActive: "bg-emerald-500 border-emerald-400 text-slate-900", tagBg: "bg-emerald-950 border-emerald-800 text-emerald-300", bar: "bg-emerald-400", bonusHooks: ["I replaced my entire routine with {topic} and my coach noticed in a week.", "{Topic} beats everything else I've tried for {result}. Fight me."] },
  { id: "finance", label: "Finance", icon: "💰", audience: "investors", result: "passive income", pain: "living paycheck to paycheck", example: "index fund investing", power: ["lucrative", "underrated", "game-changing", "smart", "low-risk", "wealth-building"], chipActive: "bg-amber-500 border-amber-400 text-slate-900", tagBg: "bg-amber-950 border-amber-800 text-amber-300", bar: "bg-amber-400", bonusHooks: ["I put {topic} to the test with $1,000 — here's the ROI.", "Your portfolio is missing {topic} and it's costing you."] },
  { id: "vlogging", label: "Vlogging", icon: "🎥", audience: "creators", result: "watch time", pain: "creative burnout", example: "a day in my life", power: ["raw", "unfiltered", "binge-worthy", "next-level", "underrated", "iconic"], chipActive: "bg-rose-500 border-rose-400 text-slate-900", tagBg: "bg-rose-950 border-rose-800 text-rose-300", bar: "bg-rose-400", bonusHooks: ["I filmed my entire day using only {topic}. The footage shocked me.", "Every vlogger needs {topic} in their kit — here's why."] },
  { id: "cooking", label: "Cooking", icon: "🍳", audience: "home cooks", result: "restaurant-quality meals", pain: "boring dinners", example: "15-minute dinners", power: ["mouthwatering", "next-level", "underrated", "restaurant-grade", "addictive", "game-changing"], chipActive: "bg-orange-500 border-orange-400 text-slate-900", tagBg: "bg-orange-950 border-orange-800 text-orange-300", bar: "bg-orange-400", bonusHooks: ["I cooked {topic} every night for a week — my family begged for more.", "This {topic} recipe broke the internet for a reason."] },
  { id: "beauty", label: "Beauty", icon: "💄", audience: "skincare lovers", result: "glass skin", pain: "breakouts", example: "retinol routines", power: ["glow-up", "underrated", "game-changing", "dermatologist-approved", "next-level", "viral"], chipActive: "bg-pink-500 border-pink-400 text-slate-900", tagBg: "bg-pink-950 border-pink-800 text-pink-300", bar: "bg-pink-400", bonusHooks: ["I tested {topic} for 7 days straight — my skin barrier thanks me.", "Dermatologists don't want you to know this {topic} trick."] },
  { id: "travel", label: "Travel", icon: "✈️", audience: "travelers", result: "unforgettable trips", pain: "tourist traps", example: "solo backpacking", power: ["underrated", "hidden-gem", "next-level", "jaw-dropping", "life-changing", "must-see"], chipActive: "bg-sky-500 border-sky-400 text-slate-900", tagBg: "bg-sky-950 border-sky-800 text-sky-300", bar: "bg-sky-400", bonusHooks: ["I booked {topic} on a whim — best decision of the year.", "Skip the guidebook. {Topic} is the only travel hack you need."] },
  { id: "fashion", label: "Fashion", icon: "👗", audience: "style girls", result: "a wardrobe people ask about", pain: "closet clutter", example: "a capsule wardrobe", power: ["elevated", "underrated", "next-level", "iconic", "effortless", "statement-making"], chipActive: "bg-fuchsia-500 border-fuchsia-400 text-slate-900", tagBg: "bg-fuchsia-950 border-fuchsia-800 text-fuchsia-300", bar: "bg-fuchsia-400", bonusHooks: ["I built a whole capsule wardrobe around {topic}. Here's the lookbook.", "{Topic} is the one piece every closet is missing right now."] },
  { id: "gaming", label: "Gaming", icon: "🎮", audience: "gamers", result: "clutch wins", pain: "getting stuck on rank", example: "speedrunning strategies", power: ["broken", "overpowered", "underrated", "meta-breaking", "clutch", "next-level"], chipActive: "bg-violet-500 border-violet-400 text-slate-900", tagBg: "bg-violet-950 border-violet-800 text-violet-300", bar: "bg-violet-400", bonusHooks: ["I played nothing but {topic} for a week — my K/D speaks for itself.", "This {topic} strategy is breaking the meta right now."] },
  { id: "parenting", label: "Parenting", icon: "🍼", audience: "parents", result: "calmer evenings", pain: "meltdown bedtimes", example: "toddler tantrums", power: ["game-changing", "underrated", "life-saving", "next-level", "genius", "peace-restoring"], chipActive: "bg-lime-500 border-lime-400 text-slate-900", tagBg: "bg-lime-950 border-lime-800 text-lime-300", bar: "bg-lime-400", bonusHooks: ["I tried {topic} with my toddler and bedtime finally got easier.", "Every parent needs to hear this about {topic} before it's too late."] },
  { id: "realestate", label: "Real Estate", icon: "🏡", audience: "agents", result: "closed deals", pain: "cold leads", example: "first-time homebuyers", power: ["underrated", "game-changing", "high-ROI", "next-level", "smart", "overlooked"], chipActive: "bg-teal-500 border-teal-400 text-slate-900", tagBg: "bg-teal-950 border-teal-800 text-teal-300", bar: "bg-teal-400", bonusHooks: ["I closed a deal using {topic} — here's the exact playbook.", "Buyers are sleeping on {topic} and agents are cashing in."] },
  { id: "business", label: "Business", icon: "📈", audience: "founders", result: "recurring revenue", pain: "feast-or-famine months", example: "cold email outreach", power: ["scalable", "game-changing", "underrated", "next-level", "high-leverage", "profitable"], chipActive: "bg-indigo-500 border-indigo-400 text-slate-900", tagBg: "bg-indigo-950 border-indigo-800 text-indigo-300", bar: "bg-indigo-400", bonusHooks: ["I scaled my business with {topic} and quit my 9-to-5 in 90 days.", "Founders who use {topic} are outpacing everyone else right now."] },
  { id: "selfimprovement", label: "Self-Improvement", icon: "🧠", audience: "high achievers", result: "unstoppable momentum", pain: "burnout", example: "morning routines", power: ["life-changing", "underrated", "next-level", "non-negotiable", "game-changing", "transformative"], chipActive: "bg-yellow-500 border-yellow-400 text-slate-900", tagBg: "bg-yellow-950 border-yellow-800 text-yellow-300", bar: "bg-yellow-400", bonusHooks: ["I changed one habit — {topic} — and my whole life shifted.", "This {topic} mindset shift took me from stuck to unstoppable."] },
  { id: "comedy", label: "Comedy", icon: "😂", audience: "your group chat", result: "main character energy", pain: "being the unfunny friend", example: "awkward first dates", power: ["unhinged", "iconic", "chaotic", "underrated", "painfully relatable", "next-level"], chipActive: "bg-red-500 border-red-400 text-slate-900", tagBg: "bg-red-950 border-red-800 text-red-300", bar: "bg-red-400", bonusHooks: ["Tell me you've never tried {topic} without telling me 😭", "POV: {topic} but make it chaotic."] },
  { id: "music", label: "Music", icon: "🎵", audience: "producers", result: "a song that actually slaps", pain: "creative block", example: "lo-fi beats", power: ["fire", "underrated", "next-level", "game-changing", "addictive", "chart-worthy"], chipActive: "bg-blue-500 border-blue-400 text-slate-900", tagBg: "bg-blue-950 border-blue-800 text-blue-300", bar: "bg-blue-400", bonusHooks: ["I made a beat using only {topic} — listen to what happened.", "This {topic} sound is about to be everywhere on the charts."] },
];

const UNIVERSAL_HOOKS: string[] = [
  "Nobody is talking about {topic} and it's actually {power}.",
  "I tried {topic} for 30 days — here's what no one tells {audience}.",
  "{Topic} is the most {power} thing you're not doing yet.",
  "POV: you just discovered {topic} and your {result} is about to change forever.",
  "Stop scrolling if you're one of the {audience} who hasn't tried {topic} yet.",
  "{number} things about {topic} that {audience} wish they knew sooner.",
  "This {power} {topic} hack fixed my {pain} in one week.",
  "Why is nobody talking about {topic}? It's the most {power} thing for {audience} right now.",
  "I wasted years before I found {topic}. Here's what changed.",
  "The {topic} method that's quietly taking over with {audience}.",
  "If you're one of the {audience} struggling with {pain}, {topic} might be your answer.",
  "Unpopular opinion: {topic} is more {power} than everyone says.",
];

const UNIVERSAL_CAPTIONS: string[] = [
  "{Topic} changed the game for me. Save this for later. {emoji}",
  "Real talk: {topic} solved my {pain} when nothing else worked. Who else needs to hear this today? {emoji}",
  "{number} lessons {audience} learn the hard way about {topic} 👇",
  "Tag someone who needs to see this {topic} breakdown. {emoji}",
  "I almost didn't post this... but {topic} is too {power} to keep to myself. {emoji}",
  "Drop a 🔥 if {topic} has been on your radar lately.",
  "This is your sign to finally try {topic}. Comment 'YES' if you're in. {emoji}",
  "Save this post — {topic} is about to be everywhere. {emoji}",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function pluralize(word: string): string {
  if (!word) return word;
  const w = word.trim();
  if (/[^aeiou]y$/i.test(w)) return w.slice(0, -1) + "ies";
  if (/(s|x|z|ch|sh)$/i.test(w)) return w + "es";
  if (/s$/i.test(w)) return w;
  return w + "s";
}

// Algorithmic slot-injection: replaces every placeholder with a case-transformed
// or niche-derived value, picking fresh power words / numbers / emoji per card.
function fillTemplate(template: string, niche: Niche, rawTopic: string): string {
  const topic = rawTopic.trim();
  const slots: Record<string, string> = {
    "{topic}": topic,
    "{Topic}": capitalize(topic),
    "{TOPIC}": topic.toUpperCase(),
    "{topicPlural}": pluralize(topic),
    "{audience}": niche.audience,
    "{result}": niche.result,
    "{pain}": niche.pain,
    "{power}": pick(niche.power),
    "{number}": String(pick([3, 5, 7, 9, 11])),
    "{emoji}": pick(EMOJIS),
  };
  let out = template;
  for (const [key, value] of Object.entries(slots)) {
    out = out.split(key).join(value);
  }
  return out;
}

function computeScore(text: string, niche: Niche): number {
  let score = 58;
  if (/\?/.test(text)) score += 7;
  if (/\d/.test(text)) score += 6;
  if (/[🔥💀😭👇🚀✨💡🙌💯]/.test(text)) score += 4;
  const len = text.length;
  if (len >= 40 && len <= 120) score += 9;
  else if (len > 130) score -= 4;
  niche.power.forEach((p) => {
    if (text.toLowerCase().includes(p.toLowerCase())) score += 4;
  });
  score += Math.floor(Math.random() * 7) - 3;
  return Math.min(97, Math.max(38, Math.round(score)));
}

function scoreBarClass(score: number): string {
  if (score >= 85) return "bg-emerald-400";
  if (score >= 70) return "bg-amber-400";
  return "bg-rose-400";
}

function scoreLabel(score: number): string {
  if (score >= 85) return "Elite";
  if (score >= 70) return "Strong";
  return "Decent";
}

interface CopyButtonProps {
  id: string;
  text: string;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}

function CopyButton({ id, text, copiedId, onCopy }: CopyButtonProps) {
  const copied = copiedId === id;
  return (
    <button
      onClick={() => onCopy(id, text)}
      className={`flex items-center gap-1.5 shrink-0 text-xs font-semibold px-2.5 py-1.5 rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-cyan-400 ${
        copied
          ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
          : "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
      }`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

interface OutputCardProps {
  id: string;
  kind: string;
  text: string;
  score: number;
  niche: Niche;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
  delay: number;
}

function OutputCard({ id, kind, text, score, niche, copiedId, onCopy, delay }: OutputCardProps) {
  return (
    <div
      className="card-enter rounded-xl border border-slate-700 bg-slate-800/60 p-4 sm:p-5 flex flex-col gap-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${niche.tagBg}`}
        >
          {niche.icon} {niche.label} · {kind}
        </span>
        <CopyButton id={id} text={text} copiedId={copiedId} onCopy={onCopy} />
      </div>

      <p
        className="text-slate-100 text-[15px] leading-relaxed"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {text}
      </p>

      <div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span>Scroll-Stop Score · {scoreLabel(score)}</span>
          <span>{score}/100</span>
        </div>
        <div className="h-1.5 w-full bg-slate-700/70 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${scoreBarClass(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = useState<string>("tech");
  const [topic, setTopic] = useState<string>("");
  const [results, setResults] = useState<ResultsState | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const selectedNiche = NICHES.find((n) => n.id === selectedId) || NICHES[0];

  function handleCopy(id: string, text: string) {
    const doFallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* no-op */
      }
      document.body.removeChild(ta);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(doFallback);
    } else {
      doFallback();
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 1500);
  }

  function handleGenerate() {
    if (!topic.trim()) {
      setError("Drop a topic in first — that's what we hook around.");
      return;
    }
    setError("");

    const hookPool = shuffle([...UNIVERSAL_HOOKS, ...selectedNiche.bonusHooks]);
    const chosenHooks = hookPool.slice(0, 6);
    const captionPool = shuffle(UNIVERSAL_CAPTIONS);
    const chosenCaptions = captionPool.slice(0, 4);
    const stamp = Date.now();

    const hooks: CardData[] = chosenHooks.map((tpl, i) => {
      const text = fillTemplate(tpl, selectedNiche, topic);
      return { id: `hook-${stamp}-${i}`, text, score: computeScore(text, selectedNiche) };
    });
    const captions: CardData[] = chosenCaptions.map((tpl, i) => {
      const text = fillTemplate(tpl, selectedNiche, topic);
      return { id: `cap-${stamp}-${i}`, text, score: computeScore(text, selectedNiche) };
    });

    setResults({ hooks, captions, niche: selectedNiche, topic: topic.trim() });
  }

  return (
    <div
      className="min-h-screen w-full bg-slate-950 text-slate-200 px-4 sm:px-6 py-10"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .card-enter { animation: cardIn 0.4s ease-out both; }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .card-enter { animation: none; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🪝</span>
            <span
              className="text-lg sm:text-xl tracking-tight"
              style={{ fontFamily: '"Archivo Black", sans-serif' }}
            >
              HOOKLAB
            </span>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-widest text-slate-500">
            <Hash size={12} /> 15 niches · instant hooks
          </span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-5xl leading-[1.05] tracking-tight mb-3"
            style={{ fontFamily: '"Archivo Black", sans-serif' }}
          >
            Stop the scroll.<br className="hidden sm:block" /> Start the algorithm.
          </h1>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base">
            Pick your niche, drop a topic, and we'll forge scroll-stopping hooks and
            captions from a battle-tested copywriting framework — built for the way
            each audience actually talks.
          </p>
        </div>

        {/* Niche grid */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            1. Choose your niche
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {NICHES.map((n) => {
              const active = n.id === selectedId;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-3 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-cyan-400 ${
                    active
                      ? n.chipActive
                      : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                  }`}
                >
                  <span className="text-lg leading-none">{n.icon}</span>
                  {n.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic input */}
        <div className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
            2. Drop your topic
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder={`e.g. ${selectedNiche.example}`}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            <button
              onClick={handleGenerate}
              className="flex items-center justify-center gap-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold px-5 py-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-cyan-400"
            >
              <Wand2 size={16} />
              Generate
            </button>
          </div>
          {error && <p className="text-rose-400 text-xs mt-2">{error}</p>}
        </div>

        {/* Results */}
        {!results && (
          <div className="mt-14 flex flex-col items-center text-center text-slate-500 py-12 border border-dashed border-slate-800 rounded-xl">
            <Sparkles size={22} className="mb-3 text-slate-600" />
            <p className="text-sm">
              Your hooks and captions for <span className="text-slate-300">{selectedNiche.label}</span> will land here.
            </p>
          </div>
        )}

        {results && (
          <div className="mt-12 space-y-12">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-xl tracking-tight"
                  style={{ fontFamily: '"Archivo Black", sans-serif' }}
                >
                  Hooks
                </h2>
                <button
                  onClick={handleGenerate}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  ↻ Regenerate
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.hooks.map((h, i) => (
                  <OutputCard
                    key={h.id}
                    id={h.id}
                    kind="Hook"
                    text={h.text}
                    score={h.score}
                    niche={results.niche}
                    copiedId={copiedId}
                    onCopy={handleCopy}
                    delay={i * 45}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2
                className="text-xl tracking-tight mb-4"
                style={{ fontFamily: '"Archivo Black", sans-serif' }}
              >
                Captions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.captions.map((c, i) => (
                  <OutputCard
                    key={c.id}
                    id={c.id}
                    kind="Caption"
                    text={c.text}
                    score={c.score}
                    niche={results.niche}
                    copiedId={copiedId}
                    onCopy={handleCopy}
                    delay={i * 45}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="mt-16 text-center text-xs text-slate-600">
          Built for creators who hate writer's block.
        </p>
      </div>
    </div>
  );
}
