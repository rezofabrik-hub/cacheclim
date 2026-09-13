# Hausse de 10 € HT — à saisir dans WooCommerce

> Préparé le 13 septembre 2026. Le dépôt est déjà à jour ; **la boutique en ligne ne l'est pas.**

## Pourquoi ce n'est pas automatisé

Le site n'est modifiable par aucun accès automatique. Vérifié le 13 septembre 2026 :

| Voie | Résultat |
|---|---|
| SSH / WP-CLI | aucune clé dans l'environnement, `wp` non installé |
| API REST WordPress en écriture | `POST /wp-json/wp/v2/product` → **401** |
| API WooCommerce `wc/v3` | **401** — il faudrait une paire de clés client |
| Jetpack / WordPress.com | `rezo-fabrik.fr` absent de la liste des sites connectés |

La **lecture** publique fonctionne, elle : c'est comme ça que les prix ci-dessous ont été
relevés sur le site lui-même, et non recopiés d'une note.

Pour débloquer l'écriture un jour : approuver la connexion Jetpack, ou générer une paire
de clés WooCommerce dans *WooCommerce > Réglages > Avancé > API REST*.
**Ces identifiants sont à Laurent — personne ne s'authentifie à sa place.**

## Les prix à appliquer

Hausse de **10 € HT, soit 12 € TTC** (TVA 20 %). Les prix WooCommerce sont TTC.

L'échelle actuelle par taille, commune aux 15 modèles :

| Taille | Avant | Après |
|---|---|---|
| Petit (L90, H70, P55) | 230 € | **242 €** |
| Moyen (L93, H73, P55) | 270 € | **282 €** |
| Grand (L95, H83, P55) | 299 € | **311 €** |
| Très Grand (L102, H79, P55) | 325 € | **337 €** |

## La méthode : ne pas éditer les variations une par une

Il y a **510 variations** au total (15 modèles × 24, plus 150 pour le sur-mesure).
WooCommerce sait toutes les augmenter d'un coup, produit par produit :

1. *Produits* > ouvrir le produit
2. onglet **Variations**
3. dans la liste déroulante des actions groupées, choisir
   **« Augmenter les tarifs réguliers (montant fixe ou %) »**
4. saisir **12** — sans le signe %, sinon c'est une hausse de 12 pour cent
5. valider, puis **Mettre à jour** le produit

À refaire pour les 16 produits. Comptez une quinzaine de minutes.

⚠️ Si des tarifs promotionnels sont renseignés, l'action **« Augmenter les tarifs
promotionnels »** est distincte — sinon la promo reste à l'ancien prix et devient
le prix réellement payé.

## Les 16 produits

| ID | Produit | Avant | Après |
|---|---|---|---|
| 3989 | Cache Clim sur mesure | 399 – 499 € | **411 – 511 €** |
| 3090 | Cache climatisation BAMBOU | 230 – 325 € | **242 – 337 €** |
| 1894 | Cache climatisation CASSIS | 230 – 325 € | **242 – 337 €** |
| 3137 | Cache climatisation EDEN | 230 – 325 € | **242 – 337 €** |
| 3184 | Cache climatisation FEUILLAGE | 230 – 325 € | **242 – 337 €** |
| 3228 | Cache climatisation FLEUR DE LYS | 230 – 325 € | **242 – 337 €** |
| 3270 | Cache climatisation FLEURS | 230 – 325 € | **242 – 337 €** |
| 3312 | Cache climatisation HORIZON | 230 – 325 € | **242 – 337 €** |
| 3354 | Cache climatisation LEOPARD | 230 – 325 € | **242 – 337 €** |
| 3397 | Cache climatisation MARGUERITE | 230 – 325 € | **242 – 337 €** |
| 3439 | Cache climatisation MOSAIQUE | 230 – 325 € | **242 – 337 €** |
| 3506 | Cache climatisation ORIENT EXPRESS | 230 – 325 € | **242 – 337 €** |
| 3548 | Cache climatisation TREFLE | 230 – 325 € | **242 – 337 €** |
| 3591 | Cache climatisation VUE SUR MER | 230 – 325 € | **242 – 337 €** |
| 3633 | Cache climatisation ZEBRE | 230 – 325 € | **242 – 337 €** |
| 3675 | Cache climatisation ZOOM | 230 – 325 € | **242 – 337 €** |

Lien direct d'édition : `https://www.rezo-fabrik.fr/wp-admin/post.php?post=<ID>&action=edit`

## Après la saisie

- Vider le cache : Redis, puis Cloudflare. « Purger le cache » depuis la barre d'admin
  ne suffit pas.
- Vérifier le résultat en lecture publique, sans être connecté :
  `https://www.rezo-fabrik.fr/wp-json/wc/store/v1/products?per_page=100`

## Deux écarts qui restent à trancher

**La boutique et les pages ne décrivent pas la même gamme.** WooCommerce vend
**4 tailles** (Petit à Très Grand), les pages du dépôt en décrivent **5** (S à XXL), et
les cotes ne coïncident pas : le « Petit » de la boutique fait L90×H70, le « S » des
pages L85×H65. Tant que ce n'est pas aligné, un client peut choisir une taille sur une
page et n'en trouver aucune équivalente au panier.

**Les montants diffèrent aussi**, hausse appliquée de part et d'autre :

| | Dépôt | Boutique |
|---|---|---|
| Entrée de gamme | 231 € | 242 € |
| Haut de gamme | 331 € | 337 € |
| Sur mesure | dès 361 € | dès 411 € |
