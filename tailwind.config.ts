import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';
import { addIconSelectors } from '@iconify/tailwind';

const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {}
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						background: '#FFFFFF',
						foreground: "#000000",
						default: {
							foreground: "#FFFFFF",
							DEFAULT: "#FFFFFF"
						},
						focus: "#000000"
					}
				}
			}
		}),
		addIconSelectors(['mdi'])
	]
};

export default config;
