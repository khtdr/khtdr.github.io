// ---------- DATA ----------
const TIMELINE = [
  { year: 1810, text: "Born in Żelazowa Wola, Poland, to a French father and Polish mother." },
  { year: 1817, text: "Composes his first polonaise at age seven." },
  { year: 1826, text: "Enters the Warsaw Conservatory, studying composition with Józef Elsner." },
  { year: 1829, text: "Hears Niccolò Paganini in Warsaw and gives his first Vienna concerts." },
  { year: 1830, text: "Leaves Warsaw shortly before the November Uprising; he will never return to Poland." },
  { year: 1831, text: "Settles in Paris, the city he will call home for the rest of his life." },
  { year: 1832, text: "Paris debut at Salle Pleyel launches his reputation among the elite." },
  { year: 1836, text: "Meets the writer George Sand at a Liszt soireé; begins a turbulent nine-year romance." },
  { year: 1838, text: "Winters with Sand in Majorca where he composes the 24 Preludes, Op. 28." },
  { year: 1849, text: "Dies in Paris on October 17. His heart is buried in Warsaw's Holy Cross Church." },
];

const QUOTES = [
  { text: "Simplicity is the final achievement. After one has played a vast quantity of notes and more notes, it is simplicity that emerges as the crowning reward of art." },
  { text: "I wish I could throw off the thoughts which poison my happiness, and yet I take a sort of pleasure in indulging them.", context: "letter to a friend" },
  { text: "Bach is like an astronomer who, with the help of ciphers, finds the stars in the sky." },
  { text: "The piano is a monster that screams when you touch it.", context: "on the piano's difficulty" },
  { text: "I tell the piano what I used to tell you.", context: "to his sister, on composing" },
  { text: "Mozart is a garden; Schubert is a forest; but Beethoven is a mountain and the sea." },
  { text: "I am a revolutionary, money is a nuisance.", context: "in a letter" },
  { text: "Every difficulty slurred over will be a ghost to disturb your repose later.", context: "advice to a pupil" },
  { text: "He who plays the piano well must be in love with his instrument." },
  { text: "I have no words to tell you how much I have suffered and am still suffering.", context: "letter from Majorca" },
];

