import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, Clock, ChevronDown, Wrench } from 'lucide-react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import { CONTACT_INFO, SERVICE_CENTERS, SHOWROOMS } from '../data/siteData';

const FAQS = [
  {
    q: 'Where are DONGFENG UAE showrooms located?',
    a: 'You can visit MAHY Khoory Automotive showrooms at Oasis Mall (Sheikh Zayed Road, Dubai), Deira (Dubai), Airport Road (Abu Dhabi), and Musaffah Industrial (Abu Dhabi).',
  },
  {
    q: 'How can I book a test drive?',
    a: 'Use the Book Test Drive form on our Homepage or any individual vehicle model page, or call our toll-free hotline at 800-6249 (MAHY).',
  },
  {
    q: 'Where are authorized service centers located?',
    a: 'Authorized after-sales and genuine spare parts support are available at Al Quoz Industrial Area 3 in Dubai (40,000 sq. ft. facility) and Musaffah Industrial in Abu Dhabi.',
  },
  {
    q: 'Does this demonstration website transmit my form data?',
    a: 'No. This React and Tailwind CSS website is strictly frontend-only for demonstration purposes and validates forms locally without transmitting or storing personal data.',
  },
];

export default function Contact() {
  const [activeCity, setActiveCity] = useState('All');
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = 'Contact Us | DONGFENG UAE – MAHY Khoory Automotive';
  }, []);

  const filteredShowrooms =
    activeCity === 'All'
      ? SHOWROOMS
      : SHOWROOMS.filter((s) => s.emirate === activeCity);

  return (
    <div>
      <Hero
        compact
        eyebrow="Get In Touch"
        title="Contact DONGFENG UAE"
        subtitle="Connect with our Dubai and Abu Dhabi teams for vehicle inquiries, showroom appointments, or service support."
        image="/images/about/showroom-uae.jpg"
        primaryCta={{ label: 'Book Test Drive', to: '/#test-drive' }}
        secondaryCta={null}
      />

      {/* Contact Intro + Form */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
                MAHY Khoory Automotive
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
                We’re Here to Assist You
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                Whether you have questions about DONGFENG 008, 007, HUGE, MAGE, SHINE, Z9, or
                RICH 7, or need after-sales assistance, reach our UAE customer care desk below.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-5 bg-[#F5F6F8] border border-zinc-200 flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#C8102E] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Toll-Free Phone
                  </p>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="text-base font-extrabold text-[#111215] hover:text-[#C8102E] transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="p-5 bg-[#F5F6F8] border border-zinc-200 flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#C8102E] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Email Support
                  </p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-base font-extrabold text-[#111215] hover:text-[#C8102E] transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="p-5 bg-[#F5F6F8] border border-zinc-200 flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#C8102E] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Showroom Hours
                  </p>
                  <p className="text-sm font-medium text-[#111215] mt-0.5">
                    {CONTACT_INFO.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Showrooms & Service Centers Directory + Static Map Overview */}
      <section className="bg-[#0A0B0D] text-white py-20 lg:py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
                Locations Across UAE
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold">
                Showrooms &amp; Service Hubs
              </h2>
            </div>

            <div className="flex gap-2">
              {['All', 'Dubai', 'Abu Dhabi'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setActiveCity(city)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                    activeCity === city
                      ? 'bg-[#C8102E] text-white'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredShowrooms.map((s) => (
              <div key={s.id} className="p-6 bg-[#14161A] border border-white/10 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8102E] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{s.emirate} Showroom</span>
                </p>
                <h3 className="text-base font-extrabold">{s.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{s.address}</p>
                <p className="text-xs text-zinc-300 pt-2 border-t border-white/10">{s.hours}</p>
              </div>
            ))}
          </div>

          {/* Service Centers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {SERVICE_CENTERS.map((center) => (
              <div key={center.id} className="p-6 bg-[#111317] border border-white/10 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E] flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  <span>Service Center · {center.emirate}</span>
                </p>
                <h3 className="text-lg font-extrabold">{center.name}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{center.highlights}</p>
                <p className="text-xs text-zinc-400">{center.address}</p>
              </div>
            ))}
          </div>

          {/* Static UAE Coverage Map Card */}
          <div className="mt-10 p-8 bg-[#14161A] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">
                Emirates Coverage Overview
              </p>
              <h3 className="mt-1.5 text-xl font-extrabold">
                Dubai &amp; Abu Dhabi Network
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-2xl">
                Serving customers across Sheikh Zayed Road (Oasis Mall), Deira, Al Quoz 3,
                Abu Dhabi Airport Road, and Musaffah Industrial.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0 text-center">
              <div className="px-5 py-3 bg-[#0A0B0D] border border-white/10">
                <p className="text-lg font-extrabold text-white">Dubai</p>
                <p className="text-[11px] text-zinc-400">2 Showrooms · 1 Service Hub</p>
              </div>
              <div className="px-5 py-3 bg-[#0A0B0D] border border-white/10">
                <p className="text-lg font-extrabold text-white">Abu Dhabi</p>
                <p className="text-[11px] text-zinc-400">2 Showrooms · 1 Service Hub</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-[#F5F6F8] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#111215]">
              Quick Answers
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="bg-white border border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#111215]">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-[#C8102E] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
