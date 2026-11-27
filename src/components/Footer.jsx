import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Wrench, ArrowUpRight } from 'lucide-react';
import BrandMark from './BrandMark';
import { CONTACT_INFO, NAV_LINKS, SERVICE_CENTERS, SHOWROOMS } from '../data/siteData';
import { VEHICLES } from '../data/vehicles';

export default function Footer({ onOpenCalculator }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#08090B] text-zinc-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" aria-label="DONGFENG UAE">
              <BrandMark light />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Official distributor of DONGFENG passenger vehicles in the United Arab Emirates,
              proudly operated by <span className="text-zinc-200">{CONTACT_INFO.distributorName}</span>{' '}
              — part of the {CONTACT_INFO.parentGroup}.
            </p>
            <div className="space-y-2.5 text-sm">
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center gap-2.5 text-zinc-200 hover:text-[#C8102E] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C8102E]" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 text-zinc-200 hover:text-[#C8102E] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C8102E]" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </div>

            {/* Social Media Placeholders */}
            <div className="flex items-center gap-2.5 pt-2">
              {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map((network) => (
                <a
                  key={network}
                  href="#social"
                  onClick={(e) => e.preventDefault()}
                  aria-label={`DONGFENG UAE on ${network}`}
                  className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider border border-white/15 text-zinc-300 hover:border-[#C8102E] hover:text-white transition-colors"
                >
                  {network.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                {onOpenCalculator ? (
                  <button
                    type="button"
                    onClick={onOpenCalculator}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Energy Calculator
                  </button>
                ) : (
                  <Link
                    to="/energy-calculator"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Energy Calculator
                  </Link>
                )}
              </li>
              <li>
                <Link
                  to="/#test-drive"
                  className="text-[#C8102E] hover:text-white font-medium transition-colors inline-flex items-center gap-1"
                >
                  <span>Book Test Drive</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Models Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Models
            </h3>
            <ul className="space-y-2.5 text-sm">
              {VEHICLES.map((vehicle) => (
                <li key={vehicle.id}>
                  <Link
                    to={`/models/${vehicle.slug}`}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {vehicle.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showrooms & Service Centers */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>UAE Showrooms</span>
              </h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                {SHOWROOMS.map((item) => (
                  <li key={item.id} className="leading-relaxed">
                    <span className="text-zinc-200 font-medium">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-3 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Service Centers</span>
              </h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                {SERVICE_CENTERS.map((center) => (
                  <li key={center.id} className="leading-relaxed">
                    <span className="text-zinc-200 font-medium">{center.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {currentYear} {CONTACT_INFO.brandName} · {CONTACT_INFO.distributorName}. Frontend
            showcase clone for demonstration purposes.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-zinc-200 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-zinc-200 transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
