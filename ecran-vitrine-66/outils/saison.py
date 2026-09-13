# -*- coding: utf-8 -*-
"""Met a jour le bloc « en ce moment » de la page d'accueil.

Pourquoi ce script existe
-------------------------
La page d'accueil est la page la plus forte du site : ce qu'elle pointe
recoit le plus d'autorite. Mettre en avant les metiers de saison revient
donc a pousser, chaque mois, les pages sur lesquelles la demande est
reellement en train de monter.

Ce que ce script ne fait pas
---------------------------
Il ne touche pas aux dates des pages metiers. Changer une date sans
changer le contenu ne trompe personne et ne rapporte rien. Seule
index.html est reellement modifiee, donc seule sa date de sitemap bouge.

Utilisation
-----------
    python3 outils/saison.py            # mois en cours
    python3 outils/saison.py --mois 1   # forcer janvier (1 a 12)

A lancer au debut de chaque mois, depuis le dossier du site.
"""
import datetime
import io
import os
import re
import sys

MOIS = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet',
        'aout', 'septembre', 'octobre', 'novembre', 'decembre']

AFFICHE = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
           'août', 'septembre', 'octobre', 'novembre', 'décembre']

# Pour chaque mois : les metiers dont la demande monte, et la raison.
# La raison est affichee au visiteur : elle doit lui parler de lui, pas
# de notre calendrier de prospection.
SAISON = {
    1: [('ecran-vitrine-showroom-artisan.html', 'Cuisinistes et piscinistes',
         "Un bassin commandé maintenant se nage en juin. C'est le délai qu'il faut afficher."),
        ('ecran-vitrine-auto-ecole-salle-de-sport.html', 'Salles de sport et auto-écoles',
         "Les offres de janvier sont le second pic de l'année."),
        ('ecran-vitrine-fleuriste.html', 'Fleuristes',
         "La Saint-Valentin se prépare en janvier, pas le 12 février.")],
    2: [('ecran-vitrine-camping-hotellerie-plein-air.html', 'Campings',
         "Huit semaines avant l'ouverture : c'est maintenant que l'équipement se décide."),
        ('ecran-vitrine-nautisme-port.html', 'Nautisme et ports',
         "Sortie d'hivernage, avant que la saison ne prenne tout le monde."),
        ('ecran-vitrine-showroom-artisan.html', 'Cuisinistes et piscinistes',
         "Dernier mois utile pour une piscine livrée avant l'été.")],
    3: [('ecran-vitrine-camping-hotellerie-plein-air.html', 'Campings',
         "Dernière fenêtre avant l'ouverture de la saison."),
        ('ecran-vitrine-restaurant.html', 'Restaurants du littoral',
         "Réouverture des saisonniers et refonte des cartes."),
        ('ecran-vitrine-cave-vigneron.html', 'Caves et caveaux',
         "Avant les ponts de mai et les premiers visiteurs.")],
    4: [('ecran-vitrine-cave-vigneron.html', 'Caves et caveaux',
         "Pâques et les ponts de mai amènent les premiers vrais flux."),
        ('ecran-vitrine-fleuriste.html', 'Fleuristes',
         "La fête des mères est dans six semaines."),
        ('ecran-vitrine-pressing-cordonnerie.html', 'Pressings',
         "Grand nettoyage de printemps : rideaux, couettes, tapis.")],
    5: [('ecran-vitrine-fleuriste.html', 'Fleuristes',
         "Fête des mères, puis la saison des mariages jusqu'en septembre."),
        ('ecran-vitrine-coiffure-opticien.html', 'Coiffure et beauté',
         "Saison des mariages : l'avant-après se montre enfin depuis la rue."),
        ('ecran-vitrine-hotel.html', 'Hôtels et résidences',
         "Préparation de saison, avant que la réception soit prise.")],
    6: [('ecran-vitrine-pret-a-porter.html', 'Prêt-à-porter',
         "Les soldes arrivent, et l'affichage imprimé ne suit pas les démarques."),
        ('ecran-vitrine-garage-concession.html', 'Garages',
         "Avant les départs : révisions, forfaits, parc d'occasion."),
        ('ecran-vitrine-interim-assurance.html', 'Agences d’intérim',
         "Recrutement saisonnier à son maximum.")],
    7: [('ecran-vitrine-interim-assurance.html', 'Agences d’intérim',
         "Les offres défilent : c'est le pic de l'année."),
        ('ecran-vitrine-showroom-artisan.html', 'Showrooms',
         "Beaucoup de visites : les chantiers d'automne se préparent ici."),
        ('ecran-vitrine-camping-hotellerie-plein-air.html', 'Campings',
         "Un écran par pôle : accueil, piscine, snack.")],
    8: [('ecran-vitrine-cinema-spectacle.html', 'Cinémas et salles',
         "La saison se boucle : c'est là que les outils se décident."),
        ('ecran-vitrine-cave-vigneron.html', 'Caves et caveaux',
         "Les vendanges approchent, et elles intéressent énormément les visiteurs."),
        ('ecran-vitrine-mairie-collectivite.html', 'Mairies',
         "Préparer la rentrée : le budget se joue en amont du vote.")],
    9: [('ecran-vitrine-mairie-collectivite.html', 'Mairies et collectivités',
         "Un projet présenté à l'automne s'inscrit au budget voté au printemps."),
        ('ecran-vitrine-auto-ecole-salle-de-sport.html', 'Auto-écoles et salles de sport',
         "La rentrée remplit les plannings : l'affichage n'a jamais autant à dire."),
        ('ecran-vitrine-camping-hotellerie-plein-air.html', 'Campings',
         "L'heure du bilan, et des décisions pour la saison prochaine.")],
    10: [('ecran-vitrine-mairie-collectivite.html', 'Mairies et collectivités',
          "Dernière fenêtre avant l'arbitrage budgétaire."),
         ('ecran-vitrine-nautisme-port.html', 'Nautisme et ports',
          "L'hivernage est une activité d'hiver que peu de chantiers affichent."),
         ('ecran-vitrine-pressing-cordonnerie.html', 'Pressings',
          "Sortie des manteaux et des couettes.")],
    11: [('ecran-vitrine-boulangerie-boucherie.html', 'Boulangeries et boucheries',
          "Commandes de fêtes : le mois le plus rentable et le plus mal affiché."),
         ('ecran-vitrine-pret-a-porter.html', 'Prêt-à-porter et bijouterie',
          "Le mois où la vitrine décide le plus."),
         ('ecran-vitrine-cave-vigneron.html', 'Caves et caveaux',
          "Coffrets et commandes de fin d'année.")],
    12: [('ecran-vitrine-boulangerie-boucherie.html', 'Boulangeries et boucheries',
          "Les dates limites de commande changent tous les jours."),
         ('ecran-vitrine-pressing-cordonnerie.html', 'Pressings',
          "Tenues de fêtes, et l'annonce honnête des délais rallongés."),
         ('ecran-vitrine-cinema-spectacle.html', 'Cinémas et salles',
          "Programmation des vacances et séances jeune public.")],
}

