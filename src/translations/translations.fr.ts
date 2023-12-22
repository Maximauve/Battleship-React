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
  },
  login: {
    h1: 'Se connecter',
    placeholder: {
      email: 'Email',
      password: 'Mot de passe',
    },
    submit: 'Connexion',
    to: {
      register: "Déjà un compte ?",
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