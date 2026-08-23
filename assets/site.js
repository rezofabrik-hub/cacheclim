/* =============================================================
   La Fabrik du Cache Clim — logique commune
   -------------------------------------------------------------
   TOUS LES PRIX DU SITE SONT DÉFINIS ICI, ET NULLE PART AILLEURS.
   Pour changer un tarif, modifiez la table TAILLES ci-dessous :
   les pages, le configurateur et le panier se mettent à jour.

   Deux gammes, un seul prix par taille dans chacune :

     CAISSON  — trois faces ajourées + dessus plein, enveloppe l'unité
     PANNEAU  — une seule face, fixée au mur devant l'unité

   Le panneau est systématiquement 70 € sous le caisson : une pièce au
   lieu de quatre, pas de dessus, pas de côtés.

   Dans les deux gammes, le motif ne coûte pas plus cher que l'uni et
   les sept finitions sont au même tarif — ce que la concurrence ne
   propose pas. Le caisson reste 20 € sous Kach Klim à taille égale.
   Voir docs/grille-tarifaire.md pour le positionnement complet.
   ============================================================= */

const TAILLES = [
  { id: 'S',   L: 85,  H: 65,  Pmin: 45, Pmax: 55, caisson: 219, panneau: 149 },
  { id: 'M',   L: 93,  H: 73,  Pmin: 50, Pmax: 60, caisson: 249, panneau: 179 },
  { id: 'L',   L: 95,  H: 83,  Pmin: 53, Pmax: 63, caisson: 279, panneau: 209 },
  { id: 'XL',  L: 102, H: 79,  Pmin: 54, Pmax: 64, caisson: 279, panneau: 209 },
  { id: 'XXL', L: 105, H: 95,  Pmin: 60, Pmax: 70, caisson: 319, panneau: 249 },
];

/* Sur mesure : prix plancher, majoré à la surface au-delà du gabarit XXL */
const SUR_MESURE = { caisson: 349, panneau: 279, maxL: 110, maxH: 120, maxP: 65 };

/* Options payantes */
const OPTIONS = { pied: 30 };

/* Jeu qui garantit l'aération : le cache doit dépasser l'unité */
const MARGE = { L: 5, H: 5, P: 3 };

const euro = n => n.toLocaleString('fr-FR') + ' €';

/* -------------------------------------------------------------
   Trouve ta taille
   ------------------------------------------------------------- */
function trouverTaille(L, H, P) {
  if (!L || !H || !P) return null;
  const ok = TAILLES.find(t =>
    t.L >= L + MARGE.L && t.H >= H + MARGE.H && t.Pmax >= P + MARGE.P
  );
  if (ok) return { type: 'standard', taille: ok };
  if (L + MARGE.L <= SUR_MESURE.maxL && H + MARGE.H <= SUR_MESURE.maxH && P + MARGE.P <= SUR_MESURE.maxP) {
    return { type: 'sur-mesure' };
  }
  return { type: 'hors-gabarit' };
}

function renderFinder() {
  const box = document.getElementById('finderResult');
  if (!box) return;
  const L = parseInt(document.getElementById('fL').value, 10);
  const H = parseInt(document.getElementById('fH').value, 10);
  const P = parseInt(document.getElementById('fP').value, 10);

  if (!L || !H || !P) {
    box.className = 'finder-result empty';
    box.innerHTML = 'Renseignez les trois mesures de votre unité extérieure pour connaître la taille adaptée.';
    return;
  }

  const r = trouverTaille(L, H, P);
  box.className = 'finder-result';

  if (r.type === 'standard') {
    const t = r.taille;
    box.innerHTML =
      '<div class="fr-label">Taille recommandée</div>' +
      '<div class="fr-size">Cache clim ' + t.id + '</div>' +
      '<div class="fr-dims">Dimensions du cache : ' + t.L + ' × ' + t.H + ' cm · profondeur réglable ' + t.Pmin + '–' + t.Pmax + ' cm</div>' +
      '<div class="fr-prices">' +
        '<div class="fr-price"><b>' + euro(t.caisson) + '</b><span>Caisson · 3 faces + dessus</span></div>' +
        '<div class="fr-price"><b>' + euro(t.panneau) + '</b><span>Panneau mural · face avant seule</span></div>' +
      '</div>' +
      '<div class="fr-warn" style="background:#e3f0e8;color:#1e5e3f">Les 16 designs et les 7 finitions sont au même prix. Livraison offerte incluse.</div>';
  } else if (r.type === 'sur-mesure') {
    box.innerHTML =
      '<div class="fr-label">Aucune taille standard ne convient</div>' +
      '<div class="fr-size">Sur mesure</div>' +
      '<div class="fr-dims">Votre unité sort de nos gabarits standards, mais reste dans nos capacités d\'atelier.</div>' +
      '<div class="fr-prices">' +
        '<div class="fr-price"><b>dès ' + euro(SUR_MESURE.caisson) + '</b><span>Caisson sur mesure</span></div>' +
        '<div class="fr-price"><b>dès ' + euro(SUR_MESURE.panneau) + '</b><span>Panneau sur mesure</span></div>' +
      '</div>' +
      '<div class="fr-warn">Fabrication à vos cotes exactes, livrée en 7 à 10 jours. <a href="index.html#sur-mesure" style="color:#92400e;font-weight:700">Configurer mon cache sur mesure</a></div>';
  } else {
    box.innerHTML =
      '<div class="fr-label">Hors gabarit</div>' +
      '<div class="fr-size">Parlons-en</div>' +
      '<div class="fr-dims">Votre unité dépasse ' + SUR_MESURE.maxL + ' × ' + SUR_MESURE.maxH + ' × ' + SUR_MESURE.maxP + ' cm. C\'est souvent le cas des pompes à chaleur de forte puissance ou des groupes multi-split.</div>' +
      '<div class="fr-warn">Nous fabriquons aussi ces formats, mais sur devis. Appelez-nous au <a href="tel:0775769232" style="color:#92400e;font-weight:700">07 75 76 92 32</a>.</div>';
  }
}

