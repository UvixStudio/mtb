import { Compass, Palette, Sparkles, Boxes, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { ABOUT, CAPABILITIES } from "@/data/content";
import { Reveal, TrailHeading, CountUp } from "@/components/Primitives";
import TrailBand from "@/components/TrailBand";

const ICONS = { Compass, Palette, Sparkles, Boxes, Wrench };
const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

function HexBadge({ cap, i }) {
    const Icon = ICONS[cap.icon];
    return (
        <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative w-[112px] md:w-[128px] ${
                i % 2 === 1 ? "md:translate-y-8" : ""
            }`}
            data-testid={`about-capability-hexagon-${i}`}
        >
            <div className="relative aspect-[0.88] w-full transition-transform duration-300 group-hover:-translate-y-2">
                {/* hex border layer */}
                <div
                    className="absolute inset-0 bg-white/15 transition-colors duration-300 group-hover:bg-brand"
                    style={{ clipPath: HEX }}
                />
                {/* hex inner */}
                <div
                    className="absolute inset-[2px] flex flex-col items-center justify-center gap-2 bg-[#0b0b0b]/90 backdrop-blur-md transition-colors duration-300 group-hover:bg-[#141414]/90"
                    style={{ clipPath: HEX }}
                >
                    <Icon
                        size={26}
                        strokeWidth={2}
                        className="text-white transition-colors duration-300 group-hover:text-brand"
                    />
                    <span className="px-2 text-center font-display text-[10px] font-bold uppercase leading-tight tracking-tight text-white">
                        {cap.title.split("·")[0]}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default function About() {
    return (
        <TrailBand id="about" frame={20} scrim="left" tint="rgba(10,10,10,0.5)">
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-28 sm:px-8">
                <Reveal>
                    <TrailHeading n="01" label="About Me" color="var(--cp-about)" />
                </Reveal>

                <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
                    {/* Left: bio + stats */}
                    <div className="lg:col-span-5">
                        <Reveal delay={0.05}>
                            <p className="max-w-md font-display text-lg font-medium leading-snug text-white sm:text-xl">
                                {ABOUT.lead}
                            </p>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
                                {ABOUT.body}
                            </p>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <blockquote className="mt-6 border-l-2 border-brand pl-4">
                                <p className="font-display text-base font-medium italic text-brand sm:text-lg">
                                    “{ABOUT.quote}”
                                </p>
                            </blockquote>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <div className="mt-7 grid max-w-md grid-cols-4 gap-3">
                                {ABOUT.stats.map((s) => (
                                    <div key={s.label}>
                                        <div className="font-display text-2xl font-black text-white sm:text-3xl">
                                            <CountUp value={s.value} suffix={s.suffix} />
                                        </div>
                                        <p className="mt-1 text-[10px] uppercase leading-tight tracking-wide text-white/50">
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: hexagon skill trail */}
                    <div className="lg:col-span-7">
                        <Reveal>
                            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white/45">
                                Capabilities along the trail
                            </p>
                        </Reveal>
                        <div className="relative">
                            {/* dashed connecting trail behind badges (desktop) */}
                            <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 md:block">
                                <svg width="100%" height="2">
                                    <line
                                        x1="0"
                                        y1="1"
                                        x2="100%"
                                        y2="1"
                                        stroke="var(--brand)"
                                        strokeWidth="1.5"
                                        strokeDasharray="2 7"
                                        opacity="0.4"
                                    />
                                </svg>
                            </div>
                            <div className="relative flex flex-wrap justify-center gap-4 md:flex-nowrap md:justify-between">
                                {CAPABILITIES.map((cap, i) => (
                                    <HexBadge key={cap.title} cap={cap} i={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TrailBand>
    );
}
