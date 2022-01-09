[French]

# O'clock — Text technique Full Stack

## Création du jeu Memory

> Front-end : HTML + SASS + JS (_Vanilla_)  
> Back-end : Node  
> Base de données : SQLite  
> Serveur: Express  

Les consignes du test sont à retrouver dans le fichier [todo.pdf](./docs/todo.pdf).

## Installation

Cloner le repertoire ou le copier sur votre PC et se rendre à la racine du projet. Ensuite, lancer Yarn pour installer les dépendances.

```bash
git clone https://github.com/Monkfish-FR/memory.git
cd memory
yarn install
```

## Utilisation

### Lancer le jeu

Pour exécuter l'application et jouer au super jeu __Memory__, utiliser la commande :

```bash
yarn dev
```

Ceci lancera simultanément le serveur et le client (voir la section `scripts` du fichier `package.json`).

### Configuration

Configurer le jeu pour votre propre plaisir :
- _Vous préférez un mode zen ?_ Optez pour une grille plus facile et un temps plus long ;
- _Ou un mode NIGHTMARE DE LA MUERTE_ ? Choisissez la grille la plus difficile et oser la résoudre en moins d'une minute (ou moins si vous êtres vraiment balaise !).

Le tableau ci-dessous décrit les variables disponibles dans le fichier `./src/client/settings.json` :

| Variable     | Type   | Description                                                           |
|--------------|--------|-----------------------------------------------------------------------|
| __game__     |        |                                                                       |
| rows         | number | Le nombre de lignes de la grille (zen: 2, nightmare : 4)              |
| cols         | number | Le nombre de colonnes de la grille (zen: 2, nightmare : 9)            |
| __cards__    |        |                                                                       |
| number       | number | Le nombre de cartes composant votre sprite**                          |
| description  | array  | La description de votre sprite : contient tous les éléments avec, pour chacun, son nom et sa position (_le 1er élément est en position 0_)                             |
| __scores__   |        |                                                                       |
| displayLimit | number | Le nombre de scores à afficher dans le tableau des meilleurs temps    |
| __timer__    |        |                                                                       |
| duration     | string | La durée du jeu ; le format "animation CSS" est utilisé, _exemple `60s` pour 1 minute_ (zen: '600s', nightmare : '30s')                                           |

**Le sprite utilisé peut être modifié mais doit obéir à quelques impératifs :
[exemple](./src/client/assets/images/cards.png)
- il doit être __vertical__ : les images sont placées les unes sur les autres en une seule colonne ;
- les images composant le sprite doivent être __carrées__ ;
- le fichier __doit se nommer__ `cards.png` et __se trouver__ dans le répertoire `./src/client/assets/images/`
