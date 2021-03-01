import withSession from '@/lib/session'

const VALID_EMAIL = 'test@test.com'
const VALID_PASSWORD = '123'

export default withSession(async (req, res) => {
  console.log(req.method)
  if (req.method === 'GET') {
    const user = req.session.get('user')

    if (user) {
      return res.json({
        isLoggedIn: true,
        ...user,
      })
    } else {
      return res.json({
        isLoggedIn: false,
      })
    }
  }

  if (req.method === 'POST') {
    const { email, password } = req.body

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      req.session.set('user', { email })
      await req.session.save()
      return res.status(201).send({ isLoggedIn: true })
    }
  }

  return res.status(403).send('')
})
