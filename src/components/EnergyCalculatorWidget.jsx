import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BatteryCharging, Fuel, Leaf, RotateCcw, Zap } from 'lucide-react';
import { VEHICLES } from '../data/vehicles';

const ELECTRIFIED_PROFILES = [
  {
    slug: '008',
    name: 'DONGFENG 008',
    type: '6-Seater SUV (REEV / EV)',
    defaultKwhPer100Km: 18.5,
    defaultPetrolLPer100Km: 10.5,
    image: '/images/models/008.jpg',
  },
  {
    slug: '007',
    name: 'DONGFENG 007',
    type: 'Aerodynamic Fastback (EV / REEV)',
    defaultKwhPer100Km: 15.2,
    defaultPetrolLPer100Km: 8.5,
    image: '/images/models/007.jpg',
  },
  {
    slug: 'mage-phev',
    name: 'DONGFENG MAGE PHEV',
    type: 'Plug-In Hybrid Crossover',
    defaultKwhPer100Km: 16.4,
    defaultPetrolLPer100Km: 9.2,
    image: '/images/models/mage-phev.jpg',
  },
];

const PETROL_BASELINES = [
  { id: 'custom-suv', label: 'Mid-Size Petrol SUV (10.5 L/100km)', consumption: 10.5 },
  { id: 'huge', label: 'DONGFENG HUGE Baseline (9.5 L/100km)', consumption: 9.5 },
  { id: 'mage', label: 'DONGFENG MAGE Baseline (8.4 L/100km)', consumption: 8.4 },
  { id: 'shine', label: 'DONGFENG SHINE Baseline (6.8 L/100km)', consumption: 6.8 },
  { id: 'pickup', label: 'Pickup Baseline (11.5 L/100km)', consumption: 11.5 },
];

const CHARGING_PRESETS = [
  { id: 'home', label: 'Home Charging', rate: 0.3 },
  { id: 'public', label: 'Public Charger', rate: 0.7 },
  { id: 'custom', label: 'Custom Rate', rate: null },
];

