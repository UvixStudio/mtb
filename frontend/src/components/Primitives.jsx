import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, className }) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function SectionLabel({ n, label, color = "var(--brand)" }) {
    return (
        <div className="flex items-center gap-4">
            <span
                className="font-display text-4xl font-black leading-none sm:text-5xl"
                style={{ color }}
            >
                {n}
            </span>
            <div>
                <span
                    className="block h-0.5 w-12"
                    style={{ background: color }}
                />
                <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                    {label}
                </h2>
            </div>
        </div>
    );
}

export function CountUp({ value, suffix = "", duration = 1.6 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const mv = useMotionValue(0);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(mv, value, {
            duration,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return controls.stop;
    }, [inView, value, duration, mv]);

    return (
        <span ref={ref}>
            {display}
            {suffix}
        </span>
    );
}
