/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#EEF1F8',
  				'100': '#D8E0F1',
  				'200': '#B1C1E3',
  				'300': '#8AA2D5',
  				'400': '#6383C7',
  				'500': '#085FF1',
  				'600': '#121BBC',
  				'700': '#1F2F58',
  				'800': '#0C0E19',
  				'900': '#000001',
  				DEFAULT: '#085FF1'
  			},
  			surface: {
  				light: {
  					base: '#FDFDFD',
  					paper: '#F5FAFF',
  					elevated: '#FAFDFF'
  				},
  				dark: {
  					base: '#0C0E19',
  					paper: '#1F2F58',
  					elevated: '#121BBC'
  				}
  			},
  			text: {
  				light: {
  					primary: '#1F2F58',
  					secondary: '#4B5563',
  					disabled: '#9CA3AF'
  				},
  				dark: {
  					primary: '#FFFFFF',
  					secondary: '#8B949E',
  					disabled: '#6B7280'
  				}
  			},
  			feedback: {
  				error: {
  					light: '#EF4444',
  					dark: '#F87171'
  				},
  				warning: {
  					light: '#F59E0B',
  					dark: '#FBBF24'
  				},
  				success: {
  					light: '#10B981',
  					dark: '#34D399'
  				},
  				info: {
  					light: '#085FF1',
  					dark: '#121BBC'
  				}
  			},
  			ui: {
  				light: {
  					divider: '#E5E7EB',
  					card: '#FFFFFF',
  					hover: 'rgba(8, 95, 241, 0.1)'
  				},
  				dark: {
  					divider: '#30363D',
  					card: '#0C0E19',
  					hover: 'rgba(18, 27, 188, 0.1)'
  				}
  			},
  			activity: {
  				light: {
  					empty: '#F3F4F6',
  					filled: '#085FF1',
  					hover: '#121BBC'
  				},
  				dark: {
  					empty: '#1F2F58',
  					filled: '#085FF1',
  					hover: '#121BBC'
  				}
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
