/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        blue: '#0070f3',
        chicBlue: '#3B82F6',
        textDark: '#222222',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      fontSize: {
        'display': ['2.5rem', { lineHeight: '1.2' }],    // 例: 40px
        'heading-lg': ['2rem', { lineHeight: '1.25' }], // 例: 32px
        'heading-md': ['1.5rem', { lineHeight: '1.3' }], // 例: 24px
        'body-lg': ['1.125rem', { lineHeight: '1.7' }], // 例: 18px
        'body-base': ['1rem', { lineHeight: '1.8' }],    // 例: 16px
        'body-sm': ['0.875rem', { lineHeight: '1.6' }], // 例: 14px
        'header-title': '20px',        // ヘッダーのサイトタイトル用
        'header-nav': '16px',          // ヘッダーのナビゲーションリンク用
        'main-heading': '20px',        // "Hey, I'm Soma!" 用
        'section-title-sm': '16px',    // "About" 等の小さなセクションタイトル用
        'section-title-lg': '32px',    // "Career", "Projects", "Articles" 等の大きなセクションタイトル用
        'item-title': '20px',          // Career/Project/Article の各アイテムのタイトル用
        'item-meta': '14px',           // 日付や技術スタック等の補足情報用
      },
      spacing: {
        'section-y': '5rem',     // 4remから5rem (80px) に変更
        'content-gap': '2rem',   // 例: 32px
        'item-gap': '1rem',      // 例: 16px
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.textDark'),
            a: {
              color: theme('colors.chicBlue'),
              textDecoration: 'none', // デフォルトの下線を削除
              '&:hover': {
                color: theme('colors.chicBlue'), // ホバー時の色はそのままか、少し濃くしても良い
                textDecoration: 'underline', // ホバー時に下線を表示
              },
            },
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.gray.700'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            fontSize: '1rem', // typography プラグインの基本フォントサイズ
            lineHeight: '1.8', // typography プラグインの基本行の高さ
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
          },
        },
      }),
      animation: {
        wave: 'wave 2.5s infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '40%': { transform: 'rotate(14deg)' },
          '50%': { transform: 'rotate(-4deg)' },
          '60%': { transform: 'rotate(10deg)' },
          '70%': { transform: 'rotate(0deg)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

