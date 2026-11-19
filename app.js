"use strict";
/* Actogrow: "This app does nothing until you do something."
   Three questions pick a mantra, the user holds to reveal it, practices it, and the grove grows.
   No server, no AI: everything runs and stays on the device. */

const KEY = "actogrow-v1";
const STAGES = [0, 3, 8, 15, 25, 40];
const TOPICS = ["confidence", "calm", "focus", "selflove", "courage", "energy"];

// ---------- strings: en, he (masculine), hf (feminine) ----------
const T = {
  tagline: { en: "This app does nothing until you do something.", he: "האפליקציה הזאת לא עושה כלום, עד שאתה עושה משהו.", hf: "האפליקציה הזאת לא עושה כלום, עד שאת עושה משהו." },
  intro: { en: "Answer three questions. Reveal your mantra. Learn it. Watch your grove grow.", he: "עונים על שלוש שאלות, חושפים משפט שמחזק אותך, לומדים אותו, ורואים את החורשה שלך גדלה." },
  start: { en: "Start", he: "להתחיל" },
  genderQ: { en: "", he: "איך לפנות אליך?" },
  male: { en: "", he: "בלשון זכר" },
  female: { en: "", he: "בלשון נקבה" },
  today: { en: "Answer 3 questions", he: "לענות על 3 שאלות" },
  another: { en: "Another mantra", he: "עוד משפט" },
  review: { en: "Review a mantra", he: "לחזור על משפט" },
  collection: { en: "My mantras", he: "המשפטים שלי" },
  waiting: { en: "Your grove is waiting for you to act.", he: "החורשה שלך מחכה שתפעל.", hf: "החורשה שלך מחכה שתפעלי." },
  actedToday: { en: "You acted today. Your grove grew.", he: "פעלת היום. החורשה שלך גדלה." },
  qOf: { en: "Question {n} of 3", he: "שאלה {n} מתוך 3" },
  q1: { en: "How do you feel right now?", he: "איך אתה מרגיש עכשיו?", hf: "איך את מרגישה עכשיו?" },
  q2: { en: "What do you need more of today?", he: "מה הכי חסר לך היום?" },
  q3: { en: "What's getting in your way?", he: "מה עוצר אותך?" },
  good: { en: "Good", he: "טוב", hf: "טובה" },
  motivated: { en: "Motivated", he: "מלא מוטיבציה", hf: "מלאת מוטיבציה" },
  none: { en: "Nothing, I'm on a roll", he: "כלום, אני בתנופה" },
  anxious: { en: "Anxious", he: "לחוץ", hf: "לחוצה" },
  tired: { en: "Tired", he: "עייף", hf: "עייפה" },
  doubtful: { en: "Unsure of myself", he: "לא בטוח בעצמי", hf: "לא בטוחה בעצמי" },
  scattered: { en: "Scattered", he: "מפוזר", hf: "מפוזרת" },
  confidence: { en: "Confidence", he: "ביטחון" },
  calm: { en: "Calm", he: "שקט" },
  focus: { en: "Focus", he: "ריכוז" },
  selflove: { en: "Self-kindness", he: "חמלה עצמית" },
  courage: { en: "Courage", he: "אומץ" },
  energy: { en: "Energy", he: "אנרגיה" },
  fear: { en: "Fear", he: "פחד" },
  delay: { en: "Putting things off", he: "דחיינות" },
  critic: { en: "My inner critic", he: "הביקורת הפנימית" },
  fatigue: { en: "No energy", he: "חוסר כוח" },
  ready: { en: "Your mantra is ready", he: "המשפט שלך מוכן" },
  hold: { en: "Press and hold to reveal", he: "לחיצה ארוכה כדי לחשוף" },
  learnIt: { en: "Learn it", he: "ללמוד אותו" },
  fillTitle: { en: "Fill in the missing word", he: "להשלים את המילה החסרה" },
  orderTitle: { en: "Tap the words in order", he: "לגעת במילים לפי הסדר" },
  learned: { en: "Learned! +2 growth", he: "נלמד! 2+ צמיחה" },
  reviewed: { en: "Reviewed. +1 growth", he: "חזרת עליו. 1+ צמיחה" },
  tryAgain: { en: "Not quite. Read it again and try once more.", he: "כמעט. כדאי לקרוא שוב ולנסות עוד פעם." },
  showMantra: { en: "Show the mantra", he: "להציג את המשפט" },
  home: { en: "Back to my grove", he: "חזרה לחורשה שלי" },
  stats: { en: "{l} of {t} mantras learned · {s}-day streak", he: "{l} מתוך {t} משפטים נלמדו · ימים ברצף: {s}" },
  empty: { en: "No mantras yet. Answer 3 questions to reveal your first one.", he: "עוד אין משפטים. אפשר לענות על 3 שאלות ולחשוף את הראשון." },
  settings: { en: "Settings", he: "הגדרות" },
  language: { en: "Language", he: "שפה" },
  addressMe: { en: "Address me as (Hebrew)", he: "לפנות אליי" },
  reset: { en: "Start over", he: "להתחיל מחדש" },
  resetSure: { en: "Erase all progress?", he: "למחוק את כל ההתקדמות?" },
  yesErase: { en: "Yes, erase", he: "כן, למחוק" },
  cancel: { en: "Cancel", he: "ביטול" },
  local: { en: "Everything stays on this device. No account, no tracking.", he: "הכול נשמר רק במכשיר הזה. בלי חשבון ובלי מעקב." },
  privacy: { en: "Privacy policy", he: "מדיניות פרטיות" },
  stage0: { en: "Seed", he: "זרע" },
  stage1: { en: "Sprout", he: "נבט" },
  stage2: { en: "Seedling", he: "שתיל" },
  stage3: { en: "Young tree", he: "עץ צעיר" },
  stage4: { en: "Tree", he: "עץ" },
  stage5: { en: "Grove", he: "חורשה" },
  stageNext: { en: "{n} growth to {stage}", he: "עוד {n} צמיחה עד {stage}" }
};

