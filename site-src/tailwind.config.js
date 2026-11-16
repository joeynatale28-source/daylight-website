/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted-foreground))', faint: 'hsl(var(--faint))',
        card: 'hsl(var(--card))', border: 'hsl(var(--border))',
      },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
}
