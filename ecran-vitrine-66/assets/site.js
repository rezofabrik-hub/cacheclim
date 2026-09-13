/* =============================================================
   Écran Vitrine 66 — logique commune à toutes les pages
   -------------------------------------------------------------
   TOUT CE QUI SE RÈGLE SUR CE SITE SE RÈGLE ICI, ET NULLE PART
   AILLEURS : la clé du formulaire, le téléphone et les tarifs.

   Pour recevoir les demandes par e-mail, remplacez seulement la
   valeur de CLE_WEB3FORMS ci-dessous (voir LISEZ-MOI.txt).
   Tant qu'elle vaut VOTRE_CLE_WEB3FORMS, les formulaires de
   toutes les pages basculent automatiquement sur WhatsApp.
   ============================================================= */

var EV66 = {
  CLE_WEB3FORMS: 'VOTRE_CLE_WEB3FORMS',
  TEL: '+33662181401',
  WHATSAPP: '33662181401',

  /* Mensualités client HT, tout compris. [48 mois, 60 mois] */
  GRILLE: {
    vitrine:   { 32:[159,139], 43:[159,139], 49:[179,149], 55:[189,159], 75:[319,249] },
    interieur: { 32:[59,49],   43:[69,59],   49:[79,69],   55:[89,79],   75:[129,109] },
    trottoir:  { 43:[159,null] }
  },
  DIMS: { 32:'70 × 40 cm', 43:'96 × 55 cm', 49:'109 × 63 cm', 55:'124 × 71 cm', 75:'168 × 96 cm' },
  NOMS: { vitrine:'Écran vitrine', interieur:'Écran intérieur', trottoir:'Stop-trottoir' }
};

