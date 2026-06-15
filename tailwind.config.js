/** @type {import('tailwindcss').Config} */
module.exports = {
  // 扫描文件路径，确保你的类名能被 Tailwind 找到
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    // 保持默认的断点，也可自定义，这里沿用默认
    extend: {
      // ----- 自定义颜色 -----
      colors: {
        // 冰晶蓝系列（ice）
        ice: {
          50: '#f0f9ff',   // 极浅蓝，用于微妙背景
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',   // 主亮蓝
          500: '#0ea5e9',   // 标准蓝
          600: '#0284c7',
          700: '#0369a1',   // 深蓝
          800: '#075985',
          900: '#0c4a6e',   // 最深蓝，用作卡片底色
        },
        // 烛光暖色（用于点缀，对比蓝色）
        candle: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // 黑暗背景底色
        dark: {
          DEFAULT: '#0a0f1a',  // 页面背景
          800: '#111827',
          900: '#0b1120',
        },
      },

      // ----- 自定义字体（你可以在项目中引入）-----
      fontFamily: {
        // 无衬线体用 Inter 作为主字体，fallback 为系统字体
        sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
        // 日系/ACG 标题可用
        display: ['"M PLUS Rounded 1c"', 'sans-serif'],
        // 等宽字体（技术板块代码用）
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      // ----- 自定义动画和关键帧 -----
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(56, 189, 248, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.8)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
      },

      // ----- 自定义背景渐变或阴影（可选）-----
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0b1120 0%, #1e293b 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)',
      },
      boxShadow: {
        'blue-lg': '0 10px 25px -5px rgba(56, 189, 248, 0.3)',
      },
      borderRadius: {
        '2xl': '1rem',  // 让圆角更大些
      },
    },
  },

  // 插件：添加一些实用工具
  plugins: [
    // 1. 支持 line-clamp（截断文本）
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}