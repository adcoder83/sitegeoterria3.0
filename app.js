// --- Données équipe et prestations ---
const teamMembers = [
  {
    key: 'samuel',
    nom: 'Samuel Turle',
    role: 'Directeur Général',
    photo: 'https://randomuser.me/api/portraits/men/11.jpg',
    mail: 'samuel.turle@email.com',
    parcours: 'Ingénieur géotechnicien, expérience internationale, fondateur de GÉOTERRIA.',
    missions: 'Direction générale, pilotage des projets, relation clients stratégiques.'
  },
  {
    key: 'pierre',
    nom: 'Pierre Barneoud-Rousset',
    role: 'Directeur Technique',
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    mail: 'pierre.barneoud@email.com',
    parcours: 'Expert en ingénierie, responsable R&D, passionné par l’innovation géotechnique.',
    missions: 'Supervision technique, formation, développement de méthodes avancées.'
  },
  {
    key: 'stephane',
    nom: 'Stéphane Castells',
    role: 'Responsable Projet',
    photo: 'https://randomuser.me/api/portraits/men/33.jpg',
    mail: 'stephane.castells@email.com',
    parcours: 'Chef de projet expérimenté, spécialisé en suivi de chantier.',
    missions: 'Gestion de projet, accompagnement client, optimisation qualité.'
  },
  {
    key: 'sarah',
    nom: 'Sarah Texier',
    role: 'Responsable Toulon',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    mail: 'sarah.texier@email.com',
    parcours: 'Responsable d’agence, forte expérience en gestion d’équipe.',
    missions: 'Gestion de l’agence Toulon, développement commercial, relation client.'
  }
];
const services = [
  {
    icon: "🧭",
    title: "Études de sol",
    desc: "Diagnostic, conception et suivi d’exécution G1 à G5. Sécurisez vos travaux dès la conception."
  },
  {
    icon: "🔬",
    title: "Essais in situ",
    desc: "Sondages, essais pénétrométriques, essais plaque : données fiables pour des fondations sûres."
  },
  {
    icon: "🏗️",
    title: "Suivi de chantier",
    desc: "Contrôle qualité, gestion des aléas géotechniques, accompagnement technique continu."
  },
  {
    icon: "💡",
    title: "Conseil ingénierie",
    desc: "Optimisation de fondations, analyse de risques, solutions innovantes pour chaque projet."
  }
];

// --- Navigation ---
const mainContent = document.getElementById('main-content');
const navLinks = document.querySelectorAll('.nav-links a');
function setActiveLink(page) {
  navLinks.forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
    else link.classList.remove('active');
  });
}

