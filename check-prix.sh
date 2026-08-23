#!/usr/bin/env bash
# Vérifie que les prix écrits en dur dans les pages correspondent
# toujours à la grille définie dans assets/site.js.
# Usage : ./check-prix.sh
set -uo pipefail
cd "$(dirname "$0")"

get() { grep -oE "id: '$1',.*couleur: [0-9]+, motif: [0-9]+" assets/site.js | grep -oE "$2: [0-9]+" | grep -oE '[0-9]+'; }

S_COUL=$(get S couleur); S_MOT=$(get S motif)
SM_COUL=$(grep -oE 'SUR_MESURE = \{ couleur: [0-9]+' assets/site.js | grep -oE '[0-9]+$')

fail=0
check() { # fichier, motif attendu, libellé
  if grep -q "$2" "$1"; then
    echo "  ok    $3 → $2 ($1)"
  else
    echo "  ERREUR $3 : '$2' introuvable dans $1"; fail=1
  fi
}

echo "Grille de référence (assets/site.js) : couleur dès ${S_COUL} €, motif dès ${S_MOT} €, sur mesure dès ${SM_COUL} €"
echo "Contrôle des pages :"
check index.html "dès ${S_COUL} €"  "entrée de gamme couleur"
check index.html "dès ${S_MOT} €"   "entrée de gamme motif"
check index.html "dès ${SM_COUL} €" "sur mesure"
check index.html "dès ${S_COUL} €"  "titre / meta"

if [ "$fail" -eq 0 ]; then
  echo "Tout est cohérent."
else
  echo "Des prix ont divergé : corrigez les pages ou assets/site.js."
fi
exit $fail
