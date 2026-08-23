# Audit e-commerce — www.rezo-fabrik.fr

**Date :** 23 août 2026
**Périmètre :** boutique en ligne (WordPress 7.1 / WooCommerce 10.3.8 / thème Avada)
**Constat de départ :** 1 vente en ligne sur 12 mois

---

## Diagnostic en une phrase

La boutique est techniquement fonctionnelle (33 produits, tunnel de commande opérationnel,
mentions légales à jour). Le problème n'est pas WordPress : un visiteur qui arrive sur une
fiche produit n'a **ni le moyen de payer comme il en a l'habitude, ni une raison de faire
confiance, ni l'information nécessaire pour choisir sa taille**.

| Indicateur | État |
|---|---|
| Moyens de paiement | PayPal uniquement |
| Avis clients | 0 sur 33 fiches |
| Guide des tailles | Aucun |
| Frais de port | Jamais affichés avant le paiement |

---

## 1. Blocages, classés par impact

### 1.1 — CRITIQUE · Pas de paiement par carte bancaire

Seule passerelle installée : `woocommerce-paypal-payments`. Aucune trace de Stripe, PayPlug,
Mollie ou SystemPay dans le tunnel.

Les CGV (article 4) annoncent pourtant « Paiement par carte bancaire, PayPal ou virement ».
Incohérence entre les conditions de vente et la réalité du site.

**Correction :** installer Stripe ou PayPlug (CB + Apple Pay + Google Pay), garder PayPal en
second choix, ajouter le paiement en 3× / 4× (le concurrent principal le propose via Oney).

### 1.2 — CRITIQUE · Aucune preuve sociale

API Store WooCommerce : les 33 produits renvoient `review_count: 0` et `average_rating: 0`.
Aucun balisage `aggregateRating`, aucune photo client, aucune réalisation en situation.

Référence marché : Kach Klim affiche « 4,8/5 sur plus de 1 900 avis » dès la page d'accueil.

**Correction :** recontacter les clients de l'activité atelier (20 ans d'activité, chantiers
photographiés). Objectif 20–30 avis + 15 photos avant/après avant la prochaine saison.

### 1.3 — CRITIQUE · Le client ne sait pas quelle taille commander

La fiche produit propose `Petit (L90, H70, P55)` / `Moyen` / `Grand` / `Très Grand` sans
schéma, sans explication de ce qu'il faut mesurer, sans correspondance par marque de
climatiseur.

La page `/cache-clim/` contient toujours le texte de brouillon :
`« Compatible avec toutes les marques etc… »`

**Correction :** schéma coté, mini-configurateur « mes dimensions → ma taille », tableau de
compatibilité (Daikin, Mitsubishi, Atlantic, Toshiba…).

### 1.4 — CRITIQUE · Frais de port invisibles

Les fiches indiquent « Livraison entre 7 et 10 jours » sans montant. Les CGV précisent
« prix TTC, hors frais de livraison » et renvoient au site, où l'information n'existe pas.

Enjeu de conformité : l'article L221-5 du code de la consommation impose l'affichage des
frais de livraison avant la commande.

**Correction :** afficher le montant sur chaque fiche, ou intégrer le port au prix et
annoncer « Livraison offerte » (ce que font Kach Klim et Mon Cache Clim).

### 1.5 — MAJEUR · Quasi-invisibilité sur Google

- `<title>` de l'accueil : `Accueil - REZO-FABRIK`
- Deux méta-descriptions, dont celle de la démo Avada, en anglais :
  `"Discover the ultimate handyman prebuilt website with Avada Website Builder…"`
- Fiches produit : **aucune balise `H1`**
- Descriptions produit **strictement identiques** : 280 caractères recopiés sur les
  15 modèles « couleur », 432 caractères sur les 15 modèles « motif »
- `/boutique/` et `/shop/` répondent tous deux en 200 → contenu dupliqué
- `/checkout/`, `/cart/` et `/my-account/` sont déclarés dans le sitemap
- Aucun article de blog (pas de `post-sitemap` peuplé)
- Noms de produits non recherchés : « ZOOM MOTIF », « ZEBRE », « CASSIS »

