import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const Navbar = () => {
    const navRef = useRef(null);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                toggleClass: { className: 'scrolled', targets: navRef.current },
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-4xl rounded-[3rem] px-6 py-4 transition-all duration-500 text-cream
                 [&:not(.scrolled)]:bg-transparent
                 [&.scrolled]:bg-background/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:text-primary [&.scrolled]:border [&.scrolled]:border-primary/10 [&.scrolled]:shadow-lg"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/logo-transparent-dark.png" alt="Renvolt Logo" className="h-8 md:h-10 w-auto object-contain object-left" />
                </div>
                <div className="hidden md:flex items-center space-x-8 font-sans text-sm font-medium">
                    <button onClick={() => scrollToSection('features')} className="hover:-translate-y-[1px] transition-transform">Infrastructure</button>
                    <button onClick={() => scrollToSection('pipeline')} className="hover:-translate-y-[1px] transition-transform">Pipeline</button>
                    <button onClick={() => scrollToSection('protocol')} className="hover:-translate-y-[1px] transition-transform">Protocol</button>
                    <button onClick={() => scrollToSection('site-hosts')} className="hover:-translate-y-[1px] transition-transform">Site Hosts</button>
                </div>
                <button onClick={() => scrollToSection('site-host-form')} className="relative overflow-hidden bg-accent text-background px-6 py-2.5 rounded-full font-sans text-sm font-semibold hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group">
                    <span className="relative z-10 flex items-center gap-2">
                        Site Review <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
