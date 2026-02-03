/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: {
                    50: '#F2F2EC',  // Softer, warmer off-white (was #FAFAF8)
                    100: '#E6E6D8', // Slightly darker (was #F5F5F0)
                    200: '#D9D9C4', // (was #EBEBDF)
                    300: '#CCCCB0', // (was #E0E0CE)
                    400: '#BFBF9C', // (was #D6D6BD)
                    500: '#B2B288', // (was #CCCCAC)
                },
                dark: {
                    50: '#2A2A2A',
                    100: '#1A1A1A',
                    200: '#141414',
                    300: '#0F0F0F',
                    400: '#0A0A0A',
                    500: '#050505',
                },
                orange: {
                    400: '#FFB366',
                    500: '#FF8C42',
                    600: '#E67A3A',
                },
                teal: {
                    400: '#2A7C7C',
                    500: '#1A5C5C',
                    600: '#154A4A',
                },
                burgundy: {
                    400: '#A33939',
                    500: '#8B2E2E',
                    600: '#732424',
                },
            },
            fontFamily: {
                mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem',
            },
            animation: {
                'float-slow': 'float 8s ease-in-out infinite',
                'fade-in': 'fadeIn 1s ease-out',
                'slide-up': 'slideUp 0.8s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