// ---------- state ----------
const DEFAULT = { lang: null, gender: null, onboarded: false, growth: 0, learned: {}, streak: 0, lastDay: null };
let S = load();
let flow = {}; // current session answers

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return Object.assign({}, DEFAULT, JSON.parse(raw));
  } catch (e) { /* storage blocked: run without saving */ }
  return Object.assign({}, DEFAULT);
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

function detectLang() {
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
  return langs.some(l => /^(he|iw)\b/i.test(l)) ? "he" : "en";
}
function lang() { return S.lang || detectLang(); }

function t(key, vars) {
  const e = T[key] || {};
  let s = lang() === "he" ? (S.gender === "f" && e.hf ? e.hf : e.he) : e.en;
  if (s == null) s = e.en || key;
  if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
  return s;
}
function textOf(m) { return lang() === "he" ? (S.gender === "f" ? m.heF : m.he) : m.en; }

function applyDir() {
  const he = lang() === "he";
  document.documentElement.lang = he ? "he" : "en";
  document.documentElement.dir = he ? "rtl" : "ltr";
}

function dayKey(d = new Date()) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
function yesterdayKey() { const d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d); }
function actedToday() { return S.lastDay === dayKey(); }
function markActed() {
  const today = dayKey();
  if (S.lastDay === today) return;
  S.streak = S.lastDay === yesterdayKey() ? S.streak + 1 : 1;
  S.lastDay = today;
}

function stageIndex(g) { let i = 0; STAGES.forEach((v, k) => { if (g >= v) i = k; }); return i; }

// ---------- tiny DOM helpers (textContent only, no innerHTML for content) ----------
const app = document.getElementById("app");
function el(tag, props, ...kids) {
  const n = document.createElement(tag);
  if (props) for (const k in props) {
    if (k === "class") n.className = props[k];
    else if (k === "on") for (const ev in props.on) n.addEventListener(ev, props.on[ev]);
    else if (k in n && k !== "style") n[k] = props[k];
    else n.setAttribute(k, props[k]);
  }
  kids.flat().forEach(c => { if (c != null) n.append(c.nodeType ? c : document.createTextNode(c)); });
  return n;
}
function screen(...nodes) { app.replaceChildren(...nodes); window.scrollTo(0, 0); }
function btn(label, onClick, cls) { return el("button", { type: "button", class: cls || "", on: { click: onClick } }, label); }

