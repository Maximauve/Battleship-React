export const TRANSLATIONS_EN: { [key: string]: any } = {
  layout: {
    global: {
      playerModal: {
        seeProfile: 'My profile',
        darkMode: 'Dark mode',
        selectLanguage: 'Select language',
        languageSelected: 'Language selected',
      },
    },
  },
  home: {
    h1: 'BattleShip',
    greetUser: 'Hello, %{username} ! Ready to play ?',
    createGame: 'Create a game',
    joinInput: 'Name of the game',
    joinGame: 'Join a game',
  },
  game: {
    title: 'Game',
    winner: '%{username} won !',
    userIsOnline: '%{username} is online',
    validateShips: 'Validate my ships',
    yourTurn: "It's your turn !",
    replay: 'Replay',
  },
  pregame: {
    h1: 'Waiting for players',
    startGame: 'Start the game',
    replay: 'Replay',
  },
  login: {
    h1: 'Login',
    placeholder: {
      email: 'Email',
      password: 'Password',
    },
    submit: 'Login',
    to: {
      register: "Create account",
    }
  },
  register: {
    h1: "Register",
    placeholder: {
      username: "Username",
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
    },
    submit: "Register",
    to: {
      login: "I have an account",
    }
  },
  global: {
    home: 'Home',
    logout: 'Logout',
    back: 'Back',
  }
};