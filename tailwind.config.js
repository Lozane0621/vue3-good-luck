/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
// const { addIconSelectors } = require('@iconify/tailwind')
// const { addDynamicIconSelectors } = require('@iconify/tailwind')
import {iconsPlugin, getIconCollections} from '@egoist/tailwindcss-icons'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    typography,
    daisyui,
    // Iconify plugin, requires writing list of icon sets to load
    // addIconSelectors(['mdi', 'mdi-light']),
    // Iconify plugin
    // addDynamicIconSelectors(),
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all individual icon packages you have installed
      // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
      collections: getIconCollections(["carbon"]),
      // If you want to use all icons from @iconify/json, you can do this:
      // collections: getIconCollections("all"),
      // and the more recommended way is to use `dynamicIconsPlugin`, see below.
    }),
  ]
}
