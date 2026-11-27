import { useEffect } from 'react';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';
import EnergyCalculatorWidget from '../components/EnergyCalculatorWidget';

export default function EnergyCalculator() {
  useEffect(() => {
    document.title = 'Energy Calculator | DONGFENG UAE';
  }, []);

  return (
    <div>
      <Hero
        compact
        eyebrow="UAE Efficiency Estimator"
        title="Energy Calculator"
        subtitle="Compare estimated electric charging costs against conventional petrol driving across the UAE using adjustable daily distance and local tariff inputs."
        image="/images/models/007.jpg"
        primaryCta={{ label: 'Explore Electrified Models', to: '/models' }}
        secondaryCta={{ label: 'Book Test Drive', to: '/#test-drive' }}
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnergyCalculatorWidget />
        </div>
      </section>

      <CTASection
        title="Experience Electrified DONGFENG Driving"
        description="Schedule a test drive in Dubai or Abu Dhabi to experience EV and Plug-In Hybrid smoothness firsthand."
        primaryTo="/#test-drive"
      />
    </div>
  );
}