const WORKS = [
  // --- Opp. 1–8: early works ---
  { opus: "Op. 1", title: "Rondo in C minor", genre: "Rondo", year: 1825, blurb: "Chopin's first published work, dedicated to his teacher Józef Elsner — a youthful rondo already showing his lyrical gift." },
  { opus: "Op. 2", title: "Variations on “Là ci darem la mano”", genre: "Variation", notes: "piano & orchestra", year: 1827, blurb: "Variations for piano and orchestra on Mozart's Don Giovanni duet. Schumann famously hailed it: “Hats off, gentlemen — a genius!”" },
  { opus: "Op. 3", title: "Introduction & Polonaise brillante", genre: "Chamber", notes: "cello & piano" },
  { opus: "Op. 4", title: "Piano Sonata No. 1 in C minor", genre: "Sonata" },
  { opus: "Op. 5", title: "Rondo à la mazur in F major", genre: "Rondo" },
  { opus: "Op. 6 No. 1", title: "Mazurka in F♯ minor", genre: "Mazurka" },
  { opus: "Op. 6 No. 2", title: "Mazurka in C♯ minor", genre: "Mazurka" },
  { opus: "Op. 6 No. 3", title: "Mazurka in E major", genre: "Mazurka" },
  { opus: "Op. 6 No. 4", title: "Mazurka in E♭ minor", genre: "Mazurka" },
  { opus: "Op. 7 No. 1", title: "Mazurka in B♭ major", genre: "Mazurka" },
  { opus: "Op. 7 No. 2", title: "Mazurka in A minor", genre: "Mazurka" },
  { opus: "Op. 7 No. 3", title: "Mazurka in F minor", genre: "Mazurka" },
  { opus: "Op. 7 No. 4", title: "Mazurka in A♭ major", genre: "Mazurka" },
  { opus: "Op. 7 No. 5", title: "Mazurka in C major", genre: "Mazurka" },
  { opus: "Op. 8", title: "Piano Trio in G minor", genre: "Chamber", year: 1829, blurb: "A piano trio in the tradition of Beethoven and Schubert, full of youthful ambition and song." },

  // --- Opp. 9–14 ---
  { opus: "Op. 9 No. 1", title: "Nocturne in B♭ minor", genre: "Nocturne", year: 1832, blurb: "The first of Chopin's mature nocturnes — a hushed, expansive song in B♭ minor." },
  { opus: "Op. 9 No. 2", title: "Nocturne in E♭ major", genre: "Nocturne", year: 1832, blurb: "The best-loved of all his nocturnes — a serenade of unbroken melody over a gentle left-hand waltz. Dedicated to Madame Camille Pleyel." },
  { opus: "Op. 9 No. 3", title: "Nocturne in B major", genre: "Nocturne", year: 1832, blurb: "A genial, flowing nocturne that brightens into cascading bravura." },
  { opus: "Op. 10 No. 1", title: "Étude in C major", subtitle: "Waterfall", genre: "Étude", year: 1832, blurb: "Cascading arpeggios spanning the whole keyboard — a study in open-hand technique. Dedicated to Franz Liszt." },
  { opus: "Op. 10 No. 2", title: "Étude in A minor", subtitle: "Chromatique", genre: "Étude", year: 1832, blurb: "A lightning-fast chromatic study for the weaker fingers — dry wit on a razor's edge." },
  { opus: "Op. 10 No. 3", title: "Étude in E major", subtitle: "Tristesse", genre: "Étude", year: 1832, blurb: "“I have written a little study which exposes my very soul,” Chopin said of this glowing, song-like piece." },
  { opus: "Op. 10 No. 4", title: "Étude in C♯ minor", subtitle: "Torrent", genre: "Étude", year: 1832, blurb: "Unrelenting sixteenth-notes demanding evenness and clarity at any speed." },
  { opus: "Op. 10 No. 5", title: "Étude in G♭ major", subtitle: "Black Key", genre: "Étude", year: 1832, blurb: "Almost entirely on the black keys — a glittering, buoyant showpiece." },
  { opus: "Op. 10 No. 6", title: "Étude in E♭ minor", genre: "Étude", year: 1832, blurb: "A dark, brooding nocturne-like study in inner-voice control." },
  { opus: "Op. 10 No. 7", title: "Étude in C major", subtitle: "Toccata", genre: "Étude", year: 1832, blurb: "Alternating hands in a toccata-like perpetual motion." },
  { opus: "Op. 10 No. 8", title: "Étude in F major", subtitle: "Sunshine", genre: "Étude", year: 1832, blurb: "Bright, fleet passages for the right hand over a bouncing bass." },
  { opus: "Op. 10 No. 9", title: "Étude in F minor", genre: "Étude", year: 1832, blurb: "A compact study in left-hand melody and extension." },
  { opus: "Op. 10 No. 10", title: "Étude in A♭ major", genre: "Étude", year: 1832, blurb: "Notable for its irregular phrasing and dramatic octave outbursts." },
  { opus: "Op. 10 No. 11", title: "Étude in E♭ major", subtitle: "Arpeggio", genre: "Étude", year: 1832, blurb: "Sweeping broken chords across the keyboard — a study in weight and release." },
  { opus: "Op. 10 No. 12", title: "Étude in C minor", subtitle: "Revolutionary", genre: "Étude", year: 1831, blurb: "Written in fury upon hearing that Russia had crushed the November Uprising in Warsaw. A torrential left-hand anthem of defiance." },
  { opus: "Op. 11", title: "Piano Concerto No. 1 in E minor", genre: "Concerto", year: 1830, blurb: "Piano Concerto No. 1 in E minor — premiered in Warsaw in 1830, its Romanze second movement is among the most tender Chopin ever wrote." },
  { opus: "Op. 12", title: "Variations brillantes on “Je vends des scapulaires”", genre: "Variation" },
  { opus: "Op. 13", title: "Fantasia on Polish Airs", genre: "Concerto", notes: "piano & orchestra", year: 1828, blurb: "Fantasia on Polish Airs — a virtuoso concertante work weaving Polish folk themes into a brilliant piano-and-orchestra fantasy." },
  { opus: "Op. 14", title: "Krakowiak", genre: "Concerto", subtitle: "Grand rondo de concert", year: 1828, blurb: "Krakowiak — a grand rondo de concert on a Krakowiak dance, bristling with national color and pianistic flair." },

  // --- Opp. 15–24 ---
  { opus: "Op. 15 No. 1", title: "Nocturne in F major", genre: "Nocturne", year: 1833, blurb: "A serene nocturne whose central stormy section foreshadows the drama of later works." },
  { opus: "Op. 15 No. 2", title: "Nocturne in F♯ major", genre: "Nocturne", year: 1833, blurb: "One of the most poetic of the early nocturnes, with a celebrated chorale-like middle section." },
  { opus: "Op. 15 No. 3", title: "Nocturne in G minor", genre: "Nocturne", year: 1833, blurb: "Improvisatory and free — almost a sketch rather than a finished song." },
  { opus: "Op. 16", title: "Rondo in E♭ major", genre: "Rondo" },
  { opus: "Op. 17 No. 1", title: "Mazurka in B♭ major", genre: "Mazurka" },
  { opus: "Op. 17 No. 2", title: "Mazurka in E minor", genre: "Mazurka" },
  { opus: "Op. 17 No. 3", title: "Mazurka in A♭ major", genre: "Mazurka" },
  { opus: "Op. 17 No. 4", title: "Mazurka in A minor", genre: "Mazurka" },
  { opus: "Op. 18", title: "Waltz in E♭ major", subtitle: "Grande valse brillante", genre: "Waltz", year: 1833, blurb: "Grande valse brillante — the first of Chopin's published waltzes, dazzling and unashamedly sociable." },
  { opus: "Op. 19", title: "Bolero in C major", genre: "Bolero" },
  { opus: "Op. 20", title: "Scherzo No. 1 in B minor", genre: "Scherzo", year: 1835, blurb: "Scherzo No. 1 in B minor — tense, restless, and ending in a furious dash. Dedicated to Mr. T. Albrecht." },
  { opus: "Op. 21", title: "Piano Concerto No. 2 in F minor", genre: "Concerto", year: 1830, blurb: "Piano Concerto No. 2 in F minor — written before No. 1, it carries one of the most beloved slow movements, the Larghetto." },
  { opus: "Op. 22", title: "Andante spianato & Grande Polonaise", genre: "Polonaise", notes: "piano & orchestra", year: 1834, blurb: "Andante spianato & Grande Polonaise — a hushed nocturne that blooms into a brilliant polonaise with orchestra." },
  { opus: "Op. 23", title: "Ballade No. 1 in G minor", genre: "Ballade", year: 1836, blurb: "Ballade No. 1 in G minor — arguably the greatest of all Chopin's narrative pieces, said to be inspired by Mickiewicz's poem Konrad Wallenrod." },
  { opus: "Op. 24 No. 1", title: "Mazurka in G minor", genre: "Mazurka" },
  { opus: "Op. 24 No. 2", title: "Mazurka in C major", genre: "Mazurka" },
  { opus: "Op. 24 No. 3", title: "Mazurka in A♭ major", genre: "Mazurka" },
  { opus: "Op. 24 No. 4", title: "Mazurka in B♭ minor", genre: "Mazurka" },

  // --- Opp. 25–34 ---
  { opus: "Op. 25 No. 1", title: "Étude in A♭ major", subtitle: "Aeolian Harp", genre: "Étude", year: 1836, blurb: "Rolling broken chords over a singing melody — Schumann imagined a harp stirred by the wind." },
  { opus: "Op. 25 No. 2", title: "Étude in F minor", subtitle: "Bees", genre: "Étude" },
  { opus: "Op. 25 No. 3", title: "Étude in F major", subtitle: "The Horseman", genre: "Étude" },
  { opus: "Op. 25 No. 4", title: "Étude in A minor", genre: "Étude" },
  { opus: "Op. 25 No. 5", title: "Étude in E minor", subtitle: "Wrong Note", genre: "Étude" },
  { opus: "Op. 25 No. 6", title: "Étude in G♯ minor", subtitle: "Thirds", genre: "Étude", year: 1836, blurb: "Double-thirds at speed — one of the most fiendish finger studies ever written." },
  { opus: "Op. 25 No. 7", title: "Étude in C♯ minor", subtitle: "Cello", genre: "Étude", year: 1836, blurb: "A slow, sonorous cello-like melody in the left hand — a study in tone and sustain." },
  { opus: "Op. 25 No. 8", title: "Étude in D♭ major", subtitle: "Sixths", genre: "Étude" },
  { opus: "Op. 25 No. 9", title: "Étude in G♭ major", subtitle: "Butterfly", genre: "Étude" },
  { opus: "Op. 25 No. 10", title: "Étude in B minor", subtitle: "Octaves", genre: "Étude" },
  { opus: "Op. 25 No. 11", title: "Étude in A minor", subtitle: "Winter Wind", genre: "Étude", year: 1836, blurb: "A storm of chromatic scales and arpeggios — among the most fearsome of all Chopin's études." },
  { opus: "Op. 25 No. 12", title: "Étude in C minor", subtitle: "Ocean", genre: "Étude", year: 1836, blurb: "Rolling waves of broken chords in both hands — a grand, closing tide." },
  { opus: "Op. 26 No. 1", title: "Polonaise in C♯ minor", genre: "Polonaise", year: 1836, blurb: "The first of Chopin's mature polonaises — a study in dignified, introspective heroism." },
  { opus: "Op. 26 No. 2", title: "Polonaise in E♭ minor", genre: "Polonaise" },
  { opus: "Op. 27 No. 1", title: "Nocturne in C♯ minor", genre: "Nocturne", year: 1835, blurb: "A great, dramatic nocturne of funeral resonance, dedicated to Madame d'Agoult (Liszt's companion)." },
  { opus: "Op. 27 No. 2", title: "Nocturne in D♭ major", genre: "Nocturne", year: 1835, blurb: "Perhaps the most-loved of all nocturnes — a long-breathed lullaby of distilled tenderness." },
  { opus: "Op. 28 No. 1", title: "Prelude in C major", genre: "Prelude", year: 1839, blurb: "24 Preludes, Op. 28 — written during the Majorca winter of 1838–39. Each prelude is a character piece; Schumann called them “sketches, beginnings of studies.”" },
  { opus: "Op. 28 No. 2", title: "Prelude in A minor", genre: "Prelude" },
  { opus: "Op. 28 No. 3", title: "Prelude in G major", genre: "Prelude" },
  { opus: "Op. 28 No. 4", title: "Prelude in E minor", genre: "Prelude", year: 1839, blurb: "A prelude of unspoken grief — sparse, suspended chords that Schumann called a “melancholy spirit.”" },
  { opus: "Op. 28 No. 5", title: "Prelude in D major", genre: "Prelude" },
  { opus: "Op. 28 No. 6", title: "Prelude in B minor", genre: "Prelude", year: 1839, blurb: "A song without words in B minor — one of the most tender preludes, with a singing left-hand melody." },
  { opus: "Op. 28 No. 7", title: "Prelude in A major", genre: "Prelude", year: 1839, blurb: "A tiny Polish mazurka-like prelude — a single page that inspired Charles-Valentin Alkan and many others." },
  { opus: "Op. 28 No. 8", title: "Prelude in F♯ minor", genre: "Prelude" },
  { opus: "Op. 28 No. 9", title: "Prelude in E major", genre: "Prelude" },
  { opus: "Op. 28 No. 10", title: "Prelude in C♯ minor", genre: "Prelude" },
  { opus: "Op. 28 No. 11", title: "Prelude in B major", genre: "Prelude", year: 1839, blurb: "A luminous, sustained prelude in B major that builds to a fervent climax." },
  { opus: "Op. 28 No. 12", title: "Prelude in G♯ minor", genre: "Prelude" },
  { opus: "Op. 28 No. 13", title: "Prelude in F♯ major", genre: "Prelude" },
  { opus: "Op. 28 No. 14", title: "Prelude in E♭ minor", genre: "Prelude" },
  { opus: "Op. 28 No. 15", title: "Prelude in D♭ major", subtitle: "Raindrop", genre: "Prelude", year: 1839, blurb: "The “Raindrop” prelude — a nocturne-like meditation interrupted by a storm that some say evokes the Majorca monastery rain." },
  { opus: "Op. 28 No. 16", title: "Prelude in B♭ minor", genre: "Prelude", year: 1839, blurb: "A whirlwind of sixteenth-notes, called the “Hades” prelude by some pianists." },
  { opus: "Op. 28 No. 17", title: "Prelude in A♭ major", genre: "Prelude" },
  { opus: "Op. 28 No. 18", title: "Prelude in F minor", genre: "Prelude" },
  { opus: "Op. 28 No. 19", title: "Prelude in E♭ major", genre: "Prelude" },
  { opus: "Op. 28 No. 20", title: "Prelude in C minor", genre: "Prelude", year: 1839, blurb: "A famous two-page prelude of solemn C-minor chords — a single held breath." },
  { opus: "Op. 28 No. 21", title: "Prelude in B♭ major", genre: "Prelude" },
  { opus: "Op. 28 No. 22", title: "Prelude in G minor", genre: "Prelude" },
  { opus: "Op. 28 No. 23", title: "Prelude in F major", genre: "Prelude" },
  { opus: "Op. 28 No. 24", title: "Prelude in D minor", genre: "Prelude", year: 1839, blurb: "A tempest in D minor — the turbulent close of the cycle, dedicated to his pupil Camille Stamaty." },
  { opus: "Op. 29", title: "Impromptu No. 1 in A♭ major", genre: "Impromptu", year: 1837, blurb: "Impromptu No. 1 in A♭ major — elegant, fleet, almost improvisatory." },
  { opus: "Op. 30 No. 1", title: "Mazurka in C minor", genre: "Mazurka" },
  { opus: "Op. 30 No. 2", title: "Mazurka in B minor", genre: "Mazurka" },
  { opus: "Op. 30 No. 3", title: "Mazurka in D♭ major", genre: "Mazurka" },
  { opus: "Op. 30 No. 4", title: "Mazurka in C♯ minor", genre: "Mazurka" },
  { opus: "Op. 31", title: "Scherzo No. 2 in B♭ minor", genre: "Scherzo", year: 1837, blurb: "Scherzo No. 2 in B♭ minor — the most popular of the scherzos, with its whispered question and overwhelming answer." },
  { opus: "Op. 32 No. 1", title: "Nocturne in B major", genre: "Nocturne" },
  { opus: "Op. 32 No. 2", title: "Nocturne in A♭ major", genre: "Nocturne", year: 1837, blurb: "A nocturne whose calm surface conceals a tragic, dissonant climax." },
  { opus: "Op. 33 No. 1", title: "Mazurka in G♯ minor", genre: "Mazurka" },
  { opus: "Op. 33 No. 2", title: "Mazurka in D major", genre: "Mazurka" },
  { opus: "Op. 33 No. 3", title: "Mazurka in C major", genre: "Mazurka" },
  { opus: "Op. 33 No. 4", title: "Mazurka in B minor", genre: "Mazurka" },
  { opus: "Op. 34 No. 1", title: "Waltz in A♭ major", genre: "Waltz" },
  { opus: "Op. 34 No. 2", title: "Waltz in A minor", genre: "Waltz" },
  { opus: "Op. 34 No. 3", title: "Waltz in F major", genre: "Waltz" },

  // --- Opp. 35–44 ---
  { opus: "Op. 35", title: "Piano Sonata No. 2 in B♭ minor", subtitle: "Funeral March", genre: "Sonata", year: 1839, blurb: "Piano Sonata No. 2 in B♭ minor — its famous Funeral March became a staple of state funerals, but the entire sonnet-like structure is among his grandest works." },
  { opus: "Op. 36", title: "Impromptu No. 2 in F♯ major", genre: "Impromptu", year: 1839, blurb: "Impromptu No. 2 in F♯ major — lyrical, flowing, light of foot." },
  { opus: "Op. 37 No. 1", title: "Nocturne in G minor", genre: "Nocturne" },
  { opus: "Op. 37 No. 2", title: "Nocturne in G major", genre: "Nocturne" },
  { opus: "Op. 38", title: "Ballade No. 2 in F major", genre: "Ballade", year: 1839, blurb: "Ballade No. 2 in F major — a pastorale whose Presto con fuoco erupts in violence; dedicated to Robert Schumann." },
  { opus: "Op. 39", title: "Scherzo No. 3 in C♯ minor", genre: "Scherzo", year: 1839, blurb: "Scherzo No. 3 in C♯ minor — built on a chorale and a Polish carol, it ends in some of the most triumphant pages he wrote." },
  { opus: "Op. 40 No. 1", title: "Polonaise in A major", subtitle: "Military", genre: "Polonaise", year: 1838, blurb: "The “Military” polonaise — swaggering and proud, among his most popular works." },
  { opus: "Op. 40 No. 2", title: "Polonaise in C minor", genre: "Polonaise", year: 1838, blurb: "A darker, more introspective companion to the Military polonaise." },
  { opus: "Op. 41 No. 1", title: "Mazurka in C♯ minor", genre: "Mazurka" },
  { opus: "Op. 41 No. 2", title: "Mazurka in E minor", genre: "Mazurka" },
  { opus: "Op. 41 No. 3", title: "Mazurka in B major", genre: "Mazurka" },
  { opus: "Op. 41 No. 4", title: "Mazurka in A♭ major", genre: "Mazurka" },
  { opus: "Op. 42", title: "Waltz in A♭ major", subtitle: "Grande valse", genre: "Waltz", year: 1840, blurb: "A Grande valse that Wagner admired — perhaps the most demanding of the waltzes." },
  { opus: "Op. 43", title: "Tarantelle in A♭ major", genre: "Tarantelle", year: 1841, blurb: "Tarantelle in A♭ major — a fiery Neapolitan dance in 6/8, traditionally believed to cure the bite of the tarantula." },
  { opus: "Op. 44", title: "Polonaise in F♯ minor", genre: "Polonaise", year: 1841, blurb: "Polonaise in F♯ minor — a tragic, monumental work, ending with one of Chopin's most extraordinary climaxes." },

  // --- Opp. 45–54 ---
  { opus: "Op. 45", title: "Prelude in C♯ minor", genre: "Prelude", year: 1841, blurb: "A standalone Prelude in C♯ minor — improvisatory and harmonically adventurous, separate from the Op. 28 set." },
  { opus: "Op. 46", title: "Allegro de concert in A major", genre: "Allegro" },
  { opus: "Op. 47", title: "Ballade No. 3 in A♭ major", genre: "Ballade", year: 1841, blurb: "Ballade No. 3 in A♭ major — the brightest of the ballades, ending in a song of pure joy." },
  { opus: "Op. 48 No. 1", title: "Nocturne in C minor", genre: "Nocturne", year: 1841, blurb: "One of the great nocturnes — opening in dirge-like C minor before a thunderous middle section." },
  { opus: "Op. 48 No. 2", title: "Nocturne in F♯ minor", genre: "Nocturne", year: 1841, blurb: "A long-breathed nocturne in F♯ minor, with a central mazurka-like episode." },
  { opus: "Op. 49", title: "Fantaisie in F minor", genre: "Fantaisie", year: 1841, blurb: "Fantaisie in F minor — one of his largest non-sonata works, a free, impassioned narrative." },
  { opus: "Op. 50 No. 1", title: "Mazurka in G major", genre: "Mazurka" },
  { opus: "Op. 50 No. 2", title: "Mazurka in A♭ major", genre: "Mazurka" },
  { opus: "Op. 50 No. 3", title: "Mazurka in C♯ minor", genre: "Mazurka" },
  { opus: "Op. 51", title: "Impromptu No. 3 in G♭ major", genre: "Impromptu", year: 1842, blurb: "Impromptu No. 3 in G♭ major — the last impromptu published in his lifetime, gentle and songful." },
  { opus: "Op. 52", title: "Ballade No. 4 in F minor", genre: "Ballade", year: 1842, blurb: "Ballade No. 4 in F minor — the longest and most profound of the ballades, ending in one of the great coda pages of all piano literature." },
  { opus: "Op. 53", title: "Polonaise in A♭ major", subtitle: "Heroic", genre: "Polonaise", year: 1842, blurb: "The “Heroic” polonaise in A♭ major — the most famous of all his polonaises, an anthem of Polish defiance." },
  { opus: "Op. 54", title: "Scherzo No. 4 in E major", genre: "Scherzo", year: 1843, blurb: "Scherzo No. 4 in E major — the most expansive and lyrical of the scherzos, ending in cascades of joy." },

  // --- Opp. 55–65 ---
  { opus: "Op. 55 No. 1", title: "Nocturne in F minor", genre: "Nocturne", year: 1843, blurb: "Nocturne in F minor — a contained, inward work, dedicated to Jeanne de Caraman." },
  { opus: "Op. 55 No. 2", title: "Nocturne in E♭ major", genre: "Nocturne", year: 1843, blurb: "A nocturne of luminous contrapuntal writing — admired for its serenity and depth." },
  { opus: "Op. 56 No. 1", title: "Mazurka in B major", genre: "Mazurka" },
  { opus: "Op. 56 No. 2", title: "Mazurka in C major", genre: "Mazurka" },
  { opus: "Op. 56 No. 3", title: "Mazurka in C minor", genre: "Mazurka" },
  { opus: "Op. 57", title: "Berceuse in D♭ major", genre: "Berceuse", year: 1844, blurb: "Berceuse in D♭ major — perhaps the most famous lullaby in the piano repertoire, a single page of hypnotic variations." },
  { opus: "Op. 58", title: "Piano Sonata No. 3 in B minor", genre: "Sonata", year: 1844, blurb: "Piano Sonata No. 3 in B minor — his last and greatest sonata, a four-movement structure of unmatched richness." },
  { opus: "Op. 59", title: "Mazurka in A♭ major", genre: "Mazurka" },
  { opus: "Op. 60", title: "Barcarolle in F♯ major", genre: "Barcarolle", year: 1846, blurb: "Barcarolle in F♯ major — a gondola song that became one of his most beloved concert works." },
  { opus: "Op. 61", title: "Polonaise-Fantaisie in A♭ major", genre: "Polonaise", year: 1846, blurb: "Polonaise-Fantaisie in A♭ major — a hybrid, exploratory work that puzzles and rewards in equal measure." },
  { opus: "Op. 62 No. 1", title: "Nocturne in B major", genre: "Nocturne", year: 1846, blurb: "A nocturne of unusual harmonic richness, among his last published works." },
  { opus: "Op. 62 No. 2", title: "Nocturne in E major", genre: "Nocturne", year: 1846, blurb: "His last published nocturne — a serene E major song, with a famous “recitative” passage." },
  { opus: "Op. 63 No. 1", title: "Mazurka in B major", genre: "Mazurka" },
  { opus: "Op. 63 No. 2", title: "Mazurka in F minor", genre: "Mazurka" },
  { opus: "Op. 63 No. 3", title: "Mazurka in C♯ minor", genre: "Mazurka", year: 1846, blurb: "The last mazurka published in his lifetime, in C♯ minor — a distilled farewell to the genre he loved most." },
  { opus: "Op. 64 No. 1", title: "Waltz in D♭ major", subtitle: "Minute", genre: "Waltz", year: 1847, blurb: "The “Minute” Waltz in D♭ major — a tiny, sparkling waltz, much faster than its nickname suggests." },
  { opus: "Op. 64 No. 2", title: "Waltz in C♯ minor", genre: "Waltz", year: 1847, blurb: "Waltz in C♯ minor — the most poignant of the waltzes, with a beloved cantabile middle section." },
  { opus: "Op. 64 No. 3", title: "Waltz in A♭ major", genre: "Waltz" },
  { opus: "Op. 65", title: "Cello Sonata in G minor", genre: "Chamber", year: 1846, blurb: "Cello Sonata in G minor — his last published work, and one of only a handful of non-solo piano pieces. Dedicated to Auguste Franchomme." },

  // --- Opp. 66–74 (posthumously published) ---
  { opus: "Op. 66", title: "Fantaisie-Impromptu in C♯ minor", genre: "Impromptu", year: 1835, blurb: "Fantaisie-Impromptu in C♯ minor — written earlier but published posthumously; one of his most popular pieces, with a flowing middle section beloved by generations." },
  { opus: "Op. 67 No. 1", title: "Mazurka in G major", genre: "Mazurka" },
  { opus: "Op. 67 No. 2", title: "Mazurka in G minor", genre: "Mazurka" },
  { opus: "Op. 67 No. 3", title: "Mazurka in C major", genre: "Mazurka" },
  { opus: "Op. 67 No. 4", title: "Mazurka in A minor", genre: "Mazurka", year: 1846, blurb: "The last mazurka Chopin composed, in A minor — a sketch-like, intimate farewell." },
  { opus: "Op. 68 No. 1", title: "Mazurka in C major", genre: "Mazurka" },
  { opus: "Op. 68 No. 2", title: "Mazurka in A minor", genre: "Mazurka", year: 1827, blurb: "A simple mazurka in A minor, composed when Chopin was seventeen and treasured for its plainness." },
  { opus: "Op. 68 No. 3", title: "Mazurka in F major", genre: "Mazurka" },
  { opus: "Op. 68 No. 4", title: "Mazurka in F minor", genre: "Mazurka", year: 1849, blurb: "His very last composition, in F minor — written months before his death and completed from a sketch by his friend Julian Fontana." },
  { opus: "Op. 69 No. 1", title: "Waltz in A♭ major", subtitle: "L'Adieu", genre: "Waltz", year: 1835, blurb: "L'Adieu waltz in A♭ major — written for Maria Wodzińska, to whom he was briefly engaged." },
  { opus: "Op. 69 No. 2", title: "Waltz in B minor", genre: "Waltz", year: 1829, blurb: "A youthful waltz in B minor, full of melancholy." },
  { opus: "Op. 70 No. 1", title: "Waltz in G♭ major", genre: "Waltz" },
  { opus: "Op. 70 No. 2", title: "Waltz in F minor", genre: "Waltz" },
  { opus: "Op. 70 No. 3", title: "Waltz in D♭ major", genre: "Waltz" },
  { opus: "Op. 71 No. 1", title: "Polonaise in D minor", genre: "Polonaise" },
  { opus: "Op. 71 No. 2", title: "Polonaise in B♭ major", genre: "Polonaise" },
  { opus: "Op. 71 No. 3", title: "Polonaise in F minor", genre: "Polonaise" },
  { opus: "Op. 72 No. 1", title: "Nocturne in E minor", genre: "Nocturne", year: 1827, blurb: "An early nocturne in E minor, written at seventeen and published posthumously." },
  { opus: "Op. 72 No. 2", title: "Funeral March in C minor", genre: "March" },
  { opus: "Op. 72 No. 3", title: "3 Écossaises", genre: "Écossaise" },
  { opus: "Op. 73", title: "Rondo in C major for two pianos", genre: "Rondo", year: 1828, blurb: "Originally for one piano, later arranged for two — a youthful rondo bubbling with good humor." },
  { opus: "Op. 74 No. 1", title: "Song: “Życzenie” (The Wish)", genre: "Song", year: 1829, blurb: "“Życzenie” (The Wish) — the first of Chopin's 17 Polish songs, setting a poem by Stefan Witwicki." },
  { opus: "Op. 74 No. 2", title: "Song: “Wiosna” (Spring)", genre: "Song" },
  { opus: "Op. 74 No. 3", title: "Song: “Smutna rzeka” (The Sad River)", genre: "Song" },
  { opus: "Op. 74 No. 4", title: "Song: “Hulanka” (Drinking Song)", genre: "Song" },
  { opus: "Op. 74 No. 5", title: "Song: “Gdzie lubi” (What She Likes)", genre: "Song" },
  { opus: "Op. 74 No. 6", title: "Song: “Precz z moich oczu” (Out of My Sight)", genre: "Song" },
  { opus: "Op. 74 No. 7", title: "Song: “Poseł” (The Messenger)", genre: "Song" },
  { opus: "Op. 74 No. 8", title: "Song: “Śliczny chłopiec” (Handsome Lad)", genre: "Song" },
  { opus: "Op. 74 No. 9", title: "Song: “Melodia” (Melody)", genre: "Song" },
  { opus: "Op. 74 No. 10", title: "Song: “Wojak” (The Warrior)", genre: "Song" },
  { opus: "Op. 74 No. 11", title: "Song: “Dwojaki koniec” (The Double End)", genre: "Song" },
  { opus: "Op. 74 No. 12", title: "Song: “Moja pieszczotka” (My Darling)", genre: "Song" },
  { opus: "Op. 74 No. 13", title: "Song: “Nie ma czego trzeba” (What I Need)", genre: "Song" },
  { opus: "Op. 74 No. 14", title: "Song: “Piersień” (The Ring)", genre: "Song" },
  { opus: "Op. 74 No. 15", title: "Song: “Narzeczony” (The Bridegroom)", genre: "Song" },
  { opus: "Op. 74 No. 16", title: "Song: “Piosnka litewska” (Lithuanian Song)", genre: "Song" },
  { opus: "Op. 74 No. 17", title: "Song: “Śpiew z mogiły” (Hymn from the Tomb)", genre: "Song" },

  // --- Trois Nouvelles Études (Méthode des méthodes) ---
  { opus: "NNE No. 1", title: "Étude in F minor", genre: "Étude", notes: "Trois Nouvelles Études" },
  { opus: "NNE No. 2", title: "Étude in A♭ major", genre: "Étude", notes: "Trois Nouvelles Études" },
  { opus: "NNE No. 3", title: "Étude in D♭ major", genre: "Étude", notes: "Trois Nouvelles Études" },

  // --- Posthumous works without opus (KK / B. catalogue) ---
  { opus: "Op. posth. (B. 49)", title: "Nocturne in C♯ minor", subtitle: "Lento con gran espressione", genre: "Nocturne", year: 1830, blurb: "Nocturne in C♯ minor — the “Lento con gran espressione” posthumous nocturne, played at his funeral and on countless recordings since." },
  { opus: "Op. posth. (B. 108)", title: "Nocturne in C minor", genre: "Nocturne", year: 1837, blurb: "An early nocturne in C minor, only published in the 20th century." },
  { opus: "Op. posth.", title: "Prelude in A♭ major", genre: "Prelude" },
  { opus: "Op. posth. (KK Ib/11)", title: "Waltz in E minor", genre: "Waltz" },
  { opus: "Op. posth. (KK IVa/15)", title: "Waltz in A minor", genre: "Waltz" },
  { opus: "Op. posth. (KK IVa/12)", title: "Waltz in E major", genre: "Waltz" },
  { opus: "Op. posth. (KK IVa/13)", title: "Waltz in G♭ major", genre: "Waltz" },
  { opus: "Op. posth. (KK IVb/10)", title: "Waltz in A♭ major", genre: "Waltz" },
  { opus: "Op. posth. (KK Anh. Ia/1)", title: "Mazurka in F♯ minor", subtitle: "Peessler", genre: "Mazurka" },
  { opus: "Op. posth. (KK IIb/5)", title: "Mazurka in D major", subtitle: "Domanowski", genre: "Mazurka" },
  { opus: "Op. posth. (KK Anh. Ib/5)", title: "Mazurka in B♭ major", genre: "Mazurka" },
  { opus: "Op. posth. (B. 17)", title: "Variations in D major on a German air", genre: "Variation" },
  { opus: "Op. posth. (B. 16)", title: "Variations in E major on “Der Schweizerbub”", genre: "Variation" },
  { opus: "Op. posth. (B. 12)", title: "Variations in A major", genre: "Variation" },
  { opus: "Op. posth. (B. 151)", title: "Variations in F major", genre: "Variation" },
  { opus: "Op. posth. (B. 144)", title: "Cantabile in B♭ major", genre: "Miscellany" },
  { opus: "Op. posth. (B. 84)", title: "Largo in E♭ major", genre: "Miscellany" },
  { opus: "Op. posth. (B. 18)", title: "Funeral March in C minor", genre: "March" },
  { opus: "Op. posth. (B. 140)", title: "Albumleaf in E major", genre: "Miscellany" },
  { opus: "Op. posth. (B. 46)", title: "Fugue in A minor", genre: "Miscellany" },
  { opus: "Op. posth. (B. 113)", title: "Galop Marquis in A♭ major", genre: "Miscellany" },
  { opus: "Op. posth. (B. 21)", title: "Recitative in C minor", genre: "Miscellany" },
];


