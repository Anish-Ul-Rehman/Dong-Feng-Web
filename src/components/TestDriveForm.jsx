import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, CalendarCheck } from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import { SHOWROOMS } from '../data/siteData';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  model: '',
  showroom: '',
  message: '',
  subscribe: false,
  privacyAccepted: false,
};

export default function TestDriveForm({ preselectedModel = '' }) {
  const [formData, setFormData] = useState({
    ...INITIAL_STATE,
    model: preselectedModel || '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required.';

    const cleanedPhone = formData.phone.replace(/[\s()-]/g, '');
    if (!cleanedPhone) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!/^\+?\d{7,15}$/.test(cleanedPhone)) {
      nextErrors.phone = 'Enter a valid UAE or international phone number.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!formData.model) nextErrors.model = 'Please select a vehicle model.';
    if (!formData.showroom) nextErrors.showroom = 'Please select a preferred showroom.';
    if (!formData.privacyAccepted) {
      nextErrors.privacyAccepted = 'You must agree to the Privacy Policy to continue.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 550);
  };

  const handleReset = () => {
    setFormData({ ...INITIAL_STATE, model: preselectedModel || '' });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    const selectedVehicle = VEHICLES.find((v) => v.slug === formData.model);
    const selectedShowroom = SHOWROOMS.find((s) => s.id === formData.showroom);

    return (
      <div className="bg-white border border-zinc-200 p-8 sm:p-10 shadow-sm animate-fade-in">
        <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-emerald-600 mb-5">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-extrabold text-[#111215]">
          Test Drive Request Received (Demo)
        </h3>
        <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
          Thank you, <span className="font-semibold text-[#111215]">{formData.firstName}</span>.
          Your test drive request for{' '}
          <span className="font-semibold text-[#111215]">
            {selectedVehicle ? selectedVehicle.name : formData.model}
          </span>{' '}
          at{' '}
          <span className="font-semibold text-[#111215]">
            {selectedShowroom ? selectedShowroom.name : formData.showroom}
          </span>{' '}
          has been validated. No personal data was transmitted or stored (frontend demonstration).
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 px-6 py-3 bg-[#111215] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-zinc-200 p-6 sm:p-10 shadow-sm space-y-5"
    >
      <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100">
        <CalendarCheck className="w-5 h-5 text-[#C8102E]" />
        <h3 className="text-lg font-extrabold tracking-tight text-[#111215]">
          Schedule Your Showroom Experience
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* First Name */}
        <div>
          <label htmlFor="td-firstName" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
            First Name <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="td-firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="e.g. Omar"
            className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none transition-colors ${
              errors.firstName ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
            }`}
          />
          {errors.firstName && (
            <p className="mt-1.5 text-xs text-[#C8102E] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="td-lastName" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Last Name <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="td-lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="e.g. Al Mansoori"
            className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none transition-colors ${
              errors.lastName ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
            }`}
          />
          {errors.lastName && (
            <p className="mt-1.5 text-xs text-[#C8102E] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Phone Number */}
        <div>
          <label htmlFor="td-phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Phone Number <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="td-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+971 50 000 0000"
            className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none transition-colors ${
              errors.phone ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
            }`}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-[#C8102E] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="td-email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Email Address <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="td-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none transition-colors ${
              errors.email ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-[#C8102E] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Select Vehicle Model */}
        <div>
          <label htmlFor="td-model" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Select Vehicle Model <span className="text-[#C8102E]">*</span>
          </label>
          <select
            id="td-model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none transition-colors ${
              errors.model ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
            }`}
          >
            <option value="">Choose a model...</option>
            {VEHICLES.map((v) => (
              <option key={v.id} value={v.slug}>
                {v.name} — {v.badge}
              </option>
            ))}
          </select>
          {errors.model && (
            <p className="mt-1.5 text-xs text-[#C8102E] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.model}
            </p>
          )}
        </div>

        {/* Select Showroom */}
        <div>
          <label htmlFor="td-showroom" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Select Showroom <span className="text-[#C8102E]">*</span>
          </label>
          <select
            id="td-showroom"
            name="showroom"
            value={formData.showroom}
            onChange={handleChange}
            className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none transition-colors ${
              errors.showroom ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
            }`}
          >
            <option value="">Choose a showroom...</option>
            {SHOWROOMS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.showroom && (
            <p className="mt-1.5 text-xs text-[#C8102E] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.showroom}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="td-message" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
          Message (Optional)
        </label>
        <textarea
          id="td-message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Preferred date, time, or questions about the vehicle..."
          className="w-full px-4 py-3 text-sm border border-zinc-300 bg-zinc-50 focus:bg-white focus:border-[#111215] focus:outline-none transition-colors resize-y"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-3 pt-1">
        <label className="flex items-start gap-3 cursor-pointer text-xs text-zinc-600">
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 accent-[#C8102E]"
          />
          <span>
            Subscribe to updates on new DONGFENG UAE models, events, and showroom announcements.
          </span>
        </label>

        <div>
          <label className="flex items-start gap-3 cursor-pointer text-xs text-zinc-700 font-medium">
            <input
              type="checkbox"
              name="privacyAccepted"
              checked={formData.privacyAccepted}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 accent-[#C8102E]"
            />
            <span>
              I agree to the{' '}
              <Link to="/privacy-policy" className="underline hover:text-[#C8102E]">
                Privacy Policy
              </Link>{' '}
              and acknowledge this is a frontend-only demonstration form.{' '}
              <span className="text-[#C8102E]">*</span>
            </span>
          </label>
          {errors.privacyAccepted && (
            <p className="mt-1.5 text-xs text-[#C8102E] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.privacyAccepted}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-8 py-4 bg-[#C8102E] hover:bg-[#A60D25] disabled:opacity-60 text-white text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
      >
        {submitting ? 'Submitting Request...' : 'Request Test Drive'}
      </button>
    </form>
  );
}
