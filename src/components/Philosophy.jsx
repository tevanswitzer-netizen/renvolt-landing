import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const Philosophy = () => {
    const container = useRef(null);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to('.parallax-bg', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -150,
                ease: 'none'
            });

            gsap.from('.phil-text', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 60%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="philosophy" ref={container} className="relative py-40 md:py-60 px-6 overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
                    alt="Epic landscape"
                    className="parallax-bg w-full h-[130%] object-cover object-center absolute -top-[15%] left-0"
                />
                <div className="absolute inset-0 bg-dark/80" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center text-background mix-blend-lighten">
                <h2 className="phil-text font-cormorant italic text-5xl md:text-7xl lg:text-8xl leading-none mb-8">
                    "A route is only as viable as its weakest link."
                </h2>
                <p className="phil-text font-sans text-lg md:text-xl text-background/80 max-w-2xl mx-auto text-balance font-medium tracking-wide">
                    We aren't building chargers where it's easy. We're building them where they are strictly necessary. Our mission is to eliminate range anxiety across Alberta's most unforgiving corridors.
                </p>
                <div className="phil-text mt-12 w-24 h-px bg-accent mx-auto" />
            </div>
        </section>
    );
};

export default Philosophy;
