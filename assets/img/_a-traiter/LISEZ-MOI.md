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

## Deux points importants

**Les données GPS.** Votre téléphone enregistre les coordonnées exactes du lieu
dans chaque photo. Publier une photo de chantier sans la nettoyer revient à
publier l'adresse de votre client. Le script retire toutes ces données
automatiquement — c'est une des raisons de passer par lui plutôt que de copier
les fichiers à la main.

**L'accord du client.** Une photo prise chez quelqu'un, même sans personne
dessus, montre sa maison. Demandez systématiquement l'autorisation avant de
publier, idéalement par écrit, ne serait-ce qu'un SMS.

## Ce qui fait une bonne photo de pose

- **De face, à hauteur d'œil**, pas en plongée
- **En lumière du jour**, à l'ombre ou par ciel couvert — le plein soleil écrase le relief de la découpe
- **Une vue large** montrant la façade et son contexte, plus **un gros plan** sur la découpe
- **Un objet familier dans le cadre** (une chaise, une jardinière) donne l'échelle
- **Avant / après** sur le même cadrage : c'est la photo qui vend le mieux
