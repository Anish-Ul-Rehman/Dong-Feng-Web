import { Zap } from 'lucide-react';

export default function EnergyCalculatorButton({ onOpen, isOpen = false }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open Energy Calculator"
      aria-expanded={isOpen}
      title="Energy Calculator"
      className={`group fixed bottom-6 right-6 z-40 inline-flex items-center h-12 rounded-full border shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] ${
        isOpen
          ? 'bg-[#C8102E] border-[#C8102E] text-white px-4'
          : 'bg-[#0A0B0D] border-white/25 text-white hover:bg-[#C8102E] hover:border-[#C8102E] px-3.5 hover:px-5'
      }`}
    >
      <Zap
        className={`w-5 h-5 shrink-0 transition-all duration-300 group-hover:scale-110 ${
          isOpen ? 'text-white' : 'text-[#C8102E] group-hover:text-white'
        }`}
      />
      <span
        className={`whitespace-nowrap text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
          isOpen
            ? 'max-w-48 opacity-100 ml-2.5'
            : 'max-w-0 opacity-0 ml-0 group-hover:max-w-48 group-hover:opacity-100 group-hover:ml-2.5 group-focus-visible:max-w-48 group-focus-visible:opacity-100 group-focus-visible:ml-2.5'
        }`}
      >
        Energy Calculator
      </span>
    </button>
  );
}
