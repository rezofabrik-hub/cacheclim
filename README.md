# La Fabrik du Cache Clim

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
| `pros.html` | Revendeurs et professionnels : remises par volume, kit revendeur |
| `assets/site.css` | Feuille de style commune |
| `assets/site.js` | **Source unique des tarifs**, calculateur de taille, panier |
| `robots.txt`, `sitemap.xml` | Référencement |

### Changer un prix

Tous les tarifs sont définis dans la table `TAILLES` de `assets/site.js`, et
nulle part ailleurs. Après modification :

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
| [`docs/kit-wordpress.md`](docs/kit-wordpress.md) | Tout ce qui se colle directement dans rezo-fabrik.fr : paiement, tarifs, 15 descriptions produit, titres SEO, corrections |

## Avis clients

Le bloc d'avis de la page d'accueil est **volontairement vide**. Les faux
témoignages présents dans la version précédente ont été retirés : publier des
avis inventés est une pratique commerciale trompeuse (art. L121-2 du code de la
consommation), sanctionnée par la DGCCRF. Le bloc contient le modèle de carte à
remplir avec de vrais avis.
