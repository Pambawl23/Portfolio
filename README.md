# Portfolio — Yasmine Diallo (template)

Portfolio multi-pages en HTML / CSS / JavaScript vanilla, inspiré de la
maquette fournie mais avec une identité visuelle propre (fond sombre,
accents indigo/teal, titres en Fraunces, texte en Inter).

## Structure

```
portfolio/
├── index.html          Page d'accueil
├── about.html           Page "À propos" (parcours + compétences)
├── projects.html        Page "Projets" (filtrable par statut)
├── services.html         Page "Services"
├── css/
│   ├── variables.css     Tokens (couleurs, typo, espacements) + reset
│   ├── layout.css        Header et footer partagés
│   ├── home.css
│   ├── about.css
│   ├── projects.css
│   └── services.css
├── js/
│   ├── main.js           Menu mobile + remplissage du footer (partagé)
│   ├── home.js
│   ├── about.js
│   ├── projects.js
│   └── services.js
├── data/
│   ├── profile.json      Identité, bio, stats, contact, réseaux
│   ├── about.json         Texte d'intro + parcours (timeline)
│   ├── skills.json        Compétences par catégorie (carousel)
│   ├── projects.json      Liste des projets (statut, liens, tags)
│   ├── services.json      Liste des services proposés
│   └── process.json       Étapes de la méthode de travail
└── public/
    ├── images/            Logo, illustration hero, vignettes projets (SVG)
    └── documents/         cv.pdf (placeholder à remplacer)
```

## Pour personnaliser le contenu

Tout le texte affiché dynamiquement vient des fichiers JSON du dossier
`data/`. Il suffit de modifier ces fichiers, aucune modification du HTML
ou du JS n'est nécessaire :

- **Nom / bio / contact** → `data/profile.json`
- **Parcours** → `data/about.json`
- **Compétences** (Langages & Frameworks, DevOps, CMS
  "À compléter" prête à l'emploi) → `data/skills.json`
- **Projets** (statut `termine` / `en_cours` / `a_venir`, liens site et
  GitHub optionnels) → `data/projects.json`
- **Services** → `data/services.json`

Pour ajouter une image de projet, déposez un fichier dans
`public/images/` et référencez son chemin dans `image` du projet
correspondant dans `data/projects.json`.

Remplacez `public/documents/cv.pdf` par votre propre CV (même nom de
fichier, ou mettez à jour `cvUrl` dans `profile.json`).

## Lancer le site en local

Comme le site charge les fichiers JSON via `fetch`, il doit être servi
par un serveur local (pas ouvert en double-clic sur `index.html`) :

```bash
cd portfolio
python3 -m http.server 8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.
