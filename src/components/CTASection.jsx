import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection({
  eyebrow = 'Experience DONGFENG UAE',
  title = 'Ready to Take the Wheel?',
  description = 'Book a test drive at our Dubai or Abu Dhabi showrooms and experience DONGFENG innovation firsthand.',
  primaryLabel = 'Book a Test Drive',
  primaryTo = '/#test-drive',
  secondaryLabel = 'Contact Our Team',
  secondaryTo = '/contact',
}) {
  return (
    <section className="bg-[#0A0B0D] text-white py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <Link
            to={primaryTo}
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
          >
            <span>{primaryLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondaryTo && (
            <Link
              to={secondaryTo}
              className="inline-flex items-center px-7 py-4 border border-white/25 hover:border-white hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
