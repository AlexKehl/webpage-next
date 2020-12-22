import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1em 2em 1em 2em',
  },
  leftHalf: {},
  rightHalf: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export default useStyles
