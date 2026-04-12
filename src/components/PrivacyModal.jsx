import React from 'react';
import { X } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const PrivacyModal = () => {
    const { privacyOpen, closePrivacy } = useModal();

    if (!privacyOpen) return null;

    return (
        <div
            className="fixed inset-0 z-modal flex items-center justify-center p-4"
            onClick={closePrivacy}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-title"
        >
            <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" />
            <div
                className="relative bg-background rounded-[2rem] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-12 shadow-2xl border border-primary/10"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closePrivacy}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-dark/5 flex items-center justify-center hover:bg-dark/10 transition-colors"
                    aria-label="Close privacy policy"
                >
                    <X size={20} className="text-dark/60" />
                </button>

                <h2 id="privacy-title" className="font-sans font-bold text-3xl text-dark mb-2">Privacy Policy</h2>
                <p className="font-mono text-xs text-dark/40 uppercase tracking-widest mb-8">Last updated: April 2026</p>

                <div className="space-y-6 font-sans text-dark/70 text-sm leading-relaxed">
                    <section>
                        <h3 className="font-bold text-lg text-dark mb-2">Who We Are</h3>
                        <p>
                            Renvolt ("we", "us", "our") operates the website renvolt.com. We are an EV charging infrastructure company based in Alberta, Canada.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg text-dark mb-2">Information We Collect</h3>
                        <p>When you submit a Site Partner Inquiry form, we collect:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                            <li>Your name</li>
                            <li>Email address</li>
                            <li>Phone number (optional)</li>
                            <li>Business or location name (optional)</li>
                            <li>Message content</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg text-dark mb-2">How We Use Your Information</h3>
                        <p>We use the information you provide solely to:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                            <li>Respond to your inquiry about hosting an EV charging station</li>
                            <li>Evaluate potential site partnership opportunities</li>
                            <li>Communicate with you about our services</li>
                        </ul>
                        <p className="mt-2">We do not sell, trade, or share your personal information with third parties for marketing purposes.</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg text-dark mb-2">Data Processing</h3>
                        <p>
                            Form submissions are processed through Web3Forms, a third-party form handling service. Your data is transmitted securely and delivered to us via email. Please refer to <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">Web3Forms' Privacy Policy</a> for details on their data handling practices.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg text-dark mb-2">Data Retention</h3>
                        <p>
                            We retain your inquiry data only for as long as necessary to fulfill the purpose for which it was collected, or as required by applicable law. You may request deletion of your data at any time.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg text-dark mb-2">Your Rights</h3>
                        <p>Under Canadian privacy law (PIPEDA), you have the right to:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Withdraw consent for future communications</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg text-dark mb-2">Cookies &amp; Analytics</h3>
                        <p>
                            This website does not use cookies or third-party analytics tracking. We do not collect browsing data or use advertising trackers.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg text-dark mb-2">Contact Us</h3>
                        <p>
                            If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us through the Site Partner Inquiry form on this website.
                        </p>
                    </section>
                </div>

                <div className="mt-8 pt-6 border-t border-primary/10">
                    <button
                        onClick={closePrivacy}
                        className="bg-accent text-background px-6 py-3 rounded-xl font-sans text-sm font-semibold hover:scale-[1.02] transition-transform duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
