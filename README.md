# Cache clim — Rezo-Fabrik

> Pages cache-clim de **rezo-fabrik.fr**, atelier Rezo-Fabrik, Canet-en-Roussillon (66).

Contenu du pôle cache pour climatiseur et pompe à chaleur : gamme, tarifs, guide de
mesure, FAQ, pose, pages communes et fiches modèle.

## Ce dépôt et le site en ligne

Le dépôt est un **atelier de rédaction**, pas un site à déployer. Le site public est
`rezo-fabrik.fr`, sous WordPress : le contenu travaillé ici part ensuite dans WordPress
(voir [`docs/kit-wordpress.md`](docs/kit-wordpress.md)).

Une piste de marque distincte, `lafabrikducacheclim.fr`, a été explorée puis
**abandonnée** : tout est rattaché à Rezo-Fabrik. Le domaine n'a jamais été acheté et
ne doit plus apparaître nulle part.

Sur les 45 pages du dépôt, **15 existent déjà en ligne** et portent leur balise
canonique vers leur URL WordPress réelle. Les **30 autres ne sont pas encore publiées** :
leur canonique est remplacée par un commentaire qui indique l'URL à rétablir le jour de
la mise en ligne, et elles sont absentes de `sitemap.xml` — un sitemap qui annonce des
404 fait plus de mal que de bien.

| Fichier du dépôt | URL en ligne |
|---|---|
| `index.html` | `/cache-clim/` |
| `faq.html` | `/faq-cache-clim/` |
| `urbanisme.html` | `/cache-clim-urbanisme/` |
| `bruit-climatiseur.html` | `/bruit-climatisation-exterieure/` |
| `pros.html` | `/cache-clim-installateurs/` |
| `cgv.html` | `/conditions-generales/` |
| `mentions-legales.html` | `/mentions-legales/` |
| `confidentialite.html` | `/politique-de-deconfidentialite/` |
| `cache-clim-argeles-sur-mer.html` | `/cache-clim-argeles/` |
| `cache-clim-canet-en-roussillon.html` | `/cache-clim-canet/` |
| `cache-clim-{ceret,narbonne,perpignan,prades,thuir}.html` | même slug |

Le site en ligne a par ailleurs 8 pages cache-clim que le dépôt ne contient pas :
`aeration-cache-clim`, `cache-clim-copropriete`, `cache-pompe-a-chaleur`,
`cache-clim-cabestany`, `cache-clim-elne`, `cache-clim-rivesaltes`,
`conseils-cache-clim`, `boutique-cache-clim-sur-mesure`.

## Le site

Statique, sans dépendance ni étape de build. Quatre pages :

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : calculateur de taille, gamme, grille tarifaire, configurateur sur mesure, designs, pro |
| `guide-tailles.html` | Guide de mesure, schéma coté, compatibilité par marque, tarifs |
| `faq.html` | 17 questions : pose, aération, livraison, copropriété, retours, garantie |
| `pose.html` | La pose dans le 66 : forfait tout compris, zone d'intervention, devis sur photo |
| `cache-clim-perpignan.html` | Page locale — modèle pour les autres communes du département |
| `pros.html` | Revendeurs et professionnels : remises par volume, kit revendeur |
| `assets/site.css` | Feuille de style commune |
| `assets/site.js` | **Source unique des tarifs**, calculateur de taille, panier |
| `assets/img/` | Photos du site (voir ci-dessous) |
| `robots.txt`, `sitemap.xml` | Référencement |

### Les photos

Récupérées depuis rezo-fabrik.fr le 23 août 2026, puis redimensionnées et
converties en WebP (17 Mo → 3,8 Mo, soit −78 %).

| Dossier | Contenu |
|---|---|
| `assets/img/produits/` | Les 15 designs **en version unie** + le sur mesure. Chaque visuel montre le panneau ajouré et les 6 coloris RAL. Deux largeurs WebP (900 et 450 px) + un repli JPEG. |
| `assets/img/realisations/` | 8 travaux de l'atelier — signalétique urbaine, mobilier, agencement. Ils illustrent la section « L'atelier », **pas** des poses de cache clim. |
| `assets/img/hero-cache-clim.*` | Photo d'une pose réelle : modèle ajouré anthracite sur une unité Mitsubishi. Sert d'image héros et d'aperçu de partage. |

Les visuels de la gamme « motif / matière » ont été écartés : seuls les
modèles unis sont présentés.

### Ajouter vos propres photos

Les quinze visuels produit actuels sont des **rendus 3D**, pas des photographies.
Sur un produit décoratif, la photo réelle d'une pose est ce qui déclenche l'achat :
remplacez-les dès que possible.

1. Déposez vos photos dans `assets/img/_a-traiter/` — sous-dossier `poses/`,
   `atelier/` ou `produits/` selon ce qu'elles montrent
2. Lancez `python3 traiter-photos.py`

Le script redimensionne, convertit en WebP, produit un repli JPEG et **retire les
données EXIF**, dont les coordonnées GPS que votre téléphone inscrit dans chaque
photo — publier une photo de chantier sans la nettoyer revient à publier l'adresse
de votre client. Les consignes de prise de vue sont dans
[`assets/img/_a-traiter/LISEZ-MOI.md`](assets/img/_a-traiter/LISEZ-MOI.md).

### Changer un prix

Tous les tarifs sont définis dans la table `TAILLES` de `assets/site.js`, et
nulle part ailleurs. La grille retenue est **un seul prix par taille** : de 231 à
331 € TTC, sur mesure dès 361 €. Les prix affichés sont TTC (CGV : « toutes taxes
comprises ») — une hausse exprimée en HT doit donc être multipliée par 1,20 avant
d'être reportée ici. Les 16 designs et les 7 finitions sont au même
tarif — le motif ne coûte pas plus cher que l'uni. Après modification :

```bash
./check-prix.sh
```

Le script vérifie que les prix écrits en dur dans les pages correspondent
toujours à la grille.

### Domaine

Tout pointe vers `https://www.rezo-fabrik.fr` (avec `www`, c'est la forme canonique).
`sitemap.xml` ne liste que les 15 pages réellement en ligne ; `robots.txt` renvoie vers
le sitemap Yoast du site, `sitemap_index.xml`.

## Documentation

| Document | Contenu |
|---|---|
| [`docs/audit-boutique-2026-08.md`](docs/audit-boutique-2026-08.md) | Audit de la boutique WooCommerce : 10 blocages classés par impact |
| [`docs/battre-kachklim.md`](docs/battre-kachklim.md) | Analyse technique du concurrent principal et plan en trois vagues |
| [`docs/grille-tarifaire.md`](docs/grille-tarifaire.md) | Nouvelle grille alignée sur la concurrence, et ce qu'il faut vérifier avant de l'appliquer |
| [`docs/plan-local-66.md`](docs/plan-local-66.md) | Devenir le cache clim des Pyrénées-Orientales : fiche Google, installateurs, pose, référencement local, tourisme |
| [`docs/kit-wordpress.md`](docs/kit-wordpress.md) | Tout ce qui se colle directement dans rezo-fabrik.fr : paiement, tarifs, 15 descriptions produit, titres SEO, corrections |

## Avis clients

Le bloc d'avis de la page d'accueil est **volontairement vide**. Les faux
témoignages présents dans la version précédente ont été retirés : publier des
avis inventés est une pratique commerciale trompeuse (art. L121-2 du code de la
consommation), sanctionnée par la DGCCRF. Le bloc contient le modèle de carte à
remplir avec de vrais avis.
