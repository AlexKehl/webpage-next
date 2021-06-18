import { Fragment, MouseEventHandler, useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import HeaderButton from './HeaderButton'

interface Props {
  buttonLabel: string
  menuItems: {
    onClick: MouseEventHandler<HTMLLIElement>
    name: string
  }[]
}

const Dropdown = ({ buttonLabel, menuItems }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Fragment>
      <HeaderButton size="small" onClick={handleClick}>
        {buttonLabel}
      </HeaderButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        elevation={2}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {menuItems.map((menuItem, idx) => (
          <MenuItem key={idx} onClick={menuItem.onClick}>
            {menuItem.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
}

export default Dropdown
