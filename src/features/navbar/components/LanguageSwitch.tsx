import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { Languages } from 'src/constants'
import useI18n from 'src/lib/hooks/useI18n'

const LanguageSwitch = () => {
  const { t, changeLanguage } = useI18n()
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {t.language}
      </MenuButton>
      <MenuList>
        {Languages.map((lang, idx) => (
          <MenuItem
            key={idx}
            data-testid="gallerycategory"
            onClick={() => changeLanguage(lang)}
          >
            {lang.toUpperCase()}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LanguageSwitch
