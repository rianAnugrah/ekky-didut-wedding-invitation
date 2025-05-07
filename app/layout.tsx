// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { headingFont, bodyFont } from './fonts'

export const metadata: Metadata = {
  title: 'Ekky 💍 Didut Wedding Invitation',
  description: 'We are excited to have you join our celebration',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"  className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className={bodyFont.className}>
        <div className="">
          {children}
        </div>
      </body>
    </html>
  );
}