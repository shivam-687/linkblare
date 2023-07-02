import { type Config } from "tailwindcss";

export default {
  corePlugins:{
    preflight: false
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xxl': '1500px'
      },
      colors: {
        'antd-bgBase': 'var(--color-antd-bgBase)',
        'antd-bgContainer': 'var(--color-antd-bgContainer)',
        'antd-bgContainer-disabled': 'var(--color-antd-bgContainer-disabled)',
        'antd-bgElevated': 'var(--color-antd-bgElevated)',
        'antd-bgLayout': 'var(--color-antd-bgLayout)',
        'antd-bgTextActive': 'var(--color-antd-bgTextActive)',
        'antd-bgTextHover': 'var(--color-antd-bgTextHover)',
        'antd-border': 'var(--color-antd-border)',
        'antd-borderBg': 'var(--color-antd-borderBg)',
        'antd-borderSecondary': 'var(--color-antd-borderSecondary)',
        'antd-fill': 'var(--color-antd-fill)',
        'antd-fillContent': 'var(--color-antd-fillContent)',
        'antd-fillContentHover': 'var(--color-antd-fillContentHover)',
        'antd-fillSecondary': 'var(--color-antd-fillSecondary)',
        'antd-fillAlter': 'var(--color-antd-fillAlter)',
        'antd-highlight': 'var(--color-antd-highlight)',
        'antd-icon': 'var(--color-antd-icon)',
        'antd-iconHover': 'var(--color-antd-iconHover)',
        'antd-linkActive': 'var(--color-antd-linkActive)',
        'antd-link': 'var(--color-antd-link)',
        'antd-linkHover': 'var(--color-antd-linkHover)',
        'antd-primary': 'var(--color-antd-primary)',
        'antd-primaryActive': 'var(--color-antd-primaryActive)',
        'antd-primaryBg': 'var(--color-antd-primaryBg)',
        'antd-primaryBgHover': 'var(--color-antd-primaryBgHover)',
        'antd-primaryBorderHover': 'var(--color-antd-primaryBorderHover)',
        'antd-primaryHover': 'var(--color-antd-primaryHover)',
        'antd-primaryText': 'var(--color-antd-primaryText)',
        'antd-primaryTextActive': 'var(--color-antd-primaryTextActive)',
        'antd-primaryTextHover': 'var(--color-antd-primaryTextHover)',
      }
    },
  },
  plugins: [],
} satisfies Config;
