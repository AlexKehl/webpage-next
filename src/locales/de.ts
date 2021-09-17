import en from './en'

const de = {
  about: 'Über',
  email: 'Email',
  password: 'Passwort',
  wrongCredentials: 'Falsche Zugangsdaten eingegeben',
  keepMeLoggedIn: 'Eingeloggt bleiben',
  login: 'Anmeldung',
  doNotHaveAccount: 'Sie haben kein Konto?',
  signUp: 'Anmelden',
  signIn: 'Einloggen',
  pleaseLogIn:
    'Bitte loggen Sie sich mit den Daten ein, die Sie bei der Registrierung eingegeben haben.',
  emailRuleFail: 'Bitte geben Sie die richtige E-Mail an',
  passwordRuleFail: 'Bitte geben Sie das richtige Passwort ein',
  homeWelcome: 'Willkommen',
  successFullLogin: 'Erfolgreich eingeloggt',
  profile: 'Profil',
  logout: 'Ausloggen',
  successFullLogout: 'Erfolgreich abgemeldet',
  status: 'Status',
  edit: 'Bearbeiten',
  gallery: 'Galerie',
  addFile: 'Datei hinzufügen',
  createAccount: 'Benutzerkonto erstellen',
  repeatPassword: 'Passwort wiederholen',
  passwordsDoNotMatch: 'Passwörter stimmen nicht überein',
  create: 'Schaffen',
  verifyEmail: 'Bitte bestätigen Sie Ihre E-Mail.',
  succssfullRegistered: 'Erfolgreich registriert.',
  emailAlreadyTaken: 'Diese E-Mail ist bereits registriert',
  emailConfirmSuccess:
    'E-Mail erfolgreich bestätigt. Sie können sich jetzt mit Ihren Zugangsdaten einloggen',
  emailConfirmFail:
    'E-Mail-Bestätigung fehlgeschlagen. Bitte versuchen Sie es später erneut.',
  awaitingEmailConfirmation: 'Warte auf E-Mail-Bestätigung...',
  success: 'Erfolg',
  error: 'Fehler',
  unexpectedError:
    'Unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
  language: 'Sprache',
  userNotRegistered: 'Dieser Benutzer ist nicht registriert.',
  acryl: 'Acryl',
  oil: 'Öl',
  imageName: 'Name',
  width: 'Breite',
  height: 'Höhe',
  isForSell: 'Ist zu verkaufen',
  price: 'Preis',
  description: 'Beschreibung',
  cm: 'cm',
  euro: 'Euro',
  save: 'Speichern',
  delete: 'Löshen',
  serverError:
    'Serverfehler ist aufgetreten. Bitte versuchen Sie es später noch einmal',
  verifyData: 'Übermittelte Daten überprüfen',
  successfullySubmitted: 'Ihre Daten erfolgreich übermittelt',
} as const

const withDefaults = { ...en, ...de } as const

export default withDefaults
