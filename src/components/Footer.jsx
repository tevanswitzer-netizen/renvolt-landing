import React from 'react';
import { scrollToSection } from './Navbar';

const Footer = () => {
    return (
        <footer className="bg-dark text-background rounded-t-[4rem] px-8 py-16 md:py-24 pb-8 overflow-hidden relative z-20 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">

                <div className="max-w-md">
                    <div className="mb-6">
                        <img src="/logo-transparent.png" alt="Renvolt Logo" className="h-12 w-auto object-contain object-left" />
                    </div>
                    <p className="font-cormorant italic text-2xl text-accent mb-8">
                        Powering the gaps.
                    </p>

                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-mono text-xs font-bold tracking-widest uppercase text-white/50">System Operational</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-sans text-sm font-medium text-background/60">
                    <div className="flex flex-col gap-4">
                        <div className="text-white font-bold tracking-wide mb-2">Platform</div>
                        <button onClick={() => scrollToSection('features')} className="text-left hover:text-accent transition-colors hover:-translate-y-[1px]">Infrastructure</button>
                        <button onClick={() => scrollToSection('comparison')} className="text-left hover:text-accent transition-colors hover:-translate-y-[1px]">Why Renvolt</button>
                        <button onClick={() => scrollToSection('site-hosts')} className="text-left hover:text-accent transition-colors hover:-translate-y-[1px]">Site Hosts</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-white font-bold tracking-wide mb-2">Company</div>
                        <button onClick={() => scrollToSection('philosophy')} className="text-left hover:text-accent transition-colors hover:-translate-y-[1px]">About</button>
                        <button onClick={() => scrollToSection('pipeline')} className="text-left hover:text-accent transition-colors hover:-translate-y-[1px]">Pipeline</button>
                        <button onClick={() => scrollToSection('site-host-form')} className="text-left hover:text-accent transition-colors hover:-translate-y-[1px]">Contact</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-white font-bold tracking-wide mb-2">Legal</div>
                        <span className="text-background/30 cursor-default">Privacy</span>
                        <span className="text-background/30 cursor-default">Terms</span>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 text-center font-mono text-xs text-background/30 uppercase tracking-widest">
                © {new Date().getFullYear()} Renvolt. All rights reserved.
            </div>
            <div className="noise-overlay" />
        </footer>
    );
};

export default Footer;
