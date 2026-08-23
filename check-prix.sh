#!/usr/bin/env bash
# Vérifie que les prix écrits en dur dans les pages correspondent
# toujours à la grille définie dans assets/site.js.
set -uo pipefail
cd "$(dirname "$0")"

get() { grep -oE "id: '$1',[^}]*$2: [0-9]+" assets/site.js | grep -oE '[0-9]+$'; }

S_CA=$(get S caisson);   S_PA=$(get S panneau)
X_CA=$(get XXL caisson); X_PA=$(get XXL panneau)
SM_CA=$(grep -oE 'SUR_MESURE = \{ caisson: [0-9]+' assets/site.js | grep -oE '[0-9]+$')
SM_PA=$(grep -oE 'panneau: [0-9]+, maxL' assets/site.js | grep -oE '^panneau: [0-9]+' | grep -oE '[0-9]+$')

for v in S_CA S_PA X_CA X_PA SM_CA SM_PA; do
  [ -z "${!v:-}" ] && { echo "Lecture impossible dans assets/site.js ($v) — structure modifiée ?"; exit 2; }
done

fail=0
check() {
  if grep -qF "$2" "$1"; then printf '  ok      %-32s %s\n' "$3" "$2"
  else printf '  ERREUR  %-32s attendu « %s » dans %s\n' "$3" "$2" "$1"; fail=1; fi
}

echo "Grille (assets/site.js)"
echo "  caisson ${S_CA} → ${X_CA} €   ·   panneau ${S_PA} → ${X_PA} €   ·   sur mesure dès ${SM_CA} / ${SM_PA} €"
echo "Contrôle des pages :"
check index.html         "dès ${S_PA} €"           "accueil, entrée panneau"
check index.html         "caisson dès ${S_CA} €"   "accueil, entrée caisson"
check index.html         "${S_PA} → ${X_CA} €"     "accueil, amplitude"
check index.html         "dès ${S_PA} €</title>"   "balise titre"
check guide-tailles.html "${S_PA} à ${X_CA} €"     "guide, méta-description"
check cache-clim-perpignan.html "${S_PA} €"        "page locale, panneau S"

# Aucun prix d'une grille antérieure ne doit subsister
for vieux in "199 €" "239 €" "329 €" "369 €" "289 €</strong>" "309 €"; do
  if grep -qF "$vieux" index.html guide-tailles.html 2>/dev/null; then
    printf '  ERREUR  %-32s « %s » subsiste\n' "reste d'ancienne grille" "$vieux"; fail=1
  fi
done

[ "$fail" -eq 0 ] && echo "Tout est cohérent." || echo "Des prix ont divergé."
exit $fail
