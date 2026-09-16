# Portfolio — Papa Mbaye BA

Portfolio multi-pages en HTML / CSS / JavaScript vanilla.

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
- **Compétences** (Langages & Frameworks, DevOps, CMS) → `data/skills.json`
- **Projets** (statut `termine` / `en_cours` / `a_venir`, liens site et
  GitHub optionnels) → `data/projects.json`
- **Services** → `data/services.json`