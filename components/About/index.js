import Text from './text'
import styles from './index.module.css'

const About = () => (
  <div className={styles.container}>
    <div />
    <div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src="/photo_2021-01-14 02.52.26.jpeg" />
      </div>
      <div className={styles.textHeading}>My name is FooBar</div>
      <div className={styles.text}>{Text}</div>
    </div>
    <div />
  </div>
)

export default About
