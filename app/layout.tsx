import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { ReactNode } from 'react';
import CookieConsentWrapper from './Components/CookieConsentWrapper';

export const metadata = {
  title: '22239026 Assignment 1',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="container py-4">{children}</main>
        <CookieConsentWrapper />
      </body>
    </html>
  );
}
