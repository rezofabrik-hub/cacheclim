#!/usr/bin/env python3
"""
Prépare les photos pour le site.

Déposez vos photos dans assets/img/_a-traiter/, dans le bon sous-dossier :

    poses/     une pose chez un client, un cache installé
    atelier/   la fabrication, les machines, l'équipe
    produits/  un modèle sur fond neutre

puis lancez :

    python3 traiter-photos.py

Le script redimensionne, convertit en WebP, produit un repli JPEG,
et RETIRE LES DONNÉES EXIF — dont les coordonnées GPS que votre
téléphone enregistre dans chaque photo. Publier une photo de chantier
sans nettoyer l'EXIF revient à publier l'adresse de votre client.

Les originaux ne sont pas modifiés. Une fois le traitement vérifié,
vous pouvez vider _a-traiter/.
"""
import os, sys, glob, shutil

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow n'est pas installé.  →  pip install Pillow")

RACINE = os.path.dirname(os.path.abspath(__file__))
SOURCE = os.path.join(RACINE, 'assets/img/_a-traiter')

# sous-dossier source → (destination, largeurs, carré ?)
PLANS = {
    'poses':    ('assets/img/poses',    [1400, 700, 350], False),
    'atelier':  ('assets/img/atelier',  [700, 350],       True),
    'produits': ('assets/img/produits', [900, 450],       True),
}

EXT = ('.jpg', '.jpeg', '.png', '.webp', '.heic', '.HEIC', '.JPG', '.JPEG', '.PNG')


def carre(im):
    """Recadre au carré, centré, en gardant la plus grande zone possible."""
    cote = min(im.size)
    g = (im.width - cote) // 2
    h = (im.height - cote) // 2
    return im.crop((g, h, g + cote, h + cote))


def traiter(chemin, dest, largeurs, en_carre):
    base = os.path.splitext(os.path.basename(chemin))[0]
    base = base.lower().replace(' ', '-').replace('_', '-')
    base = ''.join(c for c in base if c.isalnum() or c == '-').strip('-')

    with Image.open(chemin) as im:
        im = ImageOps.exif_transpose(im)      # redresse selon l'orientation du téléphone
        im = im.convert('RGB')                # au passage, l'EXIF est abandonné
        if en_carre:
            im = carre(im)

        produits = []
        for w in largeurs:
            if w > im.width:
                w = im.width
            h = round(im.height * w / im.width)
            r = im.resize((w, h), Image.LANCZOS)
            suffixe = '' if w == largeurs[0] else f'-{w}'
            sortie = os.path.join(dest, f'{base}{suffixe}.webp')
            r.save(sortie, quality=82, method=6)     # save() sans exif= n'écrit aucune métadonnée
            produits.append(sortie)
            if w == largeurs[0]:
                jpg = os.path.join(dest, f'{base}.jpg')
                r.save(jpg, quality=85, optimize=True, progressive=True)
                produits.append(jpg)
    return base, produits


def main():
    total_avant = total_apres = 0
    traites = 0

    for sous, (dest_rel, largeurs, en_carre) in PLANS.items():
        dossier = os.path.join(SOURCE, sous)
        if not os.path.isdir(dossier):
            continue
        fichiers = [f for f in sorted(glob.glob(os.path.join(dossier, '*')))
                    if f.endswith(EXT)]
        if not fichiers:
            continue

        dest = os.path.join(RACINE, dest_rel)
        os.makedirs(dest, exist_ok=True)
        print(f"\n{sous}/ → {dest_rel}/")

        for f in fichiers:
            avant = os.path.getsize(f)
            try:
                base, produits = traiter(f, dest, largeurs, en_carre)
            except Exception as e:
                print(f"  ✗ {os.path.basename(f)} : {e}")
                continue
            apres = sum(os.path.getsize(p) for p in produits)
            total_avant += avant
            total_apres += apres
            traites += 1
            print(f"  ✓ {base:<34} {avant//1024:>5} Ko → {apres//1024:>5} Ko  ({len(produits)} fichiers)")

    if not traites:
        print("Rien à traiter. Déposez vos photos dans assets/img/_a-traiter/<poses|atelier|produits>/")
        return

    gain = 100 - total_apres * 100 / total_avant if total_avant else 0
    print(f"\n{traites} photo(s) traitée(s) · {total_avant/1024/1024:.1f} Mo → "
          f"{total_apres/1024/1024:.1f} Mo ({gain:.0f} % de gain)")
    print("EXIF retiré (dont les coordonnées GPS).")
    print("Vérifiez le rendu, puis videz assets/img/_a-traiter/.")


if __name__ == '__main__':
    main()
