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
  metadataBase: new URL('https://ketulchhaya.com'), // Replace with your actual domain
  title: {
    default: 'Ketul K. Chhaya - Software Engineer & Full-Stack Developer',
    template: '%s | Ketul K. Chhaya',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  description:
    'Software Engineer with 2+ years of experience specializing in C++, Python, React.js, and machine learning. Currently pursuing M.S. in Computer Science at UMBC. Expert in parallel computing, cryptography, and scalable web applications.',
  keywords: [
    'Ketul Chhaya',
    'Software Engineer',
    'Full-Stack Developer',
    'C++',
    'Python',
    'React.js',
    'Machine Learning',
    'Parallel Computing',
    'Cryptography',
    'UMBC',
    'Computer Science',
    'Web Development',
    'Node.js',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Ketul K. Chhaya' }],
  creator: 'Ketul K. Chhaya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Ketul K. Chhaya - Software Engineer & Full-Stack Developer',
    description:
      'Software Engineer with expertise in C++, Python, React.js, and machine learning. Currently pursuing M.S. in Computer Science at UMBC. Specializing in parallel computing and scalable applications.',
    siteName: 'Ketul K. Chhaya Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ketul K. Chhaya - Software Engineer & Full-Stack Developer Portfolio',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ketul K. Chhaya - Software Engineer & Full-Stack Developer',
    description:
      'Software Engineer with expertise in C++, Python, React.js, and machine learning. Currently pursuing M.S. in Computer Science at UMBC.',
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
