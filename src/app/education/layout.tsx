import type { Metadata } from 'next';

export const metadata: Metadata = {
  // The root layout's title.template already appends "| Ketul Chhaya".
  title: 'Education Details',
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
