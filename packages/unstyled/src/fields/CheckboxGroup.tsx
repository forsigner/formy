import React from 'react'
import { FieldRegisterProps } from '@formy/react'
import { produce } from 'immer'
import { Box } from '@styli/react'

export const CheckboxGroup = (props: FieldRegisterProps<string[]>) => {
  const { label, error, touched, options, handleChange, value = [] } = props

  if (value && !Array.isArray(value)) {
    throw new Error('Initial Value of CheckboxGroup should be an Array')
  }

  return (
    <Box>
      {label && <Box>{label}</Box>}
      <Box left>
        {options.map((item) => (
          <Box as="label" key={item.value} left centerY mr-16>
            <input
              type="checkbox"
              value={item.value}
              checked={value.includes(item.value)}
              onChange={(e) => {
                const nextValue = produce(value, (draft) => {
                  if (e.target.checked) {
                    draft.push(item.value)
                  } else {
                    const index = draft.indexOf(item.value)
                    draft.splice(index, 1)
                  }
                })
                handleChange(nextValue)
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
