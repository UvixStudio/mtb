import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROFILE } from "@/data/content";

export default function RotatingRoles() {
    const roles = PROFILE.roles;
    const [i, setI] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setI((p) => (p + 1) % roles.length), 2200);
        return () => clearInterval(t);
    }, [roles.length]);

    return (
        <span className="relative inline-flex h-[1.05em] overflow-hidden align-bottom">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    className="block whitespace-nowrap text-gradient-brand"
                >
                    {roles[i]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
