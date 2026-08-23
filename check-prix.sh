#!/usr/bin/env bash
# Vérifie que les prix écrits en dur dans les pages correspondent
# toujours à la grille définie dans assets/site.js.
# Usage : ./check-prix.sh
set -uo pipefail
cd "$(dirname "$0")"

prix_taille() { grep -oE "id: '$1',[^}]*prix: [0-9]+" assets/site.js | grep -oE '[0-9]+$'; }

S=$(prix_taille S); XXL=$(prix_taille XXL)
SM=$(grep -oE 'SUR_MESURE = \{ prix: [0-9]+' assets/site.js | grep -oE '[0-9]+$')

if [ -z "${S:-}" ] || [ -z "${XXL:-}" ] || [ -z "${SM:-}" ]; then
  echo "Impossible de lire la grille dans assets/site.js — structure modifiée ?"; exit 2
fi

fail=0
check() { # fichier, chaîne attendue, libellé
  if grep -qF "$2" "$1"; then
    printf '  ok      %-34s %s\n' "$3" "$2"
  else
    printf '  ERREUR  %-34s attendu « %s » dans %s\n' "$3" "$2" "$1"; fail=1
  fi
}

echo "Grille de référence (assets/site.js) : de ${S} € à ${XXL} €, sur mesure dès ${SM} €"
echo "Contrôle des pages :"
check index.html         "dès ${S} €"    "accueil, entrée de gamme"
check index.html         "dès ${SM} €"   "accueil, sur mesure"
check index.html         "${S} → ${XXL} €" "accueil, amplitude affichée"
check index.html         "dès ${S} €</title>" "balise titre"
check guide-tailles.html "${S} à ${XXL} €" "guide, méta-description"

# Aucun prix de l'ancienne grille ne doit subsister
for vieux in "199 €" "239 €" "329 €" "369 €" "289 €" "309 €"; do
  if grep -qF "$vieux" index.html guide-tailles.html pros.html 2>/dev/null; then
    printf '  ERREUR  %-34s « %s » subsiste\n' "reste d'ancienne grille" "$vieux"; fail=1
  fi
done

if [ "$fail" -eq 0 ]; then
  echo "Tout est cohérent."
else
  echo "Des prix ont divergé : corrigez les pages ou assets/site.js."
fi
exit $fail
