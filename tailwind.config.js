/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#212529",
				secondary: "#000814",
				emphasis: "#7209b7",
			},
			fontFamily: {
				heading: ["Pattaya", "serif"],
			},
			fontSize: {
				"2xs": '0.65rem',
			}
		},
	},
	plugins: [],
};
