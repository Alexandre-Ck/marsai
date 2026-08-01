/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                jakarta: ['Plus Jakarta Sans', 'sans-serif'],
            },

            colors: {
                'blue-coton': '#246BAD',
                white: '#ffffff',
                coral: '#ff5845',
                'old-black': '#282828',
                'white-gray': '#f2f3f5',
                'navy-blue': '#0e172a',
                'gray': '#64748b',
            },
        },
    },
    plugins: [],
};