# Où déposer chaque photo

Le site attend ces fichiers à ces emplacements précis. Déposez vos photos dans
`assets/img/_a-traiter/`, avec **exactement ces noms**, puis lancez
`python3 traiter-photos.py`. Elles se mettront en place toutes seules.

Les images actuellement en ligne à ces emplacements sont des **bouche-trous** :
elles font tenir la page, mais ce ne sont pas les bonnes.

---

## 1. La section fabrication — `_a-traiter/atelier/`

| Nom du fichier | La photo à mettre |
|---|---|
| `etape-1-decoupe.jpg` | **La Summa F1612 en pleine découpe**, avec la plaque tracée sur la table. C'est la photo la plus parlante de tout l'envoi. |
| `etape-2-pliage.jpg` | **La face découpée posée à plat**, avec le pli à angle droit et la patte d'accrochage à trou de serrure bien visibles. |
| `etape-3-montage.jpg` | **Le caisson monté sous film** dans l'atelier — en recadrant pour sortir le salarié du cadre, ou avec son accord. |
| `etape-4-pose.jpg` | **Une pose terminée chez un client.** La plus propre : le caisson corten au bord de la piscine, ou le caisson sur PAC avec ses plots. |

## 2. L'image d'accueil — `_a-traiter/poses/`

| Nom du fichier | La photo à mettre |
|---|---|
| `hero-cache-clim.jpg` | **Les trois caissons au bord de la piscine** — ivoire herbes, blanc mosaïque, corten arabesque. Prenez le cadrage large **sans personne au fond**. C'est l'image qui ouvre le site. |

## 3. L'ombre portée — `_a-traiter/poses/`

| Nom du fichier | La photo à mettre |
|---|---|
| `ombre-portee.jpg` | **Le caisson corten au bord de la piscine avec l'ombre du motif sur la terrasse.** Si vous pouvez en refaire une en fin de journée, soleil rasant, encore mieux. |

## 4. La galerie de réalisations — `_a-traiter/poses/`

Huit photos, nommées `realisation-01.jpg` à `realisation-08.jpg`. Ma sélection,
dans l'ordre :

| Fichier | La photo |
|---|---|
| `realisation-01.jpg` | Caisson **corten motif fleurs**, mur saumon, volets vert d'eau, cactus et galets |
| `realisation-02.jpg` | Caisson **corten arabesque** posé sur l'unité Mitsubishi, avec le caisson blanc mosaïque à côté |
| `realisation-03.jpg` | Caisson **anthracite motif floral format long**, terrasse bois, unité Daikin |
| `realisation-04.jpg` | Caisson **ivoire motif organique**, mur crépi gris, terrasse terre cuite, palmier nain |
| `realisation-05.jpg` | Panneau **anthracite motif herbes** sur pompe à chaleur, plots antivibratiles, gravier |
| `realisation-06.jpg` | Panneau **blanc motif floral en applique haute** sur la façade commerciale (recadré sous le logo) |
| `realisation-07.jpg` | Les **caissons blancs à lames** devant l'atelier |
| `realisation-08.jpg` | Caisson **anthracite motif vagues** en 3/4, avec son ombre portée |

## 5. Les fiches produit — `_a-traiter/produits/`

Pour chaque design dont vous avez une **photo réelle**, nommez le fichier
exactement comme le design. La photo réelle remplacera le rendu 3D :

```
bambou.jpg   cassis.jpg   eden.jpg   feuillage.jpg   fleurs.jpg
fleur-de-lys.jpg   horizon.jpg   leopard.jpg   marguerite.jpg
mosaique.jpg   orient-express.jpg   trefle.jpg   vue-sur-mer.jpg
zebre.jpg   zoom.jpg   sur-mesure.jpg
```

Les designs sans photo réelle gardent leur rendu — aucun risque de casser
quoi que ce soit.

---

## Les légendes

Remplissez `assets/img/_a-traiter/legendes.csv`, **une ligne par photo de pose** :

```
realisation-01.jpg ; Perpignan ; Fleurs ; Corten
realisation-03.jpg ; Canet-en-Roussillon ; Eden ; Gris anthracite
```

La ville seule, jamais la rue.

---

## Avant d'envoyer, vérifiez à l'œil

Le script retire les métadonnées GPS, mais pas ce qui est **dans** l'image.
Écartez ou recadrez toute photo montrant :

- un numéro de rue, un nom sur une boîte aux lettres
- une plaque d'immatriculation
- une personne, un salarié compris
- du linge étendu, l'intérieur d'une maison à travers une vitre
- une balançoire ou un jouet d'enfant

Quatre photos de l'envoi sont concernées : le détail est dans
[`selection-photos.md`](selection-photos.md).
