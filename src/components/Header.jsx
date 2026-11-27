import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, Phone, X, ArrowRight } from 'lucide-react';
import BrandMark from './BrandMark';
import { CONTACT_INFO, NAV_LINKS } from '../data/siteData';
import { VEHICLES } from '../data/vehicles';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpenPath, setMobileOpenPath] = useState(null);
  const [modelsOpenPath, setModelsOpenPath] = useState(null);
  const [mobileModelsOpen, setMobileModelsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const mobileOpen = mobileOpenPath === pathname;
  const modelsMenuOpen = modelsOpenPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleBookTestDrive = () => {
    setMobileOpenPath(null);
    if (pathname === '/') {
      const el = document.getElementById('test-drive');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        return;
      }
    }
    navigate('/#test-drive');
  };

  return (
    <>
      {/* Top Utility Strip */}
      <div className="hidden lg:block bg-[#0A0B0D] text-zinc-400 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <p className="tracking-wide">
            Official UAE Distributor — <span className="text-white font-medium">{CONTACT_INFO.distributorName}</span>
          </p>
          <div className="flex items-center gap-6">
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-white transition-colors"
            >
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0B0D]/95 backdrop-blur-md shadow-lg border-b border-white/10'
            : 'bg-[#0A0B0D] border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <Link to="/" aria-label="DONGFENG UAE Home" className="shrink-0">
            <BrandMark light />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setModelsOpenPath(pathname)}
                  onMouseLeave={() => setModelsOpenPath(null)}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setModelsOpenPath(null)}
                    className={({ isActive }) =>
                      `relative inline-flex items-center gap-1.5 py-2 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#C8102E] after:transition-all after:duration-200 ${
                        isActive || pathname.startsWith('/models')
                          ? 'text-white after:w-full'
                          : 'text-zinc-300 hover:text-white after:w-0 hover:after:w-full'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        modelsMenuOpen ? 'rotate-180 text-[#C8102E]' : ''
                      }`}
                    />
                  </NavLink>

                  {/* Mega Dropdown */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-170 transition-all duration-200 ${
                      modelsMenuOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-[#111317] border border-white/10 shadow-2xl p-6">
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-[#C8102E] font-semibold">
                            UAE Lineup
                          </p>
                          <p className="text-sm text-zinc-300 mt-0.5">
                            Explore all 8 official DONGFENG models
                          </p>
                        </div>
                        <Link
                          to="/models"
                          onClick={() => setModelsOpenPath(null)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#C8102E] transition-colors"
                        >
                          View All Models <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {VEHICLES.map((vehicle) => (
                          <Link
                            key={vehicle.id}
                            to={`/models/${vehicle.slug}`}
                            onClick={() => setModelsOpenPath(null)}
                            className="group flex items-center gap-3 p-2.5 bg-white/2 hover:bg-white/7 border border-transparent hover:border-white/10 transition-all"
                          >
                            <img
                              src={vehicle.image}
                              alt={vehicle.name}
                              className="w-20 h-12 object-cover bg-zinc-900 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold tracking-wider text-white group-hover:text-[#C8102E] transition-colors">
                                {vehicle.name}
                              </p>
                              <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                                {vehicle.badge}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative py-2 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#C8102E] after:transition-all after:duration-200 ${
                      isActive
                        ? 'text-white after:w-full'
                        : 'text-zinc-300 hover:text-white after:w-0 hover:after:w-full'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBookTestDrive}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] bg-[#C8102E] text-white hover:bg-[#A60D25] transition-colors cursor-pointer"
            >
              Book Test Drive
            </button>

            <button
              type="button"
              onClick={() => setMobileOpenPath(pathname)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2.5 text-white border border-white/15 hover:border-white/40 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          onClick={() => setMobileOpenPath(null)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-[#0A0B0D] text-white border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
            <BrandMark light />
            <button
              type="button"
              onClick={() => setMobileOpenPath(null)}
              aria-label="Close navigation menu"
              className="p-2 text-zinc-300 hover:text-white border border-white/15 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
            {NAV_LINKS.map((item) =>
              item.hasDropdown ? (
                <div key={item.path} className="border-b border-white/10 pb-2">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpenPath(null)}
                      className="py-3 text-base font-semibold uppercase tracking-wider text-white"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileModelsOpen((prev) => !prev)}
                      aria-label="Toggle models list"
                      className="p-2 text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileModelsOpen ? 'rotate-180 text-[#C8102E]' : ''
                        }`}
                      />
                    </button>
                  </div>
                  {mobileModelsOpen && (
                    <div className="grid grid-cols-2 gap-2 pb-3 pt-1">
                      {VEHICLES.map((v) => (
                        <Link
                          key={v.id}
                          to={`/models/${v.slug}`}
                          onClick={() => setMobileOpenPath(null)}
                          className="px-3 py-2 bg-white/5 hover:bg-white/10 text-xs font-medium tracking-wide text-zinc-200"
                        >
                          {v.shortName}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpenPath(null)}
                  className={({ isActive }) =>
                    `block py-3 text-base font-semibold uppercase tracking-wider border-b border-white/10 transition-colors ${
                      isActive ? 'text-[#C8102E]' : 'text-zinc-200 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </div>

          <div className="p-6 border-t border-white/10 space-y-4 bg-[#111317]">
            <button
              type="button"
              onClick={handleBookTestDrive}
              className="w-full py-3.5 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
            >
              Book a Test Drive
            </button>
            <div className="text-xs text-zinc-400 space-y-1">
              <p>Toll-Free: {CONTACT_INFO.phone}</p>
              <p>{CONTACT_INFO.email}</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
