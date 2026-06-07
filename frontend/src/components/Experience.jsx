import { motion } from "framer-motion";
import { EXPERIENCE } from "@/data/content";
import { Reveal, SectionLabel } from "@/components/Primitives";

export default function Experience() {
    return (
        <section
            id="experience"
            className="relative bg-ink-2 py-24 sm:py-32"
            data-testid="experience-section"
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
                <Reveal>
                    <SectionLabel
                        n="02"
                        label="Creative Director"
                        color="var(--cp-director)"
                    />
                </Reveal>
                <Reveal delay={0.08}>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60">
                        Milestone stations along the trail — leading creative teams and
                        production pipelines for global brands.
                    </p>
                </Reveal>

                <div className="relative mt-14">
                    {/* Vertical trail line */}
                    <span className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/12 sm:left-1/2 sm:-translate-x-1/2" />

                    <div className="space-y-10">
                        {EXPERIENCE.map((e, i) => (
                            <motion.div
                                key={e.company}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-70px" }}
                                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                className="relative pl-10 sm:pl-0"
                                data-testid={`experience-${i}`}
                            >
                                {/* Node dot */}
                                <span
                                    className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full sm:left-1/2 sm:-translate-x-1/2"
                                    style={{ background: e.color, boxShadow: `0 0 16px ${e.color}` }}
                                />
                                <div
                                    className={`sm:w-[46%] ${
                                        i % 2 === 0 ? "sm:mr-auto sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10"
                                    }`}
                                >
                                    <div className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
                                        <span
                                            className="text-xs font-bold uppercase tracking-[0.18em]"
                                            style={{ color: e.color }}
                                        >
                                            {e.period}
                                        </span>
                                        <h3 className="mt-2 font-display text-lg font-bold text-white">
                                            {e.company}
                                        </h3>
                                        <p className="mt-0.5 text-sm font-medium text-white/70">
                                            {e.role}
                                        </p>
                                        <p className="mt-3 text-sm leading-relaxed text-white/55">
                                            {e.copy}
                                        </p>
                                        <div
                                            className={`mt-4 flex flex-wrap gap-2 ${
                                                i % 2 === 0 ? "sm:justify-end" : ""
                                            }`}
                                        >
                                            {e.tags.map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded-full border border-white/12 px-2.5 py-1 text-[11px] font-medium text-white/65"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
