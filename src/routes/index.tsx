import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Star,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Activity,
  Pill,
  ThermometerSun,
  Microscope,
  Wind,
  Salad,
  CalendarCheck,
  ArrowRight,
  Award,
  Clock,
  Users,
  CheckCircle2,
  ChevronDown,
  Navigation as NavIcon,
  Menu,
  X,
} from "lucide-react";
import doctorImg from "@/assets/doctor.jpg";

const PHONE = "+919519893270";
const PHONE_DISPLAY = "+91 95198 93270";
const WHATSAPP = "919519893270";
const CLINIC_ADDRESS =
  "200 m south from Chauraha, Nahar Road, Daudpur, Gorakhpur, Uttar Pradesh 273001";
const MAPS_URL =
  "https://www.google.com/maps/place/Dr.+(Major)+Amit+Kumar+Srivastava,+NARAYAN+CLINIC/@26.7376455,83.37304,17z";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. (Major) Amit Kumar Srivastava — Narayan Clinic, Gorakhpur" },
      {
        name: "description",
        content:
          "MD Medicine. Trusted Gorakhpur physician for diabetes, hypertension, internal medicine & family healthcare. 4.9★ on Google, 120+ reviews.",
      },
      { property: "og:title", content: "Dr. (Major) Amit Kumar Srivastava — Narayan Clinic" },
      {
        property: "og:description",
        content:
          "Compassionate, evidence-based care from a physician Gorakhpur families trust.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physician",
          name: "Dr. (Major) Amit Kumar Srivastava",
          medicalSpecialty: ["InternalMedicine", "Diabetic", "PrimaryCare"],
          telephone: PHONE,
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "120" },
          address: {
            "@type": "PostalAddress",
            streetAddress: "Nahar Road, Daudpur",
            addressLocality: "Gorakhpur",
            addressRegion: "Uttar Pradesh",
            postalCode: "273001",
            addressCountry: "IN",
          },
          worksFor: { "@type": "MedicalClinic", name: "Narayan Clinic" },
        }),
      },
    ],
  }),
  component: Home,
});

/* ---------- helpers ---------- */

