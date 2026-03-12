import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bookmark Manager',
  description: 'Manage your favorite web links efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">🔖 Bookmark Manager</h1>
            <p className="text-gray-600">Save, organize, and find your favorite links</p>
          </header>
          <main>{children}</main>
          <footer className="mt-20 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Bookmark Manager. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
