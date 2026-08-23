# Kit d'application WordPress — rezo-fabrik.fr

Tout ce qui suit se colle directement dans WooCommerce, Yoast et Avada.
Aucune ligne de code obligatoire : les deux seuls snippets proposés sont
optionnels et signalés comme tels.

Ordre d'application recommandé : § 1 → § 2 → § 3, puis le reste.
Les paragraphes 1 et 2 sont ceux qui débloquent les ventes.

---

## 1. Paiement — la journée qui change tout

**Le problème :** PayPal est la seule passerelle installée. Vos CGV promettent
pourtant « carte bancaire, PayPal ou virement ».

**À faire dans WooCommerce → Réglages → Paiements :**

| Étape | Action |
|---|---|
| 1 | Installer l'extension **Stripe** (gratuite, officielle WooCommerce) ou **PayPlug** (français, tarifs souvent meilleurs sous 5 000 €/mois) |
| 2 | Activer **carte bancaire**, **Apple Pay** et **Google Pay** |
| 3 | Laisser PayPal actif, mais **en deuxième position** dans la liste |
| 4 | Ajouter le **paiement en 3× sans frais** (Alma, Oney ou Klarna) — seuil conseillé : dès 200 € |
| 5 | Activer le **virement** pour les professionnels uniquement |
| 6 | Passer une commande test à 1 € avec votre propre carte, puis la rembourser |

**Puis corriger les CGV** (article 4) pour qu'elles décrivent ce qui est
réellement proposé.

---

## 2. Frais de port — les afficher ou les offrir

Aujourd'hui le montant n'apparaît nulle part avant l'écran de paiement. C'est
un frein majeur et un point de conformité : l'article L221-5 du code de la
consommation impose l'affichage des frais de livraison **avant** la commande.

**Option retenue : les intégrer au prix et annoncer « livraison offerte ».**

1. WooCommerce → Réglages → Expédition → zone **France métropolitaine**
2. Ajouter une méthode **Livraison gratuite**, sans montant minimum
3. Créer une seconde zone **Corse / Monaco / Outre-mer** avec un tarif forfaitaire
   ou la mention « nous consulter »
4. Ajouter le bandeau « Livraison offerte en France métropolitaine » en haut de
   toutes les pages (Avada → Options du thème → Barre supérieure)

> Avant de basculer : faites chiffrer le transport réel d'un colis 105 × 95 cm.
> Voir `docs/grille-tarifaire.md`, section « À vérifier avant d'appliquer ».

---

## 3. Nouveaux tarifs

Grille complète et justification dans `docs/grille-tarifaire.md`.

| Taille | Couleur unie | Motif / matière |
|---|---|---|
| Petit (S) | 199 € | 239 € |
| Moyen (M) | 229 € | 269 € |
| Grand (L) | 249 € | 289 € |
| Très grand (XL) | 269 € | 309 € |
| XXL *(à créer)* | 299 € | 339 € |
| Sur mesure | dès 329 € | dès 369 € |

**Comment appliquer vite :** Produits → cocher tout → Actions groupées →
Modifier → champ Prix. Woo permet aussi un pourcentage : `-15%` sur la sélection
« motif » approche la nouvelle grille en une opération, à ajuster ensuite.

Pensez à ajouter la variation **XXL** : c'est la taille qui manque pour les
pompes à chaleur, et c'est le segment le moins concurrencé.

---

## 4. Renommer les 33 produits

« Cache climatisation ZOOM MOTIF » ne correspond à aucune recherche. Personne ne
tape « zoom ». Le nom doit contenir ce que les gens cherchent : *cache clim*,
*extérieur*, et le motif.

**Format :** `Cache clim extérieur motif <Nom> — aluminium, 5 tailles`

| Ancien nom | Nouveau nom | Nouveau slug |
|---|---|---|
| Cache climatisation BAMBOU | Cache clim extérieur Bambou — aluminium, 5 tailles | `cache-clim-exterieur-bambou` |
| Cache climatisation CASSIS | Cache clim extérieur Cassis — aluminium, 5 tailles | `cache-clim-exterieur-cassis` |
| Cache climatisation EDEN | Cache clim extérieur Eden — aluminium, 5 tailles | `cache-clim-exterieur-eden` |
| … | *(même logique pour les 15 designs)* | |
| CARTE CADEAU 1440 / 2880 | **À masquer du catalogue** | — |

