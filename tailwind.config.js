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
                primary: '#D2232A',
                'primary-light': '#d2232a4d',
                base: '#EAF1FB',
                secondary: '#58585A',
                white: '#FFFFFF',
                black: '#000000',
                'slate-100': '#7C8798',
                'slate-200': '#F1F3F7',
                'slate-250': '#E5E9F1',
                'gray-50': '#F8F8F8',
                'gray-100': '#EEEEEE',
                'gray-150': '#D9D9D9',
                'gray-200': '#BDBDBD',
                'gray-250': '#C5CDDB',
                'gray-300': '#9E9E9E',
                'gray-400': '#757575',
                'gray-500': '#616161',
                'gray-600': '#404040',
                'gray-700': '#333333',
                'gray-800': '#282828',
                'gray-900': '#181818',
                success: '#1DB954',
                'success-light': '#A7E8B0',
                'success-dark': '#10793C',
                danger: '#E22134',
                'danger-light': '#F8A1A8',
                'danger-dark': '#A21724',
                warning: '#FFED51',
                'warning-light': '#FFF8A5',
                'warning-dark': '#C7A800',
                info: '#2E77D0',
                'info-light': '#A9C8F2',
                'info-dark': '#1A5193',
                'info-100': '#DDEEFB',
                'info-200': '#2995E9',
                'purple-200': '#9b52e4',
                'purple-100': '#EFE3FB',
                'danger-hover': '#B91F25',
                'danger-pressed': '#AC1D22',
                'danger-200': '#FEF2F2',
                'success-100': '#e1f6e6',
                'success-200': '#3bb155',
                'warning-100': '#FFF5DA',
                'warning-200': '#EDA210',
                'warning-300': '#FDEEEE',
                'warning-400': '#FCDCDC',
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
                card: '0px 2px 8px 0px #00000012'
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