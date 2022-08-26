import { InputProps } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import Countries from '../../constants/Countries'
import useI18n from '../../lib/hooks/useI18n'
import { Language } from '../../types'
import InputField from './InputField'
import Select from '../Select'

export const Street = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="street"
      placeholder={t.street}
      error={Boolean(formState.errors['street'])}
      errorText={t.fieldRequired}
      hookFormRegister={register('street', { required: true })}
      {...rest}
    />
  )
}

export const City = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="city"
      placeholder={t.city}
      error={Boolean(formState.errors['city'])}
      errorText={t.fieldRequired}
      hookFormRegister={register('city', { required: true })}
      {...rest}
    />
  )
}

export const State = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="state"
      placeholder={t.state}
      error={Boolean(formState.errors['state'])}
      errorText={t.fieldRequired}
      hookFormRegister={register('state')}
      {...rest}
    />
  )
}

export const Zip = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="zip"
      placeholder={t.zip}
      error={Boolean(formState.errors['zip'])}
      errorText={t.fieldRequired}
      hookFormRegister={register('zip', { required: true })}
      {...rest}
    />
  )
}

export const Country = ({ withPhone }: { withPhone?: boolean }) => {
  const { t, locale } = useI18n()
  const { formState, register } = useFormContext()

  const options = Countries.map((country) => {
    const phoneLabel = withPhone ? `(${country.phone})` : ''
    return {
      value: country.code,
      label: `${
        country.label[locale as Language] || country.label.en
      } ${phoneLabel}`,
    }
  })
  return (
    <Select
      hookFormRegister={register('countryCode', { required: true })}
      onChange={() => alert('changed')}
      options={options}
      error={Boolean(formState.errors['countryCode'])}
      errorText={t.fieldRequired}
    />
  )
}

export const StreetNumber = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="streetNumber"
      placeholder={t.streetNumber}
      error={Boolean(formState.errors['streetNumber'])}
      errorText={t.fieldRequired}
      hookFormRegister={register('streetNumber', { required: true })}
      {...rest}
    />
  )
}

export const Phone = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="phone"
      placeholder={t.phone}
      error={Boolean(formState.errors['phone'])}
      errorText={t.fieldRequired}
      hookFormRegister={register('phone', { required: true })}
      {...rest}
    />
  )
}

export const LastName = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="lastName"
      placeholder={t.lastName}
      error={Boolean(formState.errors['lastName'])}
      errorText={t.fieldRequired}
      hookFormRegister={register('lastName', { required: true })}
      {...rest}
    />
  )
}

export const FirstName = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="lastName"
      placeholder={t.firstName}
      error={Boolean(formState.errors['firstName'])}
      errorText={t.fieldRequired}
      hookFormRegister={register('firstName', { required: true })}
      {...rest}
    />
  )
}

export const FullName = ({ ...rest }: InputProps) => {
  const { t } = useI18n()
  const { formState, register } = useFormContext()

  return (
    <InputField
      id="fullName"
      placeholder={t.fullName}
      error={Boolean(formState.errors['fullName'])}
      errorText={t.fieldRequired}
      hookFormRegister={register('fullName', { required: true })}
      {...rest}
    />
  )
}