const QUIZ = [
  {
    q: "It's a rainy Sunday. You're…",
    a: [
      { label: "Reading by the window", tag: "nocturne" },
      { label: "Taking a long, restless walk", tag: "ballade" },
      { label: "Throwing a small dinner party", tag: "waltz" },
      { label: "Fuming about the news", tag: "polonaise" },
    ],
  },
  {
    q: "Your ideal piano sound is…",
    a: [
      { label: "Whispered and singing", tag: "nocturne" },
      { label: "Stormy and dramatic", tag: "ballade" },
      { label: "Bright and dancing", tag: "waltz" },
      { label: "Bold and thunderous", tag: "polonaise" },
    ],
  },
  {
    q: "Pick a mood:",
    a: [
      { label: "Bittersweet longing", tag: "nocturne" },
      { label: "Epic storytelling", tag: "ballade" },
      { label: "Effervescent joy", tag: "waltz" },
      { label: "Defiant pride", tag: "polonaise" },
    ],
  },
  {
    q: "What do you want from music?",
    a: [
      { label: "To feel understood", tag: "nocturne" },
      { label: "To be transported", tag: "ballade" },
      { label: "To move my feet", tag: "waltz" },
      { label: "To rise and fight", tag: "polonaise" },
    ],
  },
];

const QUIZ_RESULTS = {
  nocturne: { title: "Nocturne in E♭ major, Op. 9 No. 2", blurb: "Tender, reflective, and quietly profound — you wear your heart in soft moonlight." },
  ballade: { title: "Ballade No. 1 in G minor, Op. 23", blurb: "You live in sweeping arcs of feeling — epic, narrative, and impossible to forget." },
  waltz: { title: "Waltz in D♭ major, Op. 64 No. 1", blurb: "Sparkling, graceful, and full of light — you find delight in small, perfect gestures." },
  polonaise: { title: "Polonaise in A♭ major, Op. 53", blurb: "Regal and unyielding — you carry your convictions like a banner in the wind." },
};

