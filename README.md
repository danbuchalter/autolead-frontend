# Auto-Lead Landing Page - React/Next.js Component

This is a fully functional React TypeScript component generated from the AutoLead landing page design.

## Files Included

### Core Component
- **`autolead.tsx`** - Main React component with all sections and form handling
  - Fully typed with TypeScript
  - Form state management using React hooks
  - Form submission handling
  - Responsive layout with Tailwind CSS
  - Client-side rendering ('use client' directive for Next.js)

### Next.js Page
- **`page.tsx`** - Next.js app directory page component
  - Wraps the AutoLeadLandingPage component
  - Includes metadata for SEO (title, description, keywords, OpenGraph)
  - Ready to use in a Next.js 13+ app directory structure

### Styling
- **`tailwind.config.ts`** - Tailwind CSS configuration
  - Custom font families (Inter, Poppins)
  - Custom color palette matching the design
  - Extended theme configuration

- **`globals.css`** - Global styles
  - Tailwind directives (@tailwind base, components, utilities)
  - Font imports from Google Fonts
  - Reusable utility classes (.btn-primary, .form-input, .card, etc.)
  - Smooth scrolling enabled

## Features

✅ **Complete Landing Page Sections:**
- Sticky Navigation Bar with links
- Hero Section with CTA button
- Features Grid (5 feature cards)
- Case Studies Section
- Testimonials Section
- About Us Section
- Contact Form with validation
- Footer with links

✅ **Interactive Elements:**
- Fully functional contact form
- Form state management
- Form validation
- Smooth scroll navigation
- Hover effects on buttons and links

✅ **Design System:**
- Color scheme: Dark theme with blue accents
- Typography: Inter and Poppins fonts
- Spacing and layout from original design
- Responsive container constraints

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Add Required Dependencies
```bash
npm install --save-dev tailwindcss postcss autoprefixer
```

### 3. Create Next.js Project Structure
```
app/
  ├── page.tsx          (provided)
  ├── layout.tsx        (create with metadata)
  └── globals.css       (provided)
components/
  └── AutoLeadLandingPage.tsx  (from autolead.tsx)
```

### 4. Sample layout.tsx
```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Auto-Lead',
  description: 'AI-Powered Telephone Systems',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 5. Configure Tailwind (if not already configured)
Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## Customization

### Modify Colors
Edit `tailwind.config.ts` to change colors:
```typescript
colors: {
  navy: '#your-color',
  'blue-accent': '#your-color',
  // ...
}
```

### Update Content
- Replace placeholder text in hero section, features, testimonials
- Update case study data
- Modify form fields as needed

### Add Form Submission
In `autolead.tsx`, update the `handleSubmit` function:
```typescript
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // Handle response
  } finally {
    setIsSubmitting(false);
  }
};
```

### Create API Route
Create `app/api/contact/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.json();
  // Process form submission
  return NextResponse.json({ success: true });
}
```

## Component Props
The main component is self-contained and requires no props. Form state is managed internally.

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- CSS Grid and Flexbox support

## Performance Notes
- Component uses 'use client' for client-side interactivity
- Lightweight and optimized CSS with Tailwind
- Smooth animations using CSS hover states
- Form validation on client-side

## Accessibility
- Semantic HTML (nav, section, form, etc.)
- Proper label associations on form inputs
- Focus state styling on interactive elements
- Readable text contrast (white on black)

## Next Steps
1. Copy files to your Next.js project
2. Install dependencies
3. Update form submission logic
4. Add actual content to feature cards, testimonials, metrics
5. Deploy to Vercel or your hosting platform
