import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Menu, X } from 'lucide-react';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

export const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const Navbar = () => {
    const navRef = useRef(null);
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const handleNavClick = (id) => {
        scrollToSection(id);
        setMobileOpen(false);
    };

    return (
        <nav
            ref={navRef}
            aria-label="Main navigation"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-nav w-[90%] max-w-4xl rounded-[3rem] px-6 py-4 transition-all duration-500 text-cream
                 [&:not(.scrolled)]:bg-transparent
                 [&.scrolled]:bg-background/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:text-primary [&.scrolled]:border [&.scrolled]:border-primary/10 [&.scrolled]:shadow-lg"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/logo-transparent-dark.png" alt="Renvolt Logo" className="h-8 md:h-10 w-auto object-contain object-left" />
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center space-x-8 font-sans text-sm font-medium">
                    <button onClick={() => handleNavClick('features')} className="hover:-translate-y-[1px] transition-transform focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded">Infrastructure</button>
                    <button onClick={() => handleNavClick('site-hosts')} className="hover:-translate-y-[1px] transition-transform focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded">Site Hosts</button>
                </div>

                <div className="flex items-center gap-3">
                    {/* Desktop CTA */}
                    <button onClick={() => handleNavClick('site-host-form')} className="relative overflow-hidden bg-accent text-background px-6 py-2.5 rounded-full font-sans text-sm font-semibold hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                        <span className="relative z-10 flex items-center gap-2">
                            Site Review <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                    </button>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-white/10 [.scrolled_&]:border-primary/10 flex flex-col gap-3 font-sans text-sm font-medium animate-[fadeIn_0.2s_ease-out]">
                    <button onClick={() => handleNavClick('features')} className="text-left py-2 px-2 rounded-xl hover:bg-white/10 [.scrolled_&]:hover:bg-dark/5 transition-colors focus-visible:outline-2 focus-visible:outline-accent">Infrastructure</button>
                    <button onClick={() => handleNavClick('site-hosts')} className="text-left py-2 px-2 rounded-xl hover:bg-white/10 [.scrolled_&]:hover:bg-dark/5 transition-colors focus-visible:outline-2 focus-visible:outline-accent">Site Hosts</button>
                    <button onClick={() => handleNavClick('site-host-form')} className="text-left py-2 px-2 rounded-xl hover:bg-white/10 [.scrolled_&]:hover:bg-dark/5 transition-colors focus-visible:outline-2 focus-visible:outline-accent">Contact</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