// ---------- grove ----------
function groveView(size) {
  const c = el("canvas", { width: size * 2, height: size * 2, "aria-hidden": "true" });
  c.style.width = c.style.height = size + "px";
  const g = S.growth, si = stageIndex(g);
  const next = STAGES[si + 1];
  const pct = next ? Math.round((g - STAGES[si]) / (next - STAGES[si]) * 100) : 100;
  const bar = el("div", { class: "bar" }, el("i"));
  requestAnimationFrame(() => { bar.firstChild.style.width = pct + "%"; });
  const learnedCount = Object.keys(S.learned).length;
  const wrap = el("section", { class: "grove" },
    c,
    el("div", { class: "stage" }, t("stage" + si)),
    bar,
    el("div", { class: "stats" }, next ? t("stageNext", { n: next - g, stage: t("stage" + (si + 1)) }) : ""),
    el("div", { class: "stats" }, t("stats", { l: learnedCount, t: MANTRAS.length, s: S.streak || 0 }))
  );
  drawTree(c, g, si);
  return wrap;
}

function drawTree(c, g, si) {
  const x = c.getContext("2d"), W = c.width, H = c.height, s = W / 144;
  const cs = getComputedStyle(document.documentElement);
  const leaf = cs.getPropertyValue("--leaf").trim(), soft = cs.getPropertyValue("--leaf-soft").trim();
  const acc = cs.getPropertyValue("--accent").trim(), line = cs.getPropertyValue("--line").trim();
  x.setTransform(s, 0, 0, s, 0, 0);
  x.clearRect(0, 0, 144, 144);
  x.fillStyle = line; x.beginPath(); x.ellipse(72, 128, 46, 9, 0, 0, 7); x.fill();
  if (si === 0) { x.fillStyle = acc; x.beginPath(); x.ellipse(72, 121, 9, 7, 0, 0, 7); x.fill(); return; }
  const h = Math.min(100, 18 + g * 2.4);
  x.strokeStyle = leaf; x.lineWidth = 3 + si; x.lineCap = "round";
  x.beginPath(); x.moveTo(72, 126); x.lineTo(72, 126 - h); x.stroke();
  const leaves = Math.min(16, 2 + Math.floor(g / 2));
  for (let i = 0; i < leaves; i++) {
    const y = 126 - h * (0.35 + 0.6 * i / leaves), side = i % 2 ? 1 : -1, r = 6 + si * 2;
    x.fillStyle = i % 3 ? leaf : soft;
    x.beginPath(); x.ellipse(72 + side * r, y, r, r * 0.55, side * 0.5, 0, 7); x.fill();
  }
  if (si >= 4) {
    x.fillStyle = soft; x.beginPath(); x.arc(72, 126 - h, 18 + si * 3, 0, 7); x.fill();
    x.fillStyle = leaf; x.beginPath(); x.arc(66, 122 - h, 12 + si * 2, 0, 7); x.fill();
  }
  if (si >= 5) {
    x.fillStyle = acc;
    [[60, 118 - h], [84, 124 - h], [74, 110 - h]].forEach(([a, b]) => { x.beginPath(); x.arc(a, b, 3, 0, 7); x.fill(); });
  }
}

// ---------- screens ----------
function topbar() {
  return el("header", { class: "topbar" },
    el("div", { class: "brand" }, "Actogrow"),
    el("button", { type: "button", class: "icon-btn", "aria-label": t("settings"), on: { click: settings } }, "⚙"));
}

function welcome() {
  applyDir();
  screen(
    el("header", { class: "topbar" }, el("div", { class: "brand" }, "Actogrow")),
    groveView(160),
    el("section", { class: "card" },
      el("p", { class: "tagline" }, t("tagline")),
      el("p", { class: "lead" }, t("intro")),
      btn(t("start"), () => { if (lang() === "he" && !S.gender) chooseGender(); else { S.onboarded = true; save(); home(); } }, "primary")
    ),
    el("p", { class: "foot" }, t("local"))
  );
}

function chooseGender(fromSettings) {
  screen(
    topbar(),
    el("section", { class: "card" },
      el("h1", null, t("genderQ")),
      el("div", { class: "opts" },
        btn(t("male"), () => setGender("m", fromSettings)),
        btn(t("female"), () => setGender("f", fromSettings)))
    )
  );
}
function setGender(g, fromSettings) {
  S.gender = g; S.onboarded = true; save();
  fromSettings ? settings() : home();
}

function home() {
  applyDir();
  const learnedIds = Object.keys(S.learned);
  const actions = el("div", { class: "row" },
    btn(actedToday() ? t("another") : t("today"), () => { flow = {}; ask(0); }, "primary"));
  if (learnedIds.length) actions.append(btn(t("review"), startReview));
  screen(
    topbar(),
    groveView(180),
    el("section", { class: "card" },
      el("p", { class: "tagline" }, actedToday() ? t("actedToday") : t("waiting")),
      actions,
      btn(t("collection"), collection, "ghost")
    )
  );
}

