import { Button } from '@chakra-ui/react'
import React from 'react'
import useI18n from '../../lib/hooks/useI18n'

interface Props {
  onNext: () => void
  onPrevious: () => void
}

const AddressInformation = ({ onPrevious }: Props) => {
  const { t } = useI18n()
  return (
    <div>
      Address
      <Button width="16" onClick={onPrevious}>
        {t.previous}
      </Button>
    </div>
  )
}

export default AddressInformation