> Les deux « cartes cadeaux » à 1 440 € et 2 880 € s'affichent en « Nouveautés »
> dans un panier vide. Passez-les en **privé** ou en catégorie masquée : elles
> font fuir un particulier venu acheter à 250 €.

**Important :** à chaque changement de slug, créez une redirection 301 de
l'ancienne URL vers la nouvelle (extension *Redirection*, gratuite), sinon vous
perdez le peu de référencement acquis.

---

## 5. Descriptions produit — 15 textes uniques

Aujourd'hui les 15 modèles « couleur » partagent **exactement** le même texte de
280 caractères, et les 15 « motif » le même de 432 caractères. Pour Google, ce
sont 30 pages dupliquées : aucune ne peut ranker.

Voici 15 descriptions distinctes, prêtes à coller dans le champ **Description**.
Ajoutez ensuite le bloc technique commun (§ 6) à la suite de chacune.

### Bambou
Des cannes de bambou verticales, serrées, qui donnent au cache un effet
brise-vue naturel. C'est le motif qui fonctionne le mieux quand le cache est vu
de près : sur un balcon, une coursive ou le long d'un passage. Le vert reste
soutenu plusieurs saisons sans virer au jaune. À associer aux terrasses en bois
et aux jardins de ville.

### Cassis
Un dégradé de pourpres profonds, ponctué de baies sombres. Le seul de nos
motifs à assumer une couleur franche : il transforme l'unité extérieure en
élément décoratif plutôt qu'en objet à cacher. Très bon rendu sur un mur clair
ou une façade crépie de blanc.

### Eden
Une végétation tropicale dense — monstera, palmes, fougères — en camaïeu de
verts profonds. Le motif le plus graphique de la gamme. Il fonctionne
particulièrement bien sur les unités posées en angle de terrasse, où il prolonge
visuellement la végétation environnante.

### Feuillage
Un entrelacs de feuilles fines en camaïeu de verts, pensé pour faire disparaître
l'unité dans la végétation plutôt que pour attirer l'œil. C'est notre modèle le
plus vendu auprès des maisons avec jardin clos. Sur une haie de laurier ou un
mur végétalisé, on ne le distingue plus à trois mètres.

### Fleur de lys
Un semis de fleurs de lys stylisées, régulier, dans l'esprit d'un papier peint
classique. Le motif qui s'accorde le mieux aux façades anciennes, aux volets
bois et aux maisons de village. Disponible en tons sourds pour rester discret en
secteur protégé.

### Fleurs
Une composition florale libre, généreuse, en tons clairs. Plus colorée que la
Marguerite, moins graphique que l'Eden. C'est le motif que choisissent les
clients qui veulent que le cache se voie et se remarque, sur une façade sud
plutôt neutre.

### Horizon
Des bandes horizontales dégradées, du sable au bleu profond, qui évoquent une
ligne d'horizon. Un motif abstrait, très sobre de loin, qui se révèle en
approchant. Il s'accorde avec l'architecture contemporaine et les enduits gris.

### Léopard
Une tacheture fauve franche, sur fond sable. Assumé, décoratif, sans demi-mesure.
Choisi le plus souvent pour des terrasses de restaurant ou des extérieurs très
marqués. Ce n'est pas le motif de la discrétion — c'est justement ce qu'on lui
demande.

### Marguerite
Un semis de marguerites blanches sur fond clair, léger et lumineux. Il allège
les façades sud sans les charger, et reste lisible à distance. C'est le motif
que nous conseillons le plus souvent pour une première commande : il plaît
largement et vieillit bien.

### Mosaïque
Un pavage de tesselles irrégulières, en bleus et blancs méditerranéens. Le motif
le plus « Sud » de la gamme, directement inspiré des azulejos qu'on trouve dans
tout le Roussillon. Excellent rendu à côté d'une piscine ou d'une terrasse
carrelée.

### Orient Express
Des entrelacs géométriques inspirés des moucharabiehs, en tracé fin et régulier.
C'est le motif qui rend le mieux sur les murs blancs du Sud : le contraste fait
ressortir le dessin sans l'alourdir. Un classique qui ne se démode pas.

### Trèfle
Un semis de trèfles à quatre feuilles, régulier et discret, en vert doux. Le
plus sobre de nos motifs végétaux : de loin il se lit comme un aplat texturé, de
près le dessin apparaît. Bon compromis quand on hésite entre couleur unie et
motif franc.

