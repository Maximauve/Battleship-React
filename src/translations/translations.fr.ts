export const TRANSLATIONS_FR: { [key: string]: any } = {
  layout: {
    global: {
      playerModal: {
        seeProfile: 'Voir mon profil',
        darkMode: 'Theme sombre',
        selectLanguage: 'Sélectionner la langue :',
        languageSelected: 'Langue selectionnée :',
      },
    },
  },
  home: {
    h1: 'Bataille Navale',
    greetUser: 'Bonjour, %{username} ! Prêt.e à jouer ?',
    createGame: 'Créer une partie',
    joinInput: 'Nom de la partie',
    joinGame: 'Rejoindre une partie',
  },
  game: {
    title: 'Partie',
    winner: '%{username} a gagné !',
    userIsOnline: '%{username} est en ligne',
    validateShips: 'Valider mes bateaux',
    yourTurn: "C'est à votre tour !",
  },
  pregame: {
    h1: 'En attente de joueurs',
    startGame: 'Lancer la partie',
    replay: 'Rejouer',
  },
  login: {
    h1: 'Se connecter',
    placeholder: {
      email: 'Email',
      password: 'Mot de passe',
    },
    submit: 'Connexion',
    to: {
      register: "Créer un compte",
    }
  },
  register: {
    h1: "S'inscrire",
    placeholder: {
      username: "Nom d'utilisateur",
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmez le mot de passe',
    },
    submit: "S'enregistrer",
    to: {
      login: "J'ai déjà un compte",
    }
  },
  global: {
    home: 'Accueil',
    logout: 'Déconnexion',
  }
};