import React, { lazy, Suspense } from 'react';

import Navbar, { scrollToSection } from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TheProblem from './components/TheProblem';

const ComparisonTable = lazy(() => import('./components/ComparisonTable'));
const Philosophy = lazy(() => import('./components/Philosophy'));
const Pipeline = lazy(() => import('./components/Pipeline'));
const Protocol = lazy(() => import('./components/Protocol'));
const SiteHosts = lazy(() => import('./components/SiteHosts'));
const SiteHostForm = lazy(() => import('./components/SiteHostForm'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

/* =========================================
   COMPONENTS
========================================= */





function App() {
    return (
        <>
            <Navbar />
            <Hero />
            <TheProblem />
            <Features />
            <Suspense fallback={<div className="min-h-screen bg-dark w-full flex items-center justify-center text-accent font-mono text-sm uppercase tracking-widest animate-pulse">Loading Network Map...</div>}>
                <ComparisonTable />
                <Philosophy />
                <Protocol />
                <Pipeline />
                <SiteHosts />
                <SiteHostForm />
                <CTA />
                <Footer />
            </Suspense>
            {/* Global Noise Overlay rendered in index.html ensures no extra wrapper issues, but we included it here too for redundancy, let's keep it in index.html */}
        </>
    );
}

export default App;
