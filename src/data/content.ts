import { ProjectConcept, PipelineStage, OfferPackage, AudienceGroup } from '../types';

export const IMAGES = {
  hero: '/src/assets/images/hero_greenscreen_ai_1792659959456.jpg',
  rawStudio: '/src/assets/images/greenscreen_raw_studio_1792659959653.jpg',
  aiFinal: '/src/assets/images/greenscreen_ai_final_1792659961299.jpg',
  productionStage: '/src/assets/images/studio_production_stage_1792659960829.jpg',
};

export const SITE_COPY = {
  pl: {
    brandName: 'MASH CLIPS AI',
    brandSub: 'MASH Schron Muzyczny',
    partnerBadge: 'we współpracy z Dream Studio Productions',
    nav: {
      about: 'Poznaj Studio',
      genres: 'Gatunki',
      portfolio: 'Portfolio & Showreel',
      pipeline: 'Jak Powstaje',
      comparison: 'Real Artists × AI',
      packages: 'Oferta',
      audience: 'Dla Kogo',
      contact: 'Brief & Kontakt',
    },
    hero: {
      badge: 'PRODUKCJA TELEDYSKÓW NOWEJ GENERACJI',
      headline: 'TWOJA MUZYKA. NASZ OBRAZ. NIEOGRANICZONA WYOBRAŹNIA.',
      subheadline:
        'Tworzymy profesjonalne teledyski, łącząc prawdziwych artystów, technologię Green Screen i możliwości sztucznej inteligencji. Od pierwszej nuty do ostatniej klatki budujemy światy, które nadają muzyce nowy wymiar.',
      ctaPrimary: 'STWÓRZMY TWÓJ TELEDYSK',
      ctaSecondary: 'ZOBACZ NASZE REALIZACJE',
      soundToggleOn: 'Dźwięk studyjny: WŁ.',
      soundToggleOff: 'Włącz atmosferę studyjną',
      stats: [
        { label: 'Standard realizacji', value: '4K / 6K Raw' },
        { label: 'Rejestracja artysty', value: 'Real Green Screen' },
        { label: 'Środowiska wizualne', value: 'AI Generative VFX' },
        { label: 'Partner produkcyjny', value: 'Dream Studio' },
      ],
    },
    about: {
      kicker: 'O NASZYM PODEJŚCIU',
      headline: 'NIE TWORZYMY TYLKO OBRAZU. TWORZYMY ŚWIAT DLA TWOJEJ MUZYKI.',
      lead:
        'MASH Clips AI to kreatywne studio produkcji teledysków, w którym muzyka, film i sztuczna inteligencja łączą się w jedną artystyczną wizję. Pracujemy z żywymi artystami, wykorzystujemy Green Screen i nowoczesne narzędzia AI, aby tworzyć obrazy dopasowane do charakteru, emocji i energii każdego utworu.',
      pillars: [
        {
          title: 'Żywy Artysta w Centrum',
          desc: 'Nie zastępujemy wykonawcy cyfrowym avatarem. Rejestrujemy Twoją prawdziwą ekspresję, ruch i charyzmę sceniczną na planie filmowym.',
        },
        {
          title: 'Kreatywna Kontrola nad AI',
          desc: 'AI jest dla nas zaawansowanym pędzlem scenograficznym i silnikiem kreacji monumentalnych przestrzeni niemożliwych do sfilmowania tradycyjnie.',
        },
        {
          title: 'Filmowa Jakość & Grading',
          desc: 'Precyzyjne kluczowanie Green Screen, dopasowanie oświetlenia (light wrap), głębi ostrości i profesjonalny grading w standardzie kinowym.',
        },
        {
          title: 'Synergia z Dream Studio Productions',
          desc: 'Pełne zaplecze techniczne: kamery kinowe, oświetlenie sceniczne, aparatura rejestracji i nadzór doświadczonych producentów.',
        },
      ],
    },
    genres: {
      kicker: 'KIERUNKI WIZUALNE',
      headline: 'KAŻDY GATUNEK MA SWÓJ WŁASNY ŚWIAT.',
      sub: 'Dostosowujemy estetykę, dynamikę cięć, oświetlenie i styl generowanego świata ściśle do rytmu i emocjonalnego ładunku Twojej muzyki.',
    },
    portfolio: {
      kicker: 'SHOWREEL & PROJEKTY',
      headline: 'OBRAZY, KTÓRE GRAJĄ RAZEM Z MUZYKĄ.',
      sub: 'Przejrzyj nasze przykładowe koncepty produkcyjne oraz demonstracyjne realizacje w różnych stylistykach muzycznych.',
      filterAll: 'Wszystkie Projekty',
      demoDisclaimer:
        'Wszystkie poniższe materiały są autorskimi, przykładowymi konceptami produkcyjnymi stworzonymi w celu demonstracji możliwości pipeline MASH Clips AI.',
      modalClose: 'Zamknij podgląd',
      techHeading: 'Zastosowane techniki',
      paletteHeading: 'Paleta barwna',
      synopsisHeading: 'Koncepcja wizualna',
      worldHeading: 'Świat wygenerowany AI',
    },
    pipeline: {
      kicker: 'PROCES REALIZACJI',
      headline: 'OD PRAWDZIWEGO WYKONAWCY DO NIEZWYKŁEGO ŚWIATA.',
      sub: '5-etapowy proces łączący rzemiosło tradycyjnej kinematografii z przełomową mocą generatywnej postprodukcji.',
    },
    comparison: {
      kicker: 'TECHNOLOGIA W PRAKTYCE',
      headline: 'PRAWDZIWY ARTYSTA. NIEOGRANICZONE MOŻLIWOŚCI OBRAZU.',
      lead:
        'Fundamentem projektu jest prawdziwy wykonawca i jego muzyka. Sztuczna inteligencja pozwala tworzyć środowiska wizualne, których realizacja tradycyjnymi metodami wymagałaby milionowych budżetów lub była fizycznie niewykonalna.',
      dragPrompt: 'Przeciągnij suwak w lewo lub w prawo, aby porównać plan Green Screen z finalnym kadrem AI',
      labelBefore: 'Plan Green Screen (Raw)',
      labelAfter: 'Finalny Kadr AI (VFX Composite)',
      badge1: '100% Prawdziwy wykonawca',
      badge2: 'Generatywna scenografia 4K',
      badge3: 'Kinowy Matchmoving & Color',
    },
    partnership: {
      kicker: 'SOJUSZ PRODUKCYJNY',
      headline: 'KREATYWNA WIZJA. PROFESJONALNA REALIZACJA.',
      lead:
        'Łączymy potencjał sztucznej inteligencji z doświadczeniem produkcji audiowizualnej, aby rozwijać pomysły, które wymagają indywidualnego podejścia, precyzji i filmowej wyobraźni.',
      mashRoleTitle: 'MASH Clips AI / MASH Schron Muzyczny',
      mashRoleDesc:
        'Opracowanie koncepcji artystycznej, prompt crafting, generatywne środowiska 3D/AI, synteza wizualna, reżyseria estetyki wirtualnej.',
      dreamRoleTitle: 'Dream Studio Productions',
      dreamRoleDesc:
        'Zaplecze planu filmowego, zaawansowane oświetlenie kinowe, precyzyjne zdjęcia Green Screen, rejestracja wielokamerowa, montaż i finalny mastering wideo.',
    },
    packages: {
      kicker: 'PAKIETY I WSPÓŁPRACA',
      headline: 'JAKI ŚWIAT STWORZYMY DLA TWOJEJ MUZYKI?',
      sub: 'Każdy projekt wyceniamy indywidualnie na podstawie złożoności utworu, liczby lokacji wirtualnych i zakresu planu zdjęciowego.',
      cta: 'Zapytaj o projekt',
      scopeLabel: 'Zakres pakietu:',
      idealForLabel: 'Dla kogo:',
      turnaroundLabel: 'Czas realizacji:',
    },
    audience: {
      kicker: 'DOCELOWI ARTYŚCI',
      headline: 'DLA ARTYSTÓW, KTÓRZY CHCĄ POKAZAĆ WIĘCEJ.',
      sub: 'Tworzymy z myślą o muzykach o wyrazistej tożsamości, którzy chcą, by ich obraz był równie silny jak ich muzyka.',
    },
    contact: {
      kicker: 'ROZPOCZNIJMY WSPÓŁPRACĘ',
      headline: 'TWOJA MUZYKA ZASŁUGUJE NA WYJĄTKOWY OBRAZ.',
      lead:
        'Opowiedz nam o swoim utworze. Wspólnie stworzymy koncepcję teledysku, który podkreśli charakter Twojej muzyki i pozwoli jej wybrzmieć również obrazem.',
      form: {
        fullName: 'Imię i nazwisko',
        fullNamePlaceholder: 'np. Jan Kowalski',
        email: 'Adres e-mail',
        emailPlaceholder: 'twoj.email@artysta.pl',
        artistName: 'Nazwa artysty lub zespołu',
        artistNamePlaceholder: 'np. The Black Aurora',
        genre: 'Gatunek muzyczny',
        genrePlaceholder: 'Wybierz lub wpisz gatunek...',
        demoLink: 'Link do utworu / demo',
        demoLinkPlaceholder: 'SoundCloud, YouTube, Dysk Google, Spotify, Dropbox...',
        demoLinkHelp: 'Podaj publiczny lub prywatny link do odsłuchu Twojego utworu.',
        productionPackage: 'Rodzaj poszukiwanej produkcji',
        estimatedBudget: 'Orientacyjny budżet (opcjonalnie)',
        budgetPlaceholder: 'Wybierz orientacyjny zakres...',
        targetDeadline: 'Planowany termin realizacji / premiery',
        targetDeadlinePlaceholder: 'np. Listopad 2026 / do ustalenia',
        conceptDescription: 'Opis pomysłu na teledysk i wizja artystyczna',
        conceptPlaceholder:
          'Napisz o czym jest utwór, jakie emocje ma wywoływać, jakie lokacje lub motywy wizualne Cię inspirują...',
        privacyConsent:
          'Wyrażam zgodę na przetwarzanie podanych danych osobowych w celu przygotowania koncepcji teledysku i oferty współpracy zgodnie z polityką prywatności.',
        submitBtn: 'ROZPOCZNIJMY TWÓJ PROJEKT',
        submitting: 'Przetwarzanie zapytania...',
        successTitle: 'Brief został pomyślnie przyjęty!',
        successMessage:
          'Dziękujemy za przesłanie zgłoszenia do MASH Clips AI. Przeanalizujemy Twój utwór i skontaktujemy się z Tobą w ciągu 24–48 godzin, aby przedstawić wstępną koncepcję wizualną.',
        referenceCode: 'Numer referencyjny Twojego briefu:',
        copyBrief: 'Kopiuj treść briefu',
        downloadBrief: 'Pobierz podsumowanie (JSON)',
        sendEmailDirect: 'Wyślij kopię przez e-mail',
        newBrief: 'Wypełnij kolejny formularz',
      },
      directContact: {
        title: 'Bezpośredni kontakt ze studiem',
        email: 'kontakt@mashclips.ai',
        schronEmail: 'schron@mashmuzyka.pl',
        location: 'MASH Schron Muzyczny / Dream Studio Productions, Polska',
        hours: 'Poniedziałek – Piątek: 10:00 – 19:00',
        note: 'Możliwość spotkania stacjonarnego w studiu po wcześniejszym umówieniu terminu.',
      },
    },
    footer: {
      rights: 'Wszelkie prawa zastrzeżone.',
      partnershipNotice: 'Wspólna inicjatywa produkcyjna MASH Clips AI & Dream Studio Productions.',
      legalNote:
        'Sztuczna inteligencja wykorzystywana w produkcjach MASH Clips AI stanowi zaawansowane narzędzie scenograficzne i postprodukcyjne uzupełniające autentyczny występ artystów.',
      privacyLink: 'Polityka prywatności i cookies',
      termsLink: 'Regulamin współpracy',
    },
  },
  en: {
    brandName: 'MASH CLIPS AI',
    brandSub: 'MASH Music Bunker',
    partnerBadge: 'in collaboration with Dream Studio Productions',
    nav: {
      about: 'About Studio',
      genres: 'Genres',
      portfolio: 'Portfolio & Reel',
      pipeline: 'Pipeline',
      comparison: 'Real Artists × AI',
      packages: 'Services',
      audience: 'For Artists',
      contact: 'Brief & Contact',
    },
    hero: {
      badge: 'NEXT-GENERATION MUSIC VIDEO PRODUCTION',
      headline: 'REAL ARTISTS. AI WORLDS. CINEMATIC MUSIC VIDEOS.',
      subheadline:
        'We produce high-end music videos fusing real performers, green screen soundstages, and artificial intelligence environments. From the first note to the final frame, we build worlds that elevate your music.',
      ctaPrimary: 'CREATE YOUR MUSIC VIDEO',
      ctaSecondary: 'EXPLORE RECENT WORKS',
      soundToggleOn: 'Studio audio: ON',
      soundToggleOff: 'Enable studio soundscape',
      stats: [
        { label: 'Capture Standard', value: '4K / 6K Raw' },
        { label: 'Artist Performance', value: 'Real Green Screen' },
        { label: 'Visual Environments', value: 'AI Generative VFX' },
        { label: 'Production Partner', value: 'Dream Studio' },
      ],
    },
    about: {
      kicker: 'OUR ARTISTIC PHILOSOPHY',
      headline: 'WE DONT JUST MAKE CLIPS. WE BUILD WORLDS FOR YOUR MUSIC.',
      lead:
        'MASH Clips AI is an innovative music video production house where music, cinema, and artificial intelligence converge into a unified artistic vision. Working with live artists on green screen soundstages, we leverage cutting-edge AI tools to design visual worlds tailored to the soul, tempo, and emotion of every track.',
      pillars: [
        {
          title: 'Live Artist at the Core',
          desc: 'We never replace the human artist with a synthetic avatar. Your raw charisma, live performance, and real motion take center stage.',
        },
        {
          title: 'Creative AI Direction',
          desc: 'AI serves as an infinite digital set builder, enabling monumental architecture, cosmic voids, and fantasy landscapes impossible via traditional sets.',
        },
        {
          title: 'Cinema Grade Compositing',
          desc: 'Flawless green screen keying, realistic light wraps, depth matching, camera blur, and master Hollywood-grade color grading.',
        },
        {
          title: 'Dream Studio Productions Partnership',
          desc: 'Complete industrial film set infrastructure: cinema lenses, pro grip, lighting rigs, multi-cam capture, and seasoned film crew.',
        },
      ],
    },
    genres: {
      kicker: 'GENRE EXPLORATION',
      headline: 'EVERY GENRE HAS ITS OWN REALM.',
      sub: 'We sculpt aesthetic palettes, lighting kinetics, and world geometry precisely to honor the rhythm and emotional charge of your sound.',
    },
    portfolio: {
      kicker: 'SHOWREEL & CONCEPTS',
      headline: 'VISUALS THAT RESONATE WITH YOUR MUSIC.',
      sub: 'Explore our curated production concepts and demonstration showcases across multiple music genres.',
      filterAll: 'All Works',
      demoDisclaimer:
        'All works below are proprietary demonstration concepts developed to showcase the technical pipeline and aesthetic range of MASH Clips AI.',
      modalClose: 'Close Viewer',
      techHeading: 'Production Techniques',
      paletteHeading: 'Color Palette',
      synopsisHeading: 'Visual Concept',
      worldHeading: 'AI Generated Realm',
    },
    pipeline: {
      kicker: 'PRODUCTION PIPELINE',
      headline: 'FROM REAL PERFORMER TO SURREAL UNIVERSE.',
      sub: 'A disciplined 5-stage production process blending traditional cinematic filmmaking with next-generation generative post-production.',
    },
    comparison: {
      kicker: 'TECHNOLOGY IN ACTION',
      headline: 'REAL ARTIST. BOUNDLESS VISUAL CANVAS.',
      lead:
        'The foundation of every frame is the real artist and their musical soul. AI enables us to construct immersive cinematic worlds that would otherwise require multi-million studio budgets or remain physically unbuildable.',
      dragPrompt: 'Drag slider left or right to compare raw Green Screen soundstage with the final AI composite',
      labelBefore: 'Green Screen Soundstage (Raw)',
      labelAfter: 'Final AI Composite (Graded)',
      badge1: '100% Real Performer',
      badge2: 'Generative 4K Worldbuilding',
      badge3: 'Cinematic Matchmoving & Grading',
    },
    partnership: {
      kicker: 'PRODUCTION ALLIANCE',
      headline: 'CREATIVE VISION. FLAWLESS EXECUTION.',
      lead:
        'We unite the generative frontiers of AI with seasoned audiovisual film production to realize ideas that demand bold imagination and surgical precision.',
      mashRoleTitle: 'MASH Clips AI / MASH Schron Muzyczny',
      mashRoleDesc:
        'Creative direction, prompt engineering, generative environment architecture, aesthetic supervision, virtual world lighting.',
      dreamRoleTitle: 'Dream Studio Productions',
      dreamRoleDesc:
        'Film studio soundstage, cinema camera rigs, advanced grip & lighting, multi-cam sync, editing, and cinematic mastering.',
    },
    packages: {
      kicker: 'PRODUCTION SERVICES',
      headline: 'WHAT WORLD SHALL WE BUILD FOR YOUR TRACK?',
      sub: 'Every production is custom quoted based on narrative complexity, virtual set count, and soundstage requirements.',
      cta: 'Inquire About Package',
      scopeLabel: 'Included Scope:',
      idealForLabel: 'Recommended For:',
      turnaroundLabel: 'Production Timeline:',
    },
    audience: {
      kicker: 'WHO WE SERVE',
      headline: 'FOR ARTISTS READY TO STAND OUT.',
      sub: 'Tailored for visionary musicians who demand their visuals to be as profound and magnetic as their sonic art.',
    },
    contact: {
      kicker: 'COMMISSION A PROJECT',
      headline: 'YOUR MUSIC DESERVES AN EXCEPTIONAL VISUAL REALM.',
      lead:
        'Tell us about your upcoming release. Together, we will develop a music video concept that amplifies your sound across global visual platforms.',
      form: {
        fullName: 'Full Name',
        fullNamePlaceholder: 'e.g., Alex Rivers',
        email: 'Email Address',
        emailPlaceholder: 'artist@yourband.com',
        artistName: 'Artist or Band Name',
        artistNamePlaceholder: 'e.g., The Obsidian Echo',
        genre: 'Musical Genre',
        genrePlaceholder: 'Select or specify genre...',
        demoLink: 'Link to Track or Demo',
        demoLinkPlaceholder: 'SoundCloud, YouTube, Google Drive, Spotify, Dropbox...',
        demoLinkHelp: 'Provide a private or public audio link for our creative director to review.',
        productionPackage: 'Production Scope Desired',
        estimatedBudget: 'Estimated Budget Range (Optional)',
        budgetPlaceholder: 'Select approximate range...',
        targetDeadline: 'Target Release / Deadline',
        targetDeadlinePlaceholder: 'e.g., November 2026 / Flexible',
        conceptDescription: 'Visual Ideas & Artistic Vision',
        conceptPlaceholder:
          'Describe the song mood, story, desired environments, colors, or emotional themes...',
        privacyConsent:
          'I consent to the processing of submitted information to prepare a music video concept and quotation in accordance with the privacy policy.',
        submitBtn: 'SUBMIT PROJECT BRIEF',
        submitting: 'Processing brief...',
        successTitle: 'Brief Successfully Received!',
        successMessage:
          'Thank you for submitting your project to MASH Clips AI. Our creative director will listen to your demo and return a visual concept proposal within 24–48 hours.',
        referenceCode: 'Brief Reference Number:',
        copyBrief: 'Copy Brief Content',
        downloadBrief: 'Download Summary (JSON)',
        sendEmailDirect: 'Send via Email App',
        newBrief: 'Submit Another Brief',
      },
      directContact: {
        title: 'Direct Studio Inquiries',
        email: 'kontakt@mashclips.ai',
        schronEmail: 'schron@mashmuzyka.pl',
        location: 'MASH Schron Muzyczny / Dream Studio Productions, Poland',
        hours: 'Monday – Friday: 10:00 – 19:00 CET',
        note: 'In-person soundstage tours available by prior appointment.',
      },
    },
    footer: {
      rights: 'All rights reserved.',
      partnershipNotice: 'A collaborative production venture of MASH Clips AI & Dream Studio Productions.',
      legalNote:
        'Artificial intelligence used in MASH Clips AI productions serves as an advanced set design and VFX compositing tool enhancing genuine artist performances.',
      privacyLink: 'Privacy & Cookies Policy',
      termsLink: 'Terms of Service',
    },
  },
};