**Correction :** titres et descriptions orientés requêtes réelles (« cache clim extérieur
design », « cache pompe à chaleur aluminium »), un texte unique par modèle, redirection
`/shop/` → `/boutique/`, exclusion des pages transactionnelles du sitemap.

### 1.6 — MAJEUR · Fiches produit pauvres

- 1 seule image par produit
- Description courte vide sur les 33 produits
- Aucune image en WebP, aucun `loading="lazy"`
- Une miniature 200 px pèse 55 Ko (cible : ~8 Ko)
- Alt d'images majoritairement vides (5 vides / 2 remplis sur la page testée)

**Correction :** 5 à 8 visuels par modèle (façade, balcon, gros plan matière, échelle
humaine), une vidéo de pose de 20 s, et sur chaque fiche les 4 réponses manquantes :
coût de livraison, délai, mode de fixation, que faire si la taille ne convient pas.

### 1.7 — MAJEUR · Formulaire de devis redondant

Champs relevés sur `/devis/` : `modele`, `couleur_ou_motif`, `motif`, `couleur` — puis
« Design » (15 choix) et « Couleur & Motif » (11 choix) qui redemandent la même chose.
La même information est saisie jusqu'à trois fois.

Fautes dans le texte d'introduction : « nous vous proposons **ne vous envoyé** un devis »,
« dans les plus **bref** délais ».

**Correction :** réduire à quatre blocs — dimensions, photo de la clim, finition, coordonnées.

### 1.8 — MAJEUR · Détails qui abîment la crédibilité

- Nom du compte auteur + horodatage affichés sur les pages publiques :
  `« Accueil xavier tixador 2025-11-10T08:51:28+01:00 »`,
  `« Panier trotroyanas 2025-05-19T14:49:38+01:00 »`
- Panier vide → mise en avant « Nouveautés : CARTE CADEAU 2880 — 2 880,00 € »
- Répétition sur chaque vignette : « Ce produit a plusieurs variations. Les options peuvent
  être choisies sur la page du produit »

### 1.9 — MAJEUR · Mesure incomplète

Détecté : `AW-11198441612` (Google Ads), `GT-5D9665B4` (Google Tag).
Absents du code source : identifiant GA4 `G-` en clair (peut transiter par le conteneur
Google Tag — **à vérifier**), pixel Meta, Clarity, Hotjar.

Conséquence : impossible de savoir si le problème vient du trafic ou de la conversion, et
aucun reciblage possible malgré la présence sur Facebook, Instagram et TikTok.

**Correction :** vérifier la remontée des événements `add_to_cart` et `purchase` dans GA4,
poser le pixel Meta et Microsoft Clarity (gratuit, enregistrement de sessions).

### 1.10 — MAJEUR · Performance

