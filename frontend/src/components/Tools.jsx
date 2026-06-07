import Marquee from "react-fast-marquee";
import { TOOLS } from "@/data/content";
import { Reveal, SectionLabel } from "@/components/Primitives";

function Chip({ label }) {
    return (
        <span className="mx-2 inline-flex items-center rounded-full border border-white/10 bg-surface/70 px-5 py-2.5 font-display text-sm font-medium text-white/80 transition-colors hover:border-brand/60 hover:text-white">
            {label}
        </span>
    );
}

export default function Tools() {
    return (
        <section
            id="tools"
            className="relative overflow-hidden bg-ink-2 py-24 sm:py-32"
            data-testid="tools-section"
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
                <Reveal>
                    <SectionLabel n="03" label="AI & Innovation" color="var(--cp-ai)" />
                </Reveal>
                <Reveal delay={0.08}>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60">
                        “Every creative process needs its own recipe.” The craft lies in
                        designing the process itself — curating the perfect mix of tools,
                        timing and logic.
                    </p>
                </Reveal>
            </div>

            <div className="mt-14 space-y-5 edge-fade">
                <Marquee speed={36} gradient={false} pauseOnHover>
                    {TOOLS.row1.map((t) => (
                        <Chip key={t} label={t} />
                    ))}
                </Marquee>
                <Marquee speed={36} direction="right" gradient={false} pauseOnHover>
                    {TOOLS.row2.map((t) => (
                        <Chip key={t} label={t} />
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
