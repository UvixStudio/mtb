import { motion } from "framer-motion";

// Animated white MTB crank + pedal doing a first pedal-stroke, with "Let's Ride!" label.
export default function LetsRide({ onClick }) {
    return (
        <button
            data-testid="lets-ride-button"
            onClick={onClick}
            className="group flex flex-col items-center gap-2 outline-none"
            aria-label="Let's ride — start the journey"
        >
            <motion.div
                className="relative grid h-16 w-16 place-items-center"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg
                    viewBox="0 0 100 100"
                    className="h-16 w-16 drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Chainring */}
                    <motion.g
                        data-spin
                        style={{ transformOrigin: "50px 50px" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                    >
                        <circle cx="50" cy="50" r="15" />
                        <circle cx="50" cy="50" r="4" fill="#fff" stroke="none" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
                            const r = (a * Math.PI) / 180;
                            return (
                                <line
                                    key={a}
                                    x1={50 + Math.cos(r) * 15}
                                    y1={50 + Math.sin(r) * 15}
                                    x2={50 + Math.cos(r) * 19}
                                    y2={50 + Math.sin(r) * 19}
                                />
                            );
                        })}
                        {/* Crank arm + pedal */}
                        <line x1="50" y1="50" x2="78" y2="64" />
                        <rect
                            x="74"
                            y="58"
                            width="14"
                            height="8"
                            rx="2"
                            transform="rotate(26 81 62)"
                            fill="rgba(255,255,255,0.18)"
                        />
                    </motion.g>
                </svg>
            </motion.div>
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-brand">
                Let&apos;s Ride!
            </span>
            <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#facc15"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <path d="M6 9l6 6 6-6" />
            </motion.svg>
        </button>
    );
}
