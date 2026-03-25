import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../config/emailConfig';

gsap.registerPlugin(ScrollTrigger);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const SiteHostForm = () => {
    const containerRef = useRef(null);
    const [formState, setFormState] = useState('idle'); // idle | sending | sent | error
    const [errorMessage, setErrorMessage] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('sending');
        setErrorMessage('');

        try {
            const response = await fetch(WEB3FORMS_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `New Site Partner Inquiry from ${formData.name}`,
                    from_name: 'Renvolt Website',
                    name: formData.name,
                    email: formData.email,
                    business: formData.business,
                    phone: formData.phone,
                    message: formData.message,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setFormState('sent');
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setFormState('error');
            setErrorMessage(
                error?.message || 'Something went wrong. Please try again or email us directly.'
            );
        }
    };

    const handleRetry = () => {
        setFormState('idle');
        setErrorMessage('');
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
                        ) : formState === 'error' ? (
                            <div className="bg-white/5 border border-red-500/30 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                                    <AlertCircle size={40} className="text-red-400" />
                                </div>
                                <h3 className="font-sans font-bold text-2xl text-background mb-3">Something Went Wrong</h3>
                                <p className="font-sans text-background/60 text-sm max-w-sm mb-6">
                                    {errorMessage}
                                </p>
                                <button
                                    onClick={handleRetry}
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-background px-6 py-3 rounded-xl font-sans text-sm font-semibold transition-colors duration-300"
                                >
                                    <RotateCcw size={16} /> Try Again
                                </button>
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

export default SiteHostForm;
