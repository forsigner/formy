import React from 'react'
import { Form, Field, Fim } from 'fim'
import { FimAntd } from 'fim-antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

Fim.use(FimAntd)

export default () => {
  return (
    <div style={{ padding: '100px' }}>
      <Form
        initialValues={{}}
        onSubmit={(values) => {
          console.log('values---------:', values)
        }}
        onError={(errors) => {
          console.log('errors:', errors)
        }}
      >
        <Field
          name="username"
          label="用户名"
          component="Input"
          // componentProps={{
          //   placeholder: '请输入用户名',
          //   prefix: '@',
          // }}
        />

        <Field
          name="password"
          label="密码"
          component="Input"
          componentProps={{
            placeholder: '请输入用户名',
            type: 'password',
          }}
        />

        <Field name="money" label="金额" component="InputNumber" />

        <Field name="rate" label="评分" component="Rate" value={3} />

        <Field
          name="fruite"
          label="水果"
          component="Radio"
          options={[
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
          ]}
        />

        <Field name="agree" label="是否同意" component="SingleCheckbox" />

        <Field name="closed" label="开关" component="Switch" />

        <Field name="slider" label="Slider" component="Slider" />

        <Field
          name="mentions"
          value=""
          label="mentions"
          component="Mentions"
          options={[
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
          ]}
        />

        {/* <Field
          name="week"
          value={new Date()}
          label="Week"
          component="DatePicker"
          componentProps={{
            picker: 'week',
          }}
        /> */}

        {/* <Field name="date" value={new Date()} label="日期" component="DatePicker" /> */}

        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}
