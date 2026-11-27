import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  PhoneCall,
  Wrench,
  Clock,
  CheckCircle2,
  PackageCheck,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';
import { CONTACT_INFO, SERVICE_CENTERS } from '../data/siteData';

const SERVICE_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Manufacturer Warranty Support',
    description:
      'Every DONGFENG vehicle distributed by MAHY Khoory Automotive is backed by official factory warranty coverage and certified diagnostic care.',
  },
  {
    icon: PhoneCall,
    title: 'Roadside Assistance',
    description:
      'Dedicated UAE customer support and roadside assistance coordination via our toll-free hotline 800-6249 (MAHY) whenever unexpected assistance is needed.',
  },
  {
    icon: Wrench,
    title: 'Factory-Trained Technicians',
    description:
      'Specialized EV, hybrid, and petrol powertrain technicians equipped with OEM diagnostic instrumentation across Dubai and Abu Dhabi.',
  },
  {
    icon: PackageCheck,
    title: 'Genuine DONGFENG Parts',
    description:
      'Supported by an on-site Central Parts Department at our Al Quoz 3 hub to minimize turnaround times and preserve factory safety standards.',
  },
];

export default function AfterSales() {
  useEffect(() => {
    document.title = 'After Sales & Service | DONGFENG UAE';
  }, []);

  return (
    <div>
      <Hero
        compact
        eyebrow="After Sales Care"
        title="Dedicated Ownership Support"
        subtitle="Comprehensive service centers, genuine parts availability, warranty care, and roadside assistance across Dubai and Abu Dhabi."
        image="/images/about/showroom-uae.jpg"
        primaryCta={{ label: 'Contact Service Team', to: '/contact' }}
        secondaryCta={{ label: 'Explore Models', to: '/models' }}
      />

      {/* Warranty & Roadside & Service Pillars */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">
              Ownership Promise
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
              Engineered for Peace of Mind Beyond Delivery
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
              MAHY Khoory Automotive delivers a complete ownership experience built around
              transparent servicing, skilled diagnostics, and responsive support across the Emirates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-8 bg-[#F5F6F8] border border-zinc-200 hover:border-zinc-400 transition-colors"
                >
                  <div className="w-11 h-11 flex items-center justify-center bg-[#0A0B0D] mb-5">
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

      {/* Customer Ownership Experience */}
      <section className="bg-[#0A0B0D] text-white py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
              Customer Ownership Experience
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              40,000 Sq. Ft. Service Excellence in Dubai &amp; Abu Dhabi
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Our flagship Al Quoz Industrial Area 3 service hub in Dubai is purpose-built with
              high-capacity service bays, EV/PHEV high-voltage safety tooling, and a central genuine
              parts warehouse — complemented by our dedicated Abu Dhabi facility in Musaffah
              Industrial.
            </p>
            <ul className="space-y-3 pt-2 text-sm text-zinc-200">
              {[
                'Periodic maintenance and multi-point safety inspections',
                'Specialized diagnostics for EV, REEV, PHEV, and petrol powertrains',
                'Convenient appointment scheduling via 800-6249 (MAHY)',
                'Customer lounge and transparent service consultation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8102E] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 space-y-5">
            {SERVICE_CENTERS.map((center) => (
              <div
                key={center.id}
                className="p-7 bg-[#14161A] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8102E]">
                    {center.emirate} Service Hub
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5" /> {center.hours}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold">{center.name}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{center.highlights}</p>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5 pt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>{center.address}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Center Direct Contact */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 sm:p-10 bg-[#F5F6F8] border border-zinc-200">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">
              Service Support Desk
            </p>
            <h3 className="mt-2 text-2xl font-extrabold text-[#111215]">
              Need Service or Warranty Assistance?
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Call our toll-free care line at <strong>{CONTACT_INFO.phone}</strong> or email{' '}
              <strong>{CONTACT_INFO.email}</strong>.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors shrink-0"
          >
            <span>Book Service Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
