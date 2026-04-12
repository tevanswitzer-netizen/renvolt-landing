import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Activity, Zap, CircleDot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const Pipeline = () => {
    const container = useRef(null);

    const sites = [
        {
            name: 'Bear Hills Casino',
            corridor: 'QE2 Highway',
            distance: '50,000 vehicles/day',
            partner: 'Louis Bull Tribe',
            status: 'in-progress',
            statusLabel: 'ZEVIP Submitted',
            phase: 'Phase 1'
        },
        {
            name: 'Slave Lake',
            corridor: 'Highway 2 North',
            distance: '130 km gap',
            partner: 'Sawridge First Nation',
            status: 'next',
            statusLabel: 'LOI Pending',
            phase: 'Phase 2A'
        },
        {
            name: 'Lac La Biche',
            corridor: 'Highway 63 South',
            distance: '80 km gap',
            partner: 'Beaver Lake Cree Nation',
            status: 'planned',
            statusLabel: 'Site Assessment',
            phase: 'Phase 2B'
        },
        {
            name: 'Ponoka',
            corridor: 'QE2 Highway',
            distance: '35,000 vehicles/day',
            partner: 'TBD — Maskwacis Region',
            status: 'planned',
            statusLabel: 'Planning',
            phase: 'Phase 3'
        },
        {
            name: 'Drayton Valley',
            corridor: 'Highway 22',
            distance: '95 km gap — zero DCFC',
            partner: "O'Chiese First Nation",
            status: 'planned',
            statusLabel: 'Planning',
            phase: 'Phase 3B'
        }
    ];

    const statusStyles = {
        'in-progress': 'bg-green-500/15 text-green-400 border-green-500/30',
        'next': 'bg-accent/15 text-accent border-accent/30',
        'planned': 'bg-white/10 text-background/50 border-white/15'
    };

    const dotStyles = {
        'in-progress': 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]',
        'next': 'bg-accent shadow-[0_0_8px_rgba(204,88,51,0.4)]',
        'planned': 'bg-background/30'
    };

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.pipeline-card', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 70%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out'
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="pipeline" ref={container} className="py-24 px-6 md:px-12 bg-dark relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="font-mono text-sm font-bold text-accent uppercase tracking-widest mb-4">Deployment Pipeline</p>
                    <h2 className="font-sans font-bold text-4xl md:text-5xl text-background mb-6">
                        Five sites. Zero
                        <span className="font-cormorant italic font-normal text-accent"> competition.</span>
                    </h2>
                    <p className="font-sans text-background/50 text-base max-w-2xl mx-auto">
                        Every site in our pipeline has zero competing DCFC networks and strong Indigenous partnerships for 75% ZEVIP grant coverage.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-400 via-accent to-background/10" />

                    <div className="space-y-4">
                        {sites.map((site, i) => (
                            <div key={i} className="pipeline-card relative flex items-start gap-6 md:gap-8">
                                {/* Dot */}
                                <div className="relative z-10 flex-shrink-0 w-12 md:w-16 flex justify-center pt-6">
                                    <div className={`w-3 h-3 rounded-full ${dotStyles[site.status]}`} />
                                </div>

                                {/* Card */}
                                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors duration-300">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-xs font-bold text-background/30 uppercase">{site.phase}</span>
                                            <h3 className="font-sans font-bold text-xl text-background">{site.name}</h3>
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wide border ${statusStyles[site.status]} w-fit`}>
                                            <CircleDot size={10} />
                                            {site.statusLabel}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                        <span className="font-sans text-background/50 flex items-center gap-1.5">
                                            <MapPin size={14} className="text-accent" /> {site.corridor}
                                        </span>
                                        <span className="font-sans text-background/50 flex items-center gap-1.5">
                                            <Activity size={14} className="text-accent" /> {site.distance}
                                        </span>
                                        <span className="font-sans text-background/50 flex items-center gap-1.5">
                                            <Zap size={14} className="text-accent" /> {site.partner}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pipeline;
