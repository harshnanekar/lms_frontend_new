/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				primary: 'var(--lms--color-primary)',
				'primary-light': 'var(--lms--color-primary-light)',
				'primary-pressed': 'var(--lms--color-primary-pressed)', // Update this if needed
				'primary-100': 'var(--lms--color-primary-100)',
				'primary-200': 'var(--lms--color-primary-200)',
				base: 'var(--lms--color-base)',
				secondary: 'var(--lms--color-secondary)',
				white: 'var(--lms--color-white)',
				black: 'var(--lms--color-black)',
				'slate-100': 'var(--lms--color-slate-100)',
				'slate-200': 'var(--lms--color-slate-200)',
				'slate-250': '#E5E9F1',
				'gray-50': 'var(--lms--color-grey-50)',
				'gray-100': 'var(--lms--color-grey-100)',
				'gray-150': 'var(--lms--color-grey-150)',
				'gray-200': 'var(--lms--color-grey-200)',
				'gray-250': 'var(--lms--color-grey-250)',
				'gray-300': 'var(--lms--color-grey-300)',
				'gray-400': 'var(--lms--color-grey-400)',
				'gray-500': 'var(--lms--color-grey-500)',
				'gray-600': 'var(--lms--color-grey-600)',
				'gray-700': 'var(--lms--color-grey-700)',
				'gray-800': 'var(--lms--color-grey-800)',
				'gray-900': 'var(--lms--color-grey-900)',
				success: 'var(--lms--color-success)',
				'success-light': 'var(--lms--color-success-light)',
				'success-dark': 'var(--lms--color-success-dark)',
				danger: 'var(--lms--color-danger)',
				'danger-light': 'var(--lms--color-danger-light)',
				'danger-dark': 'var(--lms--color-danger-dark)',
				warning: 'var(--lms--color-warning)',
				'warning-light': 'var(--lms--color-warning-light)',
				'warning-dark': 'var(--lms--color-warning-dark)',
				info: 'var(--lms--color-info)',
				'info-light': 'var(--lms--color-info-light)',
				'info-dark': 'var(--lms--color-info-dark)',
				'info-100': 'var(--lms--color-info-100)',
				'info-200': 'var(--lms--color-info-200)',
				'purple-200': 'var(--lms--color-purple-200)',
				'purple-100': 'var(--lms--color-purple-100)',
				'danger-hover': 'var(--lms--color-danger-hover)',
				'danger-200': 'var(--lms--color-danger-200)',
				'success-100': 'var(--lms--color-success-100)',
				'success-200': 'var(--lms--color-success-200)',
				'warning-100': 'var(--lms--color-warning-100)',
				'warning-200': 'var(--lms--color-warning-200)',
				'warning-300': 'var(--lms--color-warning-300)',
				'warning-400': 'var(--lms--color-warning-400)',
				border: 'hsl(var(--border) / <alpha-value>)'
			},
			fontSize: {
				'display-1': ['80px', { lineHeight: '88px', letterSpacing: '-0.125rem' }],
				'display-2': ['48px', { lineHeight: '56px', letterSpacing: '-0.063rem' }],
				'heading-1': ['32px', { lineHeight: '40px', letterSpacing: '-0.031rem' }],
				'heading-2': ['24px', { lineHeight: '32px', letterSpacing: '-0.016rem' }],
				'heading-2.5': ['20px', { lineHeight: '29px' }],
				'heading-3': ['18px', { lineHeight: '26px', letterSpacing: '-0.016rem' }],
				'body-1': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
				'body-2': ['14px', { lineHeight: '20px', letterSpacing: '0' }],
				'body-3': ['14px', { lineHeight: '20.3px', letterSpacing: '0.3px' }],
				'body-4': ['12px', { lineHeight: '17.4px', letterSpacing: '0.3px' }],
				'cta-md': ['14px', { letterSpacing: '0.094rem' }],
				'cta-sm': ['12px', { letterSpacing: '0.063rem' }],
				'cta-sm-lh': ['12px', { letterSpacing: '0.063rem', lineHeight: '18px' }],
				'cta-md-no-space': ['14px', { letterSpacing: '0' }],
				'cta-sm-no-space': ['12px', { letterSpacing: '0' }],
				'label-lg': ['14px', { letterSpacing: '0.063rem' }],
				'label-md': ['12px', { letterSpacing: '0.063rem' }],
				'small-label': ['10px', { lineHeight: '14px', letterSpacing: '0.016rem' }],
				caption: ['12px', { lineHeight: '16px', letterSpacing: '0.016rem' }],
				breadcrumb: ['10px', { lineHeight: '14px', letterSpacing: '0.016rem' }],
				'table-header': [
					'12px',
					{ lineHeight: '17px', letterSpacing: '0.016rem', fontWeight: '700' }
				]
			},
			fontFamily: {
				'dm-sans': ['DM Sans', 'sans-serif']
			},
			boxShadow: {
				xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
				sm: '0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
				md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1)',
				lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
				xl: '0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
				'2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
				'3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
				modal: '0px 4px 16px 0px rgba(0, 0, 0, 0.16)',
				card: '0px 2px 8px 0px #00000012',
				'chart-hover': '0px 2px 8px 0px rgba(0, 0, 0, .2)'
			},
			borderWidth: {
				DEFAULT: '1px',
			},
			borderColor: {
				DEFAULT: '#E5E9F1'
			}
		}
	},
	variants: {
		extend: {
			truncate: ['responsive']
		}
	},
	plugins: []
};