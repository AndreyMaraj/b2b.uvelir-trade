import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'
import { addIconSelectors } from '@iconify/tailwind'

export default {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		container: {
			center: true
		}
	},
	darkMode: 'class',
	plugins: [
		nextui(),
		addIconSelectors(['mdi'])
	]
} as Config
