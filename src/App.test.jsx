import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React, { Suspense } from 'react';
import App from './App';

// Mock GSAP to prevent animation errors in tests
vi.mock('gsap', () => ({
    default: {
        context: vi.fn((fn) => { try { fn(); } catch {} return { revert: vi.fn() }; }),
        from: vi.fn(),
        to: vi.fn(),
        set: vi.fn(),
        timeline: vi.fn(() => ({
            set: vi.fn().mockReturnThis(),
            to: vi.fn().mockReturnThis(),
            add: vi.fn().mockReturnThis(),
        })),
        registerPlugin: vi.fn(),
    },
    ScrollTrigger: { create: vi.fn() },
}));

vi.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: { create: vi.fn() },
}));

// Helper: render App and wait for lazy components to load
const renderApp = async () => {
    render(<App />);
    // Wait for Suspense to resolve lazy components
    await waitFor(() => {
        expect(screen.getByText('Submit Inquiry')).toBeInTheDocument();
    }, { timeout: 5000 });
};

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        const heading = screen.getByText(/Infrastructure is the/i);
        expect(heading).toBeInTheDocument();
    });

    it('renders the skip-to-content link', () => {
        render(<App />);
        const skipLink = screen.getByText('Skip to main content');
        expect(skipLink).toBeInTheDocument();
        expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('renders the main navigation', () => {
        render(<App />);
        const nav = screen.getByRole('navigation', { name: /main/i });
        expect(nav).toBeInTheDocument();
    });

    it('renders the hero CTA button', () => {
        render(<App />);
        const cta = screen.getByText(/Book a 15-Minute Site Review/i);
        expect(cta).toBeInTheDocument();
    });
});

describe('Navigation', () => {
    it('renders Infrastructure and Site Hosts links on desktop', () => {
        render(<App />);
        const infraButtons = screen.getAllByText('Infrastructure');
        const siteHostButtons = screen.getAllByText('Site Hosts');
        expect(infraButtons.length).toBeGreaterThan(0);
        expect(siteHostButtons.length).toBeGreaterThan(0);
    });
});

describe('SiteHostForm', () => {
    beforeEach(async () => {
        await renderApp();
    });

    it('renders form fields with accessible labels', () => {
        const nameInput = screen.getByLabelText('Your Name');
        const emailInput = screen.getByLabelText('Email Address');
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    });

    it('shows validation error on empty name after blur', async () => {
        const nameInput = screen.getByLabelText('Your Name');
        fireEvent.focus(nameInput);
        fireEvent.blur(nameInput);
        
        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
        });
    });

    it('shows validation error on invalid email after blur', async () => {
        const emailInput = screen.getByLabelText('Email Address');
        fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
        fireEvent.blur(emailInput);
        
        await waitFor(() => {
            expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
        });
    });

    it('does not show errors before user interacts', () => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Please enter a valid email')).not.toBeInTheDocument();
    });

    it('submits successfully with valid data', async () => {
        const mockResponse = { success: true, message: 'Email sent successfully' };
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        );

        const nameInput = screen.getByLabelText('Your Name');
        const emailInput = screen.getByLabelText('Email Address');
        const submitBtn = screen.getByText('Submit Inquiry');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText('Inquiry Sent')).toBeInTheDocument();
        });

        global.fetch.mockRestore();
    });

    it('shows error state on submission failure', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: false, message: 'Server error' }),
            })
        );

        const nameInput = screen.getByLabelText('Your Name');
        const emailInput = screen.getByLabelText('Email Address');
        const submitBtn = screen.getByText('Submit Inquiry');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
        });

        global.fetch.mockRestore();
    });

    it('allows retry after error', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: false, message: 'Server error' }),
            })
        );

        const nameInput = screen.getByLabelText('Your Name');
        const emailInput = screen.getByLabelText('Email Address');
        const submitBtn = screen.getByText('Submit Inquiry');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText('Try Again')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Try Again'));

        await waitFor(() => {
            expect(screen.getByText('Submit Inquiry')).toBeInTheDocument();
        });

        global.fetch.mockRestore();
    });
});

describe('Privacy Modal', () => {
    beforeEach(async () => {
        await renderApp();
    });

    it('opens when privacy link in footer is clicked', async () => {
        const privacyLink = screen.getByText('Privacy Policy');
        fireEvent.click(privacyLink);

        await waitFor(() => {
            expect(screen.getByText('Who We Are')).toBeInTheDocument();
            expect(screen.getByText('Information We Collect')).toBeInTheDocument();
        });
    });

    it('closes when close button is clicked', async () => {
        fireEvent.click(screen.getByText('Privacy Policy'));

        await waitFor(() => {
            expect(screen.getByText('Who We Are')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByLabelText('Close privacy policy'));

        await waitFor(() => {
            expect(screen.queryByText('Who We Are')).not.toBeInTheDocument();
        });
    });

    it('has proper dialog role and aria attributes', async () => {
        fireEvent.click(screen.getByText('Privacy Policy'));

        await waitFor(() => {
            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveAttribute('aria-modal', 'true');
            expect(dialog).toHaveAttribute('aria-labelledby', 'privacy-title');
        });
    });
});
