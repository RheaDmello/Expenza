import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"], // Enable dark mode using a class
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Paths to your pages
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // Paths to your components
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // Paths to your app directory
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))', // Use CSS variable for background color
                foreground: 'hsl(var(--foreground))', // Use CSS variable for foreground color
                card: {
                    DEFAULT: 'hsl(var(--card))', // Default card color
                    foreground: 'hsl(var(--card-foreground))' // Card text color
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))', // Popover background color
                    foreground: 'hsl(var(--popover-foreground))' // Popover text color
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))', // Primary color
                    foreground: 'hsl(var(--primary-foreground))' // Primary text color
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))', // Secondary color
                    foreground: 'hsl(var(--secondary-foreground))' // Secondary text color
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))', // Muted color
                    foreground: 'hsl(var(--muted-foreground))' // Muted text color
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))', // Accent color
                    foreground: 'hsl(var(--accent-foreground))' // Accent text color
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))', // Destructive action color
                    foreground: 'hsl(var(--destructive-foreground))' // Destructive action text color
                },
                border: 'hsl(var(--border))', // Border color using CSS variable
                input: 'hsl(var(--input))', // Input field background color using CSS variable
                ring: 'hsl(var(--ring))', // Ring color for focus states using CSS variable
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)', // Large border radius using CSS variable
                md: 'calc(var(--radius) - 2px)', // Medium border radius calculation
                sm: 'calc(var(--radius) - 4px)'  // Small border radius calculation
            }
        }
    },
    plugins: [require("tailwindcss-animate")], // Include any plugins you need
};

export default config;