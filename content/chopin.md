---
title: "Frédéric Chopin — The Poet of the Piano"
author: OhKay.
date: 2026-07-26T00:00:00-06:00
description: An interactive tribute to Frédéric Chopin — life, quotes, listening guide, works catalog, and a quiz.
tags: [music, chopin, interactive]
categories: [music]
---

<link rel="stylesheet" href="/chopin/styles.css" />

<div class="chopin">
  <nav class="chopin-nav">
    <a href="#home">Home</a>
    <a href="#bio">Life</a>
    <a href="#quotes">Quotes</a>
    <a href="#listen">Listen</a>
    <a href="#works">Works</a>
    <a href="#quiz">Quiz</a>
    <a href="#resources">Resources</a>
  </nav>

  <!-- HOME -->
  <section id="home" class="hero">
    <div class="hero-inner">
      <h1>Frédéric Chopin</h1>
      <p class="hero-dates">1810 — 1849</p>
      <p class="hero-tag">Polish composer, virtuoso pianist, and one of the great masters of Romantic music.</p>
      <blockquote class="hero-quote">
        “Simplicity is the final achievement. After one has played a vast quantity of notes and more notes, it is simplicity that emerges as the crowning reward of art.”
      </blockquote>
    </div>
  </section>

  <!-- BIOGRAPHY TIMELINE -->
  <section id="bio" class="section">
    <h2 class="section-title">A Life in Music</h2>
    <ol class="timeline" id="timeline"></ol>
  </section>

  <!-- QUOTES -->
  <section id="quotes" class="section">
    <h2 class="section-title">In His Own Words</h2>
    <p class="section-lede">Chopin on music, life, and the piano.</p>
    <div class="quotes-grid" id="quotes-grid"></div>
  </section>

  <!-- LISTENING GUIDE -->
  <section id="listen" class="section">
    <h2 class="section-title">Where to Begin</h2>
    <p class="section-lede">Three curated entry points into Chopin's world. Click any piece to learn more.</p>
    <div class="listen-grid">
      <article class="listen-card">
        <h3>For the Curious</h3>
        <p>A gentle first taste of melody and atmosphere.</p>
        <ul>
          <li><button class="listen-link" data-opus="Op. 9 No. 2">Nocturne in E♭ major, Op. 9 No. 2</button></li>
          <li><button class="listen-link" data-opus="Op. 28 No. 4">Prelude in E minor, Op. 28 No. 4</button></li>
          <li><button class="listen-link" data-opus="Op. 64 No. 1">Waltz in D♭ major, Op. 64 No. 1 (“Minute”)</button></li>
        </ul>
      </article>
      <article class="listen-card">
        <h3>For the Romantic</h3>
        <p>Stirring, songful, and emotionally deep.</p>
        <ul>
          <li><button class="listen-link" data-opus="Op. 23">Ballade No. 1 in G minor, Op. 23</button></li>
          <li><button class="listen-link" data-opus="Op. posth. (B. 49)">Nocturne in C♯ minor, Op. posth.</button></li>
          <li><button class="listen-link" data-opus="Op. 66">Fantasie-Impromptu, Op. 66</button></li>
        </ul>
      </article>
      <article class="listen-card">
        <h3>For the Adventurer</h3>
        <p>Virtuosity, fire, and structural daring.</p>
        <ul>
          <li><button class="listen-link" data-opus="Op. 10 No. 12">Étude in C minor, Op. 10 No. 12 (“Revolutionary”)</button></li>
          <li><button class="listen-link" data-opus="Op. 31">Scherzo No. 2 in B♭ minor, Op. 31</button></li>
          <li><button class="listen-link" data-opus="Op. 53">Polonaise in A♭ major, Op. 53 (“Heroic”)</button></li>
        </ul>
      </article>
    </div>
  </section>

  <!-- WORKS CATALOG -->
  <section id="works" class="section">
    <h2 class="section-title">Works Catalog</h2>
    <div class="filter-bar">
      <button class="chip is-active" data-genre="all">All</button>
      <!-- chips injected by JS -->
    </div>
    <ul class="works-grid" id="works-grid"></ul>
  </section>

  <!-- QUIZ -->
  <section id="quiz" class="section">
    <h2 class="section-title">Which Piece Are You?</h2>
    <p class="section-lede">Answer four questions to discover your Chopin spirit-piece.</p>
    <div id="quiz-root" class="quiz-root"></div>
  </section>

  <!-- RESOURCES -->
  <section id="resources" class="section">
    <h2 class="section-title">Further Reading &amp; Listening</h2>
    <p class="section-lede">Selected resources for going deeper into Chopin's life and music.</p>
    <div class="resources-grid">
      <a class="resource-card" href="https://en.wikipedia.org/wiki/Fr%C3%A9d%C3%A9ric_Chopin" target="_blank" rel="noopener">
        <h3>Wikipedia</h3>
        <p>Comprehensive biography, works list, and references.</p>
        <span class="resource-host">en.wikipedia.org &nearr;</span>
      </a>
      <a class="resource-card" href="https://www.britannica.com/biography/Frederic-Chopin" target="_blank" rel="noopener">
        <h3>Britannica</h3>
        <p>Authoritative encyclopedic overview of his life and legacy.</p>
        <span class="resource-host">britannica.com &nearr;</span>
      </a>
      <a class="resource-card" href="https://www.chopin.pl/en/" target="_blank" rel="noopener">
        <h3>The Fryderyk Chopin Institute</h3>
        <p>Poland's official institute — archives, exhibitions, and the Chopin Competition.</p>
        <span class="resource-host">chopin.pl &nearr;</span>
      </a>
      <a class="resource-card" href="https://www.nifc.pl/en/chopin" target="_blank" rel="noopener">
        <h3>NIFC</h3>
        <p>National Fryderyk Chopin Institute — collections, research, and concert recordings.</p>
        <span class="resource-host">nifc.pl &nearr;</span>
      </a>
      <a class="resource-card" href="https://chopincompetition.com/" target="_blank" rel="noopener">
        <h3>International Chopin Piano Competition</h3>
        <p>The prestigious Warsaw competition, held every five years since 1927.</p>
        <span class="resource-host">chopincompetition.com &nearr;</span>
      </a>
      <a class="resource-card" href="https://www.kennedy-center.org/education/resources-for-educators/classroom-resources/media-and-interactives/media/music/frederic-francois-chopin/" target="_blank" rel="noopener">
        <h3>Kennedy Center</h3>
        <p>Education resources and listening guides for students and teachers.</p>
        <span class="resource-host">kennedy-center.org &nearr;</span>
      </a>
      <a class="resource-card" href="https://imslp.org/wiki/List_of_works_by_Fr%C3%A9d%C3%A9ric_Chopin" target="_blank" rel="noopener">
        <h3>IMSLP Works List</h3>
        <p>Complete catalog with free downloadable sheet music for every piece.</p>
        <span class="resource-host">imslp.org &nearr;</span>
      </a>
      <a class="resource-card" href="https://www.youtube.com/@ChopinInstitute" target="_blank" rel="noopener">
        <h3>Chopin Institute on YouTube</h3>
        <p>Official channel with complete recordings from the Chopin Competition.</p>
        <span class="resource-host">youtube.com &nearr;</span>
      </a>
    </div>
  </section>

  <!-- PIECE MODAL -->
  <div class="modal-overlay" id="modal-overlay" hidden>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button class="modal-close" id="modal-close" aria-label="Close">&times;</button>
      <div class="modal-opus" id="modal-opus"></div>
      <h3 class="modal-title" id="modal-title"></h3>
      <div class="modal-meta" id="modal-meta"></div>
      <p class="modal-blurb" id="modal-blurb"></p>
      <div class="modal-links">
        <a class="modal-yt" id="modal-yt" target="_blank" rel="noopener">Watch on YouTube &nearr;</a>
        <a class="modal-imslp" id="modal-imslp" target="_blank" rel="noopener">Find sheet music (IMSLP) &nearr;</a>
        <a class="modal-midi" id="modal-midi" target="_blank" rel="noopener">Find MIDI files &nearr;</a>
      </div>
    </div>
  </div>
</div>

<script src="/chopin/app.js"></script>
