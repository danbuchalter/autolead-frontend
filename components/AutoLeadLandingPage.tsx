'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const FEATURES = [
  {
    title: '24/7 AI Receptionists',
    description:
      'Always-on virtual receptionists that handle every inbound call without breaks or downtime.',
  },
  {
    title: 'Multi-Call Handling',
    description:
      'Answer up to 20 calls simultaneously so no potential customer is ever left waiting on hold.',
  },
  {
    title: 'Smart Appointment Booking',
    description:
      'Book, reschedule, and confirm appointments directly from calls, synced with your calendar.',
  },
  {
    title: 'Instant FAQ Automation',
    description:
      'Automate common questions about pricing, hours, and services with accurate, consistent answers.',
  },
  {
    title: 'Seamless Human Handoff',
    description:
      'Escalate complex conversations to your team instantly, with full context preserved.',
  },
] as const;

const CASE_STUDY_METRICS = [
  {
    label: 'Increase in monthly bookings',
    value: '+42%',
  },
  {
    label: 'Calls answered on the first ring',
    value: '95%',
  },
  {
    label: 'Missed calls after hours',
    value: '0',
  },
] as const;

const TESTIMONIALS = [
  {
    name: 'Gavin Buchalter',
    role: 'Owner, Eyelink Optometry',
    quote:
      'Auto-Lead has virtually eliminated our missed calls. Our team can finally focus on patients instead of the phone.',
  },
  {
    name: 'Michael Grant',
    role: 'Clinic Manager, CityCare Medical',
    quote:
      'We saw an immediate jump in booked appointments once the AI started handling inbound calls.',
  },
  {
    name: 'Lauren Chen',
    role: 'Founder, BrightSmile Dental',
    quote:
      'Patients love that they can call any time and still get bookings and answers without waiting.',
  },
] as const;

export default function AutoLeadLandingPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error('Contact form submission failed:', data);
        alert(
          data?.message ||
            'Something went wrong while sending your message. Please try again.'
        );
        return;
      }

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      alert('Your message has been sent. We will respond within 24 hours.');
    } catch (error) {
      console.error('Unexpected error submitting contact form:', error);
      alert(
        'An unexpected error occurred while sending your message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-8 h-[70px]">
          <div className="text-white font-bold text-2xl font-inter">
            Auto-Lead
          </div>
          <div className="flex items-center gap-8">
            <a href="#home" className="text-white text-sm font-medium font-inter hover:opacity-80">
              Home
            </a>
            <a href="#features" className="text-white text-sm font-medium font-inter hover:opacity-80">
              Features
            </a>
            <a href="#case-studies" className="text-white text-sm font-medium font-inter hover:opacity-80">
              Case Studies
            </a>
            <a href="#about" className="text-white text-sm font-medium font-inter hover:opacity-80">
              About
            </a>
            <a href="#contact" className="text-white text-sm font-medium font-inter hover:opacity-80">
              Contact
            </a>
          </div>
          <a
            href="https://calendar.app.google/yEFeXjLTBecL7XCc6"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-900 hover:bg-blue-800 border border-blue-500 text-white px-6 py-3 rounded text-sm font-semibold font-inter transition inline-flex items-center justify-center"
          >
            Book a Free Demo
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-black py-24 px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-8">
          <h1 className="text-white text-center font-poppins text-6xl font-bold leading-tight">
            AI-Powered Telephone Systems That Never Sleep
          </h1>
          <p className="text-blue-400 text-center font-inter text-lg">
            24/7 AI receptionists that answer up to 20 calls simultaneously, book
            appointments, and handle FAQs—so you never miss a lead
          </p>
          <a
            href="https://calendar.app.google/yEFeXjLTBecL7XCc6"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-900 hover:bg-blue-800 border border-blue-500 text-white px-8 py-3 rounded text-base font-semibold font-inter transition inline-flex items-center justify-center"
          >
            Book a Free Demo
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-black py-32 px-8">
        <div className="max-w-full">
          <h2 className="text-white text-center font-poppins text-5xl font-bold mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-5 gap-5 max-w-full justify-between">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-950 border border-gray-600 rounded-xl p-5 flex flex-col gap-4"
              >
                <h3 className="text-white font-poppins text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-blue-400 text-sm font-inter leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="bg-black py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-center font-poppins text-5xl font-bold mb-12">
            Real Results
          </h2>
          <div className="bg-gray-950 border border-gray-700 rounded-xl p-10 flex flex-col gap-6">
            <h3 className="text-white font-poppins text-2xl font-semibold">
              Eyelink Optometry
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {CASE_STUDY_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center text-center gap-1"
                >
                  <div className="text-white font-poppins text-2xl font-semibold">
                    {metric.value}
                  </div>
                  <div className="text-gray-400 font-inter text-xs">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-blue-400 font-inter text-sm leading-relaxed">
              Increased bookings and eliminated missed calls with 24/7 AI support.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-black py-32 px-8">
        <div className="max-w-full">
          <h2 className="text-white text-center font-poppins text-5xl font-bold mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 gap-4 max-w-full">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-950 border border-gray-700 rounded-xl p-8 flex flex-col gap-5"
              >
                <p className="text-blue-400 text-sm font-inter leading-relaxed">
                  “{testimonial.quote}”
                </p>
                <div className="flex flex-col">
                  <span className="text-white font-inter text-sm font-semibold">
                    {testimonial.name}
                  </span>
                  <span className="text-gray-400 font-inter text-xs">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-black py-32 px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-white text-center font-poppins text-5xl font-bold">
            About Auto-Lead
          </h2>
          <p className="text-blue-400 text-center font-inter text-base leading-relaxed">
            Auto-Lead revolutionizes how businesses manage customer communications
            with 24/7 AI-powered telephone systems.
          </p>
          <p className="text-blue-400 text-center font-inter text-base leading-relaxed">
            Advanced natural language processing handles appointment scheduling, FAQ
            responses, and seamless human handoffs.
          </p>
          <p className="text-blue-400 text-center font-inter text-base leading-relaxed">
            Our mission: capture every lead, answer every call, and help your
            business grow without limits.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="bg-black py-32 px-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-white text-center font-poppins text-5xl font-bold mb-12">
            Get in Touch
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-950 border border-gray-700 rounded-xl p-12 flex flex-col gap-5"
          >
            {/* Full Name Field */}
            <div>
              <label className="text-white font-inter text-sm font-semibold block mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full h-11 bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white font-inter placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="text-white font-inter text-sm font-semibold block mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full h-11 bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white font-inter placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="text-white font-inter text-sm font-semibold block mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full h-11 bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white font-inter placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="(123) 456-7890"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="text-white font-inter text-sm font-semibold block mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full h-11 bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white font-inter placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="What is this about?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="text-white font-inter text-sm font-semibold block mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-3 text-white font-inter placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 border border-blue-500 text-white rounded font-inter font-semibold transition"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {/* Support Note */}
            <p className="text-blue-400 text-center font-inter text-xs">
              Our team will respond within 24 hours
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-black py-8 px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-white text-center font-inter text-xs">
            © 2026 Auto-Lead. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#privacy" className="text-white font-inter text-xs hover:opacity-80">
              Privacy Policy
            </a>
            <a href="#terms" className="text-white font-inter text-xs hover:opacity-80">
              Terms of Service
            </a>
            <a href="#contact" className="text-white font-inter text-xs hover:opacity-80">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
