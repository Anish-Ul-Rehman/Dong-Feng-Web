import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { VEHICLES } from '../data/vehicles';

function getSlidesPerView() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

export default function VehicleCarousel() {
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const onResize = () => {
      const nextPerView = getSlidesPerView();
      setSlidesPerView(nextPerView);
      const nextMax = Math.max(VEHICLES.length - nextPerView, 0);
      setCurrentIndex((prev) => Math.min(prev, nextMax));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(VEHICLES.length - slidesPerView, 0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="lineup"
      className="bg-white text-[#111215] py-16 lg:py-24 border-b border-zinc-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading + Arrow Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">
              Official UAE Lineup
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215]">
              Explore Our Vehicles
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Slide vehicles left"
              className="w-11 h-11 flex items-center justify-center border border-zinc-300 bg-white text-[#111215] hover:bg-[#111215] hover:border-[#111215] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Slide vehicles right"
              className="w-11 h-11 flex items-center justify-center border border-zinc-300 bg-white text-[#111215] hover:bg-[#C8102E] hover:border-[#C8102E] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/models"
              className="hidden sm:inline-flex items-center gap-1.5 ml-2 text-xs font-bold uppercase tracking-[0.16em] text-[#111215] hover:text-[#C8102E] transition-colors"
            >
              <span>All Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Carousel Track Wrapper with Left / Right Overlay Arrows */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Overlay Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous car slide"
            className="hidden md:flex absolute -left-4 top-1/3 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-[#0A0B0D]/90 text-white border border-white/15 shadow-lg hover:bg-[#C8102E] hover:border-[#C8102E] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Overlay Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next car slide"
            className="hidden md:flex absolute -right-4 top-1/3 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-[#0A0B0D]/90 text-white border border-white/15 shadow-lg hover:bg-[#C8102E] hover:border-[#C8102E] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / slidesPerView}%)`,
              }}
            >
              {VEHICLES.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="shrink-0 px-2.5"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <article className="group h-full flex flex-col justify-between bg-white border border-zinc-200 hover:border-zinc-400 shadow-sm hover:shadow-xl transition-all duration-300">
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
                        <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#0A0B0D]/85 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.18em] text-white border border-white/10">
                          {vehicle.category}
                        </span>
                      </Link>

                      <div className="p-6 pb-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
                          {vehicle.badge}
                        </p>
                        <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-[#111215]">
                          <Link
                            to={`/models/${vehicle.slug}`}
                            className="hover:text-[#C8102E] transition-colors"
                          >
                            {vehicle.name}
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm text-zinc-600 leading-relaxed line-clamp-2">
                          {vehicle.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                      <Link
                        to={`/models/${vehicle.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#111215] hover:text-[#C8102E] transition-colors"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        to={`/?model=${vehicle.slug}#test-drive`}
                        className="px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border border-zinc-300 text-[#111215] hover:bg-[#111215] hover:border-[#111215] hover:text-white transition-colors"
                      >
                        Book Test Drive
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Progress Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-[#C8102E]'
                  : 'w-3 bg-zinc-300 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
