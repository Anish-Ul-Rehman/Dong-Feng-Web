import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export default function VehicleGallery({ title, subtitle, items = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!items.length) return null;
  const activeItem = items[selectedIndex] || items[0];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">
            {subtitle}
          </p>
          <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight">
            {title}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#111215] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Maximize2 className="w-4 h-4" />
          <span>Expand View</span>
        </button>
      </div>

      {/* Main Image Frame */}
      <div className="relative aspect-video bg-[#0E1014] overflow-hidden border border-zinc-200">
        <img
          src={activeItem.src}
          alt={activeItem.title}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/45 to-transparent p-6 text-white">
          <p className="text-base font-bold">{activeItem.title}</p>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1">{activeItem.caption}</p>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {items.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
          {items.map((item, idx) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`group text-left border overflow-hidden transition-all cursor-pointer ${
                idx === selectedIndex
                  ? 'border-[#C8102E] ring-1 ring-[#C8102E]'
                  : 'border-zinc-200 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="aspect-video bg-zinc-900 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2.5 bg-white">
                <p className="text-xs font-semibold text-[#111215] truncate">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0A0B0D] border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image preview"
              className="absolute top-3 right-3 z-10 p-2 bg-black/70 text-white hover:bg-[#C8102E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeItem.src}
              alt={activeItem.title}
              className="w-full max-h-[78vh] object-contain bg-black"
            />
            <div className="p-5 text-white border-t border-white/10">
              <p className="font-bold">{activeItem.title}</p>
              <p className="text-sm text-zinc-400 mt-1">{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
