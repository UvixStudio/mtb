import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mountain } from "lucide-react";
import { WORKS } from "@/data/content";
import { Reveal, TrailHeading } from "@/components/Primitives";
import TrailBand from "@/components/TrailBand";

function Placeholder({ title }) {
    return (
        <div
            className="absolute inset-0 grid place-items-center"
            style={{
                background:
                    "linear-gradient(160deg, #15151a, #0b0b0d)",
            }}
        >
            <div className="flex flex-col items-center gap-2 opacity-55">
                <Mountain size={30} className="text-white/60" strokeWidth={1.5} />
                <span className="px-3 text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {title}
                </span>
            </div>
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />
        </div>
    );
}

function WorkMarker({ w, i }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-xl border border-white/10 bg-[#0c0c0e]/85 p-2.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25"
            data-testid={`work-marker-${i}`}
        >
            {/* pin */}
            <span
                className="absolute -top-2 left-5 z-10 h-3 w-3 rounded-full ring-4 ring-black/40"
                style={{ background: w.color, boxShadow: `0 0 12px ${w.color}` }}
            />
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                {w.img ? (
                    <img
                        src={w.img}
                        alt={w.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <Placeholder title={w.title} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={15} />
                </span>
            </div>

            <div className="px-2.5 pb-2 pt-3">
                <span
                    className="text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: w.color }}
                >
                    {w.role}
                </span>
                <h3 className="mt-1 font-display text-base font-bold leading-tight text-white">
                    {w.title}
                </h3>
                <p className="mt-1.5 max-h-0 overflow-hidden text-[13px] leading-relaxed text-white/60 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {w.desc}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {w.tags.map((t) => (
                        <span
                            key={t}
                            className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium text-white/70"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.article>
    );
}

export default function SelectedWorks() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const yA = useTransform(scrollYProgress, [0, 1], [70, -70]);
    const yB = useTransform(scrollYProgress, [0, 1], [-30, 50]);
    const yC = useTransform(scrollYProgress, [0, 1], [40, -40]);

    const cols = [[], [], []];
    WORKS.forEach((w, i) => cols[i % 3].push({ w, i }));
    const ys = [yA, yB, yC];

    return (
        <TrailBand
            id="works"
            frame={200}
            scrim="bottom"
            tint="rgba(10,10,10,0.55)"
            minH="min-h-screen"
        >
            <div ref={ref} className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36">
                <Reveal>
                    <TrailHeading
                        n="04"
                        label="Selected Works"
                        color="var(--cp-projects)"
                    />
                </Reveal>
                <Reveal delay={0.08}>
                    <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/60">
                        Ride past the gallery on the mountain — a selection of projects
                        where creativity, strategy and cutting-edge technology meet.
                    </p>
                </Reveal>

                {/* Parallax trail of project markers */}
                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {cols.map((col, ci) => (
                        <motion.div
                            key={ci}
                            style={{ y: ys[ci] }}
                            className="flex flex-col gap-5"
                        >
                            {col.map(({ w, i }) => (
                                <WorkMarker key={w.title} w={w} i={i} />
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </TrailBand>
    );
}