DEBUT = '<!-- SAISON:DEBUT -->'
FIN = '<!-- SAISON:FIN -->'


def bloc(mois):
    cartes = '\n'.join(
        '      <a class="saison-carte" href="%s">\n'
        '        <h3>%s</h3>\n'
        '        <p>%s</p>\n'
        '      </a>' % (url, titre, raison)
        for url, titre, raison in SAISON[mois])
    return (
        '%s\n'
        '<section class="bloc bloc--gris" id="saison">\n'
        '  <div class="shell">\n'
        '    <p class="saison-mois">En ce moment, en %s</p>\n'
        '    <h2>Les commerces qui s’équipent à cette saison</h2>\n'
        '    <p class="intro">Chaque métier a un moment où l’affichage lui rapporte le plus. '
        'Voici ceux dont c’est la période.</p>\n'
        '    <div class="saison-cartes">\n%s\n    </div>\n'
        '  </div>\n'
        '</section>\n'
        '%s' % (DEBUT, AFFICHE[mois - 1], cartes, FIN))


def main():
    mois = datetime.date.today().month
    if '--mois' in sys.argv:
        mois = int(sys.argv[sys.argv.index('--mois') + 1])
    if not 1 <= mois <= 12:
        sys.exit('Mois invalide : attendu 1 a 12.')

    racine = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    page = os.path.join(racine, 'index.html')
    s = io.open(page, encoding='utf-8').read()
    if DEBUT not in s or FIN not in s:
        sys.exit('Reperes SAISON absents de index.html : rien n\'a ete modifie.')

    avant = s
    s = re.sub(re.escape(DEBUT) + '.*?' + re.escape(FIN), lambda m: bloc(mois), s, flags=re.S)
    if s == avant:
        print('Le bloc etait deja a jour pour %s.' % MOIS[mois - 1])
        return
    io.open(page, 'w', encoding='utf-8').write(s)

    # index.html a reellement change : sa date de sitemap peut donc bouger.
    # Celle des pages metiers ne bouge pas, elles n'ont pas ete touchees.
    sm = os.path.join(racine, 'sitemap.xml')
    if os.path.exists(sm):
        x = io.open(sm, encoding='utf-8').read()
        jour = datetime.date.today().isoformat()
        x = re.sub(r'(<loc>[^<]*/</loc><lastmod>)[0-9-]+',
                   lambda m: m.group(1) + jour, x, count=1)
        io.open(sm, 'w', encoding='utf-8').write(x)

    print('Bloc de saison mis a jour pour %s : %s' % (
        MOIS[mois - 1], ', '.join(t for _, t, _ in SAISON[mois])))


if __name__ == '__main__':
    main()
