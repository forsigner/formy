import React from 'react'
import { FieldRegisterProps } from 'fim'
import { produce } from 'immer'
import { View, Box } from '@styli/react'

export const CheckboxGroup = (props: FieldRegisterProps) => {
  const { label, error, touched, options, handleChange } = props
  const value: any[] = props.value || []

  return (
    <View>
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

      {error && touched && <View red>{error}</View>}
    </View>
  )
}