### Vue sur mer
Un dégradé d'horizon méditerranéen, du turquoise au bleu profond. Nous le
dessinons à Canet-en-Roussillon, à huit cents mètres de la plage — ça compte
pour le réglage des bleus. Le motif préféré des résidences secondaires du
littoral.

### Zèbre
Des rayures noires et blanches irrégulières, à l'échelle du cache. Très
graphique, très contrasté : il fonctionne sur les façades contemporaines
minimalistes où le cache devient un élément de composition assumé plutôt qu'un
objet à masquer.

### Zoom
Un motif optique concentrique, qui joue sur la profondeur. Le plus abstrait de
la gamme, et le plus surprenant en vrai : selon l'angle et la lumière, le
dessin semble bouger. À réserver aux murs dégagés, où on peut le voir de face.

---

## 6. Bloc technique à ajouter sous chaque description

Copiez ce bloc à la suite de chaque texte ci-dessus. Il répond aux questions qui
font abandonner un panier.

```
**Matériau** — Aluminium composite : deux feuilles d'aluminium sur âme
polyéthylène. Ne rouille pas, ne se déforme pas, stable de −50 °C à +90 °C.
Impression numérique sur adhésif contrecollé, résistante aux UV (environ 5 ans
selon l'exposition).

**Tailles** — 5 tailles standard, de 85 × 65 cm à 105 × 95 cm, profondeur
réglable. Sur mesure possible jusqu'à 110 × 120 × 65 cm.
→ Quelle taille pour ma clim ? [lien vers le guide des tailles]

**Compatibilité** — Toutes marques : Daikin, Mitsubishi, Atlantic, Toshiba, LG,
Samsung, Hitachi, Panasonic. Le cache se pose par-dessus l'unité, sans
intervention sur le circuit frigorifique : la garantie constructeur de votre
climatiseur n'est pas affectée.

**Aération** — 5 cm de jeu en largeur et hauteur, 3 cm en profondeur, face avant
ajourée. Votre unité évacue sa chaleur normalement.

**Pose** — Fixations murales, visserie et notice illustrée incluses. 20 à 30
minutes à deux. Option pied au sol (+30 €) si vous ne pouvez pas percer.

**Livraison** — Offerte en France métropolitaine. 48–72 h pour les couleurs
unies, 7 à 10 jours ouvrés pour les motifs et le sur mesure.

**Retour & garantie** — 14 jours pour changer d'avis sur un modèle standard.
Garantie légale de conformité de 2 ans. Le sur mesure, fabriqué à vos cotes,
n'est pas repris.
```

Remplissez aussi le champ **Description courte** (vide sur les 33 produits) :
une phrase, celle qui apparaît à côté du prix. Reprenez la première phrase de la
description longue.

---

## 7. SEO — titres et méta-descriptions

À saisir dans l'onglet Yoast, en bas de chaque page.

| Page | Titre SEO | Méta-description |
|---|---|---|
| Accueil | `Cache clim extérieur design, fabriqué en France — dès 199 €` | `Cache climatiseur et pompe à chaleur en aluminium composite, fabriqué à Canet-en-Roussillon. 15 designs, 6 coloris RAL, 5 tailles et sur mesure. Livraison offerte, dès 199 €.` |
| Boutique | `Cache clim extérieur : 15 designs et 6 coloris — La Fabrik` | `Tous nos caches climatiseur en aluminium composite : couleurs unies dès 199 €, motifs décoratifs dès 239 €, sur mesure dès 329 €. Livraison offerte en France.` |
| Cache clim | `Cache climatisation extérieur en aluminium — Rezo-Fabrik` | `Habillez votre unité extérieure sans gêner la ventilation. Aluminium composite, 5 tailles, pose en 20 minutes, fabrication française.` |
| Sur mesure | `Cache clim sur mesure à vos dimensions — dès 329 €` | `Votre cache climatiseur fabriqué à vos cotes exactes, jusqu'à 110 × 120 cm. Coloris, motif ou votre propre visuel imprimé. Devis sous 24 h, livré en 7 à 10 jours.` |
| Devis | `Demande de devis cache clim sur mesure` | `Envoyez-nous vos dimensions et une photo de votre climatiseur : nous établissons votre devis sous 24 h ouvrées. Fabrication française, livraison offerte.` |
| Fiche produit | `Cache clim extérieur <Motif> — aluminium, 5 tailles` | `<Première phrase de la description>. Livraison offerte, pose en 20 min, dès 239 €.` |

