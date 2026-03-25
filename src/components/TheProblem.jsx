import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const TheProblem = () => {
    const container = useRef(null);

    const painPoints = [
        {
            stat: '263',
            unit: 'km',
            label: 'Edmonton to Slave Lake',
            detail: 'Zero reliable DC fast chargers on this entire stretch.',
            color: 'text-red-500'
        },
        {
            stat: '72',
            unit: '%',
            label: 'Charger Anxiety',
            detail: 'Of potential EV buyers cite lack of rural charging as their #1 concern.',
            color: 'text-amber-500'
        },
        {
            stat: '50',
            unit: 'kW',
            label: 'Compliance Chargers',
            detail: "Most rural stations are single 50 kW dealer units — slow, often blocked, closed after hours.",
            color: 'text-orange-500'
        },
        {
            stat: '0',
            unit: '',
            label: 'Pull-Through Bays',
            detail: 'Zero current infrastructure outside cities supports trucks, trailers, or EV pickups.',
            color: 'text-red-600'
        },
        {
            stat: '-40',
            unit: '°C',
            label: 'Alberta Winters',
            detail: 'Most chargers lack cold-start protocols. Batteries degrade, sessions fail, drivers get stranded.',
            color: 'text-blue-500'
        }
    ];

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.problem-item', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 70%',
                },
                x: -30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="the-problem" ref={container} className="py-24 px-6 md:px-12 bg-dark relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left: Heading */}
                    <div className="lg:w-2/5 lg:sticky lg:top-32">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle size={16} className="text-accent" />
                            <p className="font-mono text-sm font-bold text-accent uppercase tracking-widest">The Problem</p>
                        </div>
                        <h2 className="font-sans font-bold text-4xl md:text-5xl text-background mb-6">
                            Rural Alberta is an
                            <span className="font-cormorant italic font-normal text-accent"> EV desert.</span>
                        </h2>
                        <p className="font-sans text-background/50 text-base leading-relaxed">
                            The ZEV mandate requires 100% zero-emission vehicle sales by 2035. But outside Edmonton and Calgary, drivers face hundreds of kilometres with no reliable fast charging. The infrastructure gap isn't closing — it's getting wider.
                        </p>
                    </div>

                    {/* Right: Pain Points */}
                    <div className="lg:w-3/5 space-y-4">
                        {painPoints.map((point, i) => (
                            <div
                                key={i}
                                className="problem-item bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-6 hover:bg-white/[0.07] transition-colors duration-300"
                            >
                                <div className="flex-shrink-0 text-right min-w-[80px]">
                                    <span className={`font-sans font-bold text-4xl ${point.color}`}>{point.stat}</span>
                                    <span className={`font-sans font-bold text-lg ${point.color}`}>{point.unit}</span>
                                </div>
                                <div>
                                    <h3 className="font-sans font-bold text-lg text-background mb-1">{point.label}</h3>
                                    <p className="font-sans text-background/50 text-sm leading-relaxed">{point.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TheProblem;
