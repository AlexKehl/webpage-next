import en from './en'

const ru = {
  about: 'О художнике',
  email: 'Эл. адрес',
  password: 'Пароль',
  wrongCredentials: 'Введены неверные учетные данные',
  keepMeLoggedIn: 'оставаться в системе',
  login: 'Войти',
  doNotHaveAccount: 'Нет учетной записи?',
  signUp: 'Регистрация',
  signIn: 'Войти',
  pleaseLogIn:
    'Пожалуйста, авторизуйтесь с данными, которые вы ввели при регистрации.',
  emailRuleFail: 'Пожалуйста, укажите правильный адрес электронной почты',
  passwordRuleFail: 'Пожалуйста, укажите правильный пароль',
  homeWelcome: 'Добро пожаловать',
  successFullLogin: 'Успешный вход в систему',
  profile: 'Профиль',
  logout: 'Выйти',
  successFullLogout: 'Успешный выход из системы',
  status: 'Положение дел',
  edit: 'Редактировать',
  gallery: 'Галерея',
  addFile: 'Добавить файл',
  createAccount: 'Создать аккаунт',
  repeatPassword: 'Повторите пароль',
  passwordsDoNotMatch: 'Пароли не соответствуют',
  create: 'Создавать',
  verifyEmail: 'Пожалуйста, подтвердите свою электронную почту.',
  succssfullRegistered: 'Успешно заегистрирован.',
  emailAlreadyTaken: 'Этот адрес уже зарегистрирован',
  emailConfirmSuccess:
    'Электронная почта успешно подтверждена. Теперь вы можете войти в систему со своими учетными данными',
  emailConfirmFail:
    'Подтверждение по электронной почте не удалось. Пожалуйста, попробуйте позже.',
  awaitingEmailConfirmation: 'Жду подтверждения по электронной почте ...',
  success: 'Успех',
  error: 'Ошибка',
  unexpectedError:
    'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.',
  language: 'Язык',
  userNotRegistered: 'Этот пользователь не зарегистрирован.',
  acryl: 'Акрил',
  oil: 'Масло',
  imageName: 'Название',
  width: 'Ширина',
  height: 'Высота',
  isForSell: 'Продается',
  price: 'Цена',
  description: 'Описание',
  cm: 'см',
  euro: 'Евро',
  save: 'Сохранить',
  delete: 'Удалить',
  serverError: 'Произошла ошибка сервера. Пожалуйста, попробуйте позже',
  verifyData: 'Проверте отправленные данные',
  successfullySubmitted: 'Ваши данные успешно отправлены',
} as const

const withDefaults = { ...en, ...ru } as const

export default withDefaults
