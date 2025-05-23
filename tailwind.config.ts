import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shadcn/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: {
          DEFAULT: "hsl(var(--input))",
          background: "var(--input-background)",
        },
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "crack-violet": "var(--text-secondary)",
        "crack-green": "var(--crack-green)",
        "crack-light-green": "var(--crack-light-green)",
        "crack-red": "var(--crack-red)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        image: "url('../public/bg_icons.png')",
      },
      dropShadow: {
        card: "0 0 10px #000",
        status: "0 10px 20px #000",
      },
      boxShadow: {
        padding: "inset 0 0 0 3px rgba(0,0,0,1)",
      },
      backgroundColor: {
        crack: "var(--crack-background)",
        "crack-secondary": "var(--crack-background-secondary)",
        "crack-profile": "var(--crack-background-profile)",
        "crack-theader": "var(--crack-background-theader)",
        "crack-search": "var(--crack-background-search)",
      },
      borderColor: {
        "crack-theader": "var(--crack-border-theader)",
      },
      textColor: {
        crack: "var(--text-primary)",
        "crack-secondary": "var(--text-secondary)",
        "crack-information": "var(--text-information)",
        "crack-gamestatus": "var(--text-gamestatus)",
      },
      screens: {
        "3xl": "1820px",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