// ---------- RENDER TIMELINE ----------
(function renderTimeline() {
  const root = document.getElementById("timeline");
  root.innerHTML = TIMELINE.map(e =>
    `<li><span class="year">${e.year}</span>${e.text}</li>`
  ).join("");
})();

// ---------- RENDER QUOTES ----------
(function renderQuotes() {
  const root = document.getElementById("quotes-grid");
  if (!root) return;
  root.innerHTML = QUOTES.map(q =>
    `<figure class="quote-card">
      <blockquote>“${q.text}”</blockquote>
      ${q.context ? `<figcaption>— ${q.context}</figcaption>` : `<figcaption>— Frédéric Chopin</figcaption>`}
    </figure>`
  ).join("");
})();

// ---------- RENDER WORKS ----------
(function renderWorks() {
  const grid = document.getElementById("works-grid");
  const bar = document.querySelector(".filter-bar");
  const genres = ["all", ...Array.from(new Set(WORKS.map(w => w.genre)))];

  bar.innerHTML = genres.map((g, i) =>
    `<button class="chip${i === 0 ? " is-active" : ""}" data-genre="${g}">${g}</button>`
  ).join("");

  const render = (filter) => {
    const list = filter === "all" ? WORKS : WORKS.filter(w => w.genre === filter);
    grid.innerHTML = list.map((w, i) =>
      `<li class="card" data-idx="${i}">
        <div class="opus">${w.opus}</div>
        <div class="title">${w.title}${w.subtitle ? ` <span class="genre">“${w.subtitle}”</span>` : ""}</div>
        <div class="genre">${w.genre}${w.notes ? ` · ${w.notes}` : ""}</div>
      </li>`
    ).join("");
    grid._currentList = list;
  };

  render("all");
  bar.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".chip");
    if (!btn) return;
    bar.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    render(btn.dataset.genre);
  });
})();

