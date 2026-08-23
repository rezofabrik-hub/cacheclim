# Déposez vos photos ici

Trois sous-dossiers, selon ce que montre la photo :

| Dossier | Pour quoi | Résultat |
|---|---|---|
| `poses/` | Un cache installé chez un client, une façade, un balcon, une terrasse | Format d'origine, 3 largeurs — sert aux galeries et à la page d'accueil |
| `atelier/` | La fabrication : table de découpe, panneaux, machines, équipe au travail | Recadré au carré, 2 largeurs |
| `produits/` | Un modèle seul, sur fond neutre | Recadré au carré, 2 largeurs — remplace un rendu 3D |

Ensuite, à la racine du dépôt :

```bash
pip install Pillow      # une seule fois
python3 traiter-photos.py
```

## Comment nommer les fichiers

Le nom du fichier devient le nom de l'image sur le site. Écrivez-le en clair :

- `pose-facade-blanche-anthracite.jpg` ✅
- `bambou-noir-terrasse.jpg` ✅
- `IMG_4471.jpg` ❌ — ça marche, mais c'est illisible dans le code

## Les légendes : la ville, jamais l'adresse

Renseignez `legendes.csv`, à côté de ce fichier :

```
pose-facade-bambou.jpg ; Argelès-sur-Mer ; Bambou ; Gris anthracite
```

La ville seule. Jamais le numéro, la rue, ni le quartier précis. Le script
signale les photos de pose auxquelles il manque une légende.

## Ce que le script retire, et ce qu'il ne peut pas retirer

### Il retire — automatiquement, à chaque traitement

| Donnée | Ce qu'elle révèle |
|---|---|
| Coordonnées GPS | La position du lieu, à quelques mètres près |
| Date et heure de prise de vue | Quand vous étiez sur place |
| Marque, modèle, numéro de série de l'appareil | Quel téléphone a pris la photo |
| Réglages, logiciel, vignette intégrée | Divers |

Vérifié sur une photo réelle : 16 champs avant, 0 après.

### Il ne peut pas retirer — c'est à vous de regarder

Ce sont des choses **visibles dans l'image** : aucun script ne les enlève.

- Un **numéro de rue** sur la façade ou la boîte aux lettres
- Un **nom** sur une boîte aux lettres, un interphone, une sonnette
- Une **plaque d'immatriculation**
- Un **panneau de rue** ou une enseigne voisine
- Un **visage**, ou quelqu'un de reconnaissable
- Dans un village, une **vue caractéristique** suffit parfois à situer la maison

Regardez chaque photo avant de la publier. Au moindre doute, recadrez :
un cache clim se photographie très bien serré, sans le reste de la maison.

## L'accord du client

Une photo prise chez quelqu'un, même sans personne dessus, montre sa maison.
Demandez systématiquement l'autorisation avant de publier — un SMS suffit, mais
gardez-en une trace.

## Ce qui fait une bonne photo de pose

- **De face, à hauteur d'œil**, pas en plongée
- **En lumière du jour**, à l'ombre ou par ciel couvert — le plein soleil écrase le relief de la découpe
- **Une vue large** montrant la façade et son contexte, plus **un gros plan** sur la découpe
- **Un objet familier dans le cadre** (une chaise, une jardinière) donne l'échelle
- **Avant / après** sur le même cadrage : c'est la photo qui vend le mieux
