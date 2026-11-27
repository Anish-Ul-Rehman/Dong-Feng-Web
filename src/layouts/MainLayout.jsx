import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import EnergyCalculatorButton from '../components/EnergyCalculatorButton';
import EnergyCalculatorModal from '../components/EnergyCalculatorModal';

export default function MainLayout({ children }) {
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111215]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer onOpenCalculator={() => setCalculatorOpen(true)} />
      <BackToTop />
      <EnergyCalculatorButton
        isOpen={calculatorOpen}
        onOpen={() => setCalculatorOpen(true)}
      />
      <EnergyCalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />
    </div>
  );
}
