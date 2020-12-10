import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import useStyles from 'components/LoginForm/styles'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'
import { useForm as useFormDI } from 'components/LoginForm/useForm'

export default function SignIn({
  useForm = useFormDI,
  // hasValidCredentials = hasValidCredentialsDI,
}) {
  const classes = useStyles()
  const { register, errors, handleSubmit, loginFail } = useForm()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            inputProps={{ 'data-testid': 'emailInput' }}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            helperText={errors.email && 'Invalid email Format'}
            error={Boolean(errors.email)}
            autoComplete="email"
            autoFocus
            name="email"
            inputRef={register({
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
          />
          <TextField
            inputProps={{ 'data-testid': 'passwordInput' }}
            variant="outlined"
            margin="normal"
            fullWidth
            inputRef={register({
              minLength: 3,
              required: true,
            })}
            name="password"
            label="Password"
            error={Boolean(errors.password)}
            helperText={
              errors.password && 'Password length must be greater than 8'
            }
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Snackbar
            open={loginFail}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={1000 * 10}
          >
            <Alert severity="error">Invalid email or password</Alert>
          </Snackbar>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            data-testid="signInButton"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}
