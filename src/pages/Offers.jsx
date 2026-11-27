import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CalendarClock, ArrowRight, Building2 } from 'lucide-react';
import Hero from '../components/Hero';
import VehicleCard from '../components/VehicleCard';
import ContactForm from '../components/ContactForm';
import { VEHICLES } from '../data/vehicles';
import { CONTACT_INFO } from '../data/siteData';

export default function Offers() {
  useEffect(() => {
    document.title = 'Offers & Campaigns | DONGFENG UAE';
  }, []);

  const featuredModels = VEHICLES.slice(0, 3);

  return (
    <div>
      <Hero
        compact
        eyebrow="DONGFENG UAE Offers"
        title="Offers Made to Move You"
        subtitle="Stay connected with MAHY Khoory Automotive for upcoming seasonal campaigns, showroom privileges, and tailored corporate fleet packages."
        image="/images/models/007.jpg"
        primaryCta={{ label: 'Book Test Drive', to: '/#test-drive' }}
        secondaryCta={{ label: 'View All Models', to: '/models' }}
      />

      {/* Coming Soon / Current Offers Notice (no invented prices or discounts) */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 p-8 sm:p-12 bg-[#0A0B0D] text-white border border-white/10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C8102E]/20 border border-[#C8102E] text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-6">
                  <CalendarClock className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>Seasonal Campaigns · Coming Soon</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Upcoming UAE Showroom Offers
                </h2>
                <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  New promotional offers are updated periodically by MAHY Khoory Automotive across
                  our Dubai and Abu Dhabi showrooms. Register your interest using the inquiry form
                  or contact our sales desk directly at{' '}
                  <span className="text-white font-semibold">{CONTACT_INFO.phone}</span> for current
                  showroom availability.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4">
                <Link
                  to="/#test-drive"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                >
                  <span>Book a Test Drive</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/models"
                  className="inline-flex items-center px-6 py-3.5 border border-white/25 hover:border-white text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                >
                  Explore Lineup
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              <div className="p-8 bg-[#F5F6F8] border border-zinc-200">
                <Sparkles className="w-6 h-6 text-[#C8102E] mb-4" />
                <h3 className="text-xl font-extrabold text-[#111215]">
                  Personalized Showroom Consultation
                </h3>
                <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed">
                  Speak with our advisors at Oasis Mall, Deira, Airport Road, or Musaffah to
                  explore trim availability, color options, and tailored ownership solutions.
                </p>
              </div>

              <div className="p-8 bg-[#F5F6F8] border border-zinc-200">
                <Building2 className="w-6 h-6 text-[#C8102E] mb-4" />
                <h3 className="text-xl font-extrabold text-[#111215]">
                  Corporate &amp; Fleet Solutions
                </h3>
                <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed">
                  MAHY Khoory Automotive supports UAE organizations with multi-vehicle passenger,
                  EV/PHEV, and commercial pickup fleet arrangements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Highlights */}
      <section className="bg-[#F5F6F8] py-20 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">
                Vehicle Highlights
              </p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-[#111215]">
                Featured Lineup in the UAE
              </h2>
            </div>
            <Link
              to="/models"
              className="text-xs font-bold uppercase tracking-[0.16em] text-[#111215] hover:text-[#C8102E] transition-colors"
            >
              View All 8 Models →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredModels.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers Inquiry Form */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
              Register Interest
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111215]">
              Request Offer &amp; Fleet Details
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Interested in an upcoming campaign, trade-in consultation, or business fleet inquiry?
              Complete the form and see instant validation feedback.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ContactForm defaultSubject="Offers & Fleet Solutions" />
          </div>
        </div>
      </section>
    </div>
  );
}
