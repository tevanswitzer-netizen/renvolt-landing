import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Map as MapIcon, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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

            tl.set(cursorRef.current, { x: 200, y: 150, opacity: 0 });
            tl.to(cursorRef.current, { opacity: 1, duration: 0.3 });

            tl.to(cursorRef.current, {
                x: 180,
                y: 60,
                duration: 1,
                ease: 'power2.inOut'
            });

            tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
            tl.add(() => setActiveDay(5));
            tl.to(cursorRef.current, { scale: 1, duration: 0.1 });

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

            <div ref={cursorRef} className="absolute z-10 drop-shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 3.21V20.8C5.5 21.46 6.27 21.82 6.78 21.4L11.5 17H18.5C19.05 17 19.5 16.55 19.5 16V4C19.5 3.45 19.05 3 18.5 3H6.5C5.95 3 5.5 3.09 5.5 3.21Z" fill="#1A1A1A" />
                    <path d="M12.5 13L15.5 20.5L13.5 21.5L10.5 14H12.5Z" fill="#1A1A1A" />
                </svg>
            </div>
        </div>
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

                <div className="feature-card flex-1 bg-background rounded-[2rem] p-8 border border-primary/10 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
                    <DiagnosticShuffler />
                    <div className="mt-8">
                        <h3 className="font-sans font-bold text-2xl mb-2 text-dark">Close the gaps.</h3>
                        <p className="font-sans text-dark/70 text-sm leading-relaxed">
                            Fill the biggest EV charging gaps on Alberta’s busiest highways with strategic geographical placement.
                        </p>
                    </div>
                </div>

                <div className="feature-card flex-1 bg-background rounded-[2rem] p-8 border border-primary/10 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
                    <TelemetryTypewriter />
                    <div className="mt-8">
                        <h3 className="font-sans font-bold text-2xl mb-2 text-dark">Built for -40°C.</h3>
                        <p className="font-sans text-dark/70 text-sm leading-relaxed">
                            Battery‑backed chargers that cut peak demand costs and stay exceptionally reliable in extreme winter conditions.
                        </p>
                    </div>
                </div>

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

export default Features;
