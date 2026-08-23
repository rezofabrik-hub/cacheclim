# La Fabrik du Cache Clim

> `lafabrikducacheclim.fr` — marque grand public de l'atelier Rezo-Fabrik.

Site de la marque dédiée aux caches pour climatiseur et pompe à chaleur, adossée
à l'atelier **Rezo-Fabrik** (Canet-en-Roussillon, 66).

## Architecture de marque

| | Rôle |
|---|---|
| **rezo-fabrik.fr** | L'atelier : fraisage, impression numérique, décoration, installation. Cible B2B et projets sur devis. |
| **La Fabrik du Cache Clim** | La boutique : un seul produit, un seul discours, un seul parcours d'achat. Cible grand public. |

Le site actuel mélange les deux, ce qui fait qu'un visiteur cherchant « cache
clim design » atterrit sur une page d'atelier de fraisage. La séparation est la
recommandation centrale de l'audit.

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

### Changer un prix

Tous les tarifs sont définis dans la table `TAILLES` de `assets/site.js`, et
nulle part ailleurs. La grille retenue est **un seul prix par taille** — couleur
unie, motif imprimé et finition matière au même tarif, de 219 € à 319 €, sur
mesure dès 349 €. Après modification :

```bash
./check-prix.sh
```

Le script vérifie que les prix écrits en dur dans les pages correspondent
toujours à la grille.

### Domaine

Les balises canoniques pointent vers `lafabrikducacheclim.fr`. Ce domaine ne
résout vers aucun serveur au 23 août 2026 — à confirmer auprès d'un bureau
d'enregistrement avant achat. Pour un autre nom, remplacer l'URL dans les quatre
pages, `sitemap.xml` et `robots.txt`.

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
