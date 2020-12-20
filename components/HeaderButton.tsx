import Button from '@material-ui/core/Button'

const HeaderButton = (props: any) => {
  return (
    <Button
      style={{
        fontFamily: 'bebas-neue-by-fontfabric',
        fontWeight: 400,
        fontStyle: 'normal',
        fontSize: '14px',
      }}
      {...props}
    />
  )
}

export default HeaderButton
