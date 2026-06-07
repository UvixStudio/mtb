import { motion } from "framer-motion";
import { ArrowUpRight, Mountain } from "lucide-react";
import { WORKS } from "@/data/content";
import { Reveal, SectionLabel } from "@/components/Primitives";

const SPAN = {
    hero: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    tall: "lg:row-span-2",
    wide: "sm:col-span-2",
    std: "",
};

function Placeholder({ color, title }) {
    return (
        <div
            className="absolute inset-0 grid place-items-center"
            style={{
                background: `radial-gradient(120% 120% at 30% 10%, ${color}22, transparent 55%), linear-gradient(160deg, #16222e, #0c141d)`,
            }}
        >
            <div className="flex flex-col items-center gap-2 opacity-60">
                <Mountain size={34} style={{ color }} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                    {title}
                </span>
            </div>
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
                    backgroundSize: "26px 26px",
                }}
            />
        </div>
    );
}

function WorkCard({ w, i }) {
    const big = w.size === "hero";
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative min-h-[250px] overflow-hidden rounded-2xl border border-white/10 bg-surface ${SPAN[w.size]}`}
            data-testid={`work-${i}`}
        >
            {/* Image / placeholder */}
            <div className="absolute inset-0 overflow-hidden">
                {w.img ? (
                    <img
                        src={w.img}
                        alt={w.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <Placeholder color={w.color} title={w.title} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />
            </div>

            {/* Content */}
            <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                <span
                    className="text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: w.color }}
                >
                    {w.role}
                </span>
                <h3
                    className={`mt-1 font-display font-bold leading-tight text-white ${
                        big ? "text-2xl sm:text-3xl" : "text-lg"
                    }`}
                >
                    {w.title}
                </h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {w.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {w.tags.map((t, ti) => (
                        <motion.span
                            key={t}
                            initial={{ opacity: 0.55 }}
                            className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0"
                            style={{ transitionDelay: `${ti * 40}ms` }}
                        >
                            {t}
                        </motion.span>
                    ))}
                </div>
            </div>

            <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                <ArrowUpRight size={17} />
            </span>
        </motion.article>
    );
}

export default function SelectedWorks() {
    return (
        <section
            id="works"
            className="relative bg-ink py-24 sm:py-32"
            data-testid="works-section"
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
                <Reveal>
                    <SectionLabel n="04" label="Selected Works" color="var(--cp-projects)" />
                </Reveal>
                <Reveal delay={0.08}>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60">
                        A selection of projects that reflect creativity, strategy and
                        cutting-edge technology in action.
                    </p>
                </Reveal>

                <div className="mt-12 grid auto-rows-[250px] grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {WORKS.map((w, i) => (
                        <WorkCard key={w.title} w={w} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
