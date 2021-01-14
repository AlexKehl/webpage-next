import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(200px, 1000px) auto',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    padding: '1em',
    border: '1px black solid',
  },
  textHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '1em',
  },
  text: {
    padding: '1em',
    textAlign: 'center',
  },
}))

export default useStyles
