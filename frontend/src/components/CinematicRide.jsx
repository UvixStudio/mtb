import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Hero from "@/components/Hero";

const FRAMES = 241;
const framePath = (i) => `/ride/ride_${String(i).padStart(4, "0")}.webp`;

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

    const heroOpacity = useTransform(scrollYProgress, [0, 0.55, 0.72], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.72], [0, -50]);

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
            style={{ height: "320vh" }}
            data-testid="cinematic-ride"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                    style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease" }}
                />
                {/* Legibility scrims — heavy on the left where text lives */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />

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

                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="absolute inset-0"
                >
                    <Hero onJump={onJump} />
                </motion.div>
            </div>
        </section>
    );
}
