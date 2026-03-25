import React from 'react';
import { ExternalLink } from 'lucide-react';
import { scrollToSection } from './Navbar';

const CTA = () => {
    return (
        <section className="py-32 px-6 max-w-4xl mx-auto text-center">
            <h2 className="font-sans font-bold text-4xl md:text-6xl text-dark mb-6">
                Ready to energize your location?
            </h2>
            <p className="font-sans text-dark/60 text-lg mb-12">
                Join our network of strategic charging hubs and turn empty space into a vital, revenue-generating asset.
            </p>
            <button onClick={() => scrollToSection('site-host-form')} className="relative overflow-hidden bg-accent text-background px-10 py-5 rounded-full font-sans text-lg font-bold hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group inline-flex items-center gap-3">
                <span className="relative z-10 flex items-center gap-2">
                    Book a 15-Minute Site Review <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
            </button>
        </section>
    );
};

export default CTA;
