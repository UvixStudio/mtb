import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Copy, Check, Mail, Linkedin, MapPin } from "lucide-react";
import { PROFILE } from "@/data/content";

export default function ContactModal() {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    useEffect(() => {
        const handler = () => setOpen(true);
        window.addEventListener("open-contact", handler);
        return () => window.removeEventListener("open-contact", handler);
    }, []);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = open ? "hidden" : "";
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(PROFILE.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (err) {
            /* clipboard not available */
        }
    };

    const sendMail = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(
            `Let's talk${form.name ? ` — from ${form.name}` : ""}`
        );
        const body = encodeURIComponent(
            `${form.message}\n\n${form.name || ""}${form.email ? `\n${form.email}` : ""}`
        );
        window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    data-testid="contact-modal"
                >
                    <div
                        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 240, damping: 24 }}
                        className="relative z-10 w-full max-w-lg glass-strong rounded-2xl p-7"
                    >
                        <button
                            onClick={() => setOpen(false)}
                            data-testid="contact-close"
                            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/8 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand">
                            The Trailhead
                        </p>
                        <h3 className="mt-1 font-display text-2xl font-bold text-white">
                            Let&apos;s Talk
                        </h3>
                        <p className="mt-2 text-sm text-white/60">
                            Tell me about your project — I usually reply within a day.
                        </p>

                        <form onSubmit={sendMail} className="mt-5 space-y-3">
                            <input
                                data-testid="contact-name"
                                type="text"
                                placeholder="Your name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-brand"
                            />
                            <input
                                data-testid="contact-email"
                                type="email"
                                placeholder="Your email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-brand"
                            />
                            <textarea
                                data-testid="contact-message"
                                rows={3}
                                placeholder="Your message"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="w-full resize-none rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-brand"
                            />
                            <button
                                type="submit"
                                data-testid="contact-submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
                            >
                                <Mail size={17} strokeWidth={2.5} />
                                Send via email
                            </button>
                        </form>

                        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                            <button
                                onClick={copyEmail}
                                data-testid="contact-copy-email"
                                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-brand hover:text-white"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? "Copied!" : PROFILE.email}
                            </button>
                            <a
                                href={PROFILE.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-brand hover:text-white"
                            >
                                <Linkedin size={14} /> LinkedIn
                            </a>
                            <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
                                <MapPin size={13} /> {PROFILE.location}
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
