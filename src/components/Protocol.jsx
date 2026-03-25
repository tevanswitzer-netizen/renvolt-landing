import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ProtocolCardGraphicAnimate = ({ active, type }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        if (!active) return;

        let ctx = gsap.context(() => {
            if (type === 'analyze') {
                gsap.to(iconRef.current, { rotation: 360, duration: 20, repeat: -1, ease: 'linear' });
            } else if (type === 'deploy') {
                const tl = gsap.timeline({ repeat: -1 });
                tl.fromTo('.laser', { y: 0 }, { y: 100, duration: 2, ease: 'power1.inOut', yoyo: true });
            } else if (type === 'partner') {
                gsap.to('.wave', { scaleY: 1.5, duration: 0.8, repeat: -1, yoyo: true, ease: 'power1.inOut', stagger: 0.1 });
            }
        }, iconRef);
        return () => ctx.revert();
    }, [active, type]);

    return (
        <div ref={iconRef} className="w-48 h-48 border border-primary/20 rounded-full flex items-center justify-center relative bg-cream/50 shadow-inner">
            {type === 'analyze' && (
                <div className="flex items-center justify-center relative w-full h-full">
                    <div className="absolute w-32 h-32 border border-accent/20 rounded-full" />
                    <div className="absolute w-24 h-24 border border-accent/40 rounded-full border-dashed" />
                    <Activity size={48} className="text-primary absolute" />
                </div>
            )}
            {type === 'deploy' && (
                <div className="w-32 h-32 relative flex items-center justify-center border border-primary/10 rounded overflow-hidden p-4">
                    <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full opacity-30">
                        {Array.from({ length: 16 }).map((_, i) => <div key={i} className="bg-primary/20 rounded-sm" />)}
                    </div>
                    <div className="laser absolute top-2 left-0 w-full h-1 bg-accent shadow-[0_0_8px_rgba(204,88,51,0.8)]" />
                </div>
            )}
            {type === 'partner' && (
                <div className="flex items-end justify-center w-full h-24 gap-2 px-8">
                    {[40, 70, 30, 90, 50, 80].map((h, i) => (
                        <div key={i} className="wave w-2 bg-primary rounded-t-full" style={{ height: `${h}%` }} />
                    ))}
                </div>
            )}
        </div>
    );
};

const Protocol = () => {
    const containerRef = useRef(null);

    const steps = [
        { num: '01', title: 'Analyze', desc: 'We identify high-traffic, low-service highway gaps.', type: 'analyze' },
        { num: '02', title: 'Deploy', desc: 'Install battery-backed hardware built for extreme weather.', type: 'deploy' },
        { num: '03', title: 'Partner', desc: 'Share revenue while providing a crucial public service.', type: 'partner' }
    ];

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');

            cards.forEach((card, i) => {
                if (i === cards.length - 1) return; // Don't animate the last card out

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top+=100', // pin when card reaches near top
                    end: 'bottom top+=100', // Unpin when bottom reaches
                    pinSpacing: false,
                    pin: true,
                    animation: gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.5,
                        filter: 'blur(10px)',
                        ease: 'none'
                    }),
                    scrub: true,
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="protocol" ref={containerRef} className="py-24 px-6 md:px-12 bg-background relative z-10">
            <div className="max-w-4xl mx-auto py-12">
                <h2 className="font-sans font-bold text-4xl mb-24 text-center">Implementation<br /><span className="font-cormorant italic text-accent font-normal text-6xl">Protocol.</span></h2>

                <div className="relative">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="protocol-card w-full min-h-[50vh] bg-white rounded-[3rem] p-8 md:p-16 mb-8 border border-primary/10 shadow-xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden"
                            style={{ zIndex: i }}
                        >
                            <div className="flex-1">
                                <div className="text-accent font-mono font-bold text-xl mb-4">Phase // {step.num}</div>
                                <h3 className="font-sans font-bold text-5xl text-dark mb-6">{step.title}</h3>
                                <p className="font-sans text-dark/70 text-lg md:text-xl text-balance leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <ProtocolCardGraphicAnimate active={true} type={step.type} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Protocol;