export const GENRE_DATA = [
  {
    id: 'rock-pop' as const,
    title: { pl: 'POP & ROCK', en: 'POP & ROCK' },
    tag: { pl: 'Energia · Neony · Miasto', en: 'Energy · Neons · Metropolis' },
    desc: {
      pl: 'Dynamiczne ujęcia, koncertowa ekspresja, pulsujące neony nocnych metropolii, deszczowe ulice i kinowa narracja współczesnego buntu.',
      en: 'High-octane performance cuts, neon-drenched night skylines, rain-slicked cityscapes, and kinetic concert atmosphere.',
    },
    accentColor: '#E5242A',
    sampleConcept: {
      artist: 'CyberPulse Trio',
      track: 'Neon Velocity',
      visual: 'Futurystyczne Tokio o zmierzchu, deszcz odbijający światła neonów wokół perkusisty na dachu wieżowca.',
    },
  },
  {
    id: 'metal' as const,
    title: { pl: 'HARD ROCK & HEAVY METAL', en: 'HARD ROCK & METAL' },
    tag: { pl: 'Mrok · Ogień · Monumenty', en: 'Darkness · Fire · Colossi' },
    desc: {
      pl: 'Mroczne światy, monumentalne industrialne ruiny, wulkaniczne krajobrazy, burze i surowy ogień podkreślające potęgę riffów.',
      en: 'Dystopian monoliths, volcanic tundras, gothic cathedrals, thunderclouds, and raw pyrotechnics fueling thunderous riffs.',
    },
    accentColor: '#FF3333',
    sampleConcept: {
      artist: 'Valkyrie Dawn',
      track: 'Echoes of Valhalla',
      visual: 'Monumentalna gotycka katedra z unoszącymi się monolitami z obsydianu i deszczem iskier wokół wokalisty.',
    },
  },
  {
    id: 'instrumental' as const,
    title: { pl: 'MUZYKA INSTRUMENTALNA', en: 'INSTRUMENTAL & AMBIENT' },
    tag: { pl: 'Przestrzeń · Natura · Metafora', en: 'Space · Nature · Metaphor' },
    desc: {
      pl: 'Wizualne narracje prowadzące widza przez przestrzenie kosmiczne, głębiny oceanów, mistyczne lasy i geometryczne abstrakcje.',
      en: 'Expansive natural vistas, cosmic nebula voyages, abyssal deeps, and visual poetry synchronized with intricate melodies.',
    },
    accentColor: '#38BDF8',
    sampleConcept: {
      artist: 'K. Vane',
      track: 'Abyssal Horizon',
      visual: 'Bioluminescencyjny rów oceaniczny pulsujący w rytm uderzeń fortepianu w kryształowej kapsule.',
    },
  },
  {
    id: 'classical' as const,
    title: { pl: 'MUZYKA KLASYCZNA', en: 'CLASSICAL & NEO-CLASSICAL' },
    tag: { pl: 'Elegancja · Architektura · Malarstwo', en: 'Elegance · Architecture · Fine Art' },
    desc: {
      pl: 'Dostojne kompozycje, pałacowe wnętrza, renesansowe sklepienia, kinowe oświetlenie chiaroscuro i malarskie pejzaże.',
      en: 'Grand marble halls, astronomical orreries, painterly chiaroscuro lighting, and timeless architectural grace.',
    },
    accentColor: '#F59E0B',
    sampleConcept: {
      artist: 'Aurora String Ensemble',
      track: 'Chronos Spheres',
      visual: 'Unoszące się marmurowe rotundy w antarktycznym świetle zorzy polarnej ze skrzypaczką w centrum.',
    },
  },
  {
    id: 'film-experimental' as const,
    title: { pl: 'FILMOWA & EKSPERYMENTALNA', en: 'CINEMATIC & EXPERIMENTAL' },
    tag: { pl: 'Surrealizm · Awangarda · Wymiary', en: 'Surrealism · Avant-Garde · Dimensions' },
    desc: {
      pl: 'Światy wykraczające poza fizykę: zaginanie czasoprzestrzeni, fraktalna geometria, abstrakcyjne formy organiczne i hipnotyczne metafory.',
      en: 'Mind-bending physics, spacetime curvature, fractal dimensions, and esoteric visual riddles for boundary-pushing audio.',
    },
    accentColor: '#A855F7',
    sampleConcept: {
      artist: 'Zero G Orchestra',
      track: 'Singularity Monolith',
      visual: 'Horyzont zdarzeń czarnej dziury pochłaniający świetliste wstęgi dźwięku wokół dyrygenta.',
    },
  },
];

