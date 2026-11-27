import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import VehicleGallery from '../components/VehicleGallery';
import VehicleCard from '../components/VehicleCard';
import TestDriveForm from '../components/TestDriveForm';
import { getVehicleBySlug, VEHICLES } from '../data/vehicles';

function VehicleDetailsContent({ vehicle }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [brochureNotice, setBrochureNotice] = useState(false);

  const relatedVehicles = VEHICLES.filter((item) => item.slug !== vehicle.slug).slice(0, 3);
  const activeColor = vehicle.colors[selectedColor] || vehicle.colors[0];

  const handleDownloadBrochure = () => {
    const content = [
      `${vehicle.name} — Official Reference Brochure Summary (Demo Asset)`,
      `Tagline: ${vehicle.tagline}`,
      `Category: ${vehicle.category} (${vehicle.badge})`,
      '',
      'Overview:',
      vehicle.shortDescription,
      '',
      'Highlights:',
      ...vehicle.highlights.map((h) => `- ${h.label}: ${h.value}`),
      '',
      'Technology & Comfort:',
      ...vehicle.technologyFeatures.map((t) => `- ${t}`),
      '',
      'Safety Features:',
      ...vehicle.safetyFeatures.map((s) => `- ${s}`),
      '',
      'Available in the UAE via MAHY Khoory Automotive | Toll-Free: 800-6249 (MAHY) | info@dongfeng-uae.com',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DONGFENG-${vehicle.slug.toUpperCase()}-Brochure-Demo.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setBrochureNotice(true);
  };

  return (
    <div>
      {/* 1. Large Full-Screen Vehicle Hero */}
      <section className="relative min-h-[75vh] lg:min-h-[82vh] bg-[#0A0B0D] text-white flex items-end overflow-hidden">
        <img
          src={vehicle.heroImage}
          alt={vehicle.name}
          className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0A0B0D] via-[#0A0B0D]/55 to-black/30" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0A0B0D]/85 via-[#0A0B0D]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pb-14 pt-24 md:pb-20">
          <div className="mb-5 flex items-center gap-2 text-xs text-zinc-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/models" className="hover:text-white transition-colors">
              Models
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">{vehicle.shortName}</span>
          </div>

          <div className="max-w-2xl animate-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">
              {vehicle.badge}
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              {vehicle.name}
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-zinc-200 font-medium">
              {vehicle.tagline}
            </p>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              {vehicle.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#vehicle-overview"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0A0B0D] hover:bg-zinc-200 text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                <span>Explore Highlights</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#model-test-drive"
                className="inline-flex items-center px-7 py-3.5 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                Book Test Drive
              </a>
              <button
                type="button"
                onClick={handleDownloadBrochure}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 hover:border-white text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Brochure</span>
              </button>
            </div>

            {brochureNotice && (
              <p className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Demo brochure summary downloaded locally.</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 2. Vehicle Highlights Bar */}
      <section id="vehicle-overview" className="bg-[#111317] text-white py-12 border-y border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicle.highlights.map((item) => (
            <div key={item.label} className="border-l-2 border-[#C8102E] pl-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">{item.label}</p>
              <p className="mt-1 text-base sm:text-lg font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Exterior Gallery */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <VehicleGallery
            subtitle="Exterior Design"
            title={`${vehicle.name} Exterior Gallery`}
            items={vehicle.exteriorGallery}
          />
        </div>
      </section>

      {/* 4. Interior Gallery */}
      <section className="bg-[#F5F6F8] py-16 lg:py-24 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <VehicleGallery
            subtitle="Cabin & Ergonomics"
            title={`${vehicle.name} Interior Gallery`}
            items={vehicle.interiorGallery}
          />
        </div>
      </section>

      {/* 5. Technology & Comfort + Safety Features */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="p-8 bg-[#0A0B0D] text-white border border-white/10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E] mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Technology &amp; Comfort</span>
            </div>
            <h3 className="text-2xl font-extrabold mb-6">Intelligent Cabin Experience</h3>
            <ul className="space-y-4">
              {vehicle.technologyFeatures.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#C8102E] mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-[#F5F6F8] border border-zinc-200">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E] mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Safety Features</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#111215] mb-6">
              Confidence on Every Journey
            </h3>
            <ul className="space-y-4">
              {vehicle.safetyFeatures.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-[#C8102E] mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Available Colors & Brochure Section */}
      {vehicle.colors?.length > 0 && (
        <section className="bg-[#111317] text-white py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">
                Exterior Palette
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold">
                Available Finishes
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Selected Finish:{' '}
                <span className="text-white font-semibold">{activeColor.name}</span>{' '}
                <span className="text-xs text-zinc-500">
                  (Availability may vary by UAE showroom trim)
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6">
                {vehicle.colors.map((color, idx) => {
                  const active = idx === selectedColor;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(idx)}
                      aria-label={color.name}
                      className={`group flex items-center gap-2.5 px-3.5 py-2 border transition-all cursor-pointer ${
                        active
                          ? 'border-[#C8102E] bg-white/10'
                          : 'border-white/15 hover:border-white/40'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        {active && (
                          <Check className="w-3 h-3 text-[#C8102E] drop-shadow" />
                        )}
                      </span>
                      <span className="text-xs font-medium text-zinc-200">{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={handleDownloadBrochure}
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Demo Brochure</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 7. Model-Specific Book Test Drive Section */}
      <section id="model-test-drive" className="bg-[#F5F6F8] py-20 border-t border-zinc-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
              Reserve a Drive
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111215]">
              Test Drive the {vehicle.name}
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Your preferred model is pre-selected. Choose your nearest Dubai or Abu Dhabi showroom
              to request an appointment.
            </p>
            <div className="aspect-16/10 overflow-hidden border border-zinc-200 bg-zinc-900 mt-4">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <TestDriveForm key={vehicle.slug} preselectedModel={vehicle.slug} />
          </div>
        </div>
      </section>

      {/* 8. Related Vehicle Showcase */}
      <section className="bg-white py-16 lg:py-24 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">
                Explore More
              </p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-[#111215]">
                Other DONGFENG UAE Models
              </h2>
            </div>
            <Link
              to="/models"
              className="text-xs font-bold uppercase tracking-[0.16em] text-[#111215] hover:text-[#C8102E] transition-colors"
            >
              All Models →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedVehicles.map((item) => (
              <VehicleCard key={item.id} vehicle={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function VehicleDetails() {
  const { slug } = useParams();
  const vehicle = getVehicleBySlug(slug);

  useEffect(() => {
    document.title = vehicle
      ? `${vehicle.name} | DONGFENG UAE`
      : 'Model Not Found | DONGFENG UAE';
  }, [vehicle]);

  if (!vehicle) {
    return (
      <section className="min-h-[65vh] flex flex-col items-center justify-center px-4 py-24 text-center bg-white">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">404</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111215]">
          Vehicle Model Not Found
        </h1>
        <p className="mt-3 text-sm text-zinc-600 max-w-md">
          The requested DONGFENG model page could not be found. Browse our official UAE lineup
          below.
        </p>
        <Link
          to="/models"
          className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 bg-[#111215] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Models</span>
        </Link>
      </section>
    );
  }

  return <VehicleDetailsContent key={vehicle.slug} vehicle={vehicle} />;
}
