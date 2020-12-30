import React, { forwardRef } from 'react'
import { createStyle } from '@styli/core'
import { styled } from '@styli/styled'
import { Text, View, Image, Anchor, Box } from '@styli/react'
import { Form, Field, fim, FormSpy, FieldSpy } from 'fim'
import { FieldArray } from 'fim-field-array'

const Heading = styled('h2', { lineHeight: '1em' })
const Button = styled('button')

function Input(props) {
  const { label, error, touched, value = '', register } = props
  return (
    <div>
      <label>{label}</label>
      <input type="text" {...register} value={value} />
      {error && touched && <span className="error">{error}</span>}
    </div>
  )
}

const ButtonExample = (props) => (
  <button
    {...props}
    style={{
      backgroundColor: 'white',
      border: 'solid red',
      borderRadius: 20,
      padding: 10,
      cursor: 'pointer',
      ...props.style,
    }}
  />
)

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ButtonExample,
  Button,
  Input,
  createStyle,
  styled,
  Text,
  View,
  Box,
  Image,
  Heading,
  Anchor,
  Form,
  Field,
  FieldArray,
  FormSpy,
  FieldSpy,
  fim,
}

export default ReactLiveScope
