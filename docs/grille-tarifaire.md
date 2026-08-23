# Grille tarifaire — un seul prix par taille

**Décidée le 23 août 2026.** Remplace la grille précédente (couleur 230–325 €,
motif 299–399 €, sur mesure 399–499 €) et la proposition intermédiaire à deux
niveaux.

## La grille

| Taille | Cache L × H | Profondeur réglable | Prix, toutes finitions |
|---|---|---|---|
| S | 85 × 65 cm | 45 – 55 cm | **219 €** |
| M | 93 × 73 cm | 50 – 60 cm | **249 €** |
| L | 95 × 83 cm | 53 – 63 cm | **279 €** |
| XL | 102 × 79 cm | 54 – 64 cm | **279 €** |
| XXL | 105 × 95 cm | 60 – 70 cm | **319 €** |
| Sur mesure | jusqu'à 110 × 120 cm | jusqu'à 65 cm | **dès 349 €** |

Prix TTC, livraison France métropolitaine et fixations murales incluses.
Seule option payante : le pied au sol, +30 €.

> Source unique : `assets/site.js`, table `TAILLES`. Modifier là et nulle part
> ailleurs, puis lancer `./check-prix.sh`.

## Le changement de structure

L'ancienne proposition distinguait *couleur unie* et *motif imprimé*, avec 40 €
d'écart. La nouvelle grille **supprime cette distinction** : couleur unie, motif
imprimé et finition matière sont au même tarif.

Ce n'est pas qu'une simplification comptable, c'est un argument de vente que
personne n'a sur ce marché :

> **Le motif ne coûte pas plus cher que l'uni.**

Chez tous les concurrents, la décoration est une option payante. Ici elle est
comprise. C'est immédiatement compréhensible, ça supprime une hésitation au
moment du choix, et ça donne une raison de préférer votre boutique qui ne repose
pas sur les avis clients — que vous n'avez pas encore.

## Positionnement face à Kach Klim

| Taille | Kach Klim | Nous | Écart |
|---|---|---|---|
| S | 229 € | 219 € | −10 € |
| M | 269 € | 249 € | −20 € |
| L | 299 € | 279 € | −20 € |
| XL | 299 € | 279 € | −20 € |
| XXL | 339 € | 319 € | −20 € |
| Sur mesure | dès 369 € | dès 349 € | −20 € |

Systématiquement en dessous, sur toute la gamme, d'un montant constant. C'est
lisible pour le client qui compare, et défendable : ce n'est pas du bradage,
c'est un positionnement.

**Et l'écart réel est plus grand que ces 20 €**, puisque chez eux un motif se
paie plus cher que l'uni. Sur un cache décoré taille L, la comparaison n'est
plus 299 contre 279 mais 299+ contre 279.

## Écart avec l'existant

| | Avant | Après | Écart |
|---|---|---|---|
| Entrée de gamme, uni | 230 € | 219 € | −5 % |
| Entrée de gamme, motif | 299 € | 219 € | **−27 %** |
| Haut de gamme, uni | 325 € | 319 € | −2 % |
| Haut de gamme, motif | 399 € | 319 € | **−20 %** |
| Sur mesure, entrée | 399 € | 349 € | −13 % |

L'effort porte donc presque entièrement sur la gamme motif. Sur l'uni, la baisse
est marginale.

## ⚠️ Les trois vérifications avant d'appliquer

Ces prix sont un positionnement commercial, pas un calcul de marge : je n'ai pas
vos coûts.

### 1. Le surcoût réel d'un motif
C'est le point critique de cette grille. Vendre un cache imprimé au prix d'un
cache uni ne fonctionne que si l'impression numérique et l'adhésif contrecollé
coûtent peu — ce qui est plausible puisque c'est votre métier et votre matériel,
mais qui doit être chiffré.

Calculez le surcoût d'un motif taille M (adhésif + encre + temps machine +
contrecollage). Trois cas :

- **Moins de 15 €** — la grille tient telle quelle. C'est votre atelier qui
  finance l'argument commercial, et c'est un excellent placement.
- **Entre 15 et 30 €** — la grille tient, mais remontez l'uni de 10 € pour
  lisser (229 / 259 / 289 / 289 / 329). Vous restez sous Kach Klim.
- **Plus de 30 €** — abandonnez le prix unique et revenez à deux niveaux. Mieux
  vaut deux tarifs honnêtes qu'un tarif unique à perte.

### 2. Le coût du transport
« Livraison offerte » veut dire que vous l'absorbez. Un colis de 105 × 95 cm est
hors normes chez la plupart des transporteurs. Faites chiffrer le tarif réel :
au-delà de 25 € par colis, remontez toute la grille d'autant.

### 3. Les frais du paiement fractionné
Le 3× sans frais coûte 2 à 4 % du panier au marchand (Alma, Oney, Klarna). À
intégrer au prix, pas à découvrir après.

**Si l'une de ces vérifications ne passe pas, remontez la grille plutôt que de
renoncer au positionnement.** Mieux vaut 239 € affiché honnêtement que 219 € qui
vous fait perdre de l'argent à chaque vente.

## Ce qui compte plus que le prix

Rappel de l'audit : vous n'avez pas fait une seule vente parce que le paiement
par carte était absent, pas parce que vous étiez 30 € trop cher. Cette grille
arrive **en quatrième position** derrière :

1. le paiement par carte bancaire,
2. les frais de port affichés ou offerts,
3. le guide des tailles.

Appliquée seule, elle ferait vendre zéro cache, un peu moins cher.
