# Passer devant Kach Klim — analyse et plan

Analyse technique du concurrent réalisée le 23 août 2026 (en-têtes HTTP, code
source, sitemaps, temps de réponse).

---

## Le fait le plus important

**Kach Klim tourne sur WordPress + WooCommerce.** Exactement la même pile que
vous. Leur avance ne vient donc d'aucune supériorité technique : elle vient de
ce qu'ils ont mis autour du produit. C'est une bonne nouvelle — tout ce qu'ils
font est reproductible chez vous, sans changer de plateforme.

| | Rezo-Fabrik | Kach Klim |
|---|---|---|
| Plateforme | WordPress 7.1 + WooCommerce 10.3.8 | WordPress + WooCommerce |
| Thème | Avada | Thème sur mesure |
| Temps de réponse serveur | **1,53 s** | 2,00 s |
| Poids HTML page d'accueil | **206 Ko** | 564 Ko |
| Scripts chargés | **24** | 28 |
| Images WebP | 0 | 779 |
| Chargement différé | 0 | 44 |
| Cache serveur | aucun | Varnish (en défaut au test) |

Sur deux critères sur cinq, **vous êtes déjà devant**. Votre page est trois fois
plus légère et votre serveur répond plus vite. Avec un cache de page et la
conversion WebP, l'écart de vitesse devient net en votre faveur.

---

## Où ils sont réellement forts

### 1. Les avis — c'est leur seul vrai fossé
« 4,8/5 sur plus de 1 900 avis », affiché dès le haut de page. C'est ce qui fait
qu'un inconnu accepte d'envoyer 300 €. Vous en avez zéro.

**C'est rattrapable, mais c'est long.** Commencez aujourd'hui, pas après la
refonte. Chaque semaine sans collecte est une semaine perdue.

### 2. Une page d'accueil qui répond à toutes les objections
Leur accueil est structuré en 14 sections, dans cet ordre :

1. Gamme de cache clim extérieur
2. Caches déco bois
3. « Vous achetez le savoir-faire Toulousain »
4. **Comment bien choisir votre cache clim extérieur ?**
5. « Changez votre extérieur à partir de 229 € »
6. Des couleurs tendances et modernes
7. **Vos dimensions sont plus grandes ?**
8. La protection idéale pour votre groupe
9. **Le seul cache clim étudié, ventilé et performant**
10. « LE cache clim Français ! »
11. **Compatible avec toutes les marques**
12. Guide du cache clim 2026
13. **Avis clients vérifiés**
14. **Questions fréquentes**

Les cinq en gras répondent à une objection d'achat précise. Votre accueil actuel
parle de fraisage et d'impression numérique.

### 3. Des catégories construites comme des pages de destination
`aspect-rouille`, `cache-climatiseur-deco-bois`, `habillage-pac-tropical`,
`protection-terre-mer`, `cache-clim-pro`, `sur-mesure`, `toulouse`. Chaque
catégorie vise une requête. Vos quatre catégories (`cache-clim`,
`cache-clim-motif`, `cache-clim-sur-mesure`, `carte-cadeau`) ne visent rien.

### 4. Les signaux de légitimité
Marque déposée ®, dépôts INPI et EUIPO mis en avant, ventilation « AirMax® »
nommée comme une technologie. Le produit est le même que le vôtre ; c'est le
vocabulaire qui crée la perception de sérieux.

### 5. Le confort d'achat
Livraison offerte, 72 h sur le standard, paiement en 3× et 4× via Oney,
PayPlug pour la carte, configurateur de taille.

---

## Où ils sont faibles — vos ouvertures

### Ouverture 1 — Le contenu informationnel est vide
**Ils n'ont que 4 articles de blog.** Quatre. Sur un marché où les acheteurs se
posent des dizaines de questions avant d'acheter.

Personne n'occupe ces requêtes :

| Requête | Intention | Qui la couvre aujourd'hui |
|---|---|---|
| cache clim copropriété autorisation | Bloquant à l'achat | Personne |
| quelle taille cache clim | Décision | Kach Klim, partiellement |
| cache clim Daikin / Mitsubishi / Atlantic | Compatibilité | Personne |
| cache clim pompe à chaleur air/eau | Segment entier | Personne |
| cache clim ventilation surconsommation | Objection technique | Personne |
| fabriquer un cache clim soi-même | Amont | Personne |
| cache clim déclaration préalable mairie | Bloquant | Personne |
| cache clim bord de mer corrosion | Niche à forte valeur | Personne |

Dix articles sérieux et vous devenez la référence informationnelle du marché.
C'est six mois de travail, mais c'est un actif qui ne s'achète pas.