const QUESTIONS = [
  { key: "feel", q: "q1", opts: ["good", "motivated", "anxious", "tired", "doubtful", "scattered"] },
  { key: "topic", q: "q2", opts: TOPICS },
  { key: "block", q: "q3", opts: ["fear", "delay", "critic", "fatigue", "none"] }
];

function ask(i) {
  const Q = QUESTIONS[i];
  const opts = el("div", { class: "opts" },
    Q.opts.map(o => btn(t(o), () => { flow[Q.key] = o; i < QUESTIONS.length - 1 ? ask(i + 1) : reveal(pick()); })));
  screen(topbar(), el("section", { class: "card" },
    el("div", { class: "eyebrow" }, t("qOf", { n: i + 1 })),
    el("h1", null, t(Q.q)),
    opts));
}

function pick() {
  const score = m =>
    (m.topic === flow.topic ? 4 : 0) + (m.feel === flow.feel ? 2 : 0) + (m.block === flow.block ? 2 : 0) +
    (S.learned[m.id] ? -6 : 0) + Math.random();
  return MANTRAS.slice().sort((a, b) => score(b) - score(a))[0];
}

function reveal(m) {
  const mantra = el("p", { class: "mantra" }, textOf(m));
  const veil = el("div", { class: "veil" }, t("hold"));
  const ring = el("div", { class: "ring" });
  const box = el("div", { class: "reveal", tabindex: "0", role: "button", "aria-label": t("hold") }, mantra, veil, ring);
  const go = btn(t("learnIt"), () => fillWord(m), "primary");
  go.hidden = true;
  const HOLD = 1200;
  let t0 = 0, raf = 0, done = false;
  function tick(now) {
    const p = Math.min(1, (now - t0) / HOLD);
    ring.style.transform = "scaleX(" + p + ")";
    if (p >= 1) {
      done = true; veil.style.opacity = 0; ring.style.opacity = 0; go.hidden = false;
      setTimeout(() => { veil.remove(); ring.remove(); }, 550);
      box.removeAttribute("role"); box.setAttribute("aria-label", textOf(m));
      try { if (navigator.vibrate) navigator.vibrate(30); } catch (e) { /* ignore */ }
      go.focus();
    } else raf = requestAnimationFrame(tick);
  }
  const start = e => { if (done) return; e.preventDefault(); t0 = performance.now(); raf = requestAnimationFrame(tick); };
  const stop = () => { if (done) return; cancelAnimationFrame(raf); ring.style.transform = "scaleX(0)"; };
  box.addEventListener("pointerdown", start);
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev => box.addEventListener(ev, stop));
  box.addEventListener("keydown", e => { if ((e.key === " " || e.key === "Enter") && !e.repeat) start(e); });
  box.addEventListener("keyup", stop);
  screen(topbar(), el("section", { class: "card" }, el("div", { class: "eyebrow" }, t("ready")), box, go));
}