/* -------------------------------------------------------------
   Tableau des tarifs (généré depuis TAILLES)
   ------------------------------------------------------------- */
function renderGrilleTarifs(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  let rows = TAILLES.map(t =>
    '<tr><th scope="row">' + t.id + '</th>' +
    '<td class="dims">' + t.L + ' × ' + t.H + ' cm</td>' +
    '<td class="dims">' + t.Pmin + ' – ' + t.Pmax + ' cm</td>' +
    '<td class="price">' + euro(t.caisson) + '</td>' +
    '<td class="price">' + euro(t.panneau) + '</td></tr>'
  ).join('');
  rows += '<tr class="highlight"><th scope="row">Sur mesure</th>' +
    '<td class="dims">jusqu\'à ' + SUR_MESURE.maxL + ' × ' + SUR_MESURE.maxH + ' cm</td>' +
    '<td class="dims">jusqu\'à ' + SUR_MESURE.maxP + ' cm</td>' +
    '<td class="price">dès ' + euro(SUR_MESURE.caisson) + '</td>' +
    '<td class="price">dès ' + euro(SUR_MESURE.panneau) + '</td></tr>';
  el.innerHTML =
    '<table class="grid"><thead><tr>' +
    '<th scope="col">Taille</th><th scope="col">Largeur × hauteur</th><th scope="col">Profondeur réglable</th>' +
    '<th scope="col">Caisson</th><th scope="col">Panneau mural</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table>';
}

/* -------------------------------------------------------------
   Panier (démonstration — à brancher sur WooCommerce)
   ------------------------------------------------------------- */
let cart = [];

function addToCart(name, price, icon) {
  const ex = cart.find(i => i.name === name);
  if (ex) ex.qty++; else cart.push({ name, price, icon, qty: 1 });
  updateCart();
  notify(name + ' ajouté au panier');
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) { badge.textContent = count; badge.style.display = count ? 'flex' : 'none'; }

  const el = document.getElementById('cartItems');
  const ft = document.getElementById('cartFooter');
  if (!el) return;

  if (!cart.length) {
    el.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
    if (ft) ft.style.display = 'none';
    return;
  }
  el.innerHTML = cart.map(i =>
    '<div class="cart-item">' +
      '<div class="ci-icon">' + i.icon + '</div>' +
      '<div class="ci-body"><div class="ci-name">' + i.name + '</div>' +
      '<div class="ci-price">' + euro(i.price) + ' × ' + i.qty + '</div></div>' +
      '<button class="ci-remove" aria-label="Retirer ' + i.name + '" onclick="removeFromCart(\'' + i.name.replace(/'/g, "\\'") + '\')">×</button>' +
    '</div>'
  ).join('');
  if (ft) {
    ft.style.display = 'block';
    const tt = document.getElementById('cartTotal');
    if (tt) tt.textContent = euro(total);
  }
}

function toggleCart() {
  const d = document.getElementById('cartDrawer');
  const o = document.getElementById('overlay');
  if (!d) { window.location.href = 'index.html#boutique'; return; }
  d.classList.toggle('open');
  if (o) o.classList.toggle('show');
}

function notify(msg) {
  const el = document.getElementById('notif');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2600);
}

function toggleMenu() {
  const n = document.getElementById('mainNav');
  if (n) n.classList.toggle('mobile-open');
}

/* -------------------------------------------------------------
   Init
   ------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  renderGrilleTarifs('grilleTarifs');
  ['fL', 'fH', 'fP'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', renderFinder);
  });
  renderFinder();
  updateCart();
});
