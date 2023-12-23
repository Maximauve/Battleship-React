# BattleShip

- [BattleShip](#battleship)
  - [Accéder au projet :](#accéder-au-projet-)
  - [Installer le projet localement :](#installer-le-projet-localement-)
    - [Prérequis](#prérequis)
    - [Installation](#installation)
    - [Lancement](#lancement)
    - [API](#api)


## Accéder au projet :

Le projet est déployé en ligne sur vercel à cette addresse: [https://maximauve-battleship.vercel.app/](https://battleship-react.vercel.app/)

## Installer le projet localement :

### Prérequis
Pour installer le projet localement, il faut avoir installé :
- node >=18 avec yarn
- docker 
- postman ou équivalent

### Installation
Pour installer le projet, il faut cloner ce répository, mais également les répository [API](https://github.com/Maximauve/Battleship-API) et [DOCKER](https://github.com/Maximauve/Battleship-Docker) pour pouvoir tester de bout en bout !
> à noter que les répo doivent êtres clonés dans le même dossier parent.

### Lancement
Pour lancer le projet, il faut :
- faire un `docker-compose up` dans le répository docker
- faire un `yarn` ou `yarn install` dans les répository API et React
- Sur le répositoy API :
  - faire un `yarn start:dev` pour lancer l'api
  - suivre les (instructions à faire lors du lancement pour la 1ère fois de l'api)[#API]
- Sur le répository React :
  - faire un `yarn dev` pour lancer le front


### API
Lors du lancement de l'API pour la 1ère fois, il faudra se rendre avec un postman sur l'url `http://localhost:5000/users/auth/login` requête POST avec le body suivant :
```json
{
  "email": "email@example.com",
  "password": "Str0ngP@$$w0rD123"
}
```
> remplacer les informations ci-dessus par vos identifiants de compte que vous avez créer en front.

Récupérez le token reçu en réponse, et mettez-le dans la section "Authorization Bearer" de votre postman. \

Maintenant, il va falloir ajouter une liste de mots dans l'api afin que celle-ci puisse générer des noms de rooms aléatoires. \
Pour ce faire, il faudra effectuer une requête POST sur `http://localhost:5000/word-glossary` avec le body suivant :
```json
{
  "words": [
    "ship",
    "shot",
    "sea",
    "battle",
    "war",
    "grid",
    "position",
    "attack",
    "ocean",
    "pearl",
    "reef",
    "maritime",
    "sail",
    "anchor",
    "harbor",
    "wave",
  ]
}
```
Cela devrait suffir pour effectuer des tests, libres à vous d'ajouter des mots à la liste.