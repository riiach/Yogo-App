/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#ffffff",
                secondary: "#000000",
                accent: "#FF6FA3", //Neon Pink
                accent2: "#8A6FFF", //Soft Purple
                accent3: "#3A8DFF", //Electric Blue
            },
            backgroundImage: {
                'accent-gradient' : 'linear-gradient(145deg, #4DA3FF 0%, #8A6FFF 45%, #FF7AB8 100%)'
            }
        },
    },
    plugins: [],
}