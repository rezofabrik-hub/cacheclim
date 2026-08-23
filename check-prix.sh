#!/usr/bin/env bash
# Vérifie que les prix écrits en dur dans les pages correspondent
# toujours à la grille définie dans assets/site.js.
set -uo pipefail
cd "$(dirname "$0")"

prix() { grep -oE "id: '$1',[^}]*prix: [0-9]+" assets/site.js | grep -oE '[0-9]+$'; }
S=$(prix S); XXL=$(prix XXL)
SM=$(grep -oE 'SUR_MESURE = \{ prix: [0-9]+' assets/site.js | grep -oE '[0-9]+$')

[ -z "${S:-}" ] || [ -z "${XXL:-}" ] || [ -z "${SM:-}" ] && \
  { [ -z "${S:-}${XXL:-}${SM:-}" ] && { echo "Lecture impossible dans assets/site.js"; exit 2; }; }

fail=0
check() {
  if grep -qF "$2" "$1"; then printf '  ok      %-32s %s\n' "$3" "$2"
  else printf '  ERREUR  %-32s attendu « %s » dans %s\n' "$3" "$2" "$1"; fail=1; fi
}

echo "Grille (assets/site.js) : de ${S} € à ${XXL} €, sur mesure dès ${SM} €"
echo "Contrôle des pages :"
check index.html                "dès ${S} €"          "accueil, entrée de gamme"
check index.html                "dès ${SM} €"         "accueil, sur mesure"
check index.html                "${S} → ${XXL} €"     "accueil, amplitude"
check index.html                "dès ${S} €</title>"  "balise titre"
check guide-tailles.html        "${S} à ${XXL} €"     "guide, méta-description"
check cache-clim-perpignan.html "dès ${SM} €"         "page locale, sur mesure"

# Aucun prix d'une grille antérieure ne doit subsister
for vieux in "199 €" "239 €" "329 €" "369 €" "149 €" "179 €" "209 €"; do
  if grep -qF "$vieux" index.html guide-tailles.html cache-clim-perpignan.html pose.html 2>/dev/null; then
    printf '  ERREUR  %-32s « %s » subsiste\n' "reste d'ancienne grille" "$vieux"; fail=1
  fi
done

[ "$fail" -eq 0 ] && echo "Tout est cohérent." || echo "Des prix ont divergé."
exit $fail
