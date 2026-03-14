import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ExternalLink, Terminal, Map as MapIcon, Calendar, Zap, ArrowRight, Activity, Cpu, MapPin, Battery, DollarSign, Wrench, TrendingUp, Snowflake, Send, CheckCircle2, AlertTriangle, X, Check, Minus, CircleDot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom Hooks
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

/* =========================================
   COMPONENTS
========================================= */

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
            {/* Background Image: Dark Forest Road */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="https://images.unsplash.com/photo-1542223616-9b570e6e7d69?q=80&w=2000&auto=format&fit=crop"
                    alt="Dark highway through forest"
                    className="w-full h-full object-cover scale-105"
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
                        Fast EV charging for Alberta’s highway gaps, powered by smart battery‑backed infrastructure.
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

const DiagnosticShuffler = () => {
    const [cards, setCards] = useState([
        { id: 1, title: 'Hwy 2 Corridor', status: 'Priority Gap Identified', color: 'bg-primary/10 text-primary' },
        { id: 2, title: 'Northern Routes', status: 'Grid Constraint High', color: 'bg-accent/10 text-accent' },
        { id: 3, title: 'Rocky Mountain Pass', status: 'Extreme Cold Weather', color: 'bg-dark/10 text-dark' }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newCards = [...prev];
                const last = newCards.pop();
                newCards.unshift(last);
                return newCards;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-48 relative flex items-center justify-center">
            {cards.map((card, i) => {
                // i=0 is front, i=1 is middle, i=2 is back
                const yOffset = i * -12;
                const scale = 1 - (i * 0.05);
                const opacity = 1 - (i * 0.3);
                const zIndex = 10 - i;

                return (
                    <div
                        key={card.id}
                        className="absolute w-full p-4 rounded-2xl bg-white border border-primary/10 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col gap-2"
                        style={{
                            transform: `translateY(${yOffset}px) scale(${scale})`,
                            opacity,
                            zIndex
                        }}
                    >
                        <div className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-1 rounded w-fit ${card.color}`}>
                            {card.status}
                        </div>
                        <div className="font-sans font-bold text-lg text-dark flex items-center gap-2">
                            <MapIcon size={18} className="text-primary" /> {card.title}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const TelemetryTypewriter = () => {
    const messages = [
        "> INITIATING COLD START PROTOCOL...",
        "> TEMP: -40°C DETECTED...",
        "> BATTERY BACKUP ONLINE...",
        "> GRID DRAW MINIMIZED...",
        "> CHARGING AT FASTEST SPEED..."
    ];

    const [text, setText] = useState('');
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        let currentText = '';
        let charIndex = 0;
        const targetMsg = messages[msgIndex];
        let timeout;

        const type = () => {
            if (charIndex < targetMsg.length) {
                currentText += targetMsg.charAt(charIndex);
                setText(currentText);
                charIndex++;
                timeout = setTimeout(type, Math.random() * 50 + 30);
            } else {
                timeout = setTimeout(() => {
                    setMsgIndex((prev) => (prev + 1) % messages.length);
                }, 2000);
            }
        };

        type();

        return () => clearTimeout(timeout);
    }, [msgIndex]);

    return (
        <div className="h-48 bg-[#1E1E1E] rounded-2xl p-4 flex flex-col overflow-hidden relative shadow-inner">
            <div className="flex items-center gap-2 mb-4 text-accent text-xs font-mono font-bold tracking-widest uppercase">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Live Telemetry
            </div>
            <div className="font-mono text-sm text-green-400 whitespace-pre-wrap flex-1 opacity-90 leading-relaxed">
                {text}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle" />
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10">
                <Zap size={100} className="text-white" />
            </div>
        </div>
    );
};

const CursorProtocolScheduler = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const [activeDay, setActiveDay] = useState(null);
    const cursorRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Initial wait
            tl.set(cursorRef.current, { x: 200, y: 150, opacity: 0 });
            tl.to(cursorRef.current, { opacity: 1, duration: 0.3 });

            // Move to a pseudo-random day (let's say Friday, index 5)
            tl.to(cursorRef.current, {
                x: 180, // Approximate x coordinate
                y: 60,  // Approximate y coordinate
                duration: 1,
                ease: 'power2.inOut'
            });

            // Click animation
            tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
            tl.add(() => setActiveDay(5));
            tl.to(cursorRef.current, { scale: 1, duration: 0.1 });

            // Move to Save
            tl.to(cursorRef.current, { x: 140, y: 130, duration: 0.8, ease: 'power2.inOut', delay: 0.3 });
            tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
            tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
            tl.to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 });
            tl.add(() => setActiveDay(null));

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="h-48 bg-white rounded-2xl p-4 flex flex-col relative border border-primary/10 overflow-hidden shadow-sm">
            <div className="text-xs font-mono font-bold text-primary/50 uppercase tracking-widest mb-4">
                Projected Peak Yield
            </div>

            <div className="flex justify-between w-full mt-2">
                {days.map((day, i) => (
                    <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors duration-300
              ${activeDay === i ? 'bg-accent text-white shadow-md' : 'bg-background text-dark/40'}`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="mt-auto flex justify-center">
                <div className="px-6 py-1.5 bg-dark text-white font-sans text-xs rounded-full font-bold">
                    Confirm Partnership
                </div>
            </div>

            {/* SVG Cursor */}
            <div ref={cursorRef} className="absolute z-10 drop-shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 3.21V20.8C5.5 21.46 6.27 21.82 6.78 21.4L11.5 17H18.5C19.05 17 19.5 16.55 19.5 16V4C19.5 3.45 19.05 3 18.5 3H6.5C5.95 3 5.5 3.09 5.5 3.21Z" fill="#1A1A1A" />
                    <path d="M12.5 13L15.5 20.5L13.5 21.5L10.5 14H12.5Z" fill="#1A1A1A" />
                </svg>
            </div>
        </div>
    );
};

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

const ComparisonTable = () => {
    const container = useRef(null);

    const features = [
        { name: 'Speed', compliance: '50 kW', competitor: '180–250 kW', rbs: '150 kW' },
        { name: 'Stalls', compliance: '1', competitor: '4–8', rbs: 'Scalable 2-Stall' },
        { name: 'Truck / Trailer', compliance: false, competitor: false, rbs: true },
        { name: '24/7 Access', compliance: false, competitor: true, rbs: true },
        { name: 'Battery Backup', compliance: false, competitor: false, rbs: true },
        { name: '–40°C Rated', compliance: false, competitor: false, rbs: true },
        { name: 'Demand Charge Reduction', compliance: false, competitor: false, rbs: '50–70%' },
        { name: 'CCS + NACS', compliance: 'CCS only', competitor: 'Network-locked', rbs: true },
        { name: 'Pricing', compliance: '$0.60–$0.76', competitor: '$0.45–$0.60', rbs: '$0.50 flat' },
    ];

    const renderCell = (value) => {
        if (value === true) return <Check size={20} className="text-green-500 mx-auto" />;
        if (value === false) return <X size={20} className="text-red-400/50 mx-auto" />;
        return <span className="font-sans text-sm text-dark/70">{value}</span>;
    };

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.comparison-row', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 70%',
                },
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: 'power3.out'
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="comparison" ref={container} className="py-24 px-6 md:px-12 bg-background">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <p className="font-mono text-sm font-bold text-accent uppercase tracking-widest mb-4">Why Renvolt</p>
                    <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark mb-6">
                        Not all chargers are
                        <span className="font-cormorant italic font-normal text-accent"> created equal.</span>
                    </h2>
                    <p className="font-sans text-dark/60 text-base max-w-xl mx-auto">
                        Most rural stations are compliance chargers — single slow units at car dealerships. We build something fundamentally different.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] border border-primary/10 shadow-sm overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-4 gap-0 border-b border-primary/10">
                        <div className="p-5" />
                        <div className="p-5 text-center border-l border-primary/10">
                            <p className="font-mono text-xs uppercase tracking-wider text-dark/40 mb-1">Typical Rural</p>
                            <p className="font-sans font-bold text-sm text-dark">Compliance Charger</p>
                        </div>
                        <div className="p-5 text-center border-l border-primary/10">
                            <p className="font-mono text-xs uppercase tracking-wider text-dark/40 mb-1">Tesla / SureCharge</p>
                            <p className="font-sans font-bold text-sm text-dark">Network Charger</p>
                        </div>
                        <div className="p-5 text-center border-l-2 border-accent/30 bg-accent/5">
                            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-1">Renvolt</p>
                            <p className="font-sans font-bold text-sm text-accent">Pull-Through Hub</p>
                        </div>
                    </div>

                    {/* Data Rows */}
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className={`comparison-row grid grid-cols-4 gap-0 ${i < features.length - 1 ? 'border-b border-primary/5' : ''} hover:bg-primary/[0.02] transition-colors`}
                        >
                            <div className="p-4 flex items-center">
                                <span className="font-sans font-semibold text-sm text-dark">{feature.name}</span>
                            </div>
                            <div className="p-4 flex items-center justify-center border-l border-primary/5">
                                {renderCell(feature.compliance)}
                            </div>
                            <div className="p-4 flex items-center justify-center border-l border-primary/5">
                                {renderCell(feature.competitor)}
                            </div>
                            <div className="p-4 flex items-center justify-center border-l-2 border-accent/10 bg-accent/[0.03]">
                                {renderCell(feature.rbs)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

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

const Features = () => {
    const container = useRef(null);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 75%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="features" ref={container} className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-6">

                {/* Card 1 */}
                <div className="feature-card flex-1 bg-background rounded-[2rem] p-8 border border-primary/10 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
                    <DiagnosticShuffler />
                    <div className="mt-8">
                        <h3 className="font-sans font-bold text-2xl mb-2 text-dark">Close the gaps.</h3>
                        <p className="font-sans text-dark/70 text-sm leading-relaxed">
                            Fill the biggest EV charging gaps on Alberta’s busiest highways with strategic geographical placement.
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="feature-card flex-1 bg-background rounded-[2rem] p-8 border border-primary/10 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
                    <TelemetryTypewriter />
                    <div className="mt-8">
                        <h3 className="font-sans font-bold text-2xl mb-2 text-dark">Built for -40°C.</h3>
                        <p className="font-sans text-dark/70 text-sm leading-relaxed">
                            Battery‑backed chargers that cut peak demand costs and stay exceptionally reliable in extreme winter conditions.
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="feature-card flex-1 bg-background rounded-[2rem] p-8 border border-primary/10 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
                    <CursorProtocolScheduler />
                    <div className="mt-8">
                        <h3 className="font-sans font-bold text-2xl mb-2 text-dark">Turn parking to profit.</h3>
                        <p className="font-sans text-dark/70 text-sm leading-relaxed">
                            Revenue‑sharing partnerships that transform underutilized parking lots into passive income streams.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

const Philosophy = () => {
    const containerRef = useRef(null);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Background parallax
            gsap.to('.philosophy-bg', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                yPercent: 20,
                ease: 'none'
            });

            // Text reveal
            gsap.from('.philo-text', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="philosophy" ref={containerRef} className="relative w-full py-32 px-6 overflow-hidden bg-dark text-background rounded-t-[3rem] mt-12">
            <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1616035105263-2287a3bfa2e9?q=80&w=2000&auto=format&fit=crop"
                    alt="Organic Texture"
                    className="philosophy-bg w-full h-[120%] object-cover -mt-[10%]"
                />
            </div>

            <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
                <p className="philo-text font-sans text-lg md:text-xl text-background/60 mb-6 font-medium">
                    Most infrastructure focuses on: fragile grid dependency.
                </p>
                <h2 className="philo-text font-sans text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                    We focus on: <br />
                    <span className="font-cormorant italic font-normal text-6xl md:text-7xl lg:text-8xl text-accent pl-2">unstoppable resilience.</span>
                </h2>
            </div>
        </section>
    );
};

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

const SiteHosts = () => {
    const container = useRef(null);

    const benefits = [
        {
            icon: MapPin,
            title: 'Strategic Corridor Placement',
            desc: 'We target proven highway gaps with 80–130 km of empty road, not crowded urban exits. Your location becomes the only reliable stop for hundreds of kilometres.'
        },
        {
            icon: Battery,
            title: 'Scalable Pull\u2011Through Hubs',
            desc: 'Premium 2\u2011stall 150 kW DC fast charging foundation, expanding dynamically with demand. Battery backup cuts demand charges by 50–70%.'
        },
        {
            icon: DollarSign,
            title: 'Zero Capital Required',
            desc: 'Up to 75% grant\u2011funded through ZEVIP and Indigenous partnerships. We handle installation, equipment, and maintenance. You provide the location.'
        },
        {
            icon: Wrench,
            title: 'In\u2011House Expertise',
            desc: 'Master Electrician on our founding team with cold\u2011climate solar and battery experience. No third\u2011party contractors — fast communication and real accountability.'
        },
        {
            icon: TrendingUp,
            title: 'Revenue Without Risk',
            desc: 'Revenue\u2011sharing model turns empty parking into passive income. EV drivers spend 20–40 minutes on site — that is foot traffic, food sales, and loyalty.'
        },
        {
            icon: Snowflake,
            title: 'Cold\u2011Rated & Scalable',
            desc: 'Hardware rated to –40°C with heated enclosures and BMS cold\u2011start protocol. Modular skid\u2011based design grows with EV adoption and your business.'
        }
    ];

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.host-card', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 75%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out'
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="site-hosts" ref={container} className="py-24 px-6 md:px-12 bg-background relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <p className="font-mono text-sm font-bold text-accent uppercase tracking-widest mb-4">For Site Hosts</p>
                    <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-dark mb-6">
                        Bring EV Drivers to<br />
                        <span className="font-cormorant italic font-normal text-5xl md:text-6xl lg:text-7xl text-accent">Your Doorstep.</span>
                    </h2>
                    <p className="font-sans text-dark/60 text-lg max-w-2xl mx-auto text-balance">
                        Partner with Renvolt to host a destination‑grade charging hub. We build, own, and operate — you earn revenue from day one.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, i) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={i}
                                className="host-card bg-white rounded-[2rem] p-8 border border-primary/10 shadow-sm hover:translate-y-[-2px] transition-transform duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                                    <Icon size={28} className="text-accent" />
                                </div>
                                <h3 className="font-sans font-bold text-xl mb-3 text-dark">{benefit.title}</h3>
                                <p className="font-sans text-dark/60 text-sm leading-relaxed">{benefit.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const SiteHostForm = () => {
    const containerRef = useRef(null);
    const [formState, setFormState] = useState('idle'); // idle | sending | sent
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        business: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState('sending');
        // Simulate sending
        setTimeout(() => {
            setFormState('sent');
        }, 1500);
    };

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.form-reveal', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const stats = [
        { value: '50,000', label: 'Vehicles/day on QE2' },
        { value: '75%', label: 'Grant-funded CapEx' },
        { value: '18 mo', label: 'Est. payback period' }
    ];

    return (
        <section id="site-host-form" ref={containerRef} className="relative w-full py-24 md:py-32 px-6 overflow-hidden bg-dark text-background rounded-t-[3rem]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="form-reveal font-sans font-bold text-3xl md:text-5xl text-background mb-4">
                        Let's Build the <span className="font-cormorant italic font-normal text-accent">Future</span> Together
                    </h2>
                    <p className="form-reveal font-sans text-background/50 text-base md:text-lg max-w-xl mx-auto">
                        Ready to bring EV charging to your location? Get in touch with our team.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Left: Form */}
                    <div className="form-reveal flex-1">
                        {formState === 'sent' ? (
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-accent" />
                                </div>
                                <h3 className="font-sans font-bold text-2xl text-background mb-3">Inquiry Sent</h3>
                                <p className="font-sans text-background/60 text-sm max-w-sm">
                                    Thank you for your interest. Our team will review your site and respond within 2 business days.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 space-y-5">
                                <h3 className="font-sans font-bold text-xl text-background mb-2">Site Partner Inquiry</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-background placeholder:text-background/30 focus:outline-none focus:border-accent/50 transition-colors"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-background placeholder:text-background/30 focus:outline-none focus:border-accent/50 transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="business"
                                        placeholder="Business / Location Name"
                                        value={formData.business}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-background placeholder:text-background/30 focus:outline-none focus:border-accent/50 transition-colors"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-background placeholder:text-background/30 focus:outline-none focus:border-accent/50 transition-colors"
                                    />
                                </div>

                                <textarea
                                    name="message"
                                    placeholder="Tell us about your location — highway, amenities, parking capacity..."
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-background placeholder:text-background/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                                />

                                <button
                                    type="submit"
                                    disabled={formState === 'sending'}
                                    className="relative overflow-hidden w-full bg-accent text-background px-8 py-4 rounded-xl font-sans text-base font-semibold hover:scale-[1.01] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {formState === 'sending' ? (
                                            <><div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> Sending...</>
                                        ) : (
                                            <>Submit Inquiry <Send size={16} className="group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right: Persuasion */}
                    <div className="form-reveal flex-1 flex flex-col justify-center">
                        <h3 className="font-sans font-bold text-2xl md:text-3xl text-background mb-6">
                            Why host with Renvolt?
                        </h3>
                        <div className="space-y-5 mb-10">
                            {[
                                'We go where other networks don\'t — your location becomes the only reliable hub for 80–130 km.',
                                'Battery\u2011backed infrastructure keeps your demand charges low and pricing competitive at $0.50/kWh.',
                                'Pull\u2011through bays designed for trucks, trailers, and the growing fleet of electric pickups.',
                                'In\u2011house Master Electrician with cold\u2011climate expertise. No third\u2011party contractors, no finger\u2011pointing.',
                                'Revenue\u2011sharing from day one. Your parking lot earns money while your guests charge.'
                            ].map((point, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                                    <p className="font-sans text-background/70 text-sm leading-relaxed">{point}</p>
                                </div>
                            ))}
                        </div>

                        {/* Stats Strip */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                    <div className="font-sans font-bold text-2xl md:text-3xl text-accent mb-1">{stat.value}</div>
                                    <div className="font-mono text-xs text-background/40 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

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

function App() {
    return (
        <>
            <Navbar />
            <Hero />
            <TheProblem />
            <Features />
            <ComparisonTable />
            <Philosophy />
            <Protocol />
            <Pipeline />
            <SiteHosts />
            <SiteHostForm />
            <CTA />
            <Footer />
            {/* Global Noise Overlay rendered in index.html ensures no extra wrapper issues, but we included it here too for redundancy, let's keep it in index.html */}
        </>
    );
}

export default App;
