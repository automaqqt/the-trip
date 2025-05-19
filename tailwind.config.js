/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add any other paths where you use Tailwind classes
  ],
  theme: {
    container: { // From your original request, for centered content
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // These map Tailwind utility class names to your CSS variables
        // The names (border, input, ring, background, foreground, primary, etc.)
        // are what shadcn/ui and your components expect.
        border: 'hsl(var(--color-border))',
        input: 'hsl(var(--color-input))',
        ring: 'hsl(var(--color-ring))',
        background: 'hsl(var(--color-background))',
        foreground: 'hsl(var(--color-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          foreground: 'hsl(var(--color-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))',
          foreground: 'hsl(var(--color-secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--color-destructive))',
          foreground: 'hsl(var(--color-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--color-muted))',
          foreground: 'hsl(var(--color-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent))',
          foreground: 'hsl(var(--color-accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--color-popover))',
          foreground: 'hsl(var(--color-popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--color-card))',
          foreground: 'hsl(var(--color-card-foreground))',
        },
        // Your specific "The Trip" colors, if you want separate utility names for them
        // or if they are different from primary/secondary/accent
        tripPurple: {
          
          light: '#A484E9', // Can be direct hex or another CSS var
          dark: '#4A1FB8',
        },
        tripPink: {
          DEFAULT: 'hsl(var(--color-secondary))', // Assuming tripPink IS your secondary
        },
        tripTeal: {
          DEFAULT: 'hsl(var(--color-accent))', // Assuming tripTeal IS your accent
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)', // Tailwind often uses DEFAULT for medium or base
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      fontFamily: {
        // Assumes --font-sans and --font-heading are provided by next/font in layout.tsx
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },
      keyframes: { // From your original request
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "float": { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        "pulse-glow": { '0%, 100%': { opacity: '1', boxShadow: '0 0 5px #E965BA, 0 0 10px #E965BA, 0 0 15px #703FEA, 0 0 20px #703FEA' }, '50%': { opacity: '0.8', boxShadow: '0 0 10px #E965BA, 0 0 20px #E965BA, 0 0 30px #703FEA, 0 0 40px #703FEA' } },
      },
      animation: { // From your original request
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
      // Add back backgroundImage and boxShadow if needed, ensuring syntax is correct
      // backgroundImage: { /* ... */ },
      // boxShadow: { /* ... */ }
    },
  },
  plugins: [
    require('tailwindcss-animate'), // For shadcn/ui animations and your custom animations
  ],
};