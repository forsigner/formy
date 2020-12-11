import * as React from 'react'
import { Form } from 'fim'

export const Basic = () => {
  return (
    <Form
      schema={{
        username: {
          value: '',
          component: 'Input',
          componentProps: {
            placeholder: '请输入用户名',
            prefix: '@',
          },
          label: '用户名',
        },
        password: {
          value: '',
          component: 'Input',
          componentProps: { placeholder: '请输入用户名', type: 'password' },
          label: '密码',
        },
        money: {
          value: '',
          component: 'InputNumber',
          componentProps: {
            placeholder: 'xxx',
            formatter: (value: number) => `$ ${value}`,
          },
          label: '金额',
        },
        rate: {
          value: 3,
          component: 'Rate',
          label: '评分',
        },
        fruite: {
          value: 'Apple',
          component: 'Radio',
          label: '水果',
          enum: [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
          ],
        },
        colors: {
          value: ['red'],
          component: 'Checkbox',
          label: '颜色',
          enum: [
            { label: '红色', value: 'red' },
            { label: '绿色', value: 'green' },
            { label: '黄色', value: 'yellow' },
          ],
        },
        agree: {
          value: false,
          component: 'SingleCheckbox',
          label: '是否同意',
        },
        closed: {
          value: false,
          component: 'Switch',
          label: '开关',
        },
        slider: {
          value: 10,
          component: 'Slider',
          label: 'Slider',
        },

        mentions: {
          value: '',
          component: 'Mentions',
          enum: [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' },
          ],
        },

        date: {
          value: new Date(),
          component: 'DatePicker',
          label: '日期',
        },

        week: {
          value: new Date(),
          component: 'DatePicker',
          componentProps: { picker: 'week' },
          label: 'Week',
        },

        month: {
          value: new Date(),
          component: 'DatePicker',
          componentProps: { picker: 'month' },
          label: 'Week',
        },

        range: {
          value: [new Date(), new Date()],
          component: 'RangePicker',
          // componentProps: { picker: 'month' },
          label: 'RangePicker',
        },
      }}
      onSubmit={(values) => {
        console.log('values:', values)
      }}
    ></Form>
  )
}
