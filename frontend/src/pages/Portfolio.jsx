import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import CinematicRide from "@/components/CinematicRide";
import JourneyPanel from "@/components/JourneyPanel";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Tools from "@/components/Tools";
import SelectedWorks from "@/components/SelectedWorks";
import Connect from "@/components/Connect";
import ContactModal from "@/components/ContactModal";

export default function Portfolio() {
    const lenisRef = useRef(null);

    useEffect(() => {
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduce) return;

        const lenis = new Lenis({
            duration: 1.15,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.4,
        });
        lenisRef.current = lenis;

        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    const handleJump = useCallback((anchor) => {
        const el = document.getElementById(anchor);
        if (!el) return;
        if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
        } else {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <main className="relative bg-ink">
            <JourneyPanel onJump={handleJump} />
            <CinematicRide onJump={handleJump} />
            <About />
            <Experience />
            <Tools />
            <SelectedWorks />
            <Connect />
            <ContactModal />
        </main>
    );
}
