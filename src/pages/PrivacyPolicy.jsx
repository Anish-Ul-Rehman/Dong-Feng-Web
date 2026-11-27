import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../data/siteData';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | DONGFENG UAE';
  }, []);

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
          Legal Information
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          This web application is a frontend-only demonstration showcase inspired by DONGFENG UAE (
          {CONTACT_INFO.distributorName}).
        </p>

        <div className="space-y-4 text-sm text-zinc-600 leading-relaxed border-t border-zinc-200 pt-6">
          <h2 className="text-lg font-bold text-[#111215]">1. Demonstration Forms Only</h2>
          <p>
            All Test Drive and Inquiry forms on this website perform client-side validation only.
            No personal data, contact details, or form submissions are transmitted to external
            servers or stored in any database.
          </p>

          <h2 className="text-lg font-bold text-[#111215]">2. Official UAE Contact Channels</h2>
          <p>
            For official vehicle inquiries or customer privacy matters with {CONTACT_INFO.distributorName},
            please contact {CONTACT_INFO.email} or call {CONTACT_INFO.phone}.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-[#111215] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
