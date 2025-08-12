import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education Details | Ketul K. Chhaya',
  description: 'Comprehensive overview of my academic journey, achievements, and extracurricular involvement including detailed transcripts, activities, leadership, and recognition.',
  keywords: [
    'Education',
    'Academic Transcript',
    'University of Maryland Baltimore County',
    'Computer Science',
    'GPA',
    'Achievements',
    'Leadership',
    'Activities',
    'Portfolio'
  ],
};

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
