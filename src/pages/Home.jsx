import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import Hero from '../components/Hero';
import VehicleCarousel from '../components/VehicleCarousel';
import ShowroomSection from '../components/ShowroomSection';
import TestDriveForm from '../components/TestDriveForm';
import { BRAND_STATS, CONTACT_INFO } from '../data/siteData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const [searchParams] = useSearchParams();
  const preselectedModel = searchParams.get('model') || '';
  const revealRef = useScrollReveal();
  const [activePromoTab, setActivePromoTab] = useState(0);

  useEffect(() => {
    document.title = 'DONGFENG UAE | Room For Everything You Love';
  }, []);

  const promoSpotlights = [
    {
      eyebrow: 'Flagship Family SUV',
      title: 'DONGFENG 008 — Room For Everything You Love',
      description:
        'Built around effortless three-row comfort, acoustic cabin serenity, and 5-star C-NCAP safety focus for families across Dubai and Abu Dhabi.',
      image: '/images/hero/hero-008.jpg',
      slug: '008',
      points: ['6-Seater Lounge Layout', 'Wide Panoramic Cockpit', '5-Star Safety Architecture'],
    },
    {
      eyebrow: 'Aerodynamic Fastback',
      title: 'DONGFENG 007 — Sculpted Electric Precision',
      description:
        'A sleek fastback silhouette with flush door handles, razor-sharp LED lighting, and an intelligent 360° / 540° driver assistance suite.',
      image: '/images/models/007.jpg',
      slug: '007',
      points: ['Fastback Aerodynamics', 'Flush Pop-Out Handles', 'Full ADAS Suite'],
    },
    {
      eyebrow: 'Electrified Agility',
      title: 'DONGFENG MAGE PHEV — Dynamic Hybrid Freedom',
      description:
        'Athletic crossover styling paired with plug-in hybrid responsiveness, delivering quiet city commutes and confident highway range.',
      image: '/images/models/mage-phev.jpg',
      slug: 'mage-phev',
      points: ['Plug-In Hybrid Efficiency', 'Dual-Screen Cockpit', 'Sport Crossover Stance'],
    },
  ];

  const activePromo = promoSpotlights[activePromoTab];

  return (
    <div ref={revealRef}>
      {/* 1. Video Hero Banner featuring DONGFENG Showcase */}
      <Hero
        playVideo
        eyebrow="DONGFENG 008 · FLAGSHIP SUV"
        title="Room For Everything You Love"
        subtitle="Discover the next chapter of modern automotive design in the UAE — combining spacious family luxury, intelligent safety, and electrified performance."
        image="/images/hero/hero-008.jpg"
        primaryCta={{ label: 'Explore 008', to: '/models/008' }}
        secondaryCta={{ label: 'Book Test Drive', to: '/#test-drive' }}
      />

      {/* 2. Car Images Slider Carousel with Left & Right Arrows */}
      <VehicleCarousel />

      {/* 3. Individual Vehicle Promotional Spotlight */}
      <section className="bg-[#111317] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="reveal flex flex-wrap items-center justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                Featured Spotlights
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
                Engineering Meets Everyday Luxury
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {promoSpotlights.map((item, idx) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setActivePromoTab(idx)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                    activePromoTab === idx
                      ? 'bg-[#C8102E] text-white'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.slug.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div
            key={activePromo.slug}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-fade-in"
          >
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">
                {activePromo.eyebrow}
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {activePromo.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {activePromo.description}
              </p>

              <ul className="space-y-2.5 pt-2">
                {activePromo.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-zinc-200">
                    <span className="h-1.5 w-1.5 bg-[#C8102E]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-3">
                <Link
                  to={`/models/${activePromo.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                >
                  <span>Explore Model</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#test-drive"
                  className="inline-flex items-center px-6 py-3.5 border border-white/25 hover:border-white text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                >
                  Book Test Drive
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-16/10 overflow-hidden border border-white/10 bg-[#0A0B0D]">
                <img
                  src={activePromo.image}
                  alt={activePromo.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Automotive Brand Statistics */}
      <section className="bg-[#0A0B0D] text-white py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BRAND_STATS.map((stat) => (
              <div
                key={stat.label}
                className="reveal border-l-2 border-[#C8102E] pl-5 py-1"
              >
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm font-bold uppercase tracking-wider text-zinc-200">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. About DONGFENG UAE Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="reveal lg:col-span-6 relative">
            <div className="aspect-4/3 overflow-hidden bg-zinc-900 border border-zinc-200">
              <img
                src="/images/about/showroom-uae.jpg"
                alt="DONGFENG UAE Showroom by MAHY Khoory Automotive"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#0A0B0D] text-white p-6 max-w-xs border border-white/10 shadow-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8102E]">
                Official Partner
              </p>
              <p className="mt-1.5 text-sm font-bold">
                {CONTACT_INFO.distributorName}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Delivering trusted automotive care across the Emirates since 1930.
              </p>
            </div>
          </div>

          <div className="reveal lg:col-span-6 space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">
              About DONGFENG UAE
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
              Built to Move the World Forward
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Represented exclusively in the UAE by <strong className="text-[#111215]">MAHY Khoory Automotive</strong>,
              DONGFENG brings next-generation electric, hybrid, SUV, sedan, and utility engineering
              to drivers across Dubai and Abu Dhabi.
            </p>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Backed by state-of-the-art service facilities in Al Quoz and Musaffah Industrial,
              every DONGFENG vehicle is supported by dedicated diagnostics, genuine parts availability,
              and customer-first ownership care.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F5F6F8] border border-zinc-200">
                <ShieldCheck className="w-5 h-5 text-[#C8102E] mb-2" />
                <p className="text-xs font-bold uppercase tracking-wider text-[#111215]">
                  Safety Engineering
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Advanced ADAS &amp; reinforced body structures.
                </p>
              </div>
              <div className="p-4 bg-[#F5F6F8] border border-zinc-200">
                <Sparkles className="w-5 h-5 text-[#C8102E] mb-2" />
                <p className="text-xs font-bold uppercase tracking-wider text-[#111215]">
                  Smart Mobility
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  EV, PHEV &amp; efficient turbo powertrains.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111215] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                <span>Our Story &amp; Vision</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Promotional Experience Section */}
      <section className="bg-[#0A0B0D] text-white py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">
              <Award className="w-4 h-4" />
              <span>Ownership &amp; Offers Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Tailored Ownership Across the Emirates
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              From seasonal showroom campaigns and bespoke corporate fleet solutions to dedicated
              40,000 sq. ft. after-sales support in Dubai and Abu Dhabi, explore what makes owning a
              DONGFENG effortless.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/offers"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                <span>Explore Offers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/after-sales"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/25 hover:border-white text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                <span>After Sales Care</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-[#14161A] border border-white/10">
              <Compass className="w-5 h-5 text-[#C8102E] mb-3" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Fleet Solutions</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Dedicated commercial and executive vehicle support tailored for UAE businesses.
              </p>
            </div>
            <div className="p-6 bg-[#14161A] border border-white/10">
              <ShieldCheck className="w-5 h-5 text-[#C8102E] mb-3" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Genuine Parts</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                On-site Central Parts Department ensuring prompt, factory-certified maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Showrooms & Service Centers */}
      <ShowroomSection />

      {/* 8. Book a Test Drive CTA + Form */}
      <section id="test-drive" className="bg-white py-20 lg:py-28 border-t border-zinc-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">
              Book a Test Drive
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
              Experience DONGFENG Behind the Wheel
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Select your preferred model and UAE showroom in Dubai or Abu Dhabi. Our product
              specialists will arrange a personalized driving experience.
            </p>
            <div className="p-6 bg-[#F5F6F8] border border-zinc-200 space-y-2 text-xs text-zinc-600">
              <p className="font-bold uppercase tracking-wider text-[#111215]">
                Direct Showroom Assistance
              </p>
              <p>Toll-Free: {CONTACT_INFO.phone}</p>
              <p>Email: {CONTACT_INFO.email}</p>
              <p>{CONTACT_INFO.hours}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <TestDriveForm key={preselectedModel} preselectedModel={preselectedModel} />
          </div>
        </div>
      </section>
    </div>
  );
}
