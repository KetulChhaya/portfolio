# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Responsive Design**: Mobile-first approach with smooth animations
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **SEO Optimized**: Proper metadata and Open Graph tags

## Pages

### Home Page (`/`)
- Hero section with animated background
- About section
- Education overview with link to detailed page
- Technical skills and stack
- Work experience timeline
- Projects showcase
- Contact form
- Music player integration

### Education Details Page (`/education`)
- **Academic Transcript**: Detailed semester-wise course information with grades, credits, and GPA
- **Activities & Leadership**: Technical activities, hackathon participation, open source contributions, and leadership roles
- **Recognition & Achievements**: Academic excellence, technical competitions, and professional recognition
- **Sleek Design**: Black and white theme with subtle UI elements using Tailwind CSS and shadcn/ui

## Navigation

The main navigation includes a "View Full Details" button in the Education section that takes users to the comprehensive education details page.

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── education/         # Education details page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── layout/            # Layout components (Navigation)
│   ├── sections/          # Page sections
│   │   ├── Education.tsx  # Education overview
│   │   └── EducationDetails.tsx  # Detailed education page
│   ├── providers/         # Context providers
│   └── ui/                # shadcn/ui components
└── lib/                   # Utilities and constants
    ├── constants/         # Animation constants
    └── types/             # TypeScript types
```

## Customization

### Education Data
Update the education information in `src/components/sections/EducationDetails.tsx`:
- Modify `educationData` array for academic details
- Update `activitiesData` for extracurricular activities
- Customize `recognitionData` for achievements

### Styling
- Theme colors are defined in `tailwind.config.js`
- Custom CSS classes in `src/app/globals.css`
- Component-specific styles using Tailwind CSS

## Deployment

The project is configured for deployment on Vercel, Netlify, or any other hosting platform that supports Next.js.

## License

MIT License - feel free to use this template for your own portfolio!
