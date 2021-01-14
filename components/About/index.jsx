import Text from './text'
import useStyles from './styles'

const About = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div />
      <div>
        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src="http://185.255.134.65:8000/photo_2021-01-14 02.52.26.jpeg"
          />
        </div>
        <div className={classes.textHeading}>My name is FooBar</div>
        <div className={classes.text}>{Text}</div>
      </div>
      <div />
    </div>
  )
}

export default About