export default function EnergyCalculatorWidget({ compact = false, onNavigate }) {
  const [selectedSlug, setSelectedSlug] = useState('008');
  const [baselineId, setBaselineId] = useState('custom-suv');
  const [dailyKm, setDailyKm] = useState(60);
  const [chargingPreset, setChargingPreset] = useState('home');
  const [electricityRate, setElectricityRate] = useState(0.3);
  const [petrolPrice, setPetrolPrice] = useState(2.75);
  const [evEfficiency, setEvEfficiency] = useState(18.5);
  const [petrolConsumption, setPetrolConsumption] = useState(10.5);

  const activeProfile =
    ELECTRIFIED_PROFILES.find((p) => p.slug === selectedSlug) || ELECTRIFIED_PROFILES[0];
  const vehicleData = VEHICLES.find((v) => v.slug === selectedSlug);

  const handleSelectModel = (profile) => {
    setSelectedSlug(profile.slug);
    setEvEfficiency(profile.defaultKwhPer100Km);
  };

  const handleSelectBaseline = (id) => {
    setBaselineId(id);
    const match = PETROL_BASELINES.find((b) => b.id === id);
    if (match) {
      setPetrolConsumption(match.consumption);
    }
  };

  const handleChargingPreset = (preset) => {
    setChargingPreset(preset.id);
    if (preset.rate !== null) {
      setElectricityRate(preset.rate);
    }
  };

  const handleReset = () => {
    setSelectedSlug('008');
    setBaselineId('custom-suv');
    setDailyKm(60);
    setChargingPreset('home');
    setElectricityRate(0.3);
    setPetrolPrice(2.75);
    setEvEfficiency(18.5);
    setPetrolConsumption(10.5);
  };

  const monthlyKm = dailyKm * 30;
  const annualKm = dailyKm * 365;

  const evCostPer100Km = evEfficiency * electricityRate;
  const petrolCostPer100Km = petrolConsumption * petrolPrice;

  const monthlyEvCost = (monthlyKm / 100) * evCostPer100Km;
  const monthlyPetrolCost = (monthlyKm / 100) * petrolCostPer100Km;

  const annualEvCost = (annualKm / 100) * evCostPer100Km;
  const annualPetrolCost = (annualKm / 100) * petrolCostPer100Km;

  const annualSavings = Math.max(annualPetrolCost - annualEvCost, 0);
  const fiveYearSavings = annualSavings * 5;
  const estimatedAnnualCo2Kg = Math.round(((annualKm / 100) * petrolConsumption) * 2.31);
  const savingsPercent =
    annualPetrolCost > 0
      ? Math.max(Math.round(((annualPetrolCost - annualEvCost) / annualPetrolCost) * 100), 0)
      : 0;

  const evBarWidth =
    annualPetrolCost > 0 ? Math.min(Math.max((annualEvCost / annualPetrolCost) * 100, 6), 100) : 25;

  return (
    <div>
      {/* Step 1: Model Selection */}
      <div className={compact ? 'mb-6' : 'mb-10'}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C8102E]">
              Step 1 · Select Vehicle
            </p>
            <h2
              className={`mt-1 font-extrabold text-[#111215] ${
                compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
              }`}
            >
              Choose an Electrified DONGFENG Model
            </h2>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-[#111215] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ELECTRIFIED_PROFILES.map((profile) => {
            const active = profile.slug === selectedSlug;
            return (
              <button
                key={profile.slug}
                type="button"
                onClick={() => handleSelectModel(profile)}
                className={`group text-left border transition-all cursor-pointer overflow-hidden ${
                  active
                    ? 'border-[#C8102E] ring-1 ring-[#C8102E] bg-[#0A0B0D] text-white'
                    : 'border-zinc-200 bg-[#F5F6F8] text-[#111215] hover:border-zinc-400'
                }`}
              >
                <div className="aspect-16/10 bg-zinc-900 overflow-hidden">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className={compact ? 'p-3.5' : 'p-5'}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C8102E]">
                    {profile.type}
                  </p>
                  <p className={`mt-1 font-extrabold ${compact ? 'text-sm' : 'text-lg'}`}>
                    {profile.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Interactive Controls + Live Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div
          className={`lg:col-span-6 bg-[#F5F6F8] border border-zinc-200 space-y-5 ${
            compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
          }`}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">
              Step 2 · Adjust Your Driving &amp; Rates
            </p>
            <h3 className="mt-1 text-lg sm:text-xl font-extrabold text-[#111215]">
              Estimation Parameters
            </h3>
          </div>

          {/* Charging Environment Presets */}
          <div>
            <p className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Charging Scenario
            </p>
            <div className="grid grid-cols-3 gap-2">
              {CHARGING_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleChargingPreset(preset)}
                  className={`px-2.5 py-2 text-[11px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                    chargingPreset === preset.id
                      ? 'bg-[#111215] border-[#111215] text-white'
                      : 'bg-white border-zinc-300 text-zinc-700 hover:border-[#111215]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Petrol Comparison Baseline */}
          <div>
            <label
              htmlFor="ec-baseline"
              className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2"
            >
              Compare Against Petrol Vehicle
            </label>
            <select
              id="ec-baseline"
              value={baselineId}
              onChange={(e) => handleSelectBaseline(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-zinc-300 bg-white focus:border-[#111215] focus:outline-none"
            >
              {PETROL_BASELINES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          {/* Daily Distance Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
              <label htmlFor="ec-daily-km">Daily Distance Driven</label>
              <span className="text-sm font-extrabold text-[#C8102E]">{dailyKm} km / day</span>
            </div>
            <input
              id="ec-daily-km"
              type="range"
              min={10}
              max={250}
              step={5}
              value={dailyKm}
              onChange={(e) => setDailyKm(Number(e.target.value))}
              className="w-full accent-[#C8102E] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
              <span>10 km</span>
              <span>~{monthlyKm.toLocaleString()} km / month</span>
              <span>250 km</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ec-elec-rate"
                className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5"
              >
                Electricity Rate (AED / kWh)
              </label>
              <input
                id="ec-elec-rate"
                type="number"
                min={0.05}
                max={2}
                step={0.01}
                value={electricityRate}
                onChange={(e) => {
                  setChargingPreset('custom');
                  setElectricityRate(Math.max(0, Number(e.target.value) || 0));
                }}
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-300 bg-white focus:border-[#111215] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="ec-petrol-price"
                className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5"
              >
                Petrol Price (AED / Liter)
              </label>
              <input
                id="ec-petrol-price"
                type="number"
                min={0.5}
                max={10}
                step={0.05}
                value={petrolPrice}
                onChange={(e) => setPetrolPrice(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-300 bg-white focus:border-[#111215] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ec-ev-eff"
                className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5"
              >
                EV Usage (kWh / 100 km)
              </label>
              <input
                id="ec-ev-eff"
                type="number"
                min={8}
                max={40}
                step={0.5}
                value={evEfficiency}
                onChange={(e) => setEvEfficiency(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-300 bg-white focus:border-[#111215] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="ec-petrol-cons"
                className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5"
              >
                Petrol Usage (L / 100 km)
              </label>
              <input
                id="ec-petrol-cons"
                type="number"
                min={4}
                max={25}
                step={0.5}
                value={petrolConsumption}
                onChange={(e) =>
                  setPetrolConsumption(Math.max(0, Number(e.target.value) || 0))
                }
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-300 bg-white focus:border-[#111215] focus:outline-none"
              />
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 leading-relaxed pt-2 border-t border-zinc-200">
            Note: Values are user-adjustable estimation parameters for demonstration only.
          </p>
        </div>

        {/* Live Results Column */}
        <div
          className={`lg:col-span-6 bg-[#0A0B0D] text-white border border-white/10 space-y-5 ${
            compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
          }`}
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">
                Estimated Results · {activeProfile.name}
              </p>
              <h3 className="mt-1 text-xl sm:text-2xl font-extrabold">
                Annual Energy Comparison
              </h3>
            </div>
            <Zap className="w-6 h-6 text-[#C8102E] shrink-0" />
          </div>

          <div className="p-5 bg-[#14161A] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                Estimated Annual Savings
              </p>
              <p className="mt-1 text-3xl font-extrabold text-white">
                AED {Math.round(annualSavings).toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                5-Year Projection:{' '}
                <span className="text-zinc-200 font-semibold">
                  AED {Math.round(fiveYearSavings).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="px-4 py-2 bg-[#C8102E]/20 border border-[#C8102E] text-center shrink-0">
              <p className="text-lg font-extrabold text-white">{savingsPercent}%</p>
              <p className="text-[10px] uppercase tracking-wider text-zinc-200">
                Lower Energy Cost
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/3 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                <BatteryCharging className="w-4 h-4" />
                <span>Electric Charging</span>
              </div>
              <p className="mt-2 text-xl sm:text-2xl font-extrabold">
                AED {monthlyEvCost.toFixed(0)}{' '}
                <span className="text-xs font-normal text-zinc-400">/ month</span>
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                AED {evCostPer100Km.toFixed(2)} per 100 km
              </p>
            </div>

            <div className="p-4 bg-white/3 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <Fuel className="w-4 h-4 text-zinc-400" />
                <span>Petrol Comparison</span>
              </div>
              <p className="mt-2 text-xl sm:text-2xl font-extrabold text-zinc-200">
                AED {monthlyPetrolCost.toFixed(0)}{' '}
                <span className="text-xs font-normal text-zinc-400">/ month</span>
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                AED {petrolCostPer100Km.toFixed(2)} per 100 km
              </p>
            </div>
          </div>

          <div className="p-4 bg-white/3 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                  Estimated Tailpipe CO₂ Offset
                </p>
                <p className="text-[11px] text-zinc-400">
                  {annualKm.toLocaleString()} km/yr vs. {petrolConsumption} L/100km
                </p>
              </div>
            </div>
            <p className="text-base font-extrabold text-emerald-400 shrink-0">
              ~{estimatedAnnualCo2Kg.toLocaleString()} kg/yr
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-white">
                  {activeProfile.name} (Annual Electric)
                </span>
                <span className="font-bold text-white">
                  AED {Math.round(annualEvCost).toLocaleString()}
                </span>
              </div>
              <div className="h-2.5 bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#C8102E] transition-all duration-300"
                  style={{ width: `${evBarWidth}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-zinc-400">
                  Petrol Vehicle (Annual Estimate)
                </span>
                <span className="font-bold text-zinc-300">
                  AED {Math.round(annualPetrolCost).toLocaleString()}
                </span>
              </div>
              <div className="h-2.5 bg-white/10 overflow-hidden">
                <div className="h-full bg-zinc-500 w-full" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap gap-3">
            <Link
              to={`/models/${selectedSlug}`}
              onClick={onNavigate}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
            >
              <span>Explore {vehicleData?.shortName || activeProfile.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={`/?model=${selectedSlug}#test-drive`}
              onClick={onNavigate}
              className="inline-flex items-center px-5 py-3 border border-white/25 hover:border-white text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
            >
              Book Test Drive
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