// --- Pages dynamiques ---
function getAccueilHTML() {
  return `
    <section class="page-section hero" id="hero-section">
      <h1>GÉOTERRIA</h1>
      <div class="typing" id="typing-text"></div>
      <button class="cta-btn" id="cta-btn-hero">Demander un devis</button>
    </section>
  `;
}
function getAproposHTML() {
  return `
    <section class="page-section section-scroll">
      <h2 class="section-title">À propos de GÉOTERRIA</h2>
      <p style="font-size:1.14em;line-height:1.6">
        GÉOTERRIA, bureau d’études indépendant, met l’expertise et l’innovation au service de vos projets de construction.<br>
        <ul class="custom-list">
          <li>Expertise reconnue en ingénierie géotechnique</li>
          <li>Accompagnement personnalisé de l’étude à la réalisation</li>
          <li>Équipe pluridisciplinaire à la pointe de la technologie</li>
        </ul>
      </p>
    </section>
  `;
}
function getPrestationsHTML() {
  return `
    <section class="page-section section-scroll">
      <h2 class="section-title">Nos prestations</h2>
      <div class="services-grid">
        ${services.map(s => `
          <div class="service-card">
            <div class="icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}
function getEquipeHTML() {
  return `
    <section class="page-section section-scroll">
      <h2 class="section-title">Notre équipe</h2>
      <div class="team-grid">
        ${teamMembers.map(member => `
          <div class="team-card" data-key="${member.key}" tabindex="0">
            <img src="${member.photo}" alt="${member.nom}">
            <h3>${member.nom}</h3>
            <p>${member.role}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}
function getContactHTML() {
  return `
    <section class="page-section section-scroll">
      <h2 class="section-title">Contactez-nous</h2>
      <form class="contact-form" id="contact-form" autocomplete="off">
        <label for="nom">Nom</label>
        <input type="text" id="nom" required>
        <label for="email">Email</label>
        <input type="email" id="email" required>
        <label for="message">Message</label>
        <textarea id="message" rows="4" required></textarea>
        <button type="submit">Envoyer</button>
        <div id="contact-feedback" class="contact-feedback"></div>
      </form>
      <div class="contact-info">
        <p><strong>Adresse :</strong> 42 Avenue Irène et Jean Frédéric Joliot Curie, 83130 La Garde</p>
        <p><strong>Téléphone :</strong> 04 94 94 21 99</p>
        <p><strong>Email :</strong> contact@geoterria.com</p>
      </div>
      <div class="contact-info" style="margin-top:1em;">
        <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=6.0192%2C43.1243%2C6.0260%2C43.1271&amp;layer=mapnik&amp;marker=43.1257,6.0226"
          style="border:1px solid #ccc; width:100%; max-width:450px; height:200px; border-radius:8px;" allowfullscreen="" loading="lazy"></iframe>
      </div>
    </section>
  `;
}

// --- Page rendering + effets ---
function renderPage(page) {
  setActiveLink(page);
  mainContent.classList.remove('parallax');
  switch (page) {
    case 'accueil':
      mainContent.innerHTML = getAccueilHTML();
      setTimeout(() => {
        document.getElementById('hero-section').classList.add('visible');
        startTypingEffect();
        bindRippleBtn(document.getElementById('cta-btn-hero'));
        document.getElementById('cta-btn-hero').onclick = () => {
          window.location.hash = 'contact';
        };
      }, 60);
      // Parallax léger pour accueil
      mainContent.classList.add('parallax');
      break;
    case 'apropos':
      mainContent.innerHTML = getAproposHTML();
      revealOnScroll();
      break;
    case 'prestations':
      mainContent.innerHTML = getPrestationsHTML();
      revealOnScroll();
      setTimeout(() => animateServices(), 100);
      break;
    case 'equipe':
      mainContent.innerHTML = getEquipeHTML();
      bindTeamCards();
      revealOnScroll();
      setTimeout(() => animateTeam(), 140);
      break;
    case 'contact':
      mainContent.innerHTML = getContactHTML();
      bindContactForm();
      revealOnScroll();
      break;
    default:
      renderPage('accueil');
      break;
  }
}

// --- Typing effect accueil ---
function startTypingEffect() {
  const texts = [
    "Accompagnement sur-mesure",
    "Expertise géotechnique avancée",
    "Innovation au service de vos projets",
    "Votre sol, notre passion."
  ];
  const el = document.getElementById('typing-text');
  let i = 0, txt = '', isDel = false, t = 0, textIdx = 0;
  function type() {
    if (!el) return;
    const full = texts[textIdx];
    if (!isDel) {
      txt = full.slice(0, i++);
      el.innerHTML = txt + '<span style="opacity:.4;">|</span>';
      if (i > full.length) { isDel = true; t = 0; setTimeout(type, 1700); return; }
    } else {
      txt = full.slice(0, --i);
      el.innerHTML = txt + '<span style="opacity:.2;">|</span>';
      if (i === 0) { isDel = false; textIdx = (textIdx+1)%texts.length; setTimeout(type, 600); return; }
    }
    setTimeout(type, isDel ? 30 : 60 + Math.random()*35);
  }
  type();
}

// --- Ripple effect sur boutons ---
function bindRippleBtn(btn) {
  if (!btn) return;
  btn.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    const size = Math.max(btn.clientWidth, btn.clientHeight);
    circle.style.width = circle.style.height = size+'px';
    circle.style.left = (e.offsetX - size/2) + 'px';
    circle.style.top = (e.offsetY - size/2) + 'px';
    btn.appendChild(circle);
    setTimeout(()=>circle.remove(), 450);
  });
}
function bindRippleAll() {
  document.querySelectorAll('.cta-btn, .contact-form button').forEach(bindRippleBtn);
}