// ---------- QUIZ ----------
(function renderQuiz() {
  const root = document.getElementById("quiz-root");
  let step = 0;
  let scores = { nocturne: 0, ballade: 0, waltz: 0, polonaise: 0 };

  function stepView() {
    if (step >= QUIZ.length) return resultView();
    const item = QUIZ[step];
    root.innerHTML = `
      <div class="quiz-q">${step + 1}. ${item.q}</div>
      <div class="quiz-options">
        ${item.a.map((opt, i) => `<button data-tag="${opt.tag}">${opt.label}</button>`).join("")}
      </div>
    `;
    root.querySelectorAll("button").forEach(b => {
      b.addEventListener("click", () => {
        scores[b.dataset.tag]++;
        step++;
        stepView();
      });
    });
  }

  function resultView() {
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const r = QUIZ_RESULTS[winner];
    root.innerHTML = `
      <div class="quiz-result">
        <p class="reveal">${r.title}</p>
        <p class="blurb">${r.blurb}</p>
        <button class="restart">Take it again</button>
      </div>
    `;
    root.querySelector(".restart").addEventListener("click", () => {
      step = 0;
      scores = { nocturne: 0, ballade: 0, waltz: 0, polonaise: 0 };
      stepView();
    });
  }

  stepView();
})();

