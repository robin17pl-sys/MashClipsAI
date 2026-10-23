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
} from 'lucide-react';
import { Language, BriefFormData } from '../types';
import { SITE_COPY } from '../data/content';

interface ContactBriefSectionProps {
  currentLang: Language;
  preselectedPackage: string;
  calculatorCalculation?: {
    people: number;
    seconds: number;
    totalPrice: number;
    summary: string;
  } | null;
}

export const ContactBriefSection: React.FC<ContactBriefSectionProps> = ({
  currentLang,
  preselectedPackage,
  calculatorCalculation,
}) => {
  const copy = SITE_COPY[currentLang];

  const [formData, setFormData] = useState<BriefFormData>({
    fullName: '',
    email: '',
    artistName: '',
    genre: '',
    demoLink: '',
    productionPackage: preselectedPackage || 'MASH AI MUSIC VIDEO',
    estimatedBudget: '',
    targetDeadline: '',
    conceptDescription: '',
    acceptedPrivacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BriefFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<{
    data: BriefFormData;
    referenceId: string;
    submittedAt: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (calculatorCalculation) {
      setFormData((prev) => ({
        ...prev,
        productionPackage: calculatorCalculation.summary,
        estimatedBudget: `${calculatorCalculation.totalPrice.toLocaleString('pl-PL')} PLN`,
        conceptDescription: prev.conceptDescription
          ? prev.conceptDescription
          : currentLang === 'pl'
          ? `[Kalkulacja z kalkulatora]: ${calculatorCalculation.people} os. na scenie (490 zł/os.) + ${calculatorCalculation.seconds}s wideo (20 zł/s) = ${calculatorCalculation.totalPrice.toLocaleString('pl-PL')} zł netto.`
          : `[Calculator Estimate]: ${calculatorCalculation.people} performer(s) on stage (490 PLN/ea) + ${calculatorCalculation.seconds}s video (20 PLN/s) = ${calculatorCalculation.totalPrice.toLocaleString('en-US')} PLN net.`,
      }));
    } else if (preselectedPackage) {
      setFormData((prev) => ({ ...prev, productionPackage: preselectedPackage }));
    }
  }, [preselectedPackage, calculatorCalculation, currentLang]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof BriefFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = currentLang === 'pl' ? 'Podaj imię i nazwisko.' : 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      errs.email = currentLang === 'pl' ? 'Adres e-mail jest wymagany.' : 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = currentLang === 'pl' ? 'Wprowadź prawidłowy adres e-mail.' : 'Please enter a valid email address.';
    }

    if (!formData.artistName.trim()) {
      errs.artistName = currentLang === 'pl' ? 'Podaj nazwę artysty lub zespołu.' : 'Please enter artist or band name.';
    }

    if (!formData.genre.trim()) {
      errs.genre = currentLang === 'pl' ? 'Wybierz lub wpisz gatunek muzyczny.' : 'Please specify musical genre.';
    }

    if (!formData.demoLink.trim()) {
      errs.demoLink =
        currentLang === 'pl'
          ? 'Podaj link do utworu (SoundCloud, YouTube, Drive itp.).'
          : 'Please provide a link to your track/demo.';
    }

    if (!formData.conceptDescription.trim() || formData.conceptDescription.trim().length < 15) {
      errs.conceptDescription =
        currentLang === 'pl'
          ? 'Napisz przynajmniej kilka zdań o koncepcji lub klimacie utworu.'
          : 'Please write at least a few sentences describing the concept or mood.';
    }

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
    const subject = encodeURIComponent(`[BRIEF MASH CLIPS AI] ${refId} - ${data.artistName || 'Nowy projekt'}`);
    const body = encodeURIComponent(`
Dzień dobry!

Przesyłam wypełniony formularz briefu ze strony MASH Clips AI:

DANE PROJEKTU:
--------------------------------------------------
Numer referencyjny: ${refId}
Data zgłoszenia: ${new Date().toLocaleString('pl-PL')}
Artysta / Zespół: ${data.artistName}
Gatunek muzyczny: ${data.genre}
Wybrany pakiet: ${data.productionPackage}
Link do utworu / demo: ${data.demoLink}
Orientacyjny budżet: ${data.estimatedBudget || 'Do wyceny'}
Planowany termin: ${data.targetDeadline || 'Elastyczny'}

DANE KONTAKTOWE:
--------------------------------------------------
Osoba kontaktowa: ${data.fullName}
Adres e-mail: ${data.email}

OPIS KONCEPCJI I WIZJI WIZUALNEJ:
--------------------------------------------------
${data.conceptDescription}

--------------------------------------------------
Wiadomość wygenerowana z formularza na stronie MASH Clips AI.
Adres docelowy: dreamstudiopl@gmail.com
    `.trim());

    return `mailto:dreamstudiopl@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const refId = `MASH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const submission = {
      data: { ...formData },
      referenceId: refId,
      submittedAt: new Date().toISOString(),
    };

    try {
      const history = JSON.parse(localStorage.getItem('mash_briefs_history') || '[]');
      history.unshift(submission);
      localStorage.setItem('mash_briefs_history', JSON.stringify(history));
    } catch {
      // ignore
    }

    setSubmittedBrief(submission);
    setIsSubmitting(false);

    // Automatyczne przekierowanie całego formularza na dreamstudiopl@gmail.com
    const mailtoUrl = generateMailtoUrl(formData, refId);
    window.location.href = mailtoUrl;
  };

  const handleCopySummary = () => {
    if (!submittedBrief) return;
    const text = `
=== BRIEF PRODUKCYJNY MASH CLIPS AI ===
Nr referencyjny: ${submittedBrief.referenceId}
Data: ${new Date(submittedBrief.submittedAt).toLocaleString()}
Artysta / Zespół: ${submittedBrief.data.artistName}
Imię i nazwisko: ${submittedBrief.data.fullName}
E-mail: ${submittedBrief.data.email}
Gatunek: ${submittedBrief.data.genre}
Pakiet: ${submittedBrief.data.productionPackage}
Link do utworu: ${submittedBrief.data.demoLink}
Budżet orientacyjny: ${submittedBrief.data.estimatedBudget || 'Do ustalenia'}
Termin realizacji: ${submittedBrief.data.targetDeadline || 'Do ustalenia'}
Opis koncepcji:
${submittedBrief.data.conceptDescription}
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
    setFormData({
      fullName: '',
      email: '',
      artistName: '',
      genre: '',
      demoLink: '',
      productionPackage: 'MASH AI MUSIC VIDEO',
      estimatedBudget: '',
      targetDeadline: '',
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
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-display text-white">
                      {copy.contact.form.successTitle}
                    </h3>
                    <p className="text-sm text-[#A5A5A5]">
                      {copy.contact.form.successMessage}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#171717] border border-[#262626] space-y-3 font-mono text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242424] pb-3">
                    <span className="text-[#A5A5A5]">{copy.contact.form.referenceCode}</span>
                    <span className="text-[#E5242A] font-bold text-sm">
                      {submittedBrief.referenceId}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#E5242A]/10 border border-[#E5242A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-white">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#E5242A] shrink-0" />
                      <span className="text-[#A5A5A5]">
                        {currentLang === 'pl' ? 'Docelowy adres e-mail:' : 'Target studio e-mail:'}
                      </span>
                    </div>
                    <a
                      href="mailto:dreamstudiopl@gmail.com"
                      className="text-white font-bold hover:text-[#E5242A] transition-colors"
                    >
                      dreamstudiopl@gmail.com
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#cccccc]">
                    <div>
                      <span className="text-[#777777] block">Artysta / Zespół:</span>
                      <span className="text-white font-medium">{submittedBrief.data.artistName}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] block">Pakiet:</span>
                      <span className="text-white font-medium">{submittedBrief.data.productionPackage}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] block">E-mail:</span>
                      <span className="text-white font-medium">{submittedBrief.data.email}</span>
                    </div>
                    <div>
                      <span className="text-[#777777] block">Gatunek:</span>
                      <span className="text-white font-medium">{submittedBrief.data.genre}</span>
                    </div>
                  </div>
                </div>

                {/* Practical Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleMailtoDirect}
                    className="px-4 py-2.5 bg-[#E5242A] hover:bg-[#c91d22] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{copy.contact.form.sendEmailDirect}</span>
                  </button>

                  <button
                    onClick={handleCopySummary}
                    className="px-4 py-2.5 bg-[#1f1f1f] hover:bg-[#282828] text-white text-xs font-semibold rounded-lg border border-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-[#A5A5A5]" />
                    <span>{copied ? 'Skopiowano!' : copy.contact.form.copyBrief}</span>
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
                  {/* Full Name */}
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

                  {/* Email */}
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Artist / Band Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.artistName} <span className="text-[#E5242A]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.artistName}
                      onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                      placeholder={copy.contact.form.artistNamePlaceholder}
                      className={`w-full px-4 py-3 rounded-lg bg-[#181818] border text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                        errors.artistName ? 'border-[#E5242A]' : 'border-[#2a2a2a] focus:border-[#555555]'
                      }`}
                    />
                    {errors.artistName && (
                      <span className="text-[11px] text-[#E5242A] flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.artistName}
                      </span>
                    )}
                  </div>

                  {/* Musical Genre */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.genre} <span className="text-[#E5242A]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      placeholder={copy.contact.form.genrePlaceholder}
                      className={`w-full px-4 py-3 rounded-lg bg-[#181818] border text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                        errors.genre ? 'border-[#E5242A]' : 'border-[#2a2a2a] focus:border-[#555555]'
                      }`}
                    />
                    {errors.genre && (
                      <span className="text-[11px] text-[#E5242A] flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.genre}
                      </span>
                    )}
                  </div>
                </div>

                {/* Track Link / Demo Link */}
                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.demoLink} <span className="text-[#E5242A]">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-[#888888]">
                      {copy.contact.form.demoLinkHelp}
                    </span>
                  </div>
                  <input
                    type="url"
                    value={formData.demoLink}
                    onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                    placeholder={copy.contact.form.demoLinkPlaceholder}
                    className={`w-full px-4 py-3 rounded-lg bg-[#181818] border text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                      errors.demoLink ? 'border-[#E5242A]' : 'border-[#2a2a2a] focus:border-[#555555]'
                    }`}
                  />
                  {errors.demoLink && (
                    <span className="text-[11px] text-[#E5242A] flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.demoLink}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Production Package */}
                  <div className="space-y-1.5 sm:col-span-1">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.productionPackage}
                    </label>
                    <select
                      value={formData.productionPackage}
                      onChange={(e) => setFormData({ ...formData, productionPackage: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#2a2a2a] text-base sm:text-sm text-white focus:outline-none focus:border-[#555555] transition-colors"
                    >
                      {formData.productionPackage &&
                        !['MASH AI MUSIC VIDEO', 'MASH GREEN SCREEN PRODUCTION', 'MASH AI VIDEO CONCEPT', 'MASH CINEMATIC EXPERIENCE', 'MASH VISUAL CONTENT', 'Inny projekt indywidualny'].includes(formData.productionPackage) && (
                          <option value={formData.productionPackage}>
                            {formData.productionPackage}
                          </option>
                        )}
                      <option value="MASH AI MUSIC VIDEO">MASH AI Music Video</option>
                      <option value="MASH GREEN SCREEN PRODUCTION">MASH Green Screen Production</option>
                      <option value="MASH AI VIDEO CONCEPT">MASH AI Video Concept</option>
                      <option value="MASH CINEMATIC EXPERIENCE">MASH Cinematic Experience</option>
                      <option value="MASH VISUAL CONTENT">MASH Visual Content</option>
                      <option value="Inny projekt indywidualny">Inny projekt indywidualny</option>
                    </select>
                  </div>

                  {/* Estimated Budget Range (Optional) */}
                  <div className="space-y-1.5 sm:col-span-1">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.estimatedBudget}
                    </label>
                    <select
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#2a2a2a] text-base sm:text-sm text-white focus:outline-none focus:border-[#555555] transition-colors"
                    >
                      {formData.estimatedBudget &&
                        !['', '5 000 - 10 000 PLN', '10 000 - 20 000 PLN', '20 000 - 40 000 PLN', '40 000+ PLN', 'Do uzgodnienia / elastyczny'].includes(formData.estimatedBudget) && (
                          <option value={formData.estimatedBudget}>
                            {formData.estimatedBudget} (Z kalkulatora)
                          </option>
                        )}
                      <option value="">Wybierz przedział (opcjonalnie)...</option>
                      <option value="5 000 - 10 000 PLN">5 000 – 10 000 PLN</option>
                      <option value="10 000 - 20 000 PLN">10 000 – 20 000 PLN</option>
                      <option value="20 000 - 40 000 PLN">20 000 – 40 000 PLN</option>
                      <option value="40 000+ PLN">Powyżej 40 000 PLN</option>
                      <option value="Do uzgodnienia / elastyczny">Do uzgodnienia / elastyczny</option>
                    </select>
                  </div>

                  {/* Target Deadline */}
                  <div className="space-y-1.5 sm:col-span-1">
                    <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                      {copy.contact.form.targetDeadline}
                    </label>
                    <input
                      type="text"
                      value={formData.targetDeadline}
                      onChange={(e) => setFormData({ ...formData, targetDeadline: e.target.value })}
                      placeholder={copy.contact.form.targetDeadlinePlaceholder}
                      className="w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#2a2a2a] text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#555555] transition-colors"
                    />
                  </div>
                </div>

                {/* Concept Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#e0e0e0] block">
                    {copy.contact.form.conceptDescription} <span className="text-[#E5242A]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.conceptDescription}
                    onChange={(e) => setFormData({ ...formData, conceptDescription: e.target.value })}
                    placeholder={copy.contact.form.conceptPlaceholder}
                    className={`w-full px-4 py-3 rounded-lg bg-[#181818] border text-base sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                      errors.conceptDescription ? 'border-[#E5242A]' : 'border-[#2a2a2a] focus:border-[#555555]'
                    }`}
                  />
                  {errors.conceptDescription && (
                    <span className="text-[11px] text-[#E5242A] flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.conceptDescription}
                    </span>
                  )}
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
                <div className="pt-3 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 sm:py-3.5 bg-[#E5242A] hover:bg-[#c91d22] disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#E5242A]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      {isSubmitting ? copy.contact.form.submitting : copy.contact.form.submitBtn}
                    </span>
                    <Send className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-[#888888] font-mono flex items-center gap-1.5 pt-1">
                    <Mail className="w-3.5 h-3.5 text-[#E5242A] shrink-0" />
                    <span>
                      {currentLang === 'pl'
                        ? 'Formularz zostanie przekierowany bezpośrednio na mail: '
                        : 'The entire form is routed directly to email: '}
                      <a href="mailto:dreamstudiopl@gmail.com" className="text-white hover:text-[#E5242A] underline font-semibold">
                        dreamstudiopl@gmail.com
                      </a>
                    </span>
                  </p>
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
