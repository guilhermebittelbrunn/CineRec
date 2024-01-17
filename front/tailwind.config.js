/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#09B54E',
                secondery: '#171717',
                backgroundOne: '#1B1B1B',
                font: '#FAFAFA',
            },
            backgroundImage: {
                posternull: "url('./src/assets/posternull.jpg')",
            },
        },
    },
    plugins: [],
};
