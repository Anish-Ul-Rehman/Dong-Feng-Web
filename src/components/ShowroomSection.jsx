import { MapPin, Clock, Phone, Wrench } from 'lucide-react';
import { SERVICE_CENTERS, SHOWROOMS } from '../data/siteData';

export default function ShowroomSection({ showServiceCenters = true }) {
  return (
    <section className="bg-[#F5F6F8] py-20 lg:py-24 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">
            UAE Network
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
            Showrooms &amp; Service Centers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
            Visit MAHY Khoory Automotive across Dubai and Abu Dhabi to experience the full
            DONGFENG lineup in person or schedule dedicated after-sales care.
          </p>
        </div>

        {/* Showrooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SHOWROOMS.map((showroom) => (
            <div
              key={showroom.id}
              className="bg-white border border-zinc-200 p-6 flex flex-col justify-between hover:border-zinc-400 transition-colors"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C8102E] mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{showroom.emirate}</span>
                </div>
                <h3 className="text-base font-extrabold text-[#111215]">{showroom.name}</h3>
                <p className="mt-2.5 text-xs text-zinc-600 leading-relaxed">{showroom.address}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-100 space-y-1.5 text-xs text-zinc-500">
                <p className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-400" />
                  <span>{showroom.hours}</span>
                </p>
                <p className="flex items-center gap-2 font-medium text-[#111215]">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-[#C8102E]" />
                  <span>{showroom.phone}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Service Centers */}
        {showServiceCenters && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICE_CENTERS.map((center) => (
              <div
                key={center.id}
                className="bg-[#111317] text-white p-7 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E] mb-3">
                    <Wrench className="w-4 h-4" />
                    <span>Authorized Service Center · {center.emirate}</span>
                  </div>
                  <h3 className="text-xl font-extrabold">{center.name}</h3>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{center.highlights}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
                  <span>{center.address}</span>
                  <span className="text-white font-semibold">{center.hours}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
