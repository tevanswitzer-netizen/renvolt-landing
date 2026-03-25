import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Snowflake, Wrench, Battery, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ComparisonTable = () => {
    const container = useRef(null);

    const features = [
        { name: 'Hardware Uptime', us: '99.9%', them: '~75-85%', icon: Shield },
        { name: 'Cold Start (-40°C)', us: 'Instant (BMS Heated)', them: 'Slow / Fails', icon: Snowflake },
        { name: 'Max Output (Shared)', us: '150 kW True', them: '50 kW Split', icon: Battery },
        { name: 'Grid Draw (Peak)', us: 'Low (Battery Buffer)', them: 'High (Direct)', icon: Zap },
        { name: 'Maintenance', us: 'In-house Master EC', them: 'Third-party Subs', icon: Wrench },
    ];

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.comp-row', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 80%',
                },
                x: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="comparison" ref={container} className="py-24 px-6 md:px-12 bg-background relative z-10 w-full">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <p className="font-mono text-sm font-bold text-accent uppercase tracking-widest mb-4">The Renvolt Advantage</p>
                    <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-dark mb-6">
                        Not just another charger.<br />
                        <span className="font-cormorant italic font-normal text-5xl md:text-6xl lg:text-7xl text-accent">An energy asset.</span>
                    </h2>
                </div>

                <div className="bg-white rounded-[2rem] border border-primary/10 shadow-xl overflow-hidden">
                    <div className="grid grid-cols-3 p-6 border-b border-primary/10 bg-dark text-white">
                        <div className="font-sans font-bold text-sm tracking-wider uppercase opacity-50">Feature</div>
                        <div className="font-sans font-bold text-sm tracking-wider uppercase text-accent text-center">Renvolt Strategy</div>
                        <div className="font-sans font-bold text-sm tracking-wider uppercase opacity-50 text-center">Standard Networks</div>
                    </div>

                    <div className="divide-y divide-primary/10">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div key={i} className="comp-row grid grid-cols-3 p-6 items-center hover:bg-black/[0.02] transition-colors">
                                    <div className="flex items-center gap-3 font-sans font-bold text-dark text-sm md:text-base">
                                        <div className="w-8 h-8 rounded-full bg-dark/5 flex items-center justify-center hidden md:flex">
                                            <Icon size={16} className="text-dark/50" />
                                        </div>
                                        {feature.name}
                                    </div>
                                    <div className="text-center font-sans font-bold text-accent text-base md:text-lg">
                                        {feature.us}
                                    </div>
                                    <div className="text-center font-sans text-dark/50 text-sm md:text-base">
                                        {feature.them}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
