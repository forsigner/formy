import { FimPlugin } from 'fim'
import { Input } from './fields/Input'
import { InputNumber } from './fields/InputNumber'
import { Radio } from './fields/Radio'
import { Checkbox } from './fields/Checkbox'
import { SingleCheckbox } from './fields/SingleCheckbox'
import { Rate } from './fields/Rate'
import { Select } from './fields/Select'
import { Form } from './fields/Form'
import { Switch } from './fields/Switch'
import { Mentions } from './fields/Mentions'
import { Slider } from './fields/Slider'
import { DatePicker } from './fields/DatePicker'
import { RangePicker } from './fields/RangePicker'

export const fimAntd: FimPlugin = {
  Fields: {
    Input,
    InputNumber,
    Radio,
    Checkbox,
    SingleCheckbox,
    Switch,
    Slider,
    Mentions,
    Rate,
    Select,
    DatePicker,
    RangePicker,
  },
  Form,
}

export default fimAntd
