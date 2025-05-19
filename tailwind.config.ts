import type { Config } from "tailwindcss"

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
        colors: {
            border: "hsl(var(--color-border))", // Use HSL wrapper for CSS vars
            input: "hsl(var(--color-input))",
            ring: "hsl(var(--color-ring))",
            background: "hsl(var(--color-background))",
            foreground: "hsl(var(--color-foreground))",
            primary: {
              DEFAULT: "hsl(var(--color-primary))",
              foreground: "hsl(var(--color-primary-foreground))",
            },
            secondary: {
              DEFAULT: "hsl(var(--color-secondary))",
              foreground: "hsl(var(--color-secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--color-destructive))",
              // foreground: "hsl(var(--color-destructive-foreground))", // If you have this
            },
            muted: {
              DEFAULT: "hsl(var(--color-muted))",
              foreground: "hsl(var(--color-muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--color-accent))",
              foreground: "hsl(var(--color-accent-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--color-popover))",
              foreground: "hsl(var(--color-popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--color-card))",
              foreground: "hsl(var(--color-card-foreground))",
            },
            // Your custom colors (Map to the new @theme inline names if you added them there)
            // For example, if you added --color-tripPink in @theme inline:
            tripPink: "hsl(var(--color-tripPink))",
            // Or if tripPink is your 'secondary', you'd just use 'secondary' utilities.
          },
          borderRadius: { // Map to the CSS variables from @theme inline
            lg: "var(--radius-lg)",
            md: "var(--radius-md)",
            sm: "var(--radius-sm)",
            xl: "var(--radius-xl)", // If you defined this in @theme
          },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        "pulse-glow": {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 5px #E965BA, 0 0 10px #E965BA, 0 0 15px #703FEA, 0 0 20px #703FEA' },
          '50%': { opacity: '0.8', boxShadow: '0 0 10px #E965BA, 0 0 20px #E965BA, 0 0 30px #703FEA, 0 0 40px #703FEA' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'], // Assuming Inter is setup
        heading: ['Montserrat', 'sans-serif'], // Example heading font
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg-pattern.svg')", // Example pattern
        'hero-main': "url('/images/hero-main-bg.jpg')", // Example full bg
      },
      boxShadow: {
        'glow-purple': '0 0 15px 5px rgba(112, 63, 234, 0.4)',
        'glow-pink': '0 0 15px 5px rgba(233, 101, 186, 0.4)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config