export const PORTFOLIO_PROJECTS: ProjectConcept[] = [
  {
    id: 'project-promo-official',
    title: 'MASH CLIPS AI — OFICJALNE VIDEO PROMO',
    artist: 'MASH Clips AI × Dream Studio Productions',
    genre: 'all',
    genreLabel: { pl: 'Wszystkie Projekty · Oficjalne Promo', en: 'All Projects · Official Promo' },
    year: '2026',
    isDemoConcept: false,
    thumbnail: 'https://img.youtube.com/vi/UhUu5nLT6Ek/maxresdefault.jpg',
    duration: '03:15',
    bpm: 130,
    youtubeId: 'UhUu5nLT6Ek',
    youtubeUrl: 'https://youtu.be/UhUu5nLT6Ek',
    synopsis: {
      pl: 'Oficjalna wizytówka wideo MASH Clips AI — MASH Schron Muzyczny zrealizowana przy współpracy z Dream Studio Productions. Pełna demonstracja możliwości łączenia prawdziwych artystów z planem Green Screen, sztuczną inteligencją i kinową postprodukcją.',
      en: 'Official flagship promo video of MASH Clips AI & MASH Music Bunker created in collaboration with Dream Studio Productions. A full-spectrum demonstration of fusing real musical artists with green screen soundstages, artificial intelligence, and cinema-grade post-production.',
    },
    visualWorld: {
      pl: 'Dynamiczne przejścia pomiędzy planem filmowym Green Screen a monumentalnymi światami AI, zsynchronizowane z energią utworu i światłem kinowym.',
      en: 'Dynamic transitions between the physical green screen soundstage and monumental AI generative universes, locked to the rhythm and cinematic light.',
    },
    techniques: ['Official Video (YouTube)', 'Green Screen Cyclorama 4K/6K', 'Generative AI Worldbuilding', 'Cinema Color Grading'],
    colorPalette: ['#080808', '#E5242A', '#F5F5F5', '#171717'],
  },
  {
    id: 'project-valhalla',
    title: 'ECHOES OF VALHALLA',
    artist: 'Valkyrie Dawn',
    genre: 'metal',
    genreLabel: { pl: 'Hard Rock & Heavy Metal', en: 'Hard Rock & Heavy Metal' },
    year: '2026',
    isDemoConcept: true,
    thumbnail: IMAGES.aiFinal,
    duration: '04:18',
    bpm: 142,
    synopsis: {
      pl: 'Epicka podróż przez zrujnowaną gotycką katedrę na obcej planecie. Rejestracja wokalisty na Green Screen w MASH Schron Muzyczny połączona z wolumetrycznym oświetleniem i unoszącymi się monolitami z obsydianu.',
      en: 'An epic journey inside a dystopian gothic cathedral ruins on a foreign world. Live vocalist filmed on green screen cyclorama at MASH Schron, integrated with volumetric crimson fog and floating obsidian monoliths.',
    },
    visualWorld: {
      pl: 'Postapokaliptyczna świątynia, deszcz iskier, płomienie reagujące na solówki gitarowe, zimne neony w runicznych inskrypcjach.',
      en: 'Post-apocalyptic sanctuary, ember particle physics, pyrotechnics timed to guitar leads, cold neon runic glyphs.',
    },
    techniques: ['Green Screen 6K Capture', 'AI Generative Matte Painting', 'Unreal Engine Matchmoving', 'ACES Cinema Color Grading'],
    colorPalette: ['#080808', '#E5242A', '#D97706', '#1E293B'],
  },
  {
    id: 'project-neon',
    title: 'NEON VELOCITY',
    artist: 'CyberPulse Trio',
    genre: 'rock-pop',
    genreLabel: { pl: 'Pop & Modern Rock', en: 'Pop & Modern Rock' },
    year: '2026',
    isDemoConcept: true,
    thumbnail: IMAGES.hero,
    duration: '03:45',
    bpm: 128,
    synopsis: {
      pl: 'Solowy gitarzysta występujący na dachu wieżowca w cyberpunkowej metropolii. Plan filmowy z dynamicznym oświetleniem LED imitującym miejskie neony połączony z wygenerowaną panoramą miasta.',
      en: 'Solo guitarist performing on a skyscraper heli-pad in a neon-saturated metropolis. Studio lighting synchronized to virtual traffic and holographic billboards.',
    },
    visualWorld: {
      pl: 'Deszczowa metropolia o zmierzchu, latające pojazdy, anamorficzne flary świetlne i refleksy w kałużach scenicznych.',
      en: 'Rain-soaked dusk skyline, airborne speeders, anamorphic flares, and stage puddles reflecting neon ads.',
    },
    techniques: ['4K High-Speed Camera', 'Generative Cityscape Expansion', 'Light Wrapping & Spill Suppression', 'Grain & Halation Emulation'],
    colorPalette: ['#0A0A10', '#E5242A', '#06B6D4', '#6366F1'],
  },
  {
    id: 'project-chronos',
    title: 'CHRONOS SPHERES',
    artist: 'Aurora String Ensemble',
    genre: 'classical',
    genreLabel: { pl: 'Muzyka Klasyczna & Filmowa', en: 'Classical & Cinematic' },
    year: '2026',
    isDemoConcept: true,
    thumbnail: IMAGES.productionStage,
    duration: '05:12',
    bpm: 86,
    synopsis: {
      pl: 'Kwartet smyczkowy w lewitującej renesansowej rotundzie z widokiem na kosmiczną mgławicę. Realna gra na instrumentach połączona z płynnymi ujęciami wirtualnej kamery 360.',
      en: 'A string quartet performing inside a levitating marble rotunda orbiting a shimmering stellar nebula. Acoustic bow movements mapped to starlight ripples.',
    },
    visualWorld: {
      pl: 'Marmurowe kolumny, astrolabia astronomiczne, promienie słońca załamujące się w pudłach rezonansowych skrzypiec.',
      en: 'Polished Italian marble, brass astronomical astrolabes, volumetric celestial god-rays refracting through violins.',
    },
    techniques: ['Multi-cam Green Screen', 'Orbital Camera Tracking', 'AI Classical Architecture Synthesis', 'PBR Surface Reflections'],
    colorPalette: ['#121110', '#F59E0B', '#E2E8F0', '#1E3A8A'],
  },
  {
    id: 'project-abyssal',
    title: 'ABYSSAL HORIZON',
    artist: 'K. Vane',
    genre: 'instrumental',
    genreLabel: { pl: 'Muzyka Instrumentalna & Ambient', en: 'Instrumental & Ambient' },
    year: '2026',
    isDemoConcept: true,
    thumbnail: IMAGES.aiFinal,
    duration: '04:50',
    bpm: 94,
    synopsis: {
      pl: 'Pianista w szklanej komorze na dnie oceanu w strefie hadalnej. Dźwięki fortepianu wyzwalają rozbłyski bioluminescencyjnych stworzeń i prądy wodne.',
      en: 'Grand piano solo performance in an abyssal underwater trench. Dynamic lighting on the artist keys into deep sea marine life reactions.',
    },
    visualWorld: {
      pl: 'Głęboki błękit i czerń, fosforyzujące meduzy, czarne kominy hydrotermalne, drobinki planktonu.',
      en: 'Deep ultramarine void, bioluminescent hydro-jellies, geothermal vents, micro-particulate ocean snow.',
    },
    techniques: ['Fluid Motion AI Simulation', 'Subsurface Scattering Glow', 'Keyframe-matched Audio Reactivity', 'Film Noir Grading'],
    colorPalette: ['#030712', '#0284C7', '#065F46', '#F0FDFA'],
  },
  {
    id: 'project-singularity',
    title: 'SINGULARITY MONOLITH',
    artist: 'Zero G Orchestra',
    genre: 'film-experimental',
    genreLabel: { pl: 'Muzyka Filmowa & Awangardowa', en: 'Film Score & Experimental' },
    year: '2026',
    isDemoConcept: true,
    thumbnail: IMAGES.rawStudio,
    duration: '06:05',
    bpm: 110,
    synopsis: {
      pl: 'Eksperymentalny koncept łączący żywego dyrygenta i wokalistkę z dynamicznie zakrzywiającą się czasoprzestrzenią wokół horyzontu zdarzeń czarnej dziury.',
      en: 'Experimental fusion of live conductor and soprano vocalist warping spacetime geometry as the climax approaches the event horizon.',
    },
    visualWorld: {
      pl: 'Fraktale, złote linie grawitacji, soczewkowanie grawitacyjne i geometryczne struktury czwartego wymiaru.',
      en: 'Gravitational lensing rings, relativistic light shifts, non-Euclidean obsidian solids, multidimensional echoes.',
    },
    techniques: ['Neural Dimension Synthesis', 'Optical Flow Warp', '32-bit Float EXR Pipeline', 'Custom LUT Development'],
    colorPalette: ['#050505', '#E5242A', '#8B5CF6', '#FAFAFA'],
  },
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'concept',
    number: '01',
    title: { pl: 'KONCEPCJA & STORYBOARD', en: 'CONCEPT & STORYBOARD' },
    shortDesc: {
      pl: 'Poznajemy utwór, jego emocje, charakter, gatunek i wizję artysty.',
      en: 'We dissect the track, its emotional velocity, lyrical motifs, and artist vision.',
    },
    details: {
      pl: 'Opracowujemy kompleksowy scenariusz, moodboard stylistyczny, kolorystykę oraz projektujemy wstępne concept arty wygenerowane przy pomocy AI. Ustalamy z artystą kluczowe punkty kulminacyjne utworu i choreografię na planie.',
      en: 'We craft the narrative script, aesthetic moodboards, color palette, and early generative AI concept stills. We map the musical dynamic peaks to visual shifts.',
    },
    keyDeliverables: {
      pl: ['Brief artystyczny & Storyboard', 'Zestawienie palet i concept artów', 'Plan ujęć i oświetlenia scenicznego'],
      en: ['Artistic brief & Storyboard', 'Visual moodboard & concept stills', 'Shot list & lighting setup map'],
    },
    techSpec: 'Pre-wizualizacja AI & Moodboard 4K',
  },
  {
    id: 'shoot',
    number: '02',
    title: { pl: 'PLAN ZDJĘCIOWY GREEN SCREEN', en: 'GREEN SCREEN PRODUCTION' },
    shortDesc: {
      pl: 'Rejestrujemy prawdziwego wykonawcę na profesjonalnym planie studyjnym.',
      en: 'We capture the live artist on a professional green screen soundstage.',
    },
    details: {
      pl: 'Wspólnie z Dream Studio Productions realizujemy zdjęcia na cykloramie Green Screen. Stosujemy kamery kinowe (ARRI / RED / Sony Venice), profesjonalne oświetlenie dopasowane do przyszłego świata AI oraz precyzyjne znaczniki trackingu kamery.',
      en: 'Co-produced with Dream Studio Productions on a dedicated green screen cyclorama. Armed with cinema-grade sensor cameras, directional lighting matching the planned virtual world, and precision camera tracking markers.',
    },
    keyDeliverables: {
      pl: ['Materiały źródłowe 4K/6K Raw z kamery kinowej', 'Ścieżki audio z odsłuchu studyjnego', 'Dane telemetryczne kamery i metadane oświetlenia'],
      en: ['4K/6K Raw cinema source footage', 'Reference in-ear audio scratch track', 'Lens telemetry and lighting angle logs'],
    },
    techSpec: 'ARRI Alexa / RED Gemini + Oświetlenie Aputure/Nanlite',
  },
  {
    id: 'ai-world',
    number: '03',
    title: { pl: 'KREACJA ŚWIATA AI', en: 'AI WORLDBUILDING' },
    shortDesc: {
      pl: 'Projektujemy scenografie, krajobrazy, atmosferę i przestrzenie.',
      en: 'We engineer environments, landscapes, atmosphere, and colossal structures.',
    },
    details: {
      pl: 'Wykorzystując zaawansowane modele generatywne, syntezę dyfuzyjną oraz silniki 3D, budujemy spójne światy wizualne o wysokiej rozdzielczości. Tworzymy elementy tła, nieboskłony, cząstki atmosferyczne i dynamiczne efekty światła odpowiadające tempu utworu.',
      en: 'Using state-of-the-art generative diffusion models, neural matte painting, and 3D environment engines, we forge ultra-detailed virtual sets with custom depth maps and atmospheric light consistency.',
    },
    keyDeliverables: {
      pl: ['Matte paintingi i warstwy 3D środowiska', 'Mapy głębi i maski wolumetryczne', 'Elementy dynamiczne (dym, ogień, cząstki)'],
      en: ['Matte paintings & 3D background layers', 'Depth maps & volumetric shadow masks', 'Dynamic particle assets (fog, embers, flare)'],
    },
    techSpec: 'Generative Diffusion VFX + Unreal Engine Set Extension',
  },
  {
    id: 'postprod',
    number: '04',
    title: { pl: 'POSTPRODUKCJA & COMPOSITING', en: 'POSTPRODUCTION & COMPOSITING' },
    shortDesc: {
      pl: 'Łączymy materiał filmowy z wygenerowanymi elementami w jedną całość.',
      en: 'We seamlessly composite the live performance with the virtual AI environments.',
    },
    details: {
      pl: 'Kluczowanie Green Screen najwyższej próby: usuwanie zielonego zafarbu (spill suppression), dopasowanie oświetlenia artysty do otoczenia (light wrapping), matchmoving ruchów kamery, dodanie ziarna taśmy filmowej i grading barwny ACES.',
      en: 'Surgery-grade chroma keying: spill suppression, physical light wrapping, sub-pixel edge feathering, 3D camera matchmoving, natural lens distortion, and cinema color grading.',
    },
    keyDeliverables: {
      pl: ['Wielościeżkowy montaż rytmiczny do utworu', 'Zintegrowany kompozyt VFX', 'Wstępny podgląd reżyserski (Director’s Cut)'],
      en: ['Rhythmic beat-matched video edit', 'Seamless composite layers', 'Director’s Cut preview for artist approval'],
    },
    techSpec: 'DaVinci Resolve Studio / After Effects / Nuke',
  },
  {
    id: 'final',
    number: '05',
    title: { pl: 'GOTOWY TELEDYSK & PROMOCJA', en: 'FINAL MASTER & RELEASE ASSETS' },
    shortDesc: {
      pl: 'Finalizujemy produkcję i przygotowujemy materiał do publikacji.',
      en: 'We finalize output masters and generate cross-platform promo assets.',
    },
    details: {
      pl: 'Eksportujemy finalny teledysk w pełnym 4K na YouTube, przygotowujemy skrócone teasery, pionowe wersje 9:16 na TikTok / Instagram Reels / YouTube Shorts oraz zapętlone Spotify Canvas, dając Ci kompletny zestaw narzędzi promocyjnych.',
      en: 'Exporting 4K master files for YouTube / Vevo, vertical 9:16 cuts for TikTok / Instagram Reels / YouTube Shorts, and looped Spotify Canvas visuals to maximize your release reach.',
    },
    keyDeliverables: {
      pl: ['Główny teledysk 4K UHD Master (ProRes & H.264)', 'Pionowe formaty 9:16 do Social Media', 'Miniatury YouTube i animowany Spotify Canvas'],
      en: ['Main 4K UHD Master (ProRes 422 & MP4)', 'Vertical 9:16 reels for socials', 'High-CTR YouTube thumbnail & Spotify Canvas loop'],
    },
    techSpec: 'Mastering 4K DCI + Formaty Social Media',
  },
];

