import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, X, Zap } from 'lucide-react';
import EnergyCalculatorWidget from './EnergyCalculatorWidget';

export default function EnergyCalculatorModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="energy-calculator-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white text-[#111215] border border-zinc-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A0B0D] text-white px-5 sm:px-7 py-4 flex items-center justify-between gap-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#C8102E] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-white" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8102E]">
                DONGFENG UAE
              </p>
              <h2 id="energy-calculator-modal-title" className="text-base sm:text-lg font-extrabold">
                Energy &amp; Savings Calculator
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/energy-calculator"
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-300 hover:text-white border border-white/15 hover:border-white/40 transition-colors"
            >
              <span>Full Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Energy Calculator"
              className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/15 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7">
          <EnergyCalculatorWidget compact onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
