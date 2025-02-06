import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false, // Não faz o CSS global reset do Tailwind
  },
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  darkMode: "selector",
  plugins: [
    animate,
    plugin(function ({ addComponents }) {
      addComponents({
        ".input-base": {
          "--apply":
            "'w-full shadow p-2 rounded-md bg-white/90 backdrop-blur-sm outline-none ring-2 ring-inset ring-slate-500 ring-opacity-60 focus:ring-opacity-80'",
        },
        ".input-modified": {
          "--apply": "'ring-amber-500 ring-opacity-60'",
        },
        ".input-error": {
          "--apply": "'ring-red-500 ring-opacity-60'",
        },
        ".input-disabled": {
          "--apply": "'pointer-events-none [&>*:not(label)]:opacity-75'",
        },
      });
    }),
  ],
};
export default config;
