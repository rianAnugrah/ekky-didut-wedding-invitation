// app/fonts.js
import localFont from 'next/font/local'

export const headingFont = localFont({
  src: '../public/fonts/Trattatello.ttf',
  display: 'swap',
  variable: '--font-heading', // Optional: for CSS variable usage
})

export const bodyFont = localFont({
  src: '../public/fonts/NHaasGroteskTXPro-55Rg.ttf',
  display: 'swap',
  variable: '--font-body', // Optional: for CSS variable usage
})