function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, suffix = "", duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"],
    ["Specializations", "#specializations"],
    ["Why Dr. Amit", "#why"],
    ["Reviews", "#reviews"],
    ["Visit", "#visit"],
  ] as const;
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-page">
        <div
          className={`flex items-center justify-between rounded-full px-4 md:px-6 py-2.5 transition-all ${
            scrolled ? "glass" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <span className="size-9 rounded-2xl bg-brand grid place-items-center text-white shadow-[var(--shadow-glow)]">
              <Stethoscope className="size-4.5" strokeWidth={2.4} />
            </span>
            <span className="font-display font-bold text-navy tracking-tight leading-tight text-[15px] md:text-base">
              Narayan Clinic
              <span className="block text-[10px] md:text-[11px] font-medium text-muted-foreground tracking-wide">
                Dr. (Major) Amit Kumar Srivastava
              </span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-navy/80">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="hover:text-primary transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE}`}
              className="hidden md:inline-flex btn-ghost !py-2 !px-4 text-sm"
            >
              <Phone className="size-4" /> Call
            </a>
            <a href="#book" className="hidden md:inline-flex btn-primary btn-primary-hover !py-2 !px-4 text-sm">
              Book Visit <ArrowRight className="size-4" />
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden size-10 grid place-items-center rounded-full glass"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-3xl p-4 space-y-1"
            >
              {links.map(([l, h]) => (
                <a
                  key={h}
                  href={h}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-navy font-medium hover:bg-muted"
                >
                  {l}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="btn-primary w-full mt-2"
              >
                Book Visit <ArrowRight className="size-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={ref} id="top" className="relative pt-28 md:pt-36 pb-16 md:pb-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="container-page grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-navy/80">
              <span className="size-1.5 rounded-full bg-emerald-500 pulse-ring" />
              Now accepting appointments · Gorakhpur
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display font-extrabold text-[40px] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[64px] tracking-tight">
              Dr. (Major) <br />
              <span className="text-gradient">Amit Kumar Srivastava</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              MD Medicine · Consultant Physician at{" "}
              <span className="text-navy font-semibold">Narayan Clinic</span>. Calm,
              evidence-based care for diabetes, hypertension and long-term family health —
              built on military discipline and 20+ years of bedside experience.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#book" className="btn-primary btn-primary-hover">
                <CalendarCheck className="size-4.5" /> Book Appointment
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                  "Hello Dr. Amit, I would like to book an appointment.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <MessageCircle className="size-4.5 text-emerald-600" /> WhatsApp Clinic
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9 grid grid-cols-3 gap-3 max-w-md">
              {[
                { k: "4.9★", v: "Google Rating" },
                { k: "120+", v: "Patient Reviews" },
                { k: "20+", v: "Years Practice" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-white ring-soft p-3.5">
                  <div className="font-display text-xl md:text-2xl font-bold text-navy">{s.k}</div>
                  <div className="text-[11px] md:text-xs text-muted-foreground mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: portrait */}
        <div className="relative">
          <motion.div
            style={{ y: yImg }}
            className="relative mx-auto w-full max-w-[480px] aspect-[4/5] rounded-[2.5rem] overflow-hidden ring-soft"
          >
            <div
              aria-hidden
              className="absolute -inset-8 -z-10 rounded-[3rem] blur-3xl opacity-60"
              style={{ background: "var(--gradient-brand)" }}
            />
            <img
              src={doctorImg}
              alt="Portrait of Dr. (Major) Amit Kumar Srivastava"
              width={1024}
              height={1280}
              fetchPriority="high"
              className="size-full object-cover"
            />
          </motion.div>

          {/* floating cards */}
          <motion.div
            style={{ y: yCard }}
            className="absolute -left-2 md:-left-8 top-10 glass rounded-2xl px-4 py-3 flex items-center gap-3 animate-float"
          >
            <span className="size-9 rounded-xl bg-amber-100 text-amber-600 grid place-items-center">
              <Star className="size-4 fill-amber-500 stroke-amber-500" />
            </span>
            <div>
              <div className="text-sm font-bold text-navy leading-none">4.9 / 5.0</div>
              <div className="text-[11px] text-muted-foreground mt-1">120+ Google reviews</div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: yCard }}
            className="absolute -right-2 md:-right-6 top-1/3 glass rounded-2xl px-4 py-3 flex items-center gap-3 animate-float"
            transition={{ delay: 0.2 }}
          >
            <span className="size-9 rounded-xl bg-blue-100 text-blue-600 grid place-items-center">
              <ShieldCheck className="size-4" />
            </span>
            <div>
              <div className="text-sm font-bold text-navy leading-none">Ex-Major</div>
              <div className="text-[11px] text-muted-foreground mt-1">Indian Army Medical</div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: yCard }}
            className="absolute left-4 md:left-2 -bottom-2 glass rounded-2xl px-4 py-3 flex items-center gap-3 animate-float"
          >
            <span className="size-9 rounded-xl bg-rose-100 text-rose-600 grid place-items-center">
              <HeartPulse className="size-4" />
            </span>
            <div>
              <div className="text-sm font-bold text-navy leading-none">Patient First</div>
              <div className="text-[11px] text-muted-foreground mt-1">Listens. Explains. Cares.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- trust strip ---------- */

function TrustStrip() {
  const items = [
    { k: 120, suf: "+", label: "Google Reviews", icon: Star },
    { k: 49, suf: "★", label: "Average Rating (4.9)", icon: Award, raw: "4.9" },
    { k: 20, suf: "+ yrs", label: "Clinical Experience", icon: Clock },
    { k: 100, suf: "%", label: "Patient-First Care", icon: Users },
  ];
  return (
    <section className="py-14 md:py-20 bg-surface border-y border-border">
      <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.06}>
            <div className="text-center md:text-left">
              <it.icon className="size-5 text-primary mb-3 mx-auto md:mx-0" />
              <div className="font-display text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
                {it.raw ? it.raw : <CountUp to={it.k} suffix={it.suf} />}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{it.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container-page grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden ring-soft max-w-[460px] mx-auto">
              <img
                src={doctorImg}
                alt="Dr. Amit Kumar Srivastava consulting"
                loading="lazy"
                width={1024}
                height={1280}
                className="size-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 md:right-8 glass rounded-3xl p-5 max-w-[240px]">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Philosophy</div>
              <p className="mt-2 text-sm font-medium text-navy leading-snug">
                "Listen first. Examine thoroughly. Treat with evidence. Care for the long term."
              </p>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              About the Physician
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-navy leading-tight">
              Two decades of medicine.
              <br />
              <span className="text-gradient">A lifetime of discipline.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              Dr. (Major) Amit Kumar Srivastava brings the precision of military medicine to
              everyday family healthcare. Trained as an MD in Internal Medicine and seasoned
              through years of service, he is known across Gorakhpur for unhurried consultations,
              clear explanations and genuinely listening to every patient.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                ["Military-trained discipline", "Calm, structured, dependable consultations."],
                ["MD Medicine", "Diagnosis-led, evidence-based treatment."],
                ["Patient listening", "Time given to every concern, every visit."],
                ["Long-term care", "Families followed across years, not visits."],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-navy">{t}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- specializations ---------- */

const SPECIALTIES = [
  { icon: Activity, t: "Diabetes Management", d: "Long-term control, lifestyle plans, complication screening." },
  { icon: HeartPulse, t: "Hypertension", d: "Diagnosis, monitoring and personalised BP control." },
  { icon: Stethoscope, t: "General Medicine", d: "First point of care for fever, infections and acute illness." },
  { icon: Microscope, t: "Internal Medicine", d: "Complex, multi-system conditions managed in one place." },
  { icon: ShieldCheck, t: "Preventive Care", d: "Annual checkups, screening and risk profiling." },
  { icon: Salad, t: "Lifestyle Disorders", d: "Obesity, cholesterol, fatty liver and metabolic syndrome." },
  { icon: ThermometerSun, t: "Thyroid Disorders", d: "Hypo/hyperthyroid diagnosis and lifelong management." },
  { icon: Pill, t: "Infectious Diseases", d: "Targeted treatment with rational antibiotic use." },
  { icon: Wind, t: "Respiratory Illness", d: "Asthma, COPD, allergic and seasonal conditions." },
  { icon: Award, t: "Health Checkups", d: "Comprehensive, age-appropriate executive checkups." },
];

function Specializations() {
  return (
    <section id="specializations" className="py-20 md:py-32 bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Areas of Practice
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-navy leading-tight">
              Comprehensive medicine, <span className="text-gradient">one trusted physician.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg">
              From a fever today to managing diabetes for life — care is continuous, consistent
              and personal.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
          {SPECIALTIES.map((s, i) => (
            <Reveal key={s.t} delay={(i % 5) * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative h-full rounded-2xl bg-white p-5 ring-soft overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 size-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "var(--gradient-brand)" }}
                />
                <span className="relative inline-grid size-11 place-items-center rounded-xl bg-brand text-white shadow-[var(--shadow-glow)]">
                  <s.icon className="size-5" />
                </span>
                <h3 className="relative mt-4 font-display text-[17px] font-bold text-navy">
                  {s.t}
                </h3>
                <p className="relative mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {s.d}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- why ---------- */

function Why() {
  const points = [
    ["Patient Listening", "Unhurried consultations where you are heard, fully."],
    ["Thorough Examination", "Hands-on clinical exam, never rushed."],
    ["Accurate Diagnosis", "Investigations only when they change the plan."],
    ["Evidence-Based Treatment", "Guideline-led, rational prescriptions."],
    ["Long-Term Care", "Continuity for chronic conditions, year after year."],
    ["Personalized Attention", "Plans tailored to your life, work and family."],
    ["Professional Ethics", "Honest advice, transparent costs, no over-treatment."],
    ["Family Trust", "Three generations of Gorakhpur families under one roof."],
  ];
  return (
    <section id="why" className="py-20 md:py-32">
      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
          <Reveal>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Why Dr. Amit
              </div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-navy leading-tight">
                The standard of care <span className="text-gradient">families deserve.</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Eight commitments that define every consultation at Narayan Clinic.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {points.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.04}>
                <div className="rounded-2xl bg-white p-5 ring-soft h-full">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                      <CheckCircle2 className="size-4.5" />
                    </span>
                    <h3 className="font-display font-bold text-navy">{t}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */

const REVIEWS = [
  {
    n: "Anjali R.",
    t: "He listens with patience and explains every detail. Felt genuinely cared for.",
  },
  { n: "Rohit S.", t: "My father's diabetes is finally under control. The plan is clear and works." },
  { n: "Megha P.", t: "Professional, friendly and never rushes the visit. Truly trusted physician." },
  { n: "Imran K.", t: "Accurate diagnosis on the first visit after months of confusion elsewhere." },
  { n: "Sunita D.", t: "The clinic is calm and clean. Dr. Amit makes you feel completely safe." },
  { n: "Vikram T.", t: "Excellent service, ethical advice, no unnecessary tests. Highly recommended." },
];

function Testimonials() {
  return (
    <section id="reviews" className="py-20 md:py-32 bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Patient Voices
              </div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-navy leading-tight">
                4.9★ on Google. <span className="text-gradient">Loved by Gorakhpur.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 glass rounded-full px-4 py-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-amber-500 stroke-amber-500" />
              ))}
              <span className="text-sm font-semibold text-navy">4.9 / 5</span>
              <span className="text-sm text-muted-foreground">· 120+ reviews</span>
            </div>
          </div>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.n} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-2xl bg-white p-6 ring-soft flex flex-col">
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-4 fill-amber-500 stroke-amber-500" />
                  ))}
                </div>
                <p className="mt-4 text-navy/90 leading-relaxed">"{r.t}"</p>
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                  <span className="size-9 rounded-full bg-brand text-white grid place-items-center text-sm font-bold">
                    {r.n[0]}
                  </span>
                  <div>
                    <div className="font-semibold text-navy text-sm">{r.n}</div>
                    <div className="text-xs text-muted-foreground">Verified Google review</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- booking ---------- */

function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", age: "", concern: "", date: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `*New Appointment Request — Narayan Clinic*%0A%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A` +
      `*Age:* ${form.age}%0A` +
      `*Health Concern:* ${form.concern}%0A` +
      `*Preferred Date:* ${form.date}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank", "noopener,noreferrer");
  };
  const input =
    "w-full rounded-2xl bg-white border border-border px-4 py-3.5 text-navy placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition";
  return (
    <section id="book" className="py-20 md:py-32">
      <div className="container-page">
        <div className="relative rounded-[2rem] overflow-hidden ring-soft">
          <div aria-hidden className="absolute inset-0 bg-brand opacity-[0.97]" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
          <div className="relative grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 p-6 md:p-12 lg:p-16">
            <div className="text-white">
              <Reveal>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Book a Visit
                </div>
                <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-tight">
                  Reserve your consultation in under a minute.
                </h2>
                <p className="mt-5 text-white/85 max-w-md leading-relaxed">
                  Share a few details and we'll confirm your slot on WhatsApp. For urgent
                  concerns, call the clinic directly.
                </p>
                <div className="mt-8 space-y-3">
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-3 text-white/95 hover:text-white"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-white/15">
                      <Phone className="size-4.5" />
                    </span>
                    <span className="font-medium">{PHONE_DISPLAY}</span>
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/95 hover:text-white"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-white/15">
                      <MessageCircle className="size-4.5" />
                    </span>
                    <span className="font-medium">Chat on WhatsApp</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-[var(--shadow-card)]"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-navy">Full Name</label>
                    <input
                      required
                      className={`mt-1.5 ${input}`}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-navy">Phone</label>
                    <input
                      required
                      type="tel"
                      className={`mt-1.5 ${input}`}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="10-digit mobile"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-navy">Age</label>
                    <input
                      type="number"
                      className={`mt-1.5 ${input}`}
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      placeholder="e.g. 42"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-navy">Preferred Date</label>
                    <input
                      type="date"
                      className={`mt-1.5 ${input}`}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-navy">Health Concern</label>
                    <textarea
                      required
                      rows={3}
                      className={`mt-1.5 ${input} resize-none`}
                      value={form.concern}
                      onChange={(e) => setForm({ ...form, concern: e.target.value })}
                      placeholder="Briefly describe your concern"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary btn-primary-hover w-full mt-6">
                  Send via WhatsApp <ArrowRight className="size-4.5" />
                </button>
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  Your details are sent directly to the clinic. No data is stored on this site.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */

const FAQS = [
  {
    q: "What are the clinic timings?",
    a: "Narayan Clinic is open Monday to Saturday, typically morning and evening sessions. Please call +91 95198 93270 to confirm same-day availability.",
  },
  {
    q: "Do I need to book an appointment?",
    a: "Walk-ins are welcome, but booking ahead via WhatsApp or phone helps reduce waiting time, especially in the evening.",
  },
  {
    q: "Which conditions does Dr. Amit specialize in?",
    a: "Internal medicine with a focus on diabetes, hypertension, thyroid, lifestyle disorders, infections, respiratory illness and preventive health checkups.",
  },
  {
    q: "Do you offer follow-up and long-term care?",
    a: "Yes. Most patients with chronic conditions are reviewed on a planned schedule with lab work, medication titration and lifestyle counselling.",
  },
  {
    q: "Are reports and prescriptions shared digitally?",
    a: "Prescriptions are provided in print and can be shared on WhatsApp on request for your records.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="container-page grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
        <Reveal>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              FAQ
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-navy leading-tight">
              Answers to <span className="text-gradient">common questions.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Don't see your question? WhatsApp us — we usually reply within an hour.
            </p>
          </div>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="rounded-2xl bg-white ring-soft overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 text-left p-5 md:p-6"
                  >
                    <span className="font-display font-bold text-navy text-[17px]">{f.q}</span>
                    <ChevronDown
                      className={`size-5 text-primary shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 md:px-6 pb-6 text-muted-foreground leading-relaxed">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- location ---------- */

function Location() {
  return (
    <section id="visit" className="py-20 md:py-32">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-stretch">
        <Reveal>
          <div className="h-full flex flex-col">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Visit Narayan Clinic
            </div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-navy leading-tight">
              In the heart of <span className="text-gradient">Daudpur, Gorakhpur.</span>
            </h2>
            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary shrink-0">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <div className="font-semibold text-navy">Address</div>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{CLINIC_ADDRESS}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary shrink-0">
                  <Phone className="size-5" />
                </span>
                <div>
                  <div className="font-semibold text-navy">Call the clinic</div>
                  <a href={`tel:${PHONE}`} className="text-muted-foreground hover:text-primary">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary shrink-0">
                  <Clock className="size-5" />
                </span>
                <div>
                  <div className="font-semibold text-navy">Timings</div>
                  <p className="text-muted-foreground mt-1">
                    Mon – Sat · Morning & Evening sessions
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary-hover">
                <NavIcon className="size-4.5" /> Get Directions
              </a>
              <a href={`tel:${PHONE}`} className="btn-ghost">
                <Phone className="size-4.5" /> Call Now
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <MessageCircle className="size-4.5 text-emerald-600" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-[420px] lg:h-full min-h-[420px] rounded-[2rem] overflow-hidden ring-soft">
            <iframe
              title="Narayan Clinic location"
              src="https://www.google.com/maps?q=Narayan+Clinic+Dr+Amit+Kumar+Srivastava+Gorakhpur&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="bg-navy text-white/85">
      <div className="container-page py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="size-9 rounded-2xl bg-brand grid place-items-center text-white">
              <Stethoscope className="size-4.5" />
            </span>
            <div className="font-display font-bold text-white">Narayan Clinic</div>
          </div>
          <p className="mt-4 text-sm text-white/65 max-w-xs leading-relaxed">
            Dr. (Major) Amit Kumar Srivastava, MD Medicine — trusted physician for Gorakhpur
            families.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-display font-semibold text-white mb-3">Contact</div>
          <p className="text-white/65">{CLINIC_ADDRESS}</p>
          <a href={`tel:${PHONE}`} className="block mt-2 hover:text-white">
            {PHONE_DISPLAY}
          </a>
        </div>
        <div className="text-sm">
          <div className="font-display font-semibold text-white mb-3">Explore</div>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#specializations" className="hover:text-white">Specializations</a></li>
            <li><a href="#reviews" className="hover:text-white">Reviews</a></li>
            <li><a href="#book" className="hover:text-white">Book Appointment</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-wrap justify-between gap-3 text-xs text-white/55">
          <div>© {new Date().getFullYear()} Narayan Clinic. All rights reserved.</div>
          <div>For medical emergencies, please call your nearest hospital.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- sticky mobile CTA ---------- */

function MobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-3 inset-x-3 z-40">
      <div className="glass rounded-full p-1.5 flex items-center gap-1.5 shadow-[var(--shadow-card)]">
        <a
          href={`tel:${PHONE}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-white text-navy font-semibold text-sm"
        >
          <Phone className="size-4" /> Call
        </a>
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-500 text-white font-semibold text-sm"
        >
          <MessageCircle className="size-4" /> WhatsApp
        </a>
        <a
          href="#book"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-brand text-white font-semibold text-sm"
        >
          <CalendarCheck className="size-4" /> Book
        </a>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

function Home() {
  return (
    <main className="min-h-dvh bg-background">
      <Nav />
      <Hero />
      <TrustStrip />
      <About />
      <Specializations />
      <Why />
      <Testimonials />
      <Booking />
      <FAQ />
      <Location />
      <Footer />
      <MobileCTA />
    </main>
  );
}
