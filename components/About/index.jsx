import Text from './text'
import useStyles from './styles'

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
        <div className={classes.textHeading}>My name is FooBar</div>
        <div className={classes.text}>{Text}</div>
      </div>
      <div />
    </div>
  )
}

export default About
