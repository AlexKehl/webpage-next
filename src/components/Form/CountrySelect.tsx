import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Language } from '../../../common/constants/Languages'
import Countries from '../../constants/Counries'
import useI18n from '../../lib/hooks/useI18n'
import Select from '../Select'

const Country = () => {
  const { t, locale } = useI18n()
  const { formState, register } = useFormContext()

  const options = Countries.map((country) => ({
    value: country.code,
    label: `${country.label[locale as Language] || country.label.en} (${
      country.phone
    })`,
  }))
  return (
    <Select
      data-testid="countrySelect"
      hookFormRegister={register('countryCode', { required: true })}
      onChange={() => alert('changed')}
      options={options}
      error={formState.errors['countryCode']}
      errorText={t.fieldRequired}
    />
  )
}

export default Country
