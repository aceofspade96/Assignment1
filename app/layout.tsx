// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; 
import { ReactNode } from 'react';
export const metadata = {
  title: '22239026 Assignment 1',
};

import CookieConsent from './Components/CookieConsent';  
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="container py-4">{children}</main>
        <CookieConsent />
      </body>
    </html>
  );
}