export const OFFER_PACKAGES: OfferPackage[] = [
  {
    id: 'concept',
    name: 'MASH AI VIDEO CONCEPT',
    badge: { pl: 'Koncepcja & Pre-produkcja', en: 'Concept & Pre-production' },
    tagline: {
      pl: 'Indywidualna koncepcja wizualna teledysku i kierunek artystyczny projektu.',
      en: 'Bespoke visual world direction and full narrative treatment for your release.',
    },
    description: {
      pl: 'Dla artystów poszukujących wyrazistej wizji teledysku przed wejściem na plan. Zawiera analizę utworu, storyboard, generatywne concept arty AI oraz specyfikację planu zdjęciowego.',
      en: 'For artists needing a distinct, cohesive visual universe before shooting. Includes deep track analysis, visual storyboard, AI concept key art, and technical shotlist.',
    },
    scopeList: {
      pl: [
        'Dogłębna analiza dramaturgii i struktury utworu',
        'Scenariusz i storyboard kadr po kadrze',
        '8–12 wygenerowanych plansz concept artowych w 4K',
        'Specyfikacja oświetlenia i wymogów Green Screen',
        'Konsultacja reżyserska (online lub w MASH Schron)',
      ],
      en: [
        'In-depth track narrative & dynamic structure analysis',
        'Frame-by-frame treatment & visual storyboard',
        '8–12 ultra-high-resolution AI concept key art plates',
        'Soundstage lighting & green screen requirement specs',
        '1-on-1 Director consultation (online or in-studio)',
      ],
    },
    turnaroundTime: { pl: '5–7 dni roboczych', en: '5–7 business days' },
    idealFor: {
      pl: 'Artyści z własną ekipą wideo potrzebujący przełomowej koncepcji lub szukający dofinansowania / wytwórni.',
      en: 'Artists with existing film crews needing a visionary concept, or pitching for grant/label funding.',
    },
  },
  {
    id: 'greenscreen',
    name: 'MASH GREEN SCREEN PRODUCTION',
    badge: { pl: 'Dzień Zdjęciowy', en: 'Soundstage Day' },
    tagline: {
      pl: 'Realizacja materiału z prawdziwym artystą na planie Green Screen.',
      en: 'Full-day professional green screen production with cinema camera and lighting rigs.',
    },
    description: {
      pl: 'Kompleksowy dzień zdjęciowy w studiu prowadzony wspólnie z Dream Studio Productions. Zapewniamy oświetlenie filmowe, kamery 4K/6K, mikrofony odsłuchowe oraz surowe pliki przygotowane pod kluczowanie.',
      en: 'Turnkey studio filming day co-directed with Dream Studio Productions. Cinema gear, softbox lighting arrays, floor grid tracking, and raw ProRes capture.',
    },
    scopeList: {
      pl: [
        'Dostęp do profesjonalnego studia Green Screen z cykloramą',
        'Zestaw kamer kinowych z optyką stałoogniskową',
        'Reżyser światła i operator kamery',
        'Odsłuch muzyczny i pomoc choreograficzna',
        'Surowy materiał 4K/6K z metadanymi przekazany artyście',
      ],
      en: [
        'Dedicated green screen studio cyclorama soundstage',
        'Cinema camera package with prime lens set',
        'Gaffer, director of photography & camera operator',
        'High-fidelity studio in-ear playback system',
        'Color-calibrated raw 4K/6K log footage handoff',
      ],
    },
    turnaroundTime: { pl: '1 dzień zdjęciowy + 48h transfer plików', en: '1 shoot day + 48h data transfer' },
    idealFor: {
      pl: 'Wykonawcy i zespoły chcący zrealizować profesjonalny występ sceniczny w kontrolowanych warunkach studyjnych.',
      en: 'Bands and solo artists needing studio performance shots with elite cinematography standards.',
    },
  },
  {
    id: 'music-video',
    name: 'MASH AI MUSIC VIDEO',
    badge: { pl: 'Najczęściej Wybierany', en: 'Most Popular' },
    tagline: {
      pl: 'Produkcja teledysku łączącego rzeczywiste zdjęcia, elementy AI i profesjonalną postprodukcję.',
      en: 'End-to-end music video production fusing live artist shoot with custom AI worldbuilding.',
    },
    description: {
      pl: 'Pełny, kompletny teledysk od A do Z. Obejmuje koncepcję, zdjęcia na Green Screen, wygenerowanie dedykowanego świata AI, zaawansowany montaż, compositing i kinowy color grading.',
      en: 'Our flagship end-to-end package: concept design, green screen soundstage session, custom AI environment generation, compositing, VFX, and cinema master delivery.',
    },
    scopeList: {
      pl: [
        'Kompletna koncepcja artystyczna i storyboard',
        'Sesja zdjęciowa na Green Screen (wokalista / zespół)',
        'Kreacja unikalnego uniwersum wizualnego AI dopasowanego do muzyki',
        'Kluczowanie, camera tracking, light wrapping, VFX',
        'Montaż rytmiczny do utworu i kinowy grading',
        'Główny teledysk 4K UHD Master',
        '2 tury poprawek reżyserskich',
      ],
      en: [
        'Full creative concept, treatment & storyboard',
        'Complete green screen shoot session at soundstage',
        'Custom AI world generated exclusively for your track',
        'Precision keying, camera tracking, light integration & VFX',
        'Beat-synced dynamic edit and cinema color grade',
        'Final 4K UHD Master delivery',
        '2 rounds of creative revisions',
      ],
    },
    turnaroundTime: { pl: '3–4 tygodnie', en: '3–4 weeks' },
    idealFor: {
      pl: 'Single promujące albumy, premiery radiowe i YouTube, artyści budujący wizerunek premium.',
      en: 'Lead album singles, major YouTube releases, and musicians demanding world-class visuals.',
    },
  },
  {
    id: 'cinematic',
    name: 'MASH CINEMATIC EXPERIENCE',
    badge: { pl: 'Flagowa Produkcja', en: 'Flagship Cinematic' },
    tagline: {
      pl: 'Rozbudowane projekty wizualne dla ambitnych produkcji muzycznych, w tym rozbudowane światy i filmowa narracja.',
      en: 'Monumental cinematic odyssey featuring multiple AI worlds, narrative actors, and Hollywood VFX.',
    },
    description: {
      pl: 'Dla najbardziej wymagających artystów i wydawnictw. Wieloaktowa fabuła, kilka różnych światów wirtualnych, statyści lub tancerze, rozbudowane ujęcia efektowe i maksymalna głębia kinowa.',
      en: 'Designed for ambitious concept albums and marquee singles. Multi-act storytelling, multiple distinct virtual dimensions, dynamic set transitions, and priority studio scheduling.',
    },
    scopeList: {
      pl: [
        'Rozbudowany scenariusz fabularny z podziałem na akty',
        'Rozszerzony plan zdjęciowy (wielokrotne setupy oświetleniowe)',
        'Do 4 odrębnych środowisk wirtualnych wygenerowanych AI',
        'Zaawansowane efekty cząsteczkowe, symulacje zniszczeń, ognia i magii',
        'Plakat filmowy teledysku w rozdzielczości druku',
        'Pionowe formaty promocyjne oraz animowany Spotify Canvas',
        'Nielimitowane konsultacje reżyserskie',
      ],
      en: [
        'Multi-chapter cinematic narrative treatment',
        'Extended multi-setup soundstage production days',
        'Up to 4 distinct AI environments & dynamic transitions',
        'Advanced volumetric simulations (smoke, embers, fluids, gravity)',
        'Print-ready cinematic teaser poster artwork',
        'Social media teaser campaign suite & Spotify Canvas loop',
        'Unlimited director consultations and dedicated producer',
      ],
    },
    turnaroundTime: { pl: '4–6 tygodni', en: '4–6 weeks' },
    idealFor: {
      pl: 'Wiodące wydawnictwa, utwory koncepcyjne, miniatury filmowe, festiwale teledysków.',
      en: 'Flagship label singles, concept epics, international music video festival entries.',
    },
  },
  {
    id: 'visual-content',
    name: 'MASH VISUAL CONTENT',
    badge: { pl: 'Pakiet Social & Promo', en: 'Social & Promo Suite' },
    tagline: {
      pl: 'Dodatkowe materiały promocyjne, krótkie formy wideo, teasery i pionowe formaty.',
      en: 'High-impact promotional short-form assets, teasers, and vertical social loops.',
    },
    description: {
      pl: 'Skrojone pod współczesne algorytmy TikToka, Instagrama i Spotify. Wyciągamy esencję z materiału teledyskowego lub tworzymy dedykowane, hipnotyzujące animacje do fragmentów utworu.',
      en: 'Engineered for modern streaming and social algorithms. Vertical teasers, hypnotic loop visuals, countdown clips, and animated artwork optimized for high engagement.',
    },
    scopeList: {
      pl: [
        '3–5 dedykowanych klipów wertykalnych 9:16 (Reels/TikTok/Shorts)',
        'Oficjalny zapętlony Spotify Canvas (8 sekund)',
        'Animowana okładka singla / Motion Cover',
        'Krótki zwiastun premierowy (Teaser 15s)',
        'Formaty zoptymalizowane pod algorytmy zasięgowe',
      ],
      en: [
        '3–5 high-engagement vertical cuts 9:16 (Reels/TikTok/Shorts)',
        'Seamless looping Spotify Canvas visual (8 sec)',
        'Animated single motion artwork',
        'Countdown premiere teaser (15 sec)',
        'Algorithm-optimized subtitles & audio mastering specs',
      ],
    },
    turnaroundTime: { pl: '3–5 dni roboczych', en: '3–5 business days' },
    idealFor: {
      pl: 'Wzmocnienie premiery singla, kampanie płatne w social media, budowanie zasięgu przed publikacją płyty.',
      en: 'Amplifying single drops, paid social ad campaigns, and Spotify pre-save momentum.',
    },
  },
];

