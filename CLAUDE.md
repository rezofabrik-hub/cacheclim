# La Fabrik du Cache Clim — contexte projet

Dépôt du site statique **lafabrikducacheclim.fr**, marque grand public de l'atelier
**Rezo-Fabrik** (SARL, SIREN 953 641 701), Canet-en-Roussillon (66).
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

## 2. Architecture de marque

| | Rôle |
|---|---|
| **rezo-fabrik.fr** | L'atelier : fraisage, impression numérique, enseigne, décoration, pose. B2B et devis. WordPress/Avada. |
| **La Fabrik du Cache Clim** (ce dépôt) | La boutique : un produit, un discours, un parcours d'achat. Grand public. Site statique. |

La séparation est la recommandation centrale de l'audit : un visiteur qui cherche
« cache clim design » ne doit pas atterrir sur une page d'atelier de fraisage.

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
- Les balises canoniques pointent vers `lafabrikducacheclim.fr`. Ce domaine ne résolvait
  vers aucun serveur au 23 août 2026 — à confirmer avant achat.

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
| Ce dépôt (`assets/site.js`, `docs/grille-tarifaire.md`) | 219 → 319 € | dès 349 € |
| Boutique WooCommerce de rezo-fabrik.fr | 230 → 325 € en uni | dès 399 € |

La grille du dépôt est la nouvelle, positionnée sous Kach Klim. Tant que les deux sites
sont en ligne, **un même produit est affiché à deux prix différents**. À trancher avec
Laurent avant toute mise en ligne du domaine.

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

## 6. L'autre site : rezo-fabrik.fr (WordPress / Avada)

Utile quand une info doit être répercutée des deux côtés. Stack : WordPress, thème
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
5. Confirmer la disponibilité du domaine `lafabrikducacheclim.fr`.
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
