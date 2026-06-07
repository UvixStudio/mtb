import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CHECKPOINTS } from "@/data/content";
import Hero from "@/components/Hero";

const FRAMES = 241;
const framePath = (i) => `/ride/ride_${String(i).padStart(4, "0")}.webp`;

// Single overlay block that fades/slides based on global section progress.
function Stage({ progress, range, children, className }) {
    const [s, mid1, mid2, e] = range;
    const opacity = useTransform(progress, [s, mid1, mid2, e], [0, 1, 1, 0]);
    const y = useTransform(progress, [s, e], [40, -40]);
    return (
        <motion.div style={{ opacity, y }} className={className}>
            {children}
        </motion.div>
    );
}

function CheckpointCard({ cp, onJump }) {
    return (
        <div className="w-full max-w-md glass-strong rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-3">
                <span
                    className="font-display text-3xl font-extrabold leading-none"
                    style={{ color: cp.color }}
                >
                    {cp.n}
                </span>
                <span
                    className="h-px flex-1"
                    style={{ background: `linear-gradient(90deg, ${cp.color}, transparent)` }}
                />
            </div>
            <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                {cp.label}
            </h3>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-white/70 font-light">
                {cp.teaser}
            </p>
            <button
                data-testid={`ride-cp-${cp.anchor}`}
                onClick={() => onJump(cp.anchor)}
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/90 transition-colors hover:text-white"
            >
                <span>{cp.cta}</span>
                <span
                    className="grid h-7 w-7 place-items-center rounded-full transition-transform group-hover:translate-x-1"
                    style={{ background: cp.color, color: "#0B121A" }}
                >
                    <ChevronRight size={15} strokeWidth={3} />
                </span>
            </button>
        </div>
    );
}

export default function CinematicRide({ onJump }) {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const currentFrame = useRef(0);
    const [ready, setReady] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.16], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.16], [0, -40]);

    const draw = useCallback((idx) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[idx];
        if (!canvas || !img || !img.complete || !img.naturalWidth) return;
        const ctx = canvas.getContext("2d");
        const cw = canvas.width;
        const ch = canvas.height;
        const ir = img.naturalWidth / img.naturalHeight;
        const cr = cw / ch;
        let dw, dh, dx, dy;
        if (cr > ir) {
            dw = cw;
            dh = cw / ir;
            dx = 0;
            dy = (ch - dh) / 2;
        } else {
            dh = ch;
            dw = ch * ir;
            dx = (cw - dw) / 2;
            dy = 0;
        }
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    }, []);

    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        draw(currentFrame.current);
    }, [draw]);

    // Preload frames
    useEffect(() => {
        let loaded = 0;
        let cancelled = false;
        for (let i = 0; i < FRAMES; i++) {
            const img = new Image();
            img.src = framePath(i + 1);
            img.onload = () => {
                if (cancelled) return;
                loaded++;
                if (i === 0) draw(0);
                if (loaded >= 12 && !ready) setReady(true);
                if (loaded === FRAMES) setReady(true);
            };
            imagesRef.current[i] = img;
        }
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [resize]);

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        const idx = Math.min(FRAMES - 1, Math.max(0, Math.round(p * (FRAMES - 1))));
        if (idx !== currentFrame.current) {
            currentFrame.current = idx;
            requestAnimationFrame(() => draw(idx));
        }
    });

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ height: "560vh" }}
            data-testid="cinematic-ride"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                    style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
                />
                {/* Legibility gradients */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/40" />

                {!ready && (
                    <div className="absolute inset-0 grid place-items-center bg-ink">
                        <div className="flex flex-col items-center gap-4">
                            <div
                                data-spin
                                className="h-10 w-10 rounded-full border-2 border-white/15 border-t-brand"
                                style={{ animation: "pedal-spin 0.9s linear infinite" }}
                            />
                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                                Loading the trail…
                            </p>
                        </div>
                    </div>
                )}

                {/* HERO overlay */}
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="absolute inset-0"
                >
                    <Hero onJump={onJump} />
                </motion.div>

                {/* Checkpoint overlays — right side on desktop, centered on mobile */}
                {CHECKPOINTS.map((cp, i) => {
                    const base = 0.22 + i * 0.185;
                    const range = [base - 0.05, base, base + 0.08, base + 0.135];
                    return (
                        <Stage
                            key={cp.n}
                            progress={scrollYProgress}
                            range={range}
                            className="absolute inset-x-0 bottom-[12vh] flex justify-center px-5 sm:bottom-auto sm:top-1/2 sm:right-[6vw] sm:left-auto sm:-translate-y-1/2 sm:justify-end sm:px-0"
                        >
                            <CheckpointCard cp={cp} onJump={onJump} />
                        </Stage>
                    );
                })}
            </div>
        </section>
    );
}