(function () {
  'use strict';

  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
     Menu de navigation (sous 1080 px)
     ----------------------------------------------------------- */
  var burger = document.getElementById('burger'),
      menu   = document.getElementById('menu');

  if (burger && menu) {
    var basculer = function (ouvrir) {
      burger.setAttribute('aria-expanded', ouvrir ? 'true' : 'false');
      burger.setAttribute('aria-label', ouvrir ? 'Fermer le menu' : 'Ouvrir le menu');
      menu.hidden = !ouvrir;
      if (ouvrir) { menu.setAttribute('data-ouvert', 'true'); }
      else { menu.removeAttribute('data-ouvert'); }
      document.body.classList.toggle('bloque', ouvrir);
    };

    burger.addEventListener('click', function () {
      basculer(burger.getAttribute('aria-expanded') !== 'true');
    });

    /* un clic sur un lien referme le panneau */
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) basculer(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        basculer(false);
        burger.focus();
      }
    });

    /* si l'écran s'élargit au-delà du point de bascule, on referme */
    window.matchMedia('(min-width: 1080px)').addEventListener('change', function (e) {
      if (e.matches) basculer(false);
    });
  }

  /* -----------------------------------------------------------
     Vitrine animée de l'accueil : rotation des messages,
     halo coloré et jauge de défilement
     ----------------------------------------------------------- */
  var DUREE = 3800, GLISSEMENT = 780;
  var diapos = document.querySelectorAll('#ecran .diapo'),
      halo   = document.getElementById('halo'),
      jauge  = document.getElementById('jauge');

  if (diapos.length) {
    var teinte = function (n) {
      if (halo) halo.style.background = diapos[n].dataset.teinte || '#B3341F';
    };
    var relancerJauge = function () {
      if (!jauge || reduit) return;
      jauge.classList.remove('court');
      void jauge.offsetWidth;          /* force le navigateur à repartir de zéro */
      jauge.classList.add('court');
    };

    teinte(0);
    relancerJauge();

    if (!reduit) {
      var i = 0;
      setInterval(function () {
        var sortante = i;
        diapos[sortante].classList.remove('actif');
        diapos[sortante].classList.add('sortante');

        i = (i + 1) % diapos.length;
        diapos[i].classList.add('actif');

        /* une seule diapositive sortante à la fois, sinon elles s'empilent */
        for (var n = 0; n < diapos.length; n++) {
          if (n !== sortante) diapos[n].classList.remove('sortante');
        }

        /* la sortante disparaît dès que l'entrante l'a recouverte : sans cela
           un liseré de l'ancienne image subsiste sur le bord incliné */
        setTimeout(function () {
          diapos[sortante].classList.remove('sortante');
        }, GLISSEMENT);

        teinte(i);
        relancerJauge();
      }, DUREE);
    }
  }

  /* -----------------------------------------------------------
     Rubrique courante surlignée pendant le défilement
     ----------------------------------------------------------- */
  var ancres = [].slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if (ancres.length && 'IntersectionObserver' in window) {
    var parId = {};
    var sections = [];
    ancres.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) { parId[el.id] = a; sections.push(el); }
    });

    var vue = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        ancres.forEach(function (a) { a.classList.remove('actif'); });
        parId[e.target.id].classList.add('actif');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (el) { vue.observe(el); });
  }

  /* -----------------------------------------------------------
     Simulateur de mensualité (accueil uniquement)
     ----------------------------------------------------------- */
  var optType = document.getElementById('opt-type');
  if (optType) simulateur(optType);

  function simulateur(optType) {
    var etat = { type: 'vitrine', taille: '49', duree: '60' };

    var elPrix = document.getElementById('simu-prix'),
        elJour = document.getElementById('simu-jour'),
        elEco  = document.getElementById('simu-eco'),
        elDet  = document.getElementById('simu-detail'),
        etTail = document.getElementById('etape-taille'),
        etDur  = document.getElementById('etape-duree');

    function presser(conteneur, attr, valeur) {
      conteneur.querySelectorAll('.opt').forEach(function (b) {
        b.setAttribute('aria-pressed', b.dataset[attr] === valeur ? 'true' : 'false');
      });
    }

    function calculer() {
      var trottoir = etat.type === 'trottoir';
      etTail.style.display = trottoir ? 'none' : '';
      etDur.style.display  = trottoir ? 'none' : '';

      var taille = trottoir ? '43' : etat.taille;
      var couple = EV66.GRILLE[etat.type][taille];
      if (!couple) { taille = '43'; couple = EV66.GRILLE[etat.type][taille]; }

      var duree = trottoir ? '48' : etat.duree;
      var prix  = (duree === '60' && couple[1]) ? couple[1] : couple[0];

      elPrix.textContent = prix + ' €';
      elJour.textContent = 'soit ' + (prix / 30).toFixed(2).replace('.', ',') + ' € par jour';

      if (!trottoir && couple[1] && couple[0] !== couple[1]) {
        elEco.style.display = '';
        elEco.textContent = duree === '60'
          ? (couple[0] - couple[1]) + ' € de moins qu’en 48 mois'
          : 'Passez en 60 mois : ' + (couple[0] - couple[1]) + ' € de moins par mois';
      } else {
        elEco.style.display = 'none';
      }

      elDet.textContent = trottoir
        ? 'Stop-trottoir 43 pouces sur batterie, sur 48 mois. Matériel, logiciel, installation, formation et SAV compris.'
        : EV66.NOMS[etat.type] + ' ' + taille + ' pouces, ' + EV66.DIMS[taille] +
          ', sur ' + duree + ' mois. Matériel, logiciel, installation, formation et SAV compris.';

      /* Pré-remplissage du formulaire de devis */
      var fs = document.getElementById('f-solution'),
          ft = document.getElementById('f-taille'),
          fd = document.getElementById('f-duree');
      if (fs) fs.value = trottoir ? 'Stop-trottoir'
                                  : (etat.type === 'vitrine' ? 'Écran vitrine' : 'Écran intérieur ou menuboard');
      if (ft) ft.value = taille + ' pouces';
      if (fd) fd.value = duree + ' mois';
    }

    optType.addEventListener('click', function (e) {
      var b = e.target.closest('.opt'); if (!b) return;
      etat.type = b.dataset.type;
      presser(this, 'type', etat.type);
      calculer();
    });
    document.getElementById('opt-taille').addEventListener('click', function (e) {
      var b = e.target.closest('.opt'); if (!b) return;
      etat.taille = b.dataset.taille;
      presser(this, 'taille', etat.taille);
      calculer();
    });
    document.getElementById('opt-duree').addEventListener('click', function (e) {
      var b = e.target.closest('.opt'); if (!b) return;
      etat.duree = b.dataset.duree;
      presser(this, 'duree', etat.duree);
      calculer();
    });
    var cta = document.getElementById('simu-cta');
    if (cta) cta.addEventListener('click', function () {
      var plus = document.querySelector('.plus'); if (plus) plus.open = true;
    });

    calculer();
  }

  /* -----------------------------------------------------------
     Formulaires : clé unique, et repli WhatsApp tant qu'elle
     n'est pas renseignée. Vaut pour toutes les pages du site.
     ----------------------------------------------------------- */
  var formulaires = document.querySelectorAll('form[action*="web3forms"]');
  var configuree = EV66.CLE_WEB3FORMS !== 'VOTRE_CLE_WEB3FORMS' && EV66.CLE_WEB3FORMS !== '';

  formulaires.forEach(function (form) {
    var cle = form.querySelector('input[name="access_key"]');
    if (cle) cle.value = EV66.CLE_WEB3FORMS;

    var repli = form.querySelector('.repli');
    if (configuree) { if (repli) repli.style.display = 'none'; return; }
    if (repli) repli.style.display = 'block';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var ignore = ['access_key', 'subject', 'from_name', 'botcheck'],
          vides  = ['Je ne sais pas', 'À déterminer', 'Je ne sais pas encore'],
          lignes = [];

      new FormData(form).forEach(function (v, k) {
        if (ignore.indexOf(k) > -1) return;
        if (!v || vides.indexOf(v) > -1) return;
        lignes.push(k.replace(/_/g, ' ') + ' : ' + v);
      });

      var txt = 'Demande de devis — Écran Vitrine 66\n\n' + lignes.join('\n');
      window.open('https://wa.me/' + EV66.WHATSAPP + '?text=' + encodeURIComponent(txt), '_blank');
    });
  });
})();
