import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../data/siteData';

export default function TermsConditions() {
  useEffect(() => {
    document.title = 'Terms & Conditions | DONGFENG UAE';
  }, []);

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
          Legal Information
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Please review the demonstration terms governing the use of this frontend showcase website.
        </p>

        <div className="space-y-4 text-sm text-zinc-600 leading-relaxed border-t border-zinc-200 pt-6">
          <h2 className="text-lg font-bold text-[#111215]">1. Showcase Information</h2>
          <p>
            Vehicle imagery, exterior color previews, feature highlights, and downloadable demo
            brochure summaries are provided for visual demonstration purposes only. Final UAE
            specifications, trim configurations, and availability should be verified directly at{' '}
            {CONTACT_INFO.distributorName} showrooms.
          </p>

          <h2 className="text-lg font-bold text-[#111215]">2. No Online Sales or Transactions</h2>
          <p>
            This frontend-only application does not process bookings, payments, user accounts, or
            contractual agreements.
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
