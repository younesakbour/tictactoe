import './globals.css'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '✖ - Tic Tac Toe - Ｏ',
  description: 'Play this game with your friend.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-40% from-purple-700 to-sky-800 h-screen md:p-6 p-4">{children}</body>
    </html>
  )
}