export const AUDIENCE_GROUPS: AudienceGroup[] = [
  {
    id: 'solo',
    title: { pl: 'Solowi Artyści & Wokaliści', en: 'Solo Vocalists & Performers' },
    description: {
      pl: 'Podkreślamy Twoją charyzmę, emocje w spojrzeniu i wokalną ekspresję, przenosząc Cię w otoczenie wzmacniające przekaz tekstu piosenki.',
      en: 'Magnifying your personal charisma, vocal intensity, and lyrical intimacy against breathtaking cinematic backdrops.',
    },
    keyBenefit: {
      pl: 'Maksymalny nacisk na Twoją postać bez rozpraszania uwagi.',
      en: 'Intimate focal focus with zero synthetic replacement.',
    },
    iconName: 'Mic',
  },
  {
    id: 'rock-metal',
    title: { pl: 'Zespoły Rockowe & Metalowe', en: 'Rock & Heavy Metal Bands' },
    description: {
      pl: 'Przenosimy energię prób i koncertów w monumentalne, industrialne lub postapokaliptyczne przestrzenie pełne ognia i dymu.',
      en: 'Channeling raw rehearsal grit and live energy into colossal industrial ruins, stormscapes, and volcanic rifts.',
    },
    keyBenefit: {
      pl: 'Potężny, bezkompromisowy obraz odpowiadający sile ciężkich brzmień.',
      en: 'Aggressive, heavy-hitting visual language matching wall-of-sound riffs.',
    },
    iconName: 'Flame',
  },
  {
    id: 'instrumental',
    title: { pl: 'Muzycy Instrumentalni', en: 'Instrumental Virtuosos' },
    description: {
      pl: 'Tworzymy wizualną poezję, w której dźwięki gitary, pianina, wiolonczeli czy perkusji kształtują krajobrazy i światło.',
      en: 'Translating instrumental nuance and melodic progression into living nature and fluid cosmic geometry.',
    },
    keyBenefit: {
      pl: 'Obraz opowiadający historię tam, gdzie nie ma słów.',
      en: 'Visual storytelling that carries the listener beyond language.',
    },
    iconName: 'Music',
  },
  {
    id: 'classical',
    title: { pl: 'Kompozytorzy & Klasyka', en: 'Classical & Contemporary Composers' },
    description: {
      pl: 'Szlachetne, wyrafinowane kadry inspirowane malarstwem, architekturą i kinem artystycznym dla utworów o wielkiej głębi.',
      en: 'Stately, painterly aesthetics drawing from fine art, cathedral architecture, and prestige art cinema.',
    },
    keyBenefit: {
      pl: 'Elegancja i powaga godna filharmonii w nowoczesnej formie.',
      en: 'Timeless prestige married with bleeding-edge technology.',
    },
    iconName: 'Sparkles',
  },
  {
    id: 'producers',
    title: { pl: 'Producenci & Beatmakerzy', en: 'Producers & Beatmakers' },
    description: {
      pl: 'Hipnotyzujące, dynamiczne teledyski i wizualizacje do dropów, basów i syntetycznych pejzaży dźwiękowych.',
      en: 'Hypnotic sync visuals, bass-responsive dynamics, and futuristic aesthetics tailored for electronic and hip-hop beats.',
    },
    keyBenefit: {
      pl: 'Wysoka retencja uwagi słuchacza na YouTube i w mediach społecznościowych.',
      en: 'Maximum viewer retention and algorithm shareability.',
    },
    iconName: 'Sliders',
  },
  {
    id: 'indie-labels',
    title: { pl: 'Niezależne Wytwórnie Muzyczne', en: 'Independent Record Labels' },
    description: {
      pl: 'Standard wizualny dorównujący wielomilionowym budżetom majorsów, dostępny w elastycznych ramach produkcyjnych.',
      en: 'Major-label visual fidelity without bloated legacy budgets, scalable across your artist roster.',
    },
    keyBenefit: {
      pl: 'Budowanie prestiżowego katalogu wideo przy przewidywalnych kosztach.',
      en: 'High-ROI catalog video assets with predictable milestones.',
    },
    iconName: 'Disc',
  },
  {
    id: 'film-exp',
    title: { pl: 'Twórcy Muzyki Filmowej & Awangardy', en: 'Film Score & Experimental Artists' },
    description: {
      pl: 'Eksperymentalne formy wizualne, które przełamują schematy tradycyjnego teledysku i wkraczają w obszar sztuki wideo.',
      en: 'Avant-garde visual odysseys defying pop music video formulas to create memorable sensory installations.',
    },
    keyBenefit: {
      pl: 'Nieograniczona wolność artystyczna bez kompromisów technicznych.',
      en: 'Pure artistic autonomy unconstrained by physical set limits.',
    },
    iconName: 'Film',
  },
];
