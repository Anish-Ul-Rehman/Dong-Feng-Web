import { useState } from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const INITIAL = {
  fullName: '',
  email: '',
  phone: '',
  subject: 'General Inquiry',
  message: '',
  agreed: false,
};

export default function ContactForm({ defaultSubject = 'General Inquiry' }) {
  const [form, setForm] = useState({ ...INITIAL, subject: defaultSubject });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Valid email address is required.';
    }
    const digits = form.phone.replace(/[\s()-]/g, '');
    if (!digits || !/^\+?\d{7,15}$/.test(digits)) {
      next.phone = 'Valid phone number is required.';
    }
    if (!form.message.trim() || form.message.trim().length < 8) {
      next.message = 'Please enter a brief message (at least 8 characters).';
    }
    if (!form.agreed) {
      next.agreed = 'Please agree to the Privacy Policy.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-zinc-200 p-8 shadow-sm animate-fade-in">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-4" />
        <h3 className="text-xl font-extrabold text-[#111215]">
          Inquiry Validated (Demo Only)
        </h3>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          Thank you, {form.fullName}. Your message regarding <span className="font-semibold">{form.subject}</span>{' '}
          has been processed locally for demonstration. No external API or database call was made.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({ ...INITIAL, subject: defaultSubject });
            setSubmitted(false);
          }}
          className="mt-6 px-6 py-3 bg-[#111215] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-5"
    >
      <div>
        <label htmlFor="cf-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
          Full Name <span className="text-[#C8102E]">*</span>
        </label>
        <input
          id="cf-name"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none ${
            errors.fullName ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-[#C8102E] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Email <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@domain.com"
            className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none ${
              errors.email ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[#C8102E] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
            Phone <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+971 50 000 0000"
            className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none ${
              errors.phone ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-[#C8102E] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
          Inquiry Type
        </label>
        <select
          id="cf-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 text-sm border border-zinc-300 bg-zinc-50 focus:bg-white focus:border-[#111215] focus:outline-none"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Sales & Showroom Visit">Sales &amp; Showroom Visit</option>
          <option value="After Sales & Service">After Sales &amp; Service</option>
          <option value="Offers & Fleet Solutions">Offers &amp; Fleet Solutions</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
          Message <span className="text-[#C8102E]">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="How can our UAE team assist you?"
          className={`w-full px-4 py-3 text-sm border bg-zinc-50 focus:bg-white focus:outline-none ${
            errors.message ? 'border-[#C8102E]' : 'border-zinc-300 focus:border-[#111215]'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-[#C8102E] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer text-xs text-zinc-700">
          <input
            type="checkbox"
            name="agreed"
            checked={form.agreed}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 accent-[#C8102E]"
          />
          <span>
            I accept the{' '}
            <Link to="/privacy-policy" className="underline hover:text-[#C8102E]">
              Privacy Policy
            </Link>{' '}
            (frontend demonstration only). <span className="text-[#C8102E]">*</span>
          </span>
        </label>
        {errors.agreed && (
          <p className="mt-1 text-xs text-[#C8102E] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.agreed}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C8102E] hover:bg-[#A60D25] disabled:opacity-60 text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? 'Sending...' : 'Send Inquiry'}</span>
      </button>
    </form>
  );
}
