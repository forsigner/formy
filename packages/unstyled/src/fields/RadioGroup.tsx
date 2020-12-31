import React from 'react'
import { FieldRegisterProps } from '@formy/react'
import { Box } from '@styli/react'

export const RadioGroup = (props: FieldRegisterProps) => {
  const { label, value, error, touched, options, handleChange } = props

  return (
    <Box>
      {label && <Box>{label}</Box>}
      <Box left>
        {options.map((item) => (
          <Box as="label" key={item.value} left centerY mr-16>
            <input
              type="radio"
              value={item.value}
              checked={value === item.value}
              onChange={() => {
                handleChange(item.value)
              }}
            />
            <Box as="span" ml-4>
              {item.value}
            </Box>
          </Box>
        ))}
      </Box>

      {error && touched && <Box red50>{error}</Box>}
    </Box>
  )
}
