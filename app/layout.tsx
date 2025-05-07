// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { headingFont, bodyFont } from './fonts'

export const metadata: Metadata = {
  title: 'Task Manager - Next.js with Airtable',
  description: 'CRUD application with Next.js App Router and Airtable',
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