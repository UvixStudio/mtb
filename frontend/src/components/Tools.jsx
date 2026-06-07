import Marquee from "react-fast-marquee";
import { Brain, Sparkles, Box } from "lucide-react";
import { TOOLS } from "@/data/content";
import { Reveal, TrailHeading } from "@/components/Primitives";
import TrailBand from "@/components/TrailBand";

function Chip({ label }) {
    return (
        <span className="mx-2 inline-flex items-center rounded-full border border-cp-ai/25 bg-black/50 px-5 py-2.5 font-display text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:border-cp-ai/70 hover:text-white">
            {label}
        </span>
    );
}

const NODES = [
    { icon: Brain, label: "Generative AI" },
    { icon: Sparkles, label: "Hybrid Pipelines" },
    { icon: Box, label: "Realtime 3D" },
];

export default function Tools() {
    return (
        <TrailBand
            id="tools"
            frame={160}
            scrim="left"
            tint="rgba(6,12,16,0.66)"
            minH="min-h-screen"
        >
            {/* cyan ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cp-ai/10 blur-[130px]" />

            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-28 sm:px-8">
                <Reveal>
                    <TrailHeading n="03" label="AI & Innovation" color="var(--cp-ai)" />
                </Reveal>
                <Reveal delay={0.08}>
                    <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/60">
                        “Every creative process needs its own recipe.” The craft lies in
                        designing the process itself — curating the perfect mix of tools,
                        timing and logic into original, production-ready results.
                    </p>
                </Reveal>

                {/* glowing crystal nodes */}
                <Reveal delay={0.12}>
                    <div className="mt-9 flex flex-wrap gap-4">
                        {NODES.map((n) => {
                            const Icon = n.icon;
                            return (
                                <div
                                    key={n.label}
                                    className="flex items-center gap-3 rounded-xl border border-cp-ai/25 bg-black/40 px-4 py-3 backdrop-blur-md"
                                >
                                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-cp-ai/10 text-cp-ai shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                                        <Icon size={18} strokeWidth={2} />
                                    </span>
                                    <span className="font-display text-sm font-bold uppercase tracking-tight text-white">
                                        {n.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>
            </div>

            <div className="relative -mt-6 space-y-4 pb-24 edge-fade">
                <Marquee speed={34} gradient={false} pauseOnHover>
                    {TOOLS.row1.map((t) => (
                        <Chip key={t} label={t} />
                    ))}
                </Marquee>
                <Marquee speed={34} direction="right" gradient={false} pauseOnHover>
                    {TOOLS.row2.map((t) => (
                        <Chip key={t} label={t} />
                    ))}
                </Marquee>
            </div>
        </TrailBand>
    );
}
