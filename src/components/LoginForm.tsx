import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'
import { FC, FormEventHandler } from 'react'
import {
  DeepMap,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form'

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>
  hasFalseCredentials: boolean
  errors: DeepMap<FieldValues, FieldErrors>
  email: UseFormRegisterReturn
  password: UseFormRegisterReturn
}

const SignIn: FC<Props> = ({
  onSubmit,
  hasFalseCredentials,
  errors,
  email,
  password,
}) => {
  console.log(errors)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={''}>
        <Avatar className="m-2">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="w-full mt-2" onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            helperText={errors.email && 'Invalid email Format'}
            error={Boolean(errors.email)}
            autoComplete="email"
            autoFocus
            name="email"
            inputRef={email.ref}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            inputRef={password.ref}
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
            open={hasFalseCredentials}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={1000 * 10}
          >
            <Alert severity="error">Invalid email or password</Alert>
          </Snackbar>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked />}
            label="Remember me"
          />
          <Button
            data-testid="signInButton"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="m-5"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default SignIn
