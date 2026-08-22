// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WEB3FORMS_ACCESS_KEY = '705e1977-db85-4813-a385-b69b217ffa5c';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  projectType: string;
  budget: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  projectType: '',
  budget: '',
  message: '',
};

const PROJECT_TYPES = [
  'Web Development',
  'Full-Stack Application',
  'AI / GenAI Integration',
  'API / Backend System',
  'Consulting / Freelance',
  'Other',
];

const BUDGET_RANGES = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000+',
  'Not sure yet',
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: formData.subject || `New transmission from ${formData.name}`,
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        budget_range: formData.budget,
        message: formData.message,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('sent');
        setFormData(INITIAL_STATE);
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Transmission failed. Try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Connection lost. Try again.');
    }
  };

  const isSending = status === 'sending';

  return (
    <footer
      id="contact"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-32 sm:pt-36 lg:pt-40 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4 mb-5"
              >
                <span
                  className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  05 / CONTACT
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    INITIALIZE
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                    TRANSMISSION.
                  </span>
                </h2>
              </motion.div>

              <p
                className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-relaxed max-w-md"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Have an ambitious system to architect, an engineering opportunity, or a collaborative inquiry? Send a direct dispatch below.
              </p>
            </div>

            {/* ==================================================
                DIRECT CHANNELS

                TODO: replace the phone number and Instagram handle
                placeholders below with the real ones before ship.
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-10 sm:mt-12"
            >


              <div className="space-y-3 mb-7">
                <a
                  href="mailto:arslandeshmukh4@gmail.com"
                  className="flex items-center gap-3 text-xs sm:text-[13px] text-[#BDB0A4] hover:text-[#D4AF37] transition-colors group"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors text-sm">
                    ✉
                  </span>
                  <span>arslandeshmukh4@gmail.com</span>
                </a>

                {/* TODO: replace with real phone number */}
                <a
                  href="tel:+918149425531"
                  className="flex items-center gap-3 text-xs sm:text-[13px] text-[#BDB0A4] hover:text-[#D4AF37] transition-colors group"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors text-sm">
                    ☎
                  </span>
                  <span>+91 81494 25531</span>
                </a>
              </div>


              <div className="flex items-center gap-3">
                {/* GitHub */}
                <a
                  href="https://github.com/ARSLAn701"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="
                    flex items-center justify-center
                    w-10 h-10
                    rounded-sm
                    border border-[#8C6D4F]/40
                    bg-[#120F0C]
                    text-[#BDB0A4]
                    hover:border-[#D4AF37]
                    hover:text-[#D4AF37]
                    transition-all
                    duration-200
                  "
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.94c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.78 2.72 1.26 3.38.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.07.78 2.16v3.2c0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>

                {/* WhatsApp — TODO: replace with real number */}
                <a
                  href="https://wa.me/918149425531"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="
                    flex items-center justify-center
                    w-10 h-10
                    rounded-sm
                    border border-[#8C6D4F]/40
                    bg-[#120F0C]
                    text-[#BDB0A4]
                    hover:border-[#D4AF37]
                    hover:text-[#D4AF37]
                    transition-all
                    duration-200
                  "
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                    <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.1-1.33A9.95 9.95 0 0 0 12.02 22C17.5 22 22 17.52 22 12S17.5 2 12.02 2zm0 18.13c-1.62 0-3.13-.44-4.44-1.2l-.32-.19-3.03.79.8-2.95-.2-.3A8.08 8.08 0 0 1 3.9 12c0-4.48 3.65-8.12 8.12-8.12S20.13 7.52 20.13 12s-3.64 8.13-8.11 8.13z" />
                  </svg>
                </a>

                {/* Instagram — TODO: replace YOUR_HANDLE */}
                <a
                  href="https://www.linkedin.com/in/arslan-deshmukh-503357360?utm_source=share&amp;utm_campaign=share_via&amp;utm_content=profile&amp;utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linkedin"
                  className="
                    flex items-center justify-center
                    w-10 h-10
                    rounded-sm
                    border border-[#8C6D4F]/40
                    bg-[#120F0C]
                    text-[#BDB0A4]
                    hover:border-[#D4AF37]
                    hover:text-[#D4AF37]
                    transition-all
                    duration-200
                  "
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Monolith Terminal Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

            {/* Precision Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />

            {status === 'sent' ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm">
                  ✓
                </div>
                <h3 className="text-3xl text-white font-normal uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  PACKET DELIVERED
                </h3>
                <p className="text-xs text-[#A8988B] font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Transmission registered successfully.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] hover:text-[#D4AF37] transition-colors pt-2"
                >
                  ↺ Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // SENDER
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // CHANNEL
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // FREQUENCY (PHONE)
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // SUBJECT LINE
                    </span>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Briefly, what's this about?"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // PROJECT TYPE
                    </span>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-[#8C6D4F] px-4 py-3 outline-none rounded-sm transition-colors appearance-none"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <option value="" className="bg-[#120F0C] text-[#8C6D4F]">
                        Select type
                      </option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#120F0C] text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // BUDGET RANGE
                    </span>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-[#8C6D4F] px-4 py-3 outline-none rounded-sm transition-colors appearance-none"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <option value="" className="bg-[#120F0C] text-[#8C6D4F]">
                        Select range
                      </option>
                      {BUDGET_RANGES.map((range) => (
                        <option key={range} value={range} className="bg-[#120F0C] text-white">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                    // disucussion
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter transmission payload..."
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 p-4 outline-none rounded-sm transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                {status === 'error' && (
                  <p
                    className="text-[10px] font-mono tracking-wider uppercase text-[#C97B63]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    ⚠ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 border border-[#8C6D4F]/50 bg-[#14100D] hover:border-[#D4AF37] hover:bg-[#1A1510] text-[#E8DFD8] hover:text-[#F7E7C4] text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[#8C6D4F]/50 disabled:hover:bg-[#14100D]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {isSending ? 'TRANSMITTING...' : 'EXECUTE DISPATCH ↗'}
                </button>

              </form>
            )}
          </motion.div>

        </div>

        {/* System Footer Line */}
        <div className="pt-16 mt-16 border-t border-[#8C6D4F]/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase">
            Arslan Deshmukh // Feel free to contact
          </span>
          <span className="text-[10px] font-mono text-[#8C6D4F]">
            © {new Date().getFullYear()} • ENGINEERED WITH PRECISION
          </span>
        </div>

      </div>
    </footer>
  );
};

export default ContactSection;