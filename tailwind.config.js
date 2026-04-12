/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2E4036",
                accent: "#CC5833",
                background: "#F2F0E9",
                dark: "#1A1A1A",
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
                cormorant: ['"Cormorant Garamond"', 'serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
            },
            zIndex: {
                nav: '40',
                overlay: '50',
                modal: '60',
                skipLink: '100',
            },
        },
    },
    plugins: [],
}
