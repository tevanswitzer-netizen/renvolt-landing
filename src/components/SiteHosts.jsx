import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Battery, DollarSign, Wrench, TrendingUp, Snowflake } from 'lucide-react';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

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

export default SiteHosts;
