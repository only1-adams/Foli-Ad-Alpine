/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}", "./public/**/*"],
	theme: {
		extend: {
			colors: {
				primary: "#92faf4",
				secondary: {
					DEFAULT: "#06423d",
					40: "rgba(6, 66, 61, 0.4)",
					80: "rgba(6, 66, 61, 0.8)",
				},
				accent: "#298c84",
				accent2: "#4adad2",
			},
			fontFamily: {
				custom: ["Poppins"],
			},
			boxShadow: {
				"3xl": " 0px 3.7757px 45px 5px rgba(6, 66, 61, 0.1)",
			},
			backgroundImage: {
				"hero-image": "url('images/hero-img.png')",
			},
			transitionTimingFunction: {
				"slide-in": "cubic-bezier(0.68, -0.55, 0.265, 1.35)",
			},
			keyframes: {
				progress: {
					"100%": { right: "100%" },
				},
			},
			animation: {
				progress: "progress 5s linear forwards",
			},
		},
	},
	plugins: [],
};
