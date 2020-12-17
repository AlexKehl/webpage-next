import { makeStyles } from '@material-ui/core/styles'
import WithHeader from '../WithHeader'
import Text from './text'

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(200px, 1000px) auto',
  },
  image: {
    maxWidth: '100%',
    padding: '1em',
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

const About = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div />
      <div>
        <img
          className={classes.image}
          src="https://picsum.photos/id/1019/1000/600/"
        />
        <div className={classes.textHeading}>My name is hello</div>
        <div className={classes.text}>{Text}</div>
      </div>
      <div />
    </div>
  )
}

export default WithHeader(About)
