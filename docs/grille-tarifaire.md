# Grille tarifaire — alignement concurrentiel

**Décidé le 23 août 2026.** Remplace la grille précédente (couleur 230–325 €,
motif 299–399 €, sur mesure 399–499 €).

## Nouvelle grille (TTC, livraison incluse)

| Taille | Cache L × H | Profondeur réglable | Couleur unie | Motif / matière |
|---|---|---|---|---|
| S | 85 × 65 cm | 45 – 55 cm | **199 €** | **239 €** |
| M | 93 × 73 cm | 50 – 60 cm | **229 €** | **269 €** |
| L | 95 × 83 cm | 53 – 63 cm | **249 €** | **289 €** |
| XL | 102 × 79 cm | 54 – 64 cm | **269 €** | **309 €** |
| XXL | 105 × 95 cm | 60 – 70 cm | **299 €** | **339 €** |
| Sur mesure | jusqu'à 110 × 120 cm | jusqu'à 65 cm | **dès 329 €** | **dès 369 €** |

Option pied au sol : +30 €. Livraison France métropolitaine offerte, incluse dans ces prix.

> Source unique : `assets/site.js`, table `TAILLES`. Modifier là et nulle part
> ailleurs, puis lancer `./check-prix.sh` pour vérifier que les pages suivent.

## Positionnement face à Kach Klim

| Taille | Kach Klim | Nous, couleur unie | Nous, motif |
|---|---|---|---|
| S | 229 € | 199 € (**−30 €**) | 239 € (+10 €) |
| M | 269 € | 229 € (**−40 €**) | 269 € (=) |
| L | 299 € | 249 € (**−50 €**) | 289 € (−10 €) |
| XL | 299 € | 269 € (**−30 €**) | 309 € (+10 €) |
| XXL | 339 € | 299 € (**−40 €**) | 339 € (=) |
| Sur mesure | dès 369 € | dès 329 € (**−40 €**) | dès 369 € (=) |

**La logique.** On attaque par le bas avec la couleur unie, nettement moins chère,
pour donner une raison rationnelle de nous choisir malgré l'absence d'avis. On
s'aligne au centime près sur la gamme motif, où la comparaison se fait sur le
design et non sur le prix. Le sur mesure — notre vrai différenciateur, puisque
nous fabriquons nous-mêmes — reste au niveau du marché.

## Écart avec l'ancienne grille

| | Avant | Après | Écart |
|---|---|---|---|
| Couleur unie, entrée | 230 € | 199 € | −13 % |
| Couleur unie, haut | 325 € | 299 € | −8 % |
| Motif, entrée | 299 € | 239 € | −20 % |
| Motif, haut | 399 € | 339 € | −15 % |
| Sur mesure, entrée | 399 € | 329 € | −18 % |

## ⚠️ À vérifier avant d'appliquer

Ces prix sont un **positionnement commercial**, pas un calcul de marge : je n'ai
pas vos coûts. Trois points à contrôler avant de basculer.

1. **Le coût de revient d'un cache S.** À 199 € TTC, il vous reste 165,83 € HT.
   Matière, découpe, temps machine, emballage : si le revient dépasse 100 € HT,
   la marge devient trop mince pour financer la publicité.
2. **Le coût réel du transport.** « Livraison offerte » veut dire que vous
   l'absorbez. Un cache de 105 × 95 cm est un colis hors normes chez la plupart
   des transporteurs. Faites chiffrer le tarif réel : s'il dépasse 25 € par
   colis, remontez toute la grille de ce montant plutôt que de rogner la marge.
3. **Le seuil du 3× sans frais.** Les frais du prestataire (Alma, Oney,
   Klarna) tournent autour de 2 à 4 % du panier. À intégrer dans le prix, pas
   à découvrir après.

Si un de ces trois points ne passe pas, **remontez la grille plutôt que de
renoncer à l'alignement** : mieux vaut 219 € affiché honnêtement que 199 € qui
vous fait perdre de l'argent à chaque vente.

## Ce qui compte plus que le prix

L'audit du 23 août l'a montré : vous n'avez pas fait une seule vente parce que
le paiement par carte était absent, pas parce que vous étiez 30 € trop cher.
La baisse de prix est utile, mais elle arrive **en troisième position** derrière :

1. le paiement par carte bancaire,
2. les frais de port affichés (ou offerts),
3. le guide des tailles.

Appliquer la nouvelle grille sans corriger ces trois points reviendrait à vendre
zéro cache, un peu moins cher.
