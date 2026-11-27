import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function VehicleCard({ vehicle, dark = false }) {
  return (
    <article
      className={`group flex flex-col justify-between border transition-all duration-300 ${
        dark
          ? 'bg-[#111317] border-white/10 hover:border-white/25 text-white'
          : 'bg-white border-zinc-200 hover:border-zinc-400 text-[#111215] shadow-sm hover:shadow-xl'
      }`}
    >
      <div>
        <Link
          to={`/models/${vehicle.slug}`}
          className="block relative aspect-16/10 overflow-hidden bg-[#0E1014]"
        >
          <img
            src={vehicle.image}
            alt={vehicle.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 px-3 py-1 bg-[#0A0B0D]/85 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.18em] text-white border border-white/10">
            {vehicle.category}
          </span>
        </Link>

        <div className="p-6 pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
            {vehicle.badge}
          </p>
          <h3 className="mt-1.5 text-xl font-extrabold tracking-tight">
            <Link
              to={`/models/${vehicle.slug}`}
              className="hover:text-[#C8102E] transition-colors"
            >
              {vehicle.name}
            </Link>
          </h3>
          <p
            className={`mt-2.5 text-sm leading-relaxed line-clamp-3 ${
              dark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            {vehicle.shortDescription}
          </p>
        </div>
      </div>

      <div
        className={`px-6 py-4 border-t flex items-center justify-between gap-3 ${
          dark ? 'border-white/10' : 'border-zinc-100'
        }`}
      >
        <Link
          to={`/models/${vehicle.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] hover:text-[#C8102E] transition-colors"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          to={`/?model=${vehicle.slug}#test-drive`}
          className={`px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border transition-colors ${
            dark
              ? 'border-white/20 text-zinc-200 hover:bg-[#C8102E] hover:border-[#C8102E] hover:text-white'
              : 'border-zinc-300 text-[#111215] hover:bg-[#111215] hover:border-[#111215] hover:text-white'
          }`}
        >
          Book Test Drive
        </Link>
      </div>
    </article>
  );
}
