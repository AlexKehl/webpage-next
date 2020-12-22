import Button from '@material-ui/core/Button'
import useStyles from './styles'

const HeaderButton = (props) => {
  const styles = useStyles()
  return <Button className={styles.headerButton} {...props} />
}

export default HeaderButton