- Temps de réponse serveur mesuré : **1,53 s**
- `cf-cache-status: DYNAMIC` → aucun cache de page actif (Cloudflare est devant le site mais
  ne sert à rien en l'état)
- Page produit : 24 fichiers JavaScript, 206 Ko de HTML

**Correction :** plugin de cache (WP Rocket ou LiteSpeed selon l'hébergeur), conversion des
images en WebP, activation du cache Cloudflare.

---

## 2. Comparatif concurrentiel

| Site | Prix | Avis | Guide des tailles | Livraison | Paiement |
|---|---|---|---|---|---|
| **Rezo-Fabrik** | 230 – 399 € | Aucun | Aucun | Prix non affiché · 7-10 j | PayPal seul |
| Kach Klim | 229 – 339 € | 4,8/5 · 1 900 avis | Configurateur | Offerte · 72 h | CB, PayPal, 3× et 4× |
| Mon Cache Clim | dès 179 € | Avis vérifiés en accueil | Outil de sélection | Offerte | — |
| Belle Clim, Devaux | Variable | Présents | Oui | — | — |

**Lecture :** la gamme motif (299–399 €) est plus chère que Kach Klim (229–339 €), sans avis,
sans guide de taille, avec des frais de port inconnus et un seul moyen de paiement. À produit
équivalent, il n'existe aucune raison rationnelle de choisir Rezo-Fabrik — et rien sur le site
ne signale l'avantage réel : la fabrication en propre à Canet-en-Roussillon, le sur-mesure,
l'impression numérique et la pose.

---

## 3. Plan d'action

### Semaine 1 — déblocage
- [ ] Installer Stripe ou PayPlug (CB, Apple Pay, Google Pay)
- [ ] Afficher les frais de port sur chaque fiche, ou les intégrer au prix
- [ ] Réécrire `<title>` et méta-description de l'accueil ; supprimer la description de démo Avada
- [ ] Masquer nom d'auteur et date sur les pages publiques (réglage Avada)
- [ ] Corriger « Compatible avec toutes les marques etc… » et les fautes de `/devis/`
- [ ] Installer Microsoft Clarity ; vérifier la remontée des achats dans GA4

### Semaines 2 à 4 — confiance
- [ ] Guide de mesure illustré + tableau de compatibilité par marque
- [ ] Collecter 20–30 avis clients et les afficher sur les fiches
- [ ] Photographier 10 réalisations en situation
- [ ] Ajouter sur chaque fiche : délai, coût de livraison, fixation, garantie 2 ans, rétractation 14 j
- [ ] Simplifier le formulaire de devis à quatre blocs
- [ ] Activer un cache de page + conversion WebP

### Mois 2 à 3 — acquisition
- [ ] Réécrire et renommer les 30 fiches produit (texte unique, nom recherché)
- [ ] Rediriger `/shop/` → `/boutique/` ; retirer panier/compte/commande du sitemap
- [ ] Publier 6 à 10 articles : « quelle taille de cache clim choisir », « cache clim et
      copropriété », « cache clim pour Daikin / Mitsubishi / Atlantic », « faut-il un cache
      pour une pompe à chaleur »
- [ ] Poser le pixel Meta et lancer le reciblage Instagram / Facebook
- [ ] Mettre en place le paiement en 3× / 4×
- [ ] Ouvrir une offre revendeurs : climaticiens, paysagistes, hôtellerie, syndics

---

## 4. Faut-il quitter WordPress ?

Non. Aucun point de ce rapport ne nécessite un changement de plateforme : tout se règle avec
des extensions, du contenu et des photos. Une refonte sur Shopify coûterait plusieurs milliers
d'euros et laisserait le même problème — un site sans avis, sans guide de taille et sans
paiement par carte.

Le seul élément à remettre en question à terme est le **thème Avada** : lourd, difficile à
optimiser, et responsable de l'affichage des noms d'auteur. Chantier de mois 4, pas de semaine 1.

## 5. Question de fond

Un visiteur cherchant « cache clim design » atterrit aujourd'hui sur le site d'un atelier de
fraisage et d'impression numérique, où la boutique est un onglet parmi d'autres. Les concurrents
ont des sites entièrement dédiés au produit.

Une marque dédiée au cache-clim — nom propre, site propre, avis, configurateur — adossée à
l'atelier Rezo-Fabrik qui fabrique, est probablement la bonne structure à douze mois. Le dépôt
contient déjà une maquette allant dans ce sens (`index.html`, « La Fabrik du Cache Clim »).

Mais la priorité reste la semaine 1 : un moyen de paiement, un prix de livraison et un guide
de taille valent plus que n'importe quelle refonte.

---

### Méthode

Relevés effectués le 23 août 2026 sur le site en production : en-têtes HTTP, code source des
pages (accueil, boutique, fiche produit, panier, devis, CGV), API WooCommerce Store
(`/wp-json/wc/store/v1/products`), sitemaps Yoast, mesure des temps de réponse et du poids des
images. Comparatifs relevés sur kachklim.fr, moncache-clim.fr, belleclim.fr et devaux-sa.com.
