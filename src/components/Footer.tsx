import React, { useState } from 'react';
import { X, Shield, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { SITE_COPY } from '../data/content';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const copy = SITE_COPY[currentLang];
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-[#1c1c1c] text-[#A5A5A5] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#E5242A] rounded flex items-center justify-center font-bold text-white text-xs">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold uppercase font-display text-white tracking-tight">
                  MASH Clips <span className="text-[#E5242A]">AI</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#777777]">
                  MASH Schron Muzyczny
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8c8c8c] leading-relaxed max-w-sm">
              {copy.footer.partnershipNotice}
            </p>

            <p className="text-[11px] text-[#666666] leading-relaxed max-w-sm">
              {copy.footer.legalNote}
            </p>
          </div>

          {/* Nav Links Column 1 */}
          <div className="space-y-3 text-xs font-mono">
            <span className="text-white uppercase font-bold block tracking-wider">
              Studio & Oferta
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copy.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copy.nav.portfolio}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('genres')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copy.nav.genres}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('pipeline')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copy.nav.pipeline}
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="space-y-3 text-xs font-mono">
            <span className="text-white uppercase font-bold block tracking-wider">
              Produkcja
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('comparison')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copy.nav.comparison}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('packages')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copy.nav.packages}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('audience')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copy.nav.audience}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('brief')}
                  className="hover:text-white transition-colors cursor-pointer text-[#E5242A]"
                >
                  {copy.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3 text-xs font-mono">
            <span className="text-white uppercase font-bold block tracking-wider">
              Kontakt
            </span>
            <div className="space-y-2 text-[#cccccc]">
              <div>
                <a href="mailto:DreamStudiopl@gmail.com" className="hover:text-white transition-colors">
                  DreamStudiopl@gmail.com
                </a>
              </div>
              <div>
                <a href="tel:+48500184999" className="hover:text-white transition-colors">
                  +48 500 184 999
                </a>
                <span className="text-[#666666] mx-1">/</span>
                <a href="tel:+48501333061" className="hover:text-white transition-colors">
                  +48 501 333 061
                </a>
              </div>
              <div className="text-[#888888]">MASH Schron Muzyczny</div>
              <div className="text-[#888888]">Wojska Polskiego 3, 41-400 Mysłowice</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666666]">
          <div>
            © {new Date().getFullYear()} MASH Clips AI & MASH Schron Muzyczny. {copy.footer.rights}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {copy.footer.privacyLink}
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Wróć na górę strony"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#121212] border border-[#2a2a2a] p-6 sm:p-8 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div className="flex items-center gap-2 text-white font-bold font-display uppercase">
                <Shield className="w-5 h-5 text-[#E5242A]" />
                <span>Polityka Prywatności & Informacje Prawne</span>
              </div>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="p-1 text-[#A5A5A5] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#cccccc] leading-relaxed">
              <p>
                <strong>1. Administrator Danych:</strong> Administratorem danych osobowych przekazywanych za pośrednictwem formularza kontaktowego i briefu jest MASH Clips AI / MASH Schron Muzyczny realizowany we współpracy z Dream Studio Productions.
              </p>
              <p>
                <strong>2. Cel przetwarzania:</strong> Dane (imię i nazwisko, adres e-mail, nazwa wykonawcy, linki do materiałów demonstracyjnych) są przetwarzane wyłącznie w celu przygotowania koncepcji teledysku, wstępnej kalkulacji budżetowej oraz bezpośredniego kontaktu z artystą.
              </p>
              <p>
                <strong>3. Prawa autorskie i poufność utworów:</strong> Wszelkie przesłane wersje demonstracyjne (pliki demo, prywatne linki SoundCloud / Drive) podlegają ścisłej poufności i nie są publikowane ani udostępniane podmiotom trzecim bez wyraźnej pisemnej zgody autora.
              </p>
              <p>
                <strong>4. Wykorzystanie sztucznej inteligencji:</strong> Modele AI stosowane przez MASH Clips AI służą wyłącznie jako narzędzie kreacji scenografii i postprodukcji wideo. Modele nie trenują na utworach muzycznych klientów.
              </p>
              <p>
                <strong>5. Twoje prawa:</strong> Masz prawo wglądu do swoich danych, ich poprawiania, żądania usunięcia oraz cofnięcia zgody w dowolnym momencie pisząc na adres DreamStudiopl@gmail.com.
              </p>
            </div>

            <div className="pt-4 border-t border-[#222222] flex justify-end">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-5 py-2 bg-[#1f1f1f] hover:bg-[#282828] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Rozumiem i akceptuję
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
