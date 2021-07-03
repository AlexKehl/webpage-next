import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  headerButton: {
    fontFamily: 'bebas-neue-by-fontfabric',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '14px',
    margin: '0 0.5em 0 0.5em',
  },
}))

const HeaderButton = (props: React.ComponentProps<typeof Button>) => {
  const styles = useStyles()
  return <Button className={styles.headerButton} {...props} />
}

export default HeaderButton
