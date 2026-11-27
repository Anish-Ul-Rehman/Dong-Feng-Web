import { useEffect } from 'react';
import {
  ShieldCheck,
  Cpu,
  Sofa,
  Globe2,
  Lightbulb,
  Award,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';
import { BRAND_STATS, CONTACT_INFO } from '../data/siteData';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Advanced Safety Systems',
    description:
      'Engineered with high-strength safety cell architectures, multi-airbag protection, and intelligent ADAS suites including autonomous emergency braking and lane assistance.',
  },
  {
    icon: Cpu,
    title: 'Smart Driving Technology',
    description:
      'Panoramic digital cockpits, 360° / 540° transparent chassis camera views, and intelligent hybrid & electric powertrains designed for seamless connectivity.',
  },
  {
    icon: Sofa,
    title: 'Premium Comfort & Design',
    description:
      'Spacious, acoustically refined cabins crafted with soft-touch surfaces, ergonomic seating, and climate systems built to perform in demanding UAE summers.',
  },
  {
    icon: Globe2,
    title: 'Proven Global Reliability',
    description:
      'Decades of global automotive manufacturing heritage tested across extreme climates, rugged terrains, and international safety benchmarks.',
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'About Us | DONGFENG UAE – MAHY Khoory Automotive';
  }, []);

  return (
    <div>
      {/* Hero */}
      <Hero
        compact
        eyebrow="About DONGFENG UAE"
        title="Built to Move the World Forward"
        subtitle="Discover the global engineering heritage of DONGFENG and our exclusive UAE partnership with MAHY Khoory Automotive."
        image="/images/about/showroom-uae.jpg"
        primaryCta={{ label: 'Explore Vehicle Lineup', to: '/models' }}
        secondaryCta={{ label: 'Contact Us', to: '/contact' }}
      />

      {/* Why Choose DONGFENG */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">
              Why Choose DONGFENG?
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
              Four Pillars of Modern Automotive Excellence
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Every DONGFENG vehicle arriving in the United Arab Emirates is built around safety,
              intelligent technology, refined passenger comfort, and dependable global engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-8 bg-[#F5F6F8] border border-zinc-200 hover:border-zinc-400 transition-colors"
                >
                  <div className="w-11 h-11 flex items-center justify-center bg-[#0A0B0D] text-white mb-5">
                    <Icon className="w-5 h-5 text-[#C8102E]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#111215]">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation, Global Vision & Quality */}
      <section className="bg-[#0A0B0D] text-white py-20 lg:py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-[#14161A] border border-white/10 space-y-4">
              <Lightbulb className="w-6 h-6 text-[#C8102E]" />
              <h3 className="text-xl font-extrabold">Innovation &amp; Technology</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                From next-generation EV and range-extended architectures in the 007 and 008 to
                efficient plug-in hybrid systems in the MAGE PHEV, innovation drives every platform.
              </p>
            </div>

            <div className="p-8 bg-[#14161A] border border-white/10 space-y-4">
              <Compass className="w-6 h-6 text-[#C8102E]" />
              <h3 className="text-xl font-extrabold">Global Vision</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                DONGFENG’s global mobility vision connects intelligent electrification with practical
                everyday versatility for families, professionals, and commercial fleets worldwide.
              </p>
            </div>

            <div className="p-8 bg-[#14161A] border border-white/10 space-y-4">
              <Award className="w-6 h-6 text-[#C8102E]" />
              <h3 className="text-xl font-extrabold">Quality &amp; Reliability</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Rigorous multi-climate endurance validation and 5-star safety-focused structural
                engineering ensure peace of mind on every kilometer across the Emirates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14 pt-12 border-t border-white/10">
            {BRAND_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-zinc-400">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAHY Khoory Automotive Introduction */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">
              Official UAE Distributor
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
              {CONTACT_INFO.distributorName}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              As a division of the renowned <strong>{CONTACT_INFO.parentGroup}</strong>, MAHY
              Khoory Automotive brings nearly a century of commercial integrity and customer trust
              to DONGFENG ownership in the UAE.
            </p>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              With showrooms across Dubai and Abu Dhabi alongside a 40,000 sq. ft. dedicated service
              facility in Al Quoz 3 and service operations in Musaffah Industrial, customers benefit
              from seamless sales consultation and long-term maintenance care.
            </p>
            <ul className="space-y-2.5 pt-2 text-sm text-zinc-700">
              {[
                'Exclusive official DONGFENG distributor in the UAE',
                '4 showrooms across Dubai & Abu Dhabi',
                'Dedicated 40,000 sq. ft. Al Quoz service & parts hub',
                'Toll-free support via 800-6249 (MAHY)',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-16/11 overflow-hidden border border-zinc-200 bg-zinc-900">
              <img
                src="/images/interior/luxury-cabin.jpg"
                alt="DONGFENG Luxury Automotive Cabin"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
