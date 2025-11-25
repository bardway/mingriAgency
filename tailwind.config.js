/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canva "Sliver of Silver" 配色方案
        // 核心色值: #E5DACE (Ivory 象牙白), #BCBEC0 (Pewter 锡灰), #5C5350 (Gray 灰), #3C3630 (Ebony 乌木黑)
        'ww-light': {
          DEFAULT: '#E5DACE',    // Ivory - 象牙白（主背景）
          50: '#ffffff',         // 纯白
          100: '#f8f5f2',        // 极浅象牙
          200: '#f0ebe6',        // 很浅象牙
          300: '#E5DACE',        // Ivory（Canva 核心色 1）
          400: '#dcd1c3',        // 浅象牙
          500: '#d3c8ba',        // 中浅象牙
          600: '#cab $b1',       // 中象牙
          700: '#b5aa9c',        // 中深象牙
          800: '#9a9088',        // 深象牙
          900: '#7f7673',        // 很深象牙
        },
        'ww-slate': {
          DEFAULT: '#5C5350',    // Gray - 深灰（主文字色）
          50: '#fafafa',         // 极浅灰
          100: '#f5f5f5',        // 很浅灰
          200: '#e8e8e8',        // 浅灰
          300: '#d4d4d4',        // 中浅灰
          400: '#BCBEC0',        // Pewter（Canva 核心色 2）
          500: '#a3a5a7',        // 中灰
          600: '#8a8c8e',        // 中深灰
          700: '#717375',        // 深灰
          800: '#5C5350',        // Gray（Canva 核心色 3）
          900: '#3C3630',        // Ebony（Canva 核心色 4）
        },
        'ww-orange': {
          DEFAULT: '#5C5350',    // Gray - 深灰（主按钮色，更深更醒目）
          50: '#fafafa',         // 极浅
          100: '#f2f2f3',        // 很浅
          200: '#e5e6e7',        // 浅
          300: '#d8d9db',        // 中浅
          400: '#BCBEC0',        // Pewter（浅按钮）
          500: '#5C5350',        // Gray（主按钮色，Canva 核心色 3）✨
          600: '#4a4440',        // 更深（hover）
          700: '#3C3630',        // Ebony（active，Canva 核心色 4）
          800: '#2f2b27',        // 很深
          900: '#1f1c19',        // 极深
        },
        'ww-amber': {
          DEFAULT: '#5C5350',    // Gray - 深灰（辅助按钮色）
          50: '#ffffff',         // 纯白
          100: '#f8f5f2',        // 极浅象牙
          200: '#E5DACE',        // Ivory（浅背景，Canva 核心色 1）
          300: '#d4d5d6',        // 浅灰
          400: '#BCBEC0',        // Pewter（Canva 核心色 2）
          500: '#5C5350',        // Gray（默认，Canva 核心色 3）✨
          600: '#4a4440',        // 更深
          700: '#3C3630',        // Ebony（Canva 核心色 4）
          800: '#2f2b27',        // 很深
          900: '#1f1c19',        // 极深
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Roboto Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 27% 37%, hsla(25, 30%, 40%, 0.08) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(30, 25%, 45%, 0.08) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(28, 28%, 42%, 0.08) 0px, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(188, 190, 192, 0.15)',     // 锡灰光晕
        'glow': '0 0 20px rgba(188, 190, 192, 0.18)',
        'glow-lg': '0 0 30px rgba(188, 190, 192, 0.22)',
        'inner-glow': 'inset 0 0 20px rgba(188, 190, 192, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(188, 190, 192, 0.12), 0 0 10px rgba(188, 190, 192, 0.06)' },
          '100%': { boxShadow: '0 0 10px rgba(188, 190, 192, 0.22), 0 0 20px rgba(188, 190, 192, 0.15)' },
        },
      },
    },
  },
  plugins: [],
}
