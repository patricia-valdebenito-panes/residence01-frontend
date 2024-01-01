/** @type {import('tailwindcss').Config} */

export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    fontFamily: {
      display: ['Roboto', "system-ui", "sans-serif"],
      body: ['Roboto', "system-ui", "sans-serif"],
    },

    // colors: {
    //   primary: {
    //     50:  "#ffffff",
    //     100: "#deeffe",
    //     200: "#bcdffd",
    //     300: "#7abcf7",
    //     400: "#3f9bec",
    //     500: "#0f7ddc",
    //     600: "#006bc8",
    //     700: "#005eaf",
    //     800: "#004e93",
    //     900: "#003e74",
    //     950: "#002c53",
    //     990: "#001c34",
    //     1000: "#000e19",

  
    //   },
    //   secondary: {
    //     50: "#f8fafc",
    //     100: "#f1f5f9",
    //     200: "#e2e8f0",
    //     300: "#cbd5e1",
    //     400: "#94a3b8",
    //     500: "#64748b",
    //     600: "#475569",
    //     700: "#334155",
    //     800: "#1e293b",
    //     900: "#0f172a",
    //   },
    // },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
  
};
