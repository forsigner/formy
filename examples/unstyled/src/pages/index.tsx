import React, { useEffect, useState } from 'react'
import { devtools } from 'stook-devtools'
import { Box } from '@styli/react'
import * as yup from 'yup'
import {
  Form,
  Field,
  fim,
  useField,
  FormSpy,
  FieldSpy,
  FieldArray,
  useForm,
  FieldRegisterProps,
  FormValues,
} from 'fim'
import { fimUnstyled } from 'fim-unstyled'
import { fimYupValidator } from 'fim-yup-validator'
import './index.less'

fim.use(fimUnstyled)
fim.use(fimYupValidator)

devtools.init()

const UserName = () => {
  const usernameField = useField('username')
  return <span>{usernameField.value} </span>
}

const TodoList = () => {
  return (
    <div>
      <div>Friends</div>
      <Form
        name="array"
        values={{
          friends: [
            {
              firstName: 'Bill',
              lastName: 'John',
            },
          ],
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <FieldArray name="friends">
          {({ fields, push, remove }) => (
            <Box>
              <pre>{JSON.stringify(fields, null, 2)}</pre>
              {fields.map((item, index) => (
                <Box key={index} left>
                  <Field
                    label="First Name"
                    name={`friends[${index}].firstName`}
                    component="Input"
                  ></Field>
                  <Field
                    label="Last Name"
                    name={`friends[${item.id}].lastName`}
                    component="Input"
                  ></Field>

                  <button type="button" onClick={() => remove(index)}>
                    -
                  </button>
                </Box>
              ))}

              <button
                type="button"
                onClick={() => push({ firstName: `new Friend ${fields.length}`, lastName: '' })}
              >
                +
              </button>
            </Box>
          )}
        </FieldArray>

        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

const UseHooks = () => {
  const registerForm = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Form use={registerForm}>
      <Field name="firstName" label="First Name" component="Input" />
      <Field name="lastName" label="Last Name" component="Input" />

      <Box spaceX-8>
        <button
          type="button"
          onClick={() => {
            registerForm.setFieldState('firstName', (field) => {
              field.value = Date.now()
            })
          }}
        >
          Update firstName
        </button>
        <button type="submit">Submit</button>
      </Box>
    </Form>
  )
}

export default () => {
  const [values, setValues] = useState({
    firstName: 'Bill',
    lastName: 'John',
  })

  useEffect(() => {
    setTimeout(() => {
      setValues({
        firstName: ' Smith',
        lastName: 'James',
      })
    }, 2000)
  }, [])

  return (
    <Box p-100>
      <UseHooks></UseHooks>
      <br />
      <br />
      <TodoList></TodoList>
      <br />
      <br />

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field name="firstName">
          {({ value, handleChange, handleBlur }) => (
            <div>
              <label>First Name</label>
              <input type="text" value={value} onChange={handleChange} onBlur={handleBlur} />
            </div>
          )}
        </Field>
        <Field name="lastName">
          {({ value, handleChange, handleBlur }) => (
            <div>
              <label>Last name</label>
              <input type="text" value={value} onChange={handleChange} onBlur={handleBlur} />
            </div>
          )}
        </Field>
        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field name="firstName">
          {({ register }) => (
            <div>
              <label>First Name</label>
              <input type="text" {...register} />
            </div>
          )}
        </Field>
        <Field name="lastName">
          {({ register }) => (
            <div>
              <label>Last name</label>
              <input type="text" {...register} />
            </div>
          )}
        </Field>
        <button type="submit">Submit</button>
      </Form>

      <Form
        onError={(e) => {
          console.log('e:', e)
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field name="firstName" rules={{ required: 'Username is required' }}>
          {({ register, error, touched }) => (
            <div>
              <label>First Name</label>
              <input type="text" {...register} />
              {error && touched && <span>{error}</span>}
            </div>
          )}
        </Field>
        <Field name="lastName" rules={{ pattern: [/foo/, 'should contain foo'] }}>
          {({ register, error, touched }) => (
            <div>
              <label>Last name</label>
              <input type="text" {...register} />
              {error && touched && <span>{error}</span>}
            </div>
          )}
        </Field>
        <button type="submit">Submit</button>
      </Form>
      <br />
      <br />

      <Form
        onError={(e) => {
          console.log('e:', e)
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field label="First Name" name="firstName" component={Input} />
        <Field label="Last Name" name="lastName" component={Input} />
        <button type="submit">Submit</button>
      </Form>

      <Form
        values={{
          firsName: '',
          gender: 'male',
          colors: 'green',
          bio: '',
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="First Name"
          name="firstName"
          component="Input"
          rules={{ required: 'Require First Name' }}
        />
        <Field
          label="Gender"
          name="gender"
          component="RadioGroup"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          rules={{ required: 'Please select gender' }}
        />
        <Field
          label="Colors"
          name="colors"
          component="CheckboxGroup"
          options={[
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
          ]}
          rules={{ arrayNotEmpty: 'Please select color' }}
        />

        <Field label="Bio" name="bio" component="Textarea" />
        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="Comment"
          name="comment"
          component="Textarea"
          value=""
          onFieldChange={({ value, setField }) => {
            if (!value.includes('foo')) return
            setField('comment', (field) => {
              field.value = field.value.replace(/foo/, '***')
            })
          }}
        />

        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="First Name (disabled if length>6)"
          name="firstName"
          component="Input"
          value=""
          onFieldChange={({ value, setField }) => {
            setField('firstName', (field) => {
              field.disabled = value.length > 6
            })
          }}
        />

        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="Have some advice?"
          name="advice"
          component="Checkbox"
          value={false}
          onFieldChange={({ value, setField }) => {
            setField('myAdvice', (field) => {
              field.visible = value
            })
          }}
        />

        <Field label="My advice:" name="myAdvice" component="Textarea" value="" visible={false} />

        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="You like a cat or dog?"
          name="type"
          component="RadioGroup"
          options={[
            { label: 'Cat', value: 'cat' },
            { label: 'Dog', value: 'dog' },
          ]}
          onFieldChange={({ value, setField }) => {
            setField('animal', (field) => {
              const cats = [
                { label: 'American Bobtai', value: 'American Bobtai' },
                { label: 'Bengal', value: 'Bengal' },
                { label: 'Oriental Shorthair', value: 'Oriental Shorthair' },
              ]
              const dogs = [
                { label: 'Husky', value: 'Husky' },
                { label: 'Golden Retriever', value: 'Golden Retriever' },
                { label: 'Corgi', value: 'Corgi' },
                { label: 'Akita Inu', value: 'Akita Inu' },
              ]
              setField('animal', (field) => {
                field.options = value === 'cat' ? cats : dogs
                field.disabled = !value
              })
            })
          }}
        />

        <Field label="Animal" name="animal" component="Select" options={[]} />

        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field name="firstName" label="First Name" component="Input" />
        <Field name="lastName" label="Last Name" component="Input" />
        <FormSpy>{({ submitCount }) => <span>{submitCount}</span>}</FormSpy>

        <FormValues>
          {(values: any) => (
            <div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          )}
        </FormValues>

        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          name="firstName"
          label="First Name"
          component="Input"
          onFieldChange={({ setField }) => {
            setField<string>('firstName', (field) => {
              field.value = field.value.toUpperCase()
            })
          }}
        />
        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="Colors"
          name="colors"
          component="CheckboxGroup"
          value={['green']}
          options={[]}
          onFieldInit={async ({ setField }) => {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setField('colors', (field) => {
              field.options = [
                { label: 'Red', value: 'red' },
                { label: 'Green', value: 'green' },
                { label: 'Blue', value: 'blue' },
              ]
            })
          }}
        />
        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="Checked?"
          name="checked"
          component="Checkbox"
          value={false}
          onFieldChange={({ value, setField }) => {
            setField('foo', (field) => {
              field.disabled = value
              field.value = 'tt'
            })
          }}
        />
        <Field
          label="Foo"
          name="foo"
          component="Input"
          value=""
          onFieldChange={({ setField }) => {
            console.log('-----foo change')
            setField('bar', (field) => {
              console.log('haha-----')
              field.value = 'I am show if foo disabled'
            })
          }}
        />
        <Field label="Bar" name="bar" component="Input" value="" />
        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          setTimeout(() => {
            setSubmitting(false)
            alert(JSON.stringify(values, null, 2))
          }, 2000)
        }}
      >
        <Field name="firstName" label="First Name" component="Input" />
        <Field name="lastName" label="Last Name" component="Input" />
        <FormSpy>
          {({ submitting }) => (
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting' : 'Submit'}
            </button>
          )}
        </FormSpy>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          name="firstName"
          label="First Name"
          component="Input"
          value=""
          transform={(value) => {
            return value + 'posfix'
          }}
        />
        <Field name="lastName" label="Last Name" component="Input" />
        <button type="submit">Submit</button>
      </Form>

      <Form
        values={values}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field name="firstName" label="First Name" component="Input" />
        <Field name="lastName" label="Last Name" component="Input" />
        <button type="submit">Submit</button>
      </Form>

      <Form
        values={{
          firstName: 'Bill',
          lastName: 'John',
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field name="firstName" label="First Name" component="Input" />
        <Field name="lastName" label="Last Name" component="Input" />
        <button type="submit">Submit</button>
        <FormSpy>
          {({ resetForm }) => (
            <button type="reset" onClick={resetForm}>
              Reset
            </button>
          )}
        </FormSpy>
      </Form>
    </Box>
  )
}

function Input(props: FieldRegisterProps) {
  const { label, error, touched, value = '', register } = props
  return (
    <div>
      <label>{label}</label>
      <input type="text" {...register} value={value} />
      {error && touched && <span className="error">{error}</span>}
    </div>
  )
}
