import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2em',
  },
  leftHalf: {
    flexGrow: 16,
  },
  rightHalf: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  headerItem: {
    fontFamily: 'bebas-neue-by-fontfabric',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '14px',
  },
}))

export default useStyles