// ---------- PIECE MODAL ----------
(function setupModal() {
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close");
  const elOpus = document.getElementById("modal-opus");
  const elTitle = document.getElementById("modal-title");
  const elMeta = document.getElementById("modal-meta");
  const elBlurb = document.getElementById("modal-blurb");
  const elYT = document.getElementById("modal-yt");
  const elIMSLP = document.getElementById("modal-imslp");
  const elMIDI = document.getElementById("modal-midi");

  const FALLBACK = "One of Chopin's works — explore a performance to hear its character.";
  const GENRE_INFO = {
    Mazurka: "Mazurkas are Polish country dances (mazur, kujawiak, oberek) that Chopin turned into intimate, poetic miniatures throughout his life.",
    Nocturne: "Nocturnes are night-pieces: song-like, dreamy, often improvisatory. Chopin elevated the form inherited from John Field into high art.",
    Étude: "Études are studies — Chopin transformed technical exercises into concert poetry of dazzling virtuosity.",
    Waltz: "Waltzes are Chopin's salon pieces — elegant, sparkling, and often touched with melancholy.",
    Polonaise: "Polonaises are stately Polish dances in triple time. Chopin made them vessels of national pride and lament.",
    Prelude: "Preludes are short character-pieces, one in every major and minor key, traversing a complete world of moods.",
    Ballade: "Ballades are narrative tone-poems for solo piano — Chopin invented the genre, possibly inspired by the poetry of Adam Mickiewicz.",
    Scherzo: "Scherzos are fast, dramatic pieces — though Chopin's are far from jokes, often dark and grand.",
    Sonata: "Sonatas are large-scale multi-movement works showing Chopin's structural ambition.",
    Concerto: "Concertante works for piano and orchestra, written in his twenties for his farewell Polish tours.",
    Impromptu: "Impromptus are free, improvisatory pieces of lyrical charm.",
    Rondo: "Early single-movement works often showpiece in character.",
    Variation: "Sets of variations on operatic or popular tunes, mostly from his youth.",
    Chamber: "Music for piano with other instruments — a rare but telling side of Chopin.",
    Song: "Polish songs (melodie) setting poems by Polish poets, mostly for voice and piano.",
  };

  function open(work) {
    const name = work.title + (work.subtitle ? ` “${work.subtitle}”` : "");
    elOpus.textContent = work.opus;
    elTitle.textContent = name;
    const metaParts = [];
    if (work.year) metaParts.push(`<span>Composed ${work.year}</span>`);
    metaParts.push(`<span>${work.genre}${work.notes ? ` · ${work.notes}` : ""}</span>`);
    elMeta.innerHTML = metaParts.join("");
    const blurb = work.blurb || GENRE_INFO[work.genre] || FALLBACK;
    elBlurb.textContent = blurb;
    const ytQ = encodeURIComponent(`Chopin ${name} ${work.opus}`);
    elYT.href = `https://www.youtube.com/results?search_query=${ytQ}`;
    const imslpQ = encodeURIComponent(`Chopin ${name} ${work.opus} site:imslp.org`);
    elIMSLP.href = `https://www.google.com/search?q=${imslpQ}`;
    const midiQ = encodeURIComponent(`Chopin ${name} ${work.opus} site:piano-midi.de`);
    elMIDI.href = `https://www.google.com/search?q=${midiQ}`;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  // Open a work by opus number (used by Listen links)
  function openByOpus(opus) {
    const work = WORKS.find(w => w.opus === opus);
    if (work) open(work);
  }

  // Expose for listen links
  window.__openWorkByOpus = openByOpus;

  // Delegate clicks on work cards
  document.getElementById("works-grid").addEventListener("click", (ev) => {
    const card = ev.target.closest(".card");
    if (!card) return;
    const idx = +card.dataset.idx;
    const list = document.getElementById("works-grid")._currentList || WORKS;
    if (list[idx]) open(list[idx]);
  });

  // Listen links
  document.querySelectorAll(".listen-link").forEach(btn => {
    btn.addEventListener("click", () => openByOpus(btn.dataset.opus));
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (ev) => { if (ev.target === overlay) close(); });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") close(); });
})();
