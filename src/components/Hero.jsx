import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import HeroVideoCanvas from './HeroVideoCanvas';

export default function Hero({
  eyebrow = 'DONGFENG 008 · FLAGSHIP 6-SEATER',
  title = 'Room For Everything You Love',
  subtitle = 'Experience spacious three-row luxury, intelligent hybrid efficiency, and 5-star C-NCAP safety engineered for modern families across the UAE.',
  image = '/images/hero/hero-008.jpg',
  playVideo = false,
  primaryCta = { label: 'Explore 008', to: '/models/008' },
  secondaryCta = { label: 'Book Test Drive', to: '/#test-drive' },
  compact = false,
}) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-[#0A0B0D] text-white ${
        compact ? 'min-h-[46vh] md:min-h-[54vh]' : 'min-h-[78vh] lg:min-h-[86vh]'
      } flex items-end`}
    >
      {/* Video Reel on Homepage or Static Photography on Inner Pages */}
      {playVideo ? (
        <HeroVideoCanvas poster={image} />
      ) : (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center animate-slow-zoom"
        />
      )}

      {/* Dramatic Automotive Scrim */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0A0B0D] via-[#0A0B0D]/55 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-[#0A0B0D]/85 via-[#0A0B0D]/35 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-24 md:pb-20">
        <div className="max-w-2xl animate-fade-up">
          {eyebrow && (
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-0.5 w-8 bg-[#C8102E]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-200">
                {eyebrow}
              </span>
            </div>
          )}

          <h1
            className={`${
              compact
                ? 'text-3xl sm:text-4xl lg:text-5xl'
                : 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl'
            } font-extrabold tracking-tight leading-[1.05] text-white`}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {primaryCta && (
                <Link
                  to={primaryCta.to}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all"
                >
                  <span>{primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  to={secondaryCta.to}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/35 hover:border-white hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.16em] transition-all"
                >
                  <span>{secondaryCta.label}</span>
                </Link>
              )}
            </div>
          )}
        </div>

        {!compact && (
          <a
            href="#lineup"
            aria-label="Scroll to vehicle carousel"
            className="hidden md:inline-flex items-center gap-2 mt-12 text-xs uppercase tracking-[0.24em] text-zinc-400 hover:text-white transition-colors"
          >
            <span>Explore Lineup</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        )}
      </div>
    </section>
  );
}
