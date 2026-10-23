import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
  Clock,
  Phone,
  Copy,
  Download,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { Language, BriefFormData } from '../types';
import { SITE_COPY } from '../data/content';

interface ContactBriefSectionProps {
  currentLang: Language;
  preselectedPackage?: string;
  calculatorCalculation?: {
    people: number;
    seconds: number;
    totalPrice: number;
    summary: string;
  } | null;
}

export const ContactBriefSection: React.FC<ContactBriefSectionProps> = ({
  currentLang,
  calculatorCalculation,
}) => {
  const copy = SITE_COPY[currentLang];

  const [formData, setFormData] = useState<BriefFormData>({
    fullName: '',
    email: '',
    phone: '',
    artistName: '',
    genre: '',
    demoLink: '',
    conceptDescription: '',
    acceptedPrivacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BriefFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<{
    data: BriefFormData;
    referenceId: string;
    submittedAt: string;
    autoSent?: boolean;
  } | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<'success' | 'fallback' | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (calculatorCalculation) {
      setFormData((prev) => ({
        ...prev,
        conceptDescription: prev.conceptDescription
          ? prev.conceptDescription
          : currentLang === 'pl'
          ? `[Kalkulacja z kalkulatora]: ${calculatorCalculation.people} os. na scenie (490 zł/os.) + ${calculatorCalculation.seconds}s wideo (20 zł/s) = ${calculatorCalculation.totalPrice.toLocaleString('pl-PL')} zł netto.`
          : `[Calculator Estimate]: ${calculatorCalculation.people} performer(s) on stage (490 PLN/ea) + ${calculatorCalculation.seconds}s video (20 PLN/s) = ${calculatorCalculation.totalPrice.toLocaleString('en-US')} PLN net.`,
      }));
    }
  }, [calculatorCalculation, currentLang]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof BriefFormData, string>> = {};

    // 1. Imię i nazwisko / Nazwa zespołu (Wymagane)
    if (!formData.fullName.trim()) {
      errs.fullName =
        currentLang === 'pl'
          ? 'Podaj imię i nazwisko lub nazwę zespołu.'
          : 'Please enter your full name or band name.';
    }

    // 2. Numer telefonu (Wymagany)
    const cleanPhone = formData.phone.trim().replace(/[\s\-\(\)\.]/g, '');
    if (!formData.phone.trim()) {
      errs.phone =
        currentLang === 'pl' ? 'Numer telefonu jest wymagany.' : 'Phone number is required.';
    } else if (cleanPhone.length < 7 || !/^[+]?[0-9]{7,15}$/.test(cleanPhone)) {
      errs.phone =
        currentLang === 'pl'
          ? 'Wprowadź prawidłowy numer telefonu (min. 7 cyfr).'
          : 'Please enter a valid phone number (min. 7 digits).';
    }

    // 3. Adres e-mail (Wymagany)
    if (!formData.email.trim()) {
      errs.email = currentLang === 'pl' ? 'Adres e-mail jest wymagany.' : 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = currentLang === 'pl' ? 'Wprowadź prawidłowy adres e-mail.' : 'Please enter a valid email address.';
    }

    // Gatunek muzyczny i link do utworu NIE są wymagane do wysyłki (pozostają opcjonalne)

    // 4. Zgoda na przetwarzanie danych (Wymagana)
    if (!formData.acceptedPrivacy) {
      errs.acceptedPrivacy =
        currentLang === 'pl'
          ? 'Wymagana jest zgoda na przetwarzanie danych w celu przygotowania wyceny.'
          : 'Consent to data processing is required to prepare your proposal.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateMailtoUrl = (data: BriefFormData, refId: string) => {
    const clientName = data.fullName.trim() || 'Nowy projekt';
    const subject = encodeURIComponent(`[BRIEF MASH CLIPS AI] ${refId} - ${clientName}`);
    const body = encodeURIComponent(`
Dzień dobry!

Przesyłam wypełniony formularz briefu ze strony MASH Clips AI:

DANE KONTAKTOWE:
--------------------------------------------------
Numer referencyjny: ${refId}
Data zgłoszenia: ${new Date().toLocaleString('pl-PL')}
Imię i nazwisko / Nazwa zespołu: ${data.fullName}
Numer telefonu: ${data.phone}
Adres e-mail: ${data.email}

SZCZEGÓŁY PROJEKTU:
--------------------------------------------------
Gatunek muzyczny: ${data.genre.trim() || '(nie podano / do ustalenia)'}
Link do utworu / demo: ${data.demoLink.trim() || '(brak / do dosłania)'}

OPIS KONCEPCJI I WIZJI WIZUALNEJ:
--------------------------------------------------
${data.conceptDescription.trim() || '(do omówienia podczas wstępnej konsultacji)'}

--------------------------------------------------
Wiadomość wygenerowana z formularza na stronie MASH Clips AI.
Adres docelowy: dreamstudiopl@gmail.com
    `.trim());

    return `mailto:dreamstudiopl@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setDeliveryStatus(null);

    const refId = `MASH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      _subject: `[MASH CLIPS AI] Nowy Brief: ${formData.fullName.trim()} (${refId})`,
      _replyto: formData.email.trim(),
      _template: 'table',
      _captcha: 'false',
      'Numer referencyjny': refId,
      'Data zgłoszenia': new Date().toLocaleString(currentLang === 'pl' ? 'pl-PL' : 'en-US'),
      'Imię i nazwisko / Nazwa zespołu': formData.fullName.trim(),
      'Numer telefonu': formData.phone.trim(),
      'Adres e-mail': formData.email.trim(),
      'Gatunek muzyczny': formData.genre.trim() || (currentLang === 'pl' ? 'Do ustalenia' : 'TBD'),
      'Link do utworu / demo': formData.demoLink.trim() || (currentLang === 'pl' ? 'Brak' : 'None'),
      'Opis koncepcji / wizja artystyczna':
        formData.conceptDescription.trim() ||
        (currentLang === 'pl'
          ? 'Do omówienia podczas wstępnej konsultacji'
          : 'To discuss during initial consultation'),
    };

    let sentAutomatically = false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      const res = await fetch('https://formsubmit.co/ajax/dreamstudiopl@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        sentAutomatically = true;
      }
    } catch (err) {
      console.warn('FormSubmit external delivery notice:', err);
      sentAutomatically = false;
    }

    const submission = {
      data: { ...formData },
      referenceId: refId,
      submittedAt: new Date().toISOString(),
      autoSent: sentAutomatically,
    };

    try {
      const history = JSON.parse(localStorage.getItem('mash_briefs_history') || '[]');
      history.unshift(submission);
      localStorage.setItem('mash_briefs_history', JSON.stringify(history));
    } catch {
      // ignore
    }

    setSubmittedBrief(submission);
    setDeliveryStatus(sentAutomatically ? 'success' : 'fallback');
    setIsSubmitting(false);
  };

  const handleCopySummary = () => {
    if (!submittedBrief) return;
    const text = `
=== BRIEF PRODUKCYJNY MASH CLIPS AI ===
Nr referencyjny: ${submittedBrief.referenceId}
Data: ${new Date(submittedBrief.submittedAt).toLocaleString()}
Imię i nazwisko / Nazwa zespołu: ${submittedBrief.data.fullName}
Numer telefonu: ${submittedBrief.data.phone}
E-mail: ${submittedBrief.data.email}
Gatunek: ${submittedBrief.data.genre.trim() || '(nie podano)'}
Link do utworu: ${submittedBrief.data.demoLink.trim() || '(brak)'}
Opis koncepcji:
${submittedBrief.data.conceptDescription.trim() || '(brak opisu)'}
Adres docelowy: dreamstudiopl@gmail.com
======================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJSON = () => {
    if (!submittedBrief) return;
    const blob = new Blob([JSON.stringify(submittedBrief, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Brief_${submittedBrief.referenceId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMailtoDirect = () => {
    if (!submittedBrief) return;
    const mailtoUrl = generateMailtoUrl(submittedBrief.data, submittedBrief.referenceId);
    window.location.href = mailtoUrl;
  };

  const handleResetForm = () => {
    setSubmittedBrief(null);
    setDeliveryStatus(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      artistName: '',
      genre: '',
      demoLink: '',
      conceptDescription: '',
      acceptedPrivacy: false,
    });
    setErrors({});
  };

  return (
    <section id="brief" className="py-24 bg-[#0a0a0a] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5242A]">
            <Send className="w-3.5 h-3.5" />
            <span>{copy.contact.kicker}</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {copy.contact.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#A5A5A5] leading-relaxed">
            {copy.contact.lead}
          </p>
        </div>

        {/* Form Container with 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Brief Form */}
          <div className="lg:col-span-8 rounded-2xl bg-[#121212] border border-[#262626] p-6 sm:p-10 shadow-xl">
            {submittedBrief ? (
              /* Success State */
              <div className="space-y-6 animate-fade-in">
                {deliveryStatus === 'fallback' ? (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-wider font-semibold border border-amber-500/20">
                        {currentLang === 'pl' ? 'Wymagana wysyłka 1-kliknięciem' : '1-Click Send Required'}
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">
                        {currentLang === 'pl' ? 'Brief gotowy do przekazania' : 'Brief Ready for Dispatch'}
                      </h3>
                      <p className="text-sm text-[#A5A5A5] leading-relaxed">
                        {currentLang === 'pl'
                          ? 'Twój brief został bezpiecznie zapisany. Z powodu blokady zewnętrznych skryptów w przeglądarce, kliknij poniższy przycisk, aby wysłać go do studia:'
                          : 'Your brief is safely saved. Due to browser restrictions, click below to dispatch to our studio:'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider font-semibold border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {currentLang === 'pl' ? 'Wysłano automatycznie online' : 'Automatically sent online'}
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">
                        {copy.contact.form.successTitle}
                      </h3>
                      <p className="text-sm text-[#A5A5A5] leading-relaxed">
                        {copy.contact.form.successMessage}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-5 rounded-xl bg-[#171717] border border-[#262626] space-y-3 font-mono text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242424] pb-3">
                    <span className="text-[#A5A5A5]">{copy.contact.form.referenceCode}</span>
                    <span className="text-[#E5242A] font-bold text-sm">
                      {submittedBrief.referenceId}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-[#A5A5A5]">
                        {currentLang === 'pl' ? 'Docelowy adres studia:' : 'Target studio email:'}
                      </span>
                    </div>
                    <a
                      href="mailto:dreamstudiopl@gmail.com"
                      className="text-emerald-300 font-bold hover:underline transition-colors"
                    >
                      dreamstudiopl@gmail.com
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#cccccc]">
                    <div>
                      <span className="text-[#777777] block">
                        {currentLang === 'pl' ? 'Imię i nazwisko / Zespół:' : 'Name / Band:'}
                      </span>
                      <span className="text-white font-medium">{submittedBrief.data.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] block">
                        {currentLang === 'pl' ? 'Numer telefonu:' : 'Phone Number:'}
                      </span>
                      <span className="text-white font-medium">{submittedBrief.data.phone}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] block">
                        {currentLang === 'pl' ? 'Adres e-mail:' : 'Email Address:'}
                      </span>
                      <span className="text-white font-medium">{submittedBrief.data.email}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] block">
                        {currentLang === 'pl' ? 'Gatunek muzyczny:' : 'Musical Genre:'}
                      </span>
                      <span className="text-white font-medium">
                        {submittedBrief.data.genre.trim() || (currentLang === 'pl' ? 'Do ustalenia' : 'TBD')}
                      </span>
                    </div>
                    {submittedBrief.data.demoLink && (
                      <div className="sm:col-span-2">
                        <span className="text-[#777777] block">
                          {currentLang === 'pl' ? 'Link do utworu / demo:' : 'Track / Demo Link:'}
                        </span>
                        <a
                          href={submittedBrief.data.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E5242A] hover:underline break-all"
                        >
                          {submittedBrief.data.demoLink}
                        </a>
                      </div>
                    )}
                    {submittedBrief.data.conceptDescription && (
                      <div className="sm:col-span-2 pt-1 border-t border-[#242424]">
                        <span className="text-[#777777] block">
                          {currentLang === 'pl' ? 'Opis pomysłu / uwagi:' : 'Concept / Vision:'}
                        </span>
                        <p className="text-[#cccccc] text-xs font-sans whitespace-pre-wrap mt-0.5">
                          {submittedBrief.data.conceptDescription}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Practical Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {deliveryStatus === 'fallback' ? (
                    <button
                      onClick={handleMailtoDirect}
                      className="px-5 py-3 bg-[#E5242A] hover:bg-[#c91d22] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E5242A]/20"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{copy.contact.form.sendEmailDirect}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleMailtoDirect}
                      className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] text-[#b0b0b0] hover:text-white text-xs font-semibold rounded-lg border border-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
                      title={currentLang === 'pl' ? 'Wyślij dodatkową kopię ze swojej skrzynki' : 'Send extra copy from your mail app'}
                    >
                      <Mail className="w-4 h-4 text-[#888888]" />
                      <span>{copy.contact.form.sendEmailDirect}</span>
                    </button>
                  )}

                  <button
                    onClick={handleCopySummary}
                    className="px-4 py-2.5 bg-[#1f1f1f] hover:bg-[#282828] text-white text-xs font-semibold rounded-lg border border-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-[#A5A5A5]" />
                    <span>{copied ? (currentLang === 'pl' ? 'Skopiowano!' : 'Copied!') : copy.contact.form.copyBrief}</span>
                  </button>

                  <button
                    onClick={handleDownloadJSON}
                    className="px-4 py-2.5 bg-[#1f1f1f] hover:bg-[#282828] text-white text-xs font-semibold rounded-lg border border-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#A5A5A5]" />
                    <span>{copy.contact.form.downloadBrief}</span>
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2.5 text-[#888888] hover:text-white text-xs transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{copy.contact.form.newBrief}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {calculatorCalculation && (
                  <div className="p-4 rounded-xl bg-[#E5242A]/10 border border-[#E5242A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E5242A] animate-pulse" />
                      <span>
                        {currentLang === 'pl'
                          ? `Zastosowano kalkulację: ${calculatorCalculation.people} os. na scenie · ${calculatorCalculation.seconds}s (${Math.floor(calculatorCalculation.seconds / 60)}:${(calculatorCalculation.seconds % 60).toString().padStart(2, '0')} min)`
                          : `Applied Calculation: ${calculatorCalculation.people} performer(s) · ${calculatorCalculation.seconds}s`}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[#E5242A]">
                      {calculatorCalculation.totalPrice.toLocaleString('pl-PL')} zł netto
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Full Name / Band Name - Required */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.fullName} <span className="text-[#E5242A]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={copy.contact.form.fullNamePlaceholder}
                      className={`w-full px-4 py-3 rounded-lg bg-[#181818] border text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                        errors.fullName ? 'border-[#E5242A]' : 'border-[#2a2a2a] focus:border-[#555555]'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-[#E5242A] flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone Number - Required (Replaces Artist Name) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.phone || (currentLang === 'pl' ? 'Numer telefonu' : 'Phone Number')}{' '}
                      <span className="text-[#E5242A]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={copy.contact.form.phonePlaceholder || '+48 500 000 000'}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#181818] border text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                          errors.phone ? 'border-[#E5242A]' : 'border-[#2a2a2a] focus:border-[#555555]'
                        }`}
                      />
                      <Phone className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.phone && (
                      <span className="text-[11px] text-[#E5242A] flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Email - Required */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.email} <span className="text-[#E5242A]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={copy.contact.form.emailPlaceholder}
                      className={`w-full px-4 py-3 rounded-lg bg-[#181818] border text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                        errors.email ? 'border-[#E5242A]' : 'border-[#2a2a2a] focus:border-[#555555]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-[#E5242A] flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Musical Genre - Optional */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                        {currentLang === 'pl' ? 'Gatunek muzyczny' : 'Musical Genre'}
                      </label>
                      <span className="text-[10px] font-mono text-[#777777]">
                        {currentLang === 'pl' ? '(opcjonalnie)' : '(optional)'}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      placeholder={copy.contact.form.genrePlaceholder}
                      className="w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#2a2a2a] focus:border-[#555555] text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Track Link / Demo Link - Optional */}
                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                        {currentLang === 'pl' ? 'Link do utworu / demo' : 'Link to Track or Demo'}
                      </label>
                      <span className="text-[10px] font-mono text-[#777777]">
                        {currentLang === 'pl' ? '(opcjonalnie)' : '(optional)'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#888888]">
                      {copy.contact.form.demoLinkHelp}
                    </span>
                  </div>
                  <input
                    type="url"
                    value={formData.demoLink}
                    onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                    placeholder={copy.contact.form.demoLinkPlaceholder}
                    className="w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#2a2a2a] focus:border-[#555555] text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors"
                  />
                </div>

                {/* Concept Description - Optional */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.conceptDescription}
                    </label>
                    <span className="text-[10px] font-mono text-[#777777]">
                      {currentLang === 'pl' ? 'opcjonalnie' : 'optional'}
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={formData.conceptDescription}
                    onChange={(e) => setFormData({ ...formData, conceptDescription: e.target.value })}
                    placeholder={copy.contact.form.conceptPlaceholder}
                    className="w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#2a2a2a] focus:border-[#555555] text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors"
                  />
                </div>

                {/* Privacy Policy Consent Checkbox - Touch Friendly Box */}
                <div className="space-y-1.5 pt-1">
                  <label className="p-3.5 rounded-xl bg-[#151515] border border-[#242424] flex items-start gap-3 cursor-pointer hover:border-[#383838] transition-colors select-none">
                    <input
                      type="checkbox"
                      checked={formData.acceptedPrivacy}
                      onChange={(e) => setFormData({ ...formData, acceptedPrivacy: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded bg-[#1f1f1f] border-[#383838] text-[#E5242A] focus:ring-0 focus:ring-offset-0 cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-[#A5A5A5] leading-relaxed">
                      {copy.contact.form.privacyConsent}
                    </span>
                  </label>
                  {errors.acceptedPrivacy && (
                    <span className="text-[11px] text-[#E5242A] flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.acceptedPrivacy}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 sm:py-3.5 bg-[#E5242A] hover:bg-[#c91d22] disabled:opacity-60 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#E5242A]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>{copy.contact.form.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span>{copy.contact.form.submitBtn}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-mono text-[#888888] pt-1">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-semibold">
                        {currentLang === 'pl'
                          ? 'Automatyczna wysyłka online'
                          : 'Instant automatic submission'}
                      </span>
                    </div>
                    <span className="hidden sm:inline text-[#444444]">·</span>
                    <span className="text-[#999999]">
                      {currentLang === 'pl'
                        ? 'Bezpośrednio do studia na adres: '
                        : 'Directly to studio inbox: '}
                      <a href="mailto:dreamstudiopl@gmail.com" className="text-white hover:text-[#E5242A] underline font-semibold">
                        dreamstudiopl@gmail.com
                      </a>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Studio Contact & Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl bg-[#121212] border border-[#262626] p-6 sm:p-8 space-y-6">
              <h3 className="text-base font-bold font-display uppercase tracking-wider text-white">
                {copy.contact.directContact.title}
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#E5242A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#777777] block text-[11px]">{copy.contact.directContact.emailLabel}</span>
                    <a
                      href={`mailto:${copy.contact.directContact.email}`}
                      className="text-white hover:text-[#E5242A] transition-colors"
                    >
                      {copy.contact.directContact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E5242A] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[#777777] block text-[11px]">{copy.contact.directContact.stageLabel}</span>
                    <span className="text-white font-medium block">
                      {copy.contact.directContact.stageName}
                    </span>
                    <span className="text-[#b0b0b0] block">
                      {copy.contact.directContact.addressStreet}
                    </span>
                    <span className="text-[#b0b0b0] block">
                      {copy.contact.directContact.addressCity}
                    </span>
                    <span className="text-[#888888] block text-[11px]">
                      {copy.contact.directContact.addressCountry}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#E5242A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#777777] block text-[11px]">{copy.contact.directContact.hoursLabel}</span>
                    <span className="text-white">
                      {copy.contact.directContact.hours}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#1f1f1f]">
                  <Phone className="w-4 h-4 text-[#E5242A] shrink-0 mt-1" />
                  <div className="space-y-2 w-full">
                    <span className="text-[#777777] block text-[11px] uppercase tracking-wider">{copy.contact.directContact.phoneLabel}</span>
                    <div className="grid grid-cols-1 gap-2 pt-0.5">
                      {copy.contact.directContact.phones.map((p, idx) => (
                        <a
                          key={idx}
                          href={p.href}
                          className="p-2.5 rounded-lg bg-[#181818] border border-[#262626] hover:border-[#E5242A] hover:bg-[#1e1e1e] transition-all block group min-h-[44px]"
                        >
                          <span className="text-[#888888] block text-[10px] font-mono">{p.name}</span>
                          <span className="text-white font-bold group-hover:text-[#E5242A] transition-colors text-xs sm:text-sm block">
                            {p.number}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#181818] border border-[#222222] text-xs text-[#8c8c8c] leading-relaxed">
                {copy.contact.directContact.note}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
