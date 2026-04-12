import React, { useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { scrollToSection } from './Navbar';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

const Hero = () => {
    const container = useRef(null);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.hero-text', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            });
            gsap.from('.hero-btn', {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.8
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative h-[100dvh] w-full overflow-hidden bg-dark">
            {/* Background Image: Self-hosted highway scene */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="/hero-bg.webp"
                    alt="Dark highway through Alberta wilderness at dusk"
                    className="w-full h-full object-cover scale-105"
                    width={2000}
                    height={2000}
                    loading="eager"
                    fetchpriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent" />
            </div>

            <div className="relative h-full w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-24 max-w-7xl mx-auto">
                <div className="max-w-4xl">
                    <h1 className="flex flex-col text-background">
                        <span className="hero-text font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">
                            Infrastructure is the
                        </span>
                        <span className="hero-text font-cormorant italic text-7xl md:text-8xl lg:text-[9rem] leading-[0.8] text-accent pr-10">
                            Future.
                        </span>
                    </h1>
                    <p className="hero-text mt-8 text-background/80 font-sans text-lg md:text-xl max-w-xl text-balance">
                        Fast EV charging for Alberta's highway gaps, powered by smart battery‑backed infrastructure.
                    </p>
                    <div className="hero-btn mt-10 space-x-4">
                        <button onClick={() => scrollToSection('site-host-form')} className="relative overflow-hidden bg-accent text-background px-8 py-4 rounded-full font-sans text-base font-semibold hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group inline-flex items-center gap-2">
                            <span className="relative z-10 flex items-center gap-2">
                                Book a 15-Minute Site Review <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
