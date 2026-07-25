import type { Metadata } from 'next';

export const metadata: Metadata = {
  // The root layout's title.template already appends "| Ketul Chhaya".
  title: 'Resume',
  description:
    'Resume of Ketul Chhaya — AI-focused backend engineer with expertise in TypeScript, Python, LLMs, and cloud infrastructure.',
};

export default function WebResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
