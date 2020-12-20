import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(200px, 1128px) auto',
    paddingBottom: '3em',
  },
}))

export default useStyles
