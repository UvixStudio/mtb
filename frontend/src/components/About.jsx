import { Compass, Palette, Sparkles, Boxes, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { ABOUT, CAPABILITIES } from "@/data/content";
import { Reveal, SectionLabel, CountUp } from "@/components/Primitives";

const ICONS = { Compass, Palette, Sparkles, Boxes, Wrench };

export default function About() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-ink py-24 sm:py-32"
            data-testid="about-section"
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
                <Reveal>
                    <SectionLabel n="01" label="About Me" color="var(--cp-about)" />
                </Reveal>

                <div className="mt-12 grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <Reveal delay={0.05}>
                            <p className="font-display text-xl font-medium leading-snug text-white sm:text-2xl">
                                {ABOUT.lead}
                            </p>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65">
                                {ABOUT.body}
                            </p>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <blockquote className="mt-8 border-l-2 border-brand pl-5">
                                <p className="font-display text-lg font-medium italic text-brand sm:text-xl">
                                    “{ABOUT.quote}”
                                </p>
                            </blockquote>
                        </Reveal>
                    </div>

                    {/* Stats */}
                    <div className="lg:col-span-5">
                        <Reveal delay={0.1}>
                            <div className="grid grid-cols-2 gap-4">
                                {ABOUT.stats.map((s) => (
                                    <div
                                        key={s.label}
                                        className="glass rounded-2xl p-5"
                                    >
                                        <div className="font-display text-4xl font-black text-white">
                                            <CountUp value={s.value} suffix={s.suffix} />
                                        </div>
                                        <p className="mt-1 text-xs uppercase tracking-wide text-white/55">
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Capability nodes */}
                <div className="mt-16">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                            Capabilities along the trail
                        </p>
                    </Reveal>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {CAPABILITIES.map((c, i) => {
                            const Icon = ICONS[c.icon];
                            return (
                                <motion.div
                                    key={c.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.07,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    whileHover={{ y: -6 }}
                                    className="group relative rounded-2xl border border-white/10 bg-surface/60 p-5 transition-colors hover:border-white/20"
                                    data-testid={`capability-${i}`}
                                >
                                    <span
                                        className="grid h-11 w-11 place-items-center rounded-xl transition-all"
                                        style={{
                                            color: c.color,
                                            background: "rgba(255,255,255,0.04)",
                                            boxShadow: `inset 0 0 0 1px ${c.color}33`,
                                        }}
                                    >
                                        <Icon size={20} strokeWidth={2} />
                                    </span>
                                    <h3 className="mt-4 font-display text-sm font-bold uppercase leading-tight tracking-tight text-white">
                                        {c.title}
                                    </h3>
                                    <p className="mt-2 text-xs leading-relaxed text-white/55">
                                        {c.desc}
                                    </p>
                                    <span
                                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                                        style={{ background: c.color }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
