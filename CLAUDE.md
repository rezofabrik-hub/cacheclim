# Cache clim — Rezo-Fabrik — contexte projet

Dépôt de rédaction du pôle **cache clim** de **rezo-fabrik.fr**
(SARL Rezo-Fabrik, SIREN 953 641 701), Canet-en-Roussillon (66).
Gérant : Laurent Mienville.

Ce fichier est la mémoire du projet. **Lis-le en entier avant toute intervention.**
Il contient des pièges qui ont déjà coûté des heures.

---

## 1. Identité et NAP (forme canonique — ne jamais varier)

```
Rezo-Fabrik
9 rue de la Close, ZA Las Bigues
66140 Canet-en-Roussillon
07 75 76 92 32
commercial.rezofabrik@gmail.com
https://www.rezo-fabrik.fr
```

- Horaires réels : **lundi-jeudi 9h-12h / 14h-17h, vendredi 9h-12h**, fermé samedi et dimanche.
  L'atelier se visite **sur rendez-vous**.
- Se présente comme **« artisan fabricant »** — formulation retenue, à garder.
- SIRET 953 641 701 00024.
- Réseaux sociaux : TikTok **`@rezo.fabrik`** (et non `@rezofabrik`, qui n'existe pas).
  Les comptes Facebook et Instagram ne sont pas connus : les liens du pied de page
  pointent encore sur la racine du réseau, **à corriger dès que les URL sont fournies**.
- ⚠️ Trois variantes de la zone ont circulé — « ZA », « ZI », « Zone » Las Bigues.
  **« ZA » est la bonne**, le dépôt a été unifié dessus le 13 septembre 2026.

## 2. Une seule marque : Rezo-Fabrik

⚠️ **Arbitrage de Laurent, 13 septembre 2026 — ne pas y revenir.**

Un audit avait recommandé de sortir le cache clim sous une marque distincte,
« La Fabrik du Cache Clim », sur le domaine `lafabrikducacheclim.fr`. **Cette piste est
abandonnée.** Le domaine n'a jamais été acheté, la marque n'existe pas, et ni le nom ni
le domaine ne doivent réapparaître nulle part. Tout est Rezo-Fabrik.

Le dépôt est un **atelier de rédaction, pas un site à déployer**. Le site public est
`rezo-fabrik.fr` sous WordPress/Avada ; le contenu travaillé ici y est ensuite repris
(voir `docs/kit-wordpress.md`).

**15 des 45 pages existent déjà en ligne** et portent leur canonique vers leur URL
WordPress réelle — la correspondance est dans le `README.md`, les slugs ne se devinent
pas (`faq.html` → `/faq-cache-clim/`, `bruit-climatiseur.html` →
`/bruit-climatisation-exterieure/`, `cgv.html` → `/conditions-generales/`…).
Les **30 autres ne sont pas publiées** : pas de canonique, un commentaire HTML indique
l'URL à rétablir le jour de la mise en ligne, et elles sont hors `sitemap.xml`.

**Avant d'ajouter ou de modifier une canonique, vérifier que l'URL répond 200.**
Une canonique vers une 404 est pire que pas de canonique du tout.

## 3. Le dépôt

Site **statique, sans dépendance ni étape de build**. On ouvre le HTML, on édite, c'est tout.

| | |
|---|---|
| ~45 pages HTML à la racine | accueil, tarifs, guide, FAQ, pose, 16 fiches modèle, 11 pages communes, pages légales |
| `assets/site.js` | **Source unique des tarifs** (table `TAILLES`), calculateur de taille, panier |
| `assets/site.css` | feuille de style commune |
| `assets/img/` | photos (voir §5) |
| `check-prix.sh` | vérifie que les prix écrits en dur dans les pages suivent la grille |
| `traiter-photos.py` | redimensionne, convertit en WebP, **retire l'EXIF** |
| `docs/` | audits et plans (voir `README.md`) |
| `robots.txt`, `sitemap.xml` | référencement |

### Changer un prix

Tout est dans la table `TAILLES` de `assets/site.js`, et nulle part ailleurs.
Un seul prix par taille, toutes finitions comprises : le motif ne coûte pas plus cher
que l'uni. Après modification, **lancer `./check-prix.sh`** — il relit les prix écrits
en dur dans les pages et signale les écarts.

### Pièges de ce dépôt

- **Le pied de page est dupliqué dans chaque fichier** (43 copies). Toute info répétée
  — adresse, horaires, téléphone, liens sociaux — se corrige par `sed` sur l'ensemble
  des fichiers, jamais page par page. Ancre fiable : `9 rue de la Close`.
- Un fichier `2,5 kW et +` (sans extension) traîne à la racine : c'est une page HTML
  enregistrée par accident. Elle n'est ni dans le sitemap ni liée. À supprimer après
  confirmation. En attendant, **l'inclure dans les remplacements de masse** pour
  qu'elle ne réintroduise pas de vieilles données.
- Le JSON-LD est présent dans **76 blocs** répartis sur les pages. Après toute
  modification, revalider : `python3` + `json.loads` sur chaque bloc `application/ld+json`.
- Toutes les URL absolues pointent vers `https://www.rezo-fabrik.fr` — **avec `www`**,
  c'est la forme canonique servie par le site. `robots.txt` renvoie vers le sitemap
  Yoast (`sitemap_index.xml`), pas vers le `sitemap.xml` du dépôt.
- Les `og:image` pointent vers un visuel réellement hébergé sur WordPress. Les images du
  dépôt ne sont sur aucun serveur : ne pas les remettre en `og:image` tant qu'elles ne
  sont pas dans la médiathèque. Dimensions déclarées : **960×648**, celles du fichier réel.
  **À faire** : ce visuel est sous les 1200×630 recommandés, les réseaux risquent la
  petite vignette au lieu de la grande carte. Prévoir un visuel de partage par fiche
  modèle, en 1200×630 au minimum.

### Ce qu'on ne peut pas faire depuis un conteneur cloud

Vérifié le 13 septembre 2026 : **le site en ligne n'est modifiable par aucun moyen**
depuis une session cloud.

| Voie | État |
|---|---|
| SSH / WP-CLI | aucune clé, `wp` pas installé |
| API REST WordPress | `POST /wp-json/` → **401** |
| Jetpack / WordPress.com | `rezo-fabrik.fr` absent de la liste des sites ; seul `social-miroir.fr` remonte, en plan gratuit |

Donc : tout changement de prix, de contenu ou de fiche produit fait ici **reste dans le
dépôt** tant que personne ne le reporte dans WordPress. Le dire clairement à Laurent
plutôt que de laisser croire que le site est à jour.

Pour débloquer : approuver la connexion Jetpack (chantier §7), ou fournir un accès SSH.
**Ne jamais s'authentifier à sa place.**

## 4. Règles métier — non négociables

1. **Prix affichés uniquement sur le cache-clim.** Sur la découpe plexi, l'enseigne et
   le marquage de véhicules : tout est sur devis, aucune fourchette. À la place, une
   section « Ce qui fait le prix » qui explique les critères sans un seul chiffre.
2. **Jamais de visuel générique ou de banque d'images** présenté comme son atelier.
   La règle a déjà été enfreinte une fois et il l'a très mal pris. Une photo qui n'est
   pas de lui doit être légendée comme telle.
3. **Jamais de texte repris ailleurs.** Il transmet parfois des textes copiés chez des
   concurrents en demandant de les « modifier » — toujours réécrire intégralement.
4. **Aucun faux avis.** Le bloc d'avis de l'accueil est volontairement vide : publier
   des témoignages inventés est une pratique commerciale trompeuse (art. L121-2 du code
   de la consommation), sanctionnée par la DGCCRF. Le bloc contient le modèle de carte
   à remplir avec de vrais avis.
5. **Pas de balisage `aggregateRating`** des avis Google : contraire aux règles de
   Google, expose à une action manuelle. (Vérifié absent des pages publiées.)
6. **Publier directement**, pas en brouillon — préférence explicite de Laurent.
7. **Pas de doorway pages.** Une page par commune seulement si elle a un angle local
   réel et des réalisations. Il a déjà arbitré : 6 pages enseigne et non 10, 5 ports et non 9.
8. La croix de pharmacie est de la **fourniture et pose**, pas de la fabrication.

### ⚠️ Conflit de grille tarifaire à arbitrer

Deux grilles coexistent et ne disent pas la même chose :

| | Standard | Sur mesure |
|---|---|---|
| Ce dépôt (`assets/site.js`) | 231 → 331 € TTC (5 tailles) | dès 361 € |
| Boutique WooCommerce de rezo-fabrik.fr | 230 → 325 € (4 tailles) | dès 399 € |

Le dépôt a pris **+10 € HT (+12 € TTC) par taille le 13 septembre 2026**, sur demande de
Laurent. La boutique en ligne n'a pas bougé : les pages rédigées ici annoncent donc un
prix que le panier ne pratique pas, et le nombre de tailles diffère aussi (5 contre 4).
**La hausse reste à saisir dans WooCommerce** — elle n'a pas pu être faite d'ici, voir
§3 « Ce qu'on ne peut pas faire depuis un conteneur ».

⚠️ **Les prix du site sont TTC.** Une consigne donnée en HT se convertit avant report :
+10 € HT = +12 € TTC à 20 %. Ne jamais reporter un montant HT tel quel.

⚠️ La grille n'est plus systématiquement sous Kach Klim (229 – 339 €) : en taille S on
est désormais 2 € au-dessus de leur entrée de gamme. `docs/grille-tarifaire.md` décrit
l'ancien positionnement et n'est plus à jour.

## 5. Les photos

- Les 15 visuels produit actuels sont des **rendus 3D, pas des photographies**. Sur un
  produit décoratif, la photo réelle d'une pose est ce qui déclenche l'achat :
  les remplacer dès que possible.
- `assets/img/realisations/` illustre l'atelier — signalétique, mobilier, agencement.
  **Ce ne sont pas des poses de cache clim**, ne pas les présenter comme telles.
- Déposer les nouvelles photos dans `assets/img/_a-traiter/` puis lancer
  `python3 traiter-photos.py`. Le script **retire les données EXIF**, dont les
  coordonnées GPS : publier une photo de chantier sans la nettoyer revient à publier
  l'adresse du client.
- Ses photos arrivent souvent compressées (540-960 px, filigrane « SHOT ON REDMI 7 »).
  Demander les originaux quand la qualité compte.

## 6. Le site en ligne : rezo-fabrik.fr (WordPress / Avada)

C'est là que le contenu de ce dépôt finit par être publié. Stack : WordPress, thème
**Avada** (Fusion Builder + Layout Sections), WooCommerce, Yoast, Stripe live,
Redis Object Cache, Cloudflare devant, PHP 8.3.

**WP-CLI est à privilégier** : il atteint les Layout Sections d'Avada **et** les champs
Yoast, contrairement à l'API REST qui n'expose ni l'un ni l'autre.

```bash
wp @prod post list --post_type=fusion_tb_section --fields=ID,post_title
wp @prod post meta update 5571 _yoast_wpseo_title "…"
wp @prod cache flush && wp @prod transient delete --all
```

Pièges qui ont déjà coûté des heures :

- **Cache CSS compilé** : `wp-content/uploads/fusion-styles/<hash>.min.css`. Si le hash
  existe déjà, Avada réutilise le fichier et **ignore la CSS personnalisée**. Contournement :
  incrémenter `side_header_break_point` de 1 px (valeur actuelle **842**, effet visuel nul).
- `fusion_options[space_head]` contient le **JSON-LD LocalBusiness**.
  `fusion_options[space_body]` contient le **script des pastilles de couleur (~5 Ko)
  — ne pas l'écraser**.
- **En-tête actif** : Layout Section « Custom HOMETEST », post **3762**. Les posts 144 et
  690 ne servent pas. **Pied de page** : post **60**.
- Enregistrer les Theme Options depuis un formulaire chargé avant une modif **écrase**
  cette modif — toujours recharger la page d'options avant d'éditer.
- Formulaire de devis : post **3133**. Les options d'un `[fusion_form_select]` sont du
  **JSON en base64** dans l'attribut `options=`.

**Secrets** : jamais dans ce fichier, jamais dans le dépôt. Clé SSH ou `.env` hors
versionnement. Compte admin utilisé jusqu'ici : `sandra`.

## 7. Chantiers ouverts

1. **Avis Google : 18 → 40.** Sollicitation des anciens clients par SMS. Le plus gros levier.
2. **Répondre aux 17 avis sans réponse.** Surtout : la seule réponse existante, à un avis
   1 étoile d'octobre 2025, est agressive (menace de plainte) et visible de tous les
   prospects. **À traiter en premier.**
3. **URL Facebook et Instagram** à obtenir, puis corriger les 43 pieds de page.
4. Arbitrer le conflit de grille tarifaire (§4).
5. Publier sur WordPress les 30 pages du dépôt qui n'y sont pas encore, puis
   rétablir leur canonique et les rajouter au sitemap.
6. Remplacer les rendus 3D par de vraies photos de pose.
7. Connecter Jetpack et Google Search Console côté rezo-fabrik.fr (en attente de
   validation par Laurent — les connexions OAuth sont à lui).

**Tableau de bord** : base Airtable « Pilotage Rezo-Fabrik » (`appDyqTWvt6IemMr5`),
4 tables — Pages du site, Avis clients, Photos à faire, Chantiers en cours.
**La mettre à jour plutôt que d'accumuler les notes.**

## 8. Concurrents du 66

| | Avis Google | Schéma local | Pages communes |
|---|---|---|---|
| Arc'Enseignes (Perpignan) | 72 — 4,8/5 | `LocalBusiness` + GPS | 0 |
| Alinéa Côté Enseignes (Le Soler) | 28 — 4,7/5 | aucun | 0 |
| Lumiprint (Canet) | 16 — 4,9/5 | aucun | 0 |
| PubliCréa, PANO Perpignan | — | aucun | 0 à 2 |
| Enseignes Richier | — | ancré dans le Vaucluse | 3, hors sitemap |
| Kach Klim (Toulouse) | — | — | référence sur le cache-clim |

Sur les huit concurrents audités : **zéro prix affiché, zéro balisage FAQ, zéro note
agrégée, zéro zone desservie déclarée.** Les pages communes sont la brèche déjà exploitée.
Le domaine `imagin-plast.fr` (Rivesaltes) est mort et laisse vacantes les positions
`enseigne-perpignan`, `signaletique-perpignan`, `panneau-publicitaire-perpignan`.

## 9. Façon de travailler avec Laurent

- **En français.** Toujours.
- Il valide vite et attend de l'initiative sur les détails de mise en forme.
- Il préfère qu'on publie directement plutôt que de laisser en brouillon.
- Ne pas lui reproposer ce qu'il a déjà tranché : prix sur devis hors cache-clim,
  catégorie Google « Magasin d'enseignes » (il a dit « laisse comme ça »), pas de
  doorway pages.
- **Ne jamais s'authentifier à sa place.** Les connexions OAuth (Google, Jetpack,
  Solocal) sont à lui : préparer, expliquer, et le laisser cliquer.