### Ouverture 2 — Ils n'ont pas de pages par marque
Leur sitemap `pa_modele` ne contient que deux entrées, et ce sont leurs propres
noms de modèles (California, Amazona). Personne ne possède
« cache clim pour Daikin Perfera » ou « cache clim Mitsubishi MSZ-AP ».

Or c'est exactement ce que tape quelqu'un qui vient de faire installer sa clim.
Une page par marque, avec le tableau de correspondance des tailles, est la
meilleure opération SEO disponible sur ce marché.

### Ouverture 3 — Vous fabriquez, eux assemblent
C'est votre seul avantage structurel, et il n'est nulle part sur votre site.

Kach Klim vend 15 modèles en 5 tailles. Vous avez un atelier de fraisage et
d'impression numérique grand format depuis vingt ans. Concrètement, vous pouvez
vendre ce qu'ils ne peuvent pas :

- **Le visuel du client imprimé sur le cache** — photo, logo d'hôtel, charte
  d'un restaurant. Produit à forte marge, aucune concurrence.
- **Les cotes hors gabarit** sans surcoût de dossier ni délai supplémentaire.
- **Les séries pour professionnels** — un syndic qui harmonise 40 façades,
  un hôtel qui équipe 25 chambres.

### Ouverture 4 — Ils sont à Toulouse, vous êtes sur la côte
Ils revendiquent le « savoir-faire Toulousain ». Le littoral méditerranéen —
Perpignan, Narbonne, Béziers, Montpellier, la Costa Brava — est un marché à
très forte densité de climatiseurs, de résidences secondaires et d'hôtellerie.
Il est à 30 minutes de votre atelier et à 2 h 30 du leur.

Ajoutez l'argument corrosion : en bord de mer, l'aluminium composite contre
l'acier laqué, c'est un vrai argument technique que personne n'exploite.

### Ouverture 5 — La vitesse
Leur page pèse 564 Ko et répond en 2 s. Avec un cache de page, la conversion
WebP et le chargement différé, vous passez sous la seconde. Sur mobile, où se
fait la majorité du trafic, c'est directement du taux de conversion.

---

## Le plan, en trois vagues

### Vague 1 — Atteindre la parité (semaines 1 à 4)
Sans ça, rien d'autre ne compte.

- [ ] Paiement par carte bancaire + 3× sans frais
- [ ] Livraison offerte, annoncée en haut de chaque page
- [ ] Guide des tailles avec calculateur *(déjà construit, voir `guide-tailles.html`)*
- [ ] Nouvelle grille tarifaire *(voir `docs/grille-tarifaire.md`)*
- [ ] Lancer la collecte d'avis Google — objectif 30 avis en 3 mois
- [ ] Cache de page + WebP + chargement différé

### Vague 2 — Prendre le terrain qu'ils n'occupent pas (mois 2 à 4)
- [ ] 8 pages « cache clim pour <marque> » : Daikin, Mitsubishi, Atlantic,
      Toshiba, LG, Samsung, Hitachi, Panasonic
- [ ] 10 articles sur les requêtes du tableau ci-dessus, en commençant par
      copropriété et pompe à chaleur
- [ ] Restructurer les catégories en pages de destination :
      `cache-clim-aspect-bois`, `cache-clim-pompe-a-chaleur`,
      `cache-clim-bord-de-mer`, `cache-clim-professionnel`
- [ ] Une page locale par ville : Perpignan, Narbonne, Béziers, Montpellier

### Vague 3 — Vendre ce qu'ils ne savent pas faire (mois 4 à 12)
- [ ] Lancer l'offre **visuel personnalisé** : le client envoie sa photo ou son
      logo, vous imprimez. C'est votre métier d'origine, et c'est imbattable.
- [ ] Ouvrir le canal professionnel *(voir `pros.html`)* : climaticiens,
      paysagistes, hôtellerie, syndics
- [ ] Déposer la marque à l'INPI et le dire sur le site
- [ ] Nommer votre système de ventilation — ils ont AirMax®, la perception de
      sérieux se construit avec du vocabulaire

---

## Ce qu'il ne faut pas faire

**Ne les copiez pas frontalement.** Ils ont 1 900 avis et deux ans d'avance sur
la notoriété. Une bataille en face-à-face sur « cache clim design », vous la
perdez pendant encore dix-huit mois.

Prenez ce qu'ils ne couvrent pas : les marques de climatiseur, la pompe à
chaleur, la copropriété, le bord de mer, le visuel personnalisé, les
professionnels. Ce sont des marchés où vous partez à égalité — voire devant,
parce que vous fabriquez.