**À corriger en priorité :** la page d'accueil porte aujourd'hui deux
méta-descriptions, dont celle de la démo Avada, en anglais
(« Discover the ultimate handyman prebuilt website… »). Supprimez-la dans
Avada → Options du thème → SEO, et laissez Yoast gérer seul.

---

## 8. Corrections rapides

| Où | Quoi | Comment |
|---|---|---|
| Page `/cache-clim/` | Le texte de brouillon « Compatible avec toutes les marques **etc…** » est en ligne | Remplacer par la liste réelle des marques |
| Page `/devis/` | « nous vous proposons **ne vous envoyé** un devis », « dans les plus **bref** délais » | Réécrire : « nous vous envoyons un devis sur mesure », « dans les plus brefs délais » |
| Page `/devis/` | Six champs demandent la même chose (Modèle, Couleur ou Motif, Motif, Couleur, Design, Couleur & Motif) | Réduire à : dimensions, photo, finition, coordonnées |
| Toutes les pages | Le nom du compte auteur et l'horodatage s'affichent (« Accueil xavier tixador 2025-11-10T… ») | Avada → Options du thème → Blog → masquer auteur et date |
| Boutique | « Ce produit a plusieurs variations… » répété sur chaque vignette | Avada → Options du thème → WooCommerce → désactiver la mention, ou la remplacer par un bouton « Voir » |
| `/shop/` | Doublon de `/boutique/` | Redirection 301 `/shop/` → `/boutique/` |
| Sitemap | `/checkout/`, `/cart/`, `/my-account/` sont indexables | Yoast → Réglages → Types de publication → exclure ces pages |
| Slug | `/politique-de-deconfidentialite/` (faute de frappe) | Corriger en `/politique-de-confidentialite/` + redirection 301 |

---

## 9. Mesure

| Outil | État actuel | À faire |
|---|---|---|
| Google Ads | `AW-11198441612` présent | Vérifier que la conversion « achat » est bien reliée |
| Google Analytics 4 | Aucun identifiant `G-` en clair (passe peut-être par le conteneur `GT-5D9665B4`) | Ouvrir GA4 → Temps réel, passer une commande test, vérifier que `purchase` remonte |
| Pixel Meta | Absent | À poser — sans lui, aucun reciblage possible depuis Facebook / Instagram |
| Microsoft Clarity | Absent | À poser. Gratuit, enregistre les sessions : en une semaine vous verrez où les gens abandonnent |

---

## 10. Performance

Le serveur répond en 1,53 s et aucun cache de page n'est actif
(`cf-cache-status: DYNAMIC`), alors que Cloudflare est déjà devant le site.

1. Installer **WP Rocket** (payant, le plus simple) ou **LiteSpeed Cache**
   (gratuit, si l'hébergeur est en LiteSpeed)
2. Activer la conversion **WebP** des images — une miniature de 200 px pèse
   aujourd'hui 55 Ko au lieu de 8
3. Activer le chargement différé (`lazy loading`) des images
4. Dans Cloudflare, activer la mise en cache des pages HTML pour les visiteurs
   non connectés

---

## 11. Deux snippets optionnels

À placer via l'extension **WPCode**, jamais directement dans `functions.php` du
thème (une mise à jour d'Avada effacerait la modification).

**Afficher le délai de livraison sous le bouton d'ajout au panier :**

```php
add_action( 'woocommerce_after_add_to_cart_button', function () {
    echo '<p class="delai-livraison">Livraison offerte · expédition sous 7 à 10 jours ouvrés</p>';
} );
```

**Retirer les cartes cadeaux des produits mis en avant dans le panier vide :**
plus simple à faire sans code — passez les deux produits en visibilité
« Privé » depuis la liste des produits.

---

## Récapitulatif — dans quel ordre

| Priorité | Action | Effet attendu |
|---|---|---|
| 1 | Paiement par carte (§ 1) | Débloque la possibilité même d'acheter |
| 2 | Frais de port affichés ou offerts (§ 2) | Supprime l'abandon au moment de payer |
| 3 | Guide des tailles | Supprime la peur de se tromper |
| 4 | Nouveaux tarifs (§ 3) | Aligne sur la concurrence |
| 5 | Corrections rapides (§ 8) | Rend le site crédible |
| 6 | Titres et méta (§ 7) | Rend le site trouvable |
| 7 | Descriptions uniques (§ 5) | Permet aux fiches de ranker |
| 8 | Photos en situation | Fait vendre un produit décoratif |
| 9 | Avis clients | Rassure |
| 10 | Performance (§ 10) | Améliore le taux de conversion mobile |
