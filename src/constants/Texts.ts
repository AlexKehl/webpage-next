import en from '../locales/en'

export const Texts = {
  // email: 'Email',
  // password: 'Password',
  // wrongCredentials: 'Wrong credentials entered',
  // keepMeLoggedIn: 'Keep me logged in',
  // login: 'Login',
  // doNotHaveAccount: "Don't have an account?",
  // signUp: 'Sign up',
  // signIn: 'Sign in',
  // pleaseLogIn: 'Please log in with the data you entered during registration.',
  // emailRuleFail: 'Please provide correct email',
  // passwordRuleFail: 'Please provide correct password',
  // homeWelcome: 'Welcome',
  // successFullLogin: 'Successfully logged in',
  // profile: 'Profile',
  // logout: 'Logout',
  // successFullLogout: 'Successfully logged out',
  // status: 'Status',
  // edit: 'Edit',
  // gallery: 'Gallery',
  // addFile: 'Add File',
  // createAccount: 'Create Account',
  // repeatPassword: 'Repeat password',
  // passwordsDoNotMatch: 'Passwords do not match',
  // create: 'Create',
  // verifyEmail: 'Please verify your email.',
  // succssfullRegistered: 'Successfully registered.',
  // emailAlreadyTaken: 'This email is already registered',
  // emailConfirmSuccess:
  //   'Email successfully confirmed. You can now log in with your credentials',
  // emailConfirmFail: 'Email confirmation failed. Please try again later.',
  // awaitingEmailConfirmation: 'Waiting for email confirmation...',
  // success: 'Success',
  // error: 'Error',
  // unexpectedError: 'Unexpected Error occured. Please try again later.',
}

const keys = Object.keys(en) as (keyof typeof en)[]

keys.forEach((key) => {
  Object.defineProperty(Texts, key, {
    get: () => en[key],
  })
})