// --- Animation services ---
function animateServices() {
  document.querySelectorAll('.service-card').forEach((c,i) => {
    setTimeout(() => c.classList.add('visible'), 100 + 110*i);
  });
}
function animateTeam() {
  document.querySelectorAll('.team-card').forEach((c,i) => {
    setTimeout(() => c.classList.add('visible'), 80 + 110*i);
  });
}

// --- Reveal on scroll pour sections ---
function revealOnScroll() {
  const sections = document.querySelectorAll('.section-scroll, .page-section');
  const reveal = () => {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) sec.classList.add('visible');
    });
  };
  window.removeEventListener('scroll', reveal);
  window.addEventListener('scroll', reveal);
  setTimeout(reveal, 80);
}

// --- Parallax accueil ---
window.addEventListener('scroll', () => {
  if (mainContent.classList.contains('parallax')) {
    const sc = window.scrollY;
    mainContent.style.backgroundPosition = `center ${sc/2}px`;
  }
});

// --- Modale équipe ---
function showMemberModal(memberKey) {
  const member = teamMembers.find(m => m.key === memberKey);
  if (!member) return;
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <img src="${member.photo}" alt="${member.nom}">
    <h3>${member.nom}</h3>
    <p style="color:#888;font-size:1.07em;margin-bottom:.7em;">${member.role}</p>
    <p><strong>Parcours :</strong> ${member.parcours}</p>
    <p><strong>Missions :</strong> ${member.missions}</p>
    <p style="margin-top:1em;">
      <a href="mailto:${member.mail}" style="color:#3bb5ff;text-decoration:none;font-weight:600;">
        <span style="font-size:1.1em;">&#9993;</span> ${member.mail}
      </a>
    </p>
  `;
  modalBackdrop.style.display = 'flex';
}
function closeMemberModal() {
  document.getElementById('modal-backdrop').style.display = 'none';
}
function bindTeamCards() {
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => showMemberModal(card.dataset.key));
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        showMemberModal(card.dataset.key);
      }
    });
  });
  animateTeam();
}

// --- Contact form feedback ---
function bindContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');
  if (!form) return;
  bindRippleAll();
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    feedback.textContent = "Merci pour votre message ! Nous vous répondrons rapidement.";
    feedback.style.display = "block";
    feedback.style.color = "#38b000";
    form.reset();
    setTimeout(() => { feedback.style.display = "none"; }, 2800);
  });
}

// --- Routing ---
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const page = this.dataset.page;
    window.location.hash = page;
    renderPage(page);
    closeMemberModal();
    closeMobileMenu();
  });
});
function initFromHash() {
  const page = window.location.hash.replace('#', '') || 'accueil';
  renderPage(page);
  closeMemberModal();
  closeMobileMenu();
}
window.addEventListener('DOMContentLoaded', initFromHash);
window.addEventListener('hashchange', initFromHash);

// --- Menu burger responsive ---
const burgerMenu = document.getElementById('burger-menu');
const navLinksDiv = document.getElementById('nav-links');
burgerMenu.addEventListener('click', function () {
  navLinksDiv.classList.toggle('open');
});
function closeMobileMenu() {
  navLinksDiv.classList.remove('open');
}
document.addEventListener('click', function(e) {
  if (window.innerWidth <= 768 && navLinksDiv.classList.contains('open')) {
    if (!navLinksDiv.contains(e.target) && e.target !== burgerMenu) {
      closeMobileMenu();
    }
  }
});

// --- Modale équipe fermeture ---
document.getElementById('modal-close').addEventListener('click', closeMemberModal);
document.getElementById('modal-backdrop').addEventListener('click', function(e) {
  if (e.target === this) closeMemberModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") closeMemberModal();
});
