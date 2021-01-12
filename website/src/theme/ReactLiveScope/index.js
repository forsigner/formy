import React, { forwardRef } from 'react'
import { createStyle } from '@styli/core'
import { styled } from '@styli/styled'
import { Text, View, Image, Anchor, Box } from '@styli/react'
import { Formy } from '@formy/core'
import { Form, Field, FormSpy, FieldSpy, useForm, useFormContext } from '@formy/react'
import { FieldArray } from '@formy/field-array'

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

  Formy,
  Form,
  Field,
  FieldArray,
  FormSpy,
  FieldSpy,
  useForm,
  useFormContext,
}

export default ReactLiveScope
