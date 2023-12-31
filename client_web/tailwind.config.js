/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				main: '#6172F3',
			},
			backgroundColor: {
				overlay: 'rgba(0,0,0,0.7)',
				overlay_white: 'rgba(255,255,255,0.7)',
			},
			boxShadow: {
				table: '0px 2px 50px 0px rgba(0, 0, 0, 0.08)',
				table_1: '0px 3px 50px 0px rgba(0, 0, 0, 0.08)',
			},
		},
	},
	plugins: [],
}
