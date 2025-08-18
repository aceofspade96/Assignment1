// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // your global styles, if any
import styles from './layout.module.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <main className="container py-4">{children}</main>
      </body>
    </html>
  );
}
