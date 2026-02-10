import AutoLeadLandingPage from '@/components/AutoLeadLandingPage';

export const metadata = {
  title: 'Auto-Lead | AI-Powered Telephone Systems',
  description:
    '24/7 AI receptionists that answer calls, book appointments, and handle FAQs—never miss a lead again.',
  keywords: [
    'AI receptionist',
    'telephone system',
    'appointment scheduling',
    'lead management',
  ],
  openGraph: {
    title: 'Auto-Lead | AI-Powered Telephone Systems',
    description:
      '24/7 AI receptionists that answer calls, book appointments, and handle FAQs.',
    type: 'website',
  },
};

export default function Page() {
  return <AutoLeadLandingPage />;
}
