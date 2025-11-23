import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ketulchhaya.com'), // Replace with your actual domain
  title: {
    default: 'Ketul Chhaya',
    template: '%s | Ketul Chhaya',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  description:
    'An engineer who thinks in products, builds systems, and loves solving real problems at scale. Software Engineer with expertise in JavaScript, Python, and AWS. Currently pursuing M.S. in Computer Science at UMBC.',
  keywords: [
    'Ketul Chhaya',
    'Software Engineer',
    'Full-Stack Developer',
    'JavaScript',
    'Python',
    'React.js',
    'Machine Learning',
    'Parallel Computing',
    'Cryptography',
    'AWS',
    'UMBC',
    'Computer Science',
    'Web Development',
    'Node.js',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Ketul Chhaya' }],
  creator: 'Ketul Chhaya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ketul Chhaya',
    description:
      'An engineer who thinks in products, builds systems, and loves solving real problems at scale. Software Engineer with expertise in JavaScript, Python, and AWS. Currently pursuing M.S. in Computer Science at UMBC.',
    siteName: 'Ketul Chhaya Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ketul Chhaya Portfolio',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ketul Chhaya',
    description:
      'An engineer who thinks in products, builds systems, and loves solving real problems at scale. Software Engineer with expertise in JavaScript, Python, and AWS. Currently pursuing M.S. in Computer Science at UMBC.',
    creator: '@ketulchhaya',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
