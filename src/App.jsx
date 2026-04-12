import React, { lazy, Suspense } from 'react';
import { ModalProvider } from './context/ModalContext';
import ErrorBoundary from './components/ErrorBoundary';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';

const SiteHosts = lazy(() => import('./components/SiteHosts'));
const SiteHostForm = lazy(() => import('./components/SiteHostForm'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));
const PrivacyModal = lazy(() => import('./components/PrivacyModal'));

function App() {
    return (
        <ModalProvider>
            <ErrorBoundary>
                <a href="#main-content" className="skip-to-content">Skip to main content</a>
                <Navbar />
                <main id="main-content">
                    <Hero />
                    <Features />
                    <Suspense fallback={<div className="min-h-screen bg-dark w-full flex items-center justify-center text-accent font-mono text-sm uppercase tracking-widest animate-pulse">Loading Network Map...</div>}>
                        <SiteHosts />
                        <SiteHostForm />
                        <CTA />
                        <Footer />
                    </Suspense>
                </main>
                <Suspense fallback={null}>
                    <PrivacyModal />
                </Suspense>
            </ErrorBoundary>
        </ModalProvider>
    );
}

export default App;
