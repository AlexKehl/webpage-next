import { Button, GridItem, SimpleGrid } from '@chakra-ui/react'
import { FormProvider } from 'react-hook-form'
import useI18n from 'src/lib/hooks/useI18n'
import {
  City,
  Country,
  State,
  Street,
  StreetNumber,
  Zip,
} from 'src/components/Form/FormFields'
import useAddress from '../hooks/useAddress'

interface Props {
  onPrevStep: () => void
}

const AddressInformation = ({ onPrevStep }: Props) => {
  const { t } = useI18n()
  const { formData, onSubmit } = useAddress()

  return (
    <form onSubmit={formData.handleSubmit(onSubmit)}>
      <FormProvider {...formData}>
        <SimpleGrid columns={12} spacing={2}>
          <GridItem colSpan={{ base: 12, sm: 8 }}>
            <Street />
          </GridItem>
          <GridItem colSpan={{ base: 12, sm: 4 }}>
            <StreetNumber />
          </GridItem>
          <GridItem colSpan={12}>
            <City />
          </GridItem>
          <GridItem colSpan={12}>
            <State />
          </GridItem>
          <GridItem colSpan={12}>
            <Zip />
          </GridItem>
          <GridItem colSpan={12}>
            <Country />
          </GridItem>
          <GridItem colStart={5} colSpan={4}>
            <Button width="100%" onClick={onPrevStep}>
              {t.previous}
            </Button>
          </GridItem>
          <GridItem colStart={9} colSpan={4}>
            <Button width="100%" type="submit">
              {t.next}
            </Button>
          </GridItem>
        </SimpleGrid>
      </FormProvider>
    </form>
  )
}

export default AddressInformation
