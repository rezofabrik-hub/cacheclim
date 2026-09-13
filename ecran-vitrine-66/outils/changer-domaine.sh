#!/bin/sh
# Remplace le domaine provisoire par le vrai, dans tout le site.
#
#   sh outils/changer-domaine.sh ecranvitrine66.fr
#
# À lancer une seule fois, depuis le dossier du site, après avoir
# acheté le domaine chez Gandi.

set -e

ANCIEN="ecran-vitrine-66.fr"
NOUVEAU="$1"

if [ -z "$NOUVEAU" ]; then
  echo "Usage : sh outils/changer-domaine.sh votre-domaine.fr"
  exit 1
fi

cd "$(dirname "$0")/.."

N=0
for f in *.html robots.txt sitemap.xml; do
  if grep -q "$ANCIEN" "$f" 2>/dev/null; then
    sed -i.bak "s/$ANCIEN/$NOUVEAU/g" "$f"
    rm -f "$f.bak"
    N=$((N + 1))
    echo "  modifié : $f"
  fi
done

echo ""
echo "$N fichier(s) mis à jour : $ANCIEN -> $NOUVEAU"
echo "Vérifiez avec :  grep -r $ANCIEN ."
