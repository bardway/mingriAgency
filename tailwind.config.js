/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 纯灰色配色方案（去除暖色调）
        // 核心色值: #F5F5F5 (浅灰), #D4D4D4 (中灰), #737373 (深灰), #262626 (极深灰)
        'ww-light': {
          DEFAULT: '#F5F5F5',    // 浅灰（主背景）
          50: '#ffffff',         // 纯白
          100: '#fafafa',        // 极浅灰
          200: '#f5f5f5',        // 很浅灰
          300: '#eeeeee',        // 浅灰
          400: '#e5e5e5',        // 中浅灰
          500: '#d4d4d4',        // 中灰
          600: '#a3a3a3',        // 中深灰
          700: '#737373',        // 深灰
          800: '#525252',        // 很深灰
          900: '#404040',        // 极深灰
        },
        'ww-slate': {
          DEFAULT: '#525252',    // 深灰（主文字色）
          50: '#fafafa',         // 极浅灰
          100: '#f5f5f5',        // 很浅灰
          200: '#e5e5e5',        // 浅灰
          300: '#d4d4d4',        // 中浅灰
          400: '#a3a3a3',        // 中灰
          500: '#737373',        // 中深灰
          600: '#525252',        // 深灰
          700: '#404040',        // 很深灰
          800: '#262626',        // 极深灰
          900: '#171717',        // 黑色
        },
        'ww-orange': {
          DEFAULT: '#525252',    // 深灰（主按钮色）
          50: '#fafafa',         // 极浅
          100: '#f5f5f5',        // 很浅
          200: '#e5e5e5',        // 浅
          300: '#d4d4d4',        // 中浅
          400: '#a3a3a3',        // 中灰（浅按钮）
          500: '#525252',        // 深灰（主按钮色）
          600: '#404040',        // 更深（hover）
          700: '#262626',        // 极深（active）
          800: '#171717',        // 很深
          900: '#0a0a0a',        // 极深
        },
        'ww-amber': {
          DEFAULT: '#525252',    // 深灰（辅助按钮色）
          50: '#ffffff',         // 纯白
          100: '#fafafa',        // 极浅灰
          200: '#f5f5f5',        // 浅背景
          300: '#e5e5e5',        // 浅灰
          400: '#a3a3a3',        // 中灰
          500: '#525252',        // 深灰（默认）
          600: '#404040',        // 更深
          700: '#262626',        // 极深
          800: '#171717',        // 很深
          900: '#0a0a0a',        // 极深
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Roboto Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 27% 37%, hsla(0, 0%, 45%, 0.08) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(0, 0%, 50%, 0.08) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(0, 0%, 47%, 0.08) 0px, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(163, 163, 163, 0.15)',     // 中灰光晕
        'glow': '0 0 20px rgba(163, 163, 163, 0.18)',
        'glow-lg': '0 0 30px rgba(163, 163, 163, 0.22)',
        'inner-glow': 'inset 0 0 20px rgba(163, 163, 163, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(163, 163, 163, 0.12), 0 0 10px rgba(163, 163, 163, 0.06)' },
          '100%': { boxShadow: '0 0 10px rgba(163, 163, 163, 0.22), 0 0 20px rgba(163, 163, 163, 0.15)' },
        },
      },
    },
  },
  plugins: [],
}