// words without punctuation, for comparing answers
const clean = w => w.replace(/[.,!?;:"'״׳]/g, "");

function fillWord(m) {
  const words = textOf(m).split(" ");
  const cand = words.map((w, i) => [clean(w), i]).filter(([w]) => w.length > (lang() === "he" ? 2 : 3));
  const [answer, idx] = cand[Math.floor(Math.random() * cand.length)];
  const line = el("p", { class: "mantra" }, words.map((w, i) => {
    if (i !== idx) return (i ? " " : "") + w;
    const tail = w.slice(clean(w).length);
    return [i ? " " : "", el("span", { class: "blank", "aria-label": "___" }, " "), tail];
  }).flat());
  const pool = [...new Set(MANTRAS.flatMap(x => textOf(x).split(" ").map(clean))
    .filter(w => w.length > 2 && w !== answer))];
  const opts = [answer];
  while (opts.length < 3) { const w = pool[Math.floor(Math.random() * pool.length)]; if (!opts.includes(w)) opts.push(w); }
  opts.sort(() => Math.random() - 0.5);
  const fb = el("div", { "aria-live": "polite" });
  const row = el("div", { class: "row" }, opts.map(o => btn(o, () => {
    if (o === answer) {
      row.querySelectorAll("button").forEach(b => { b.disabled = true; });
      complete(m, true, fb);
    } else {
      fb.replaceChildren(el("p", { class: "no" }, t("tryAgain")));
    }
  })));
  screen(topbar(), el("section", { class: "card" },
    el("div", { class: "eyebrow" }, t("fillTitle")), line, row, fb));
}

function startReview() {
  const ids = Object.keys(S.learned);
  ids.sort((a, b) => (S.learned[a].last || 0) - (S.learned[b].last || 0));
  orderWords(MANTRAS[+ids[0]]);
}

function orderWords(m) {
  const words = textOf(m).split(" ");
  const shuffled = words.map((w, i) => ({ w, i })).sort(() => Math.random() - 0.5);
  const answer = el("div", { class: "answer" });
  const bank = el("div", { class: "chips" });
  const fb = el("div", { "aria-live": "polite" });
  const placed = [];
  function render() {
    answer.replaceChildren(...placed.map((p, k) => btn(p.w, () => { placed.splice(k, 1); render(); }, "chip")));
    bank.replaceChildren(...shuffled.filter(s => !placed.includes(s)).map(s => btn(s.w, () => { placed.push(s); render(); check(); }, "chip")));
  }
  function check() {
    if (placed.length !== words.length) return;
    if (placed.map(p => p.w).join(" ") === words.join(" ")) {
      bank.replaceChildren(); answer.querySelectorAll("button").forEach(b => { b.disabled = true; });
      complete(m, false, fb);
    } else {
      fb.replaceChildren(el("p", { class: "no" }, t("tryAgain")),
        btn(t("showMantra"), () => { fb.replaceChildren(el("p", { class: "mantra" }, textOf(m))); placed.length = 0; render(); }));
    }
  }
  render();
  screen(topbar(), el("section", { class: "card" }, el("div", { class: "eyebrow" }, t("orderTitle")), answer, bank, fb));
}

function complete(m, isNew, fb) {
  const fresh = !S.learned[m.id];
  S.learned[m.id] = { level: ((S.learned[m.id] || {}).level || 0) + 1, last: Date.now() };
  S.growth += fresh ? 2 : 1;
  markActed();
  save();
  fb.replaceChildren(
    el("p", { class: "ok" }, fresh ? t("learned") : t("reviewed")),
    el("p", { class: "mantra" }, textOf(m)),
    btn(t("home"), home, "primary"));
}

function collection() {
  const ids = Object.keys(S.learned).map(Number);
  const body = ids.length
    ? el("ul", { class: "list" }, TOPICS.flatMap(tp => MANTRAS.filter(m => m.topic === tp && ids.includes(m.id))
        .map(m => el("li", null, el("div", { class: "topic" }, t(m.topic)), el("div", null, textOf(m))))))
    : el("p", { class: "lead" }, t("empty"));
  screen(topbar(), el("section", { class: "card" }, el("h1", null, t("collection")), body, btn(t("home"), home, "primary")));
}

function settings() {
  applyDir();
  const langRow = el("div", { class: "row" },
    btn("English", () => { S.lang = "en"; save(); settings(); }, lang() === "en" ? "primary" : ""),
    btn("עברית", () => { S.lang = "he"; save(); if (!S.gender) chooseGender(true); else settings(); }, lang() === "he" ? "primary" : ""));
  const genderRow = el("div", { class: "row" },
    btn(T.male.he, () => setGender("m", true), S.gender === "m" ? "primary" : ""),
    btn(T.female.he, () => setGender("f", true), S.gender === "f" ? "primary" : ""));
  const resetBox = el("div", null, btn(t("reset"), () => {
    resetBox.replaceChildren(el("p", { class: "no" }, t("resetSure")), el("div", { class: "row" },
      btn(t("yesErase"), () => { const l = S.lang; S = Object.assign({}, DEFAULT, { lang: l }); save(); welcome(); }),
      btn(t("cancel"), settings)));
  }, "ghost"));
  screen(topbar(), el("section", { class: "card" },
    el("h1", null, t("settings")),
    el("div", { class: "eyebrow" }, t("language")), langRow,
    el("div", { class: "eyebrow" }, t("addressMe")), genderRow,
    resetBox,
    btn(t("home"), home, "primary")),
    el("p", { class: "foot" }, t("local"), " · ", el("a", { href: "privacy.html" }, t("privacy"))));
}

// ---------- boot ----------
applyDir();
S.onboarded ? home() : welcome();
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => { /* offline support unavailable */ }); });
}
