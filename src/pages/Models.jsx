import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import VehicleCard from '../components/VehicleCard';
import CTASection from '../components/CTASection';
import { VEHICLE_CATEGORIES, VEHICLES } from '../data/vehicles';

export default function Models() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = 'Models | DONGFENG UAE Lineup';
  }, []);

  const filteredVehicles =
    selectedCategory === 'All'
      ? VEHICLES
      : VEHICLES.filter((v) => v.category === selectedCategory);

  return (
    <div>
      <Hero
        compact
        eyebrow="Complete Lineup"
        title="DONGFENG UAE Models"
        subtitle="Explore our full range of flagship SUVs, aerodynamic sedans, plug-in hybrids, and heavy-duty pickups."
        image="/images/models/huge.jpg"
        primaryCta={{ label: 'Book Test Drive', to: '/#test-drive' }}
        secondaryCta={null}
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-zinc-200">
            <div className="flex flex-wrap gap-2">
              {VEHICLE_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#C8102E] text-white'
                        : 'bg-[#F5F6F8] text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Showing {filteredVehicles.length} of {VEHICLES.length} Models
            </p>
          </div>

          {/* Model Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Help Choosing the Right Model?"
        description="Speak with a DONGFENG UAE specialist or visit our Dubai and Abu Dhabi showrooms for a closer look."
      />
    </div>
  );
}
