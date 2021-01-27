import { withIronSession } from 'next-iron-session'

const VALID_EMAIL = 'test@test.com'
const VALID_PASSWORD = '123'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).send('')
  }

  const { email, password } = req.body

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    req.session.set('user', { email })
    await req.session.save()
    return res.status(201).send({ isLoggedIn: true })
  }

  return res.status(403).send('')
}

export default withIronSession(handler, {
  cookieName: process.env.SESSION_COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
  password: process.env.APPLICATION_SECRET,
})
