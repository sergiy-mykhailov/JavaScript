# Forms

## Controlled/uncontrolled components

### Controlled
В **управляемом компоненте**, данные формы обрабатываются React-компонентом.
Состояние обычно содержится в `state` и обновляется только через вызов `setState()` (в `callback` элемента формы).
```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    submitSomeApi(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name: <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}
```

### Uncontrolled
**Неуправляемые компоненты** хранят данные формы прямо в DOM. Чтение значений из DOM происходит через `ref`.
```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleSubmit = (event) => {
    submitSomeApi(this.inputRef.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name: <input type="text" defaultValue="foo" ref={this.inputRef} />
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}
```


## Formik

[formik docs](https://formik.org/docs/overview)

### Validation

The structure of `values` and `errors` is the same as that of `initialValues`

```jsx
// Must return an object which keys are symmetrical to our values/initialValues
const validateFunction = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  // ... other fields validation ...
  return errors;
};
// Form:
const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      // ... other fields init values ...
    },
    validate: validateFunction,
    onSubmit: values => submitSomeApi(values),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      {/* other inputs */}
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Validation cross-field

```jsx
const validateFunction = values => {
  const errors = {};
  if (!values.email || !values.username || !values.age) {
    errors.email = 'some error message';
    errors.username = 'some error message';
    errors.age = 'some error message';
  }
  // ... other fields validation ...
  return errors;
};
```

### Visited fields

The structure of `values`, `errors`, `touched` is the same as that of `initialValues`
```jsx
// Must return an object which keys are symmetrical to our values/initialValues
const validateFunction = values => {/*...*/};
// Form:
const SignupForm = () => {
  const formik = useFormik(/*...*/);
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}  // for values and errors
        onBlur={formik.handleBlur}      // for touched
        value={formik.values.email}
      />
      {formik.touched.email             // boolean
      && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Reset/Reinitialize the form
#### Reset
Add a reset button with `formik.handleReset` or `<button type="reset">`.

#### Reinitialize with FormikProps:
- `enableReinitialize?: boolean` - Default is `false`. Control whether `Formik` should reset the form if `initialValues` changes (using deep equality)

### Form submission

#### Submission Phases
- **Pre-submit**
  - Touch all fields. initialValues are required and should always be specified.
  - Set `isSubmitting` to `true`
  - Increment `submitCount + 1`
- **Validation**
  - Set `isValidating` to `true`
  - Run all field-level validations, `validate`, and `validationSchema` asynchronously and deeply merge results
  - Are there any errors?
    - Yes: Abort submission. Set `isValidating` to `false`, set `errors`, set `isSubmitting` to `false`
    - No: Set `isValidating` to `false`, proceed to "Submission"
- **Submission**
  - Proceed with running your submission handler (i.e.`onSubmit` or `handleSubmit`)
  - you call `setSubmitting(false)` in your handler to finish the cycle

### `<Formik>`
#### Formik render methods
- `<Formik component>` - `component: ReactNode`
- `<Formik children>` - `children?: ReactNode | (props: FormikProps) => ReactNode`
- `<Formik render>` Deprecated in 2.x - `children: (props: FormikProps) => ReactNode`

#### `<Formik component>`
```jsx
<Formik component={ContactForm} />
const ContactForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <input {/*...*/} />
    {/*...*/}
    <button type="submit">Submit</button>
  </form>
);
```

#### `<Formik children>`
```jsx
<Formik>{(props) => <ContactForm {...props} />}</Formik>
<Formik children={ContactForm} />
```

#### `<Formik render>`
```jsx
<Formik render={
  (props) => (
    <form onSubmit={props.handleSubmit}>
      <input {/*...*/} />
      {/*...*/}
      <button type="submit">Submit</button>
    </form>
  )
} />
```

### `<Form>`
```jsx
 <Form />
 // is identical to this...
 <form onReset={formikProps.handleReset} onSubmit={formikProps.handleSubmit} {...props} />
```

### `<Field>`
#### Field render methods
- `<Field as>`
- `<Field children>`
- `<Field component>`
- `<Field render>` - deprecated in 2.x.

#### Example
```jsx
<Form>
  <Field type="email" name="email" placeholder="Email" />
  <Field as="select" name="color">
    <option value="red">Red</option>
    <option value="green">Green</option>
  </Field>
  <Field name="lastName" placeholder="Doe" component={MyInput} />
  <Field name="lastName">
    {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (<input type="text" placeholder="Email" {...field} />)}
  </Field>
  <button type="submit">Submit</button>
</Form>
```

### `<FieldArray>`
#### FieldArray Helpers
- `push: (obj: any) => void`: Add a value to the end of an array
- `swap: (indexA: number, indexB: number) => void`: Swap two values in an array
- `move: (from: number, to: number) => void`: Move an element in an array to another index
- `insert: (index: number, value: any) => void`: Insert an element at a given index into the array
- `unshift: (value: any) => number`: Add an element to the beginning of an array and return its length
- `remove<T>(index: number): T | undefined`: Remove an element at an index of an array and return it
- `pop<T>(): T | undefined`: Remove and return value from the end of the array
- `replace: (index: number, value: any) => void`: Replace a value at the given index into the array

#### FieldArray render methods
- `<FieldArray name="..." component>` - `component: React.ReactNode`
- `<FieldArray name="..." render>` - `render: (arrayHelpers: ArrayHelpers) => React.ReactNode`
- `<FieldArray name="..." children>` - `render: (arrayHelpers: ArrayHelpers) => React.ReactNode`

#### Example
```jsx
<Form>
  <FieldArray
    name="friends"
    render={fieldArrayHelpers => (
      <div>
        {values.friends.map((friend, index) => (
          <div key={index}>
            <Field name={`friends[${index}].name`} />
            <Field name={`friends.${index}.age`} />
            {/* other fields */}
            <button type="button" onClick={() => arrayHelpers.remove(index)}>Delete</button>
          </div>
        ))}
        <button type="button" onClick={() => arrayHelpers.push({ name: '', age: '' })}>Add</button>
      </div>
    )}
  />
</Form>
```


## Redux-form

[Redux-form docs](https://redux-form.com/)

### Example
```jsx
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  // ... your other reducers here ...
  form: formReducer
})
const store = createStore(rootReducer)

const validate = () => {/*...*/}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <input {...input} placeholder={label} type={type} />
    {touched && (error && <span>{error}</span>)}
  </div>
)

const FormComponent = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="username" type="text" component={renderField} label="Username" />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'syncValidation', // a unique identifier for this form
  validate,               // validation function given to redux-form
})(FormComponent)
```

### Validation
```jsx
const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}
```

### Validation cross-field

### Visited fields
`props.meta.touched` in the `renderField` function.

### Reset/Reinitialize the form
`props.reset` (function) - prop in the `FormComponent`

### Form submission

### Fields arrays
```jsx
import { Field, FieldArray, reduxForm } from 'redux-form'
//...
const renderField = () => {/*...*/}

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    {fields.map((member, index) => (
      <li key={index}>
        <Field name={`${member}.firstName`} type="text" component={renderField} label="First Name" />
        <Field name={`${member}.lastName`} type="text" component={renderField} label="Last Name" />
      </li>
    ))}
  </ul>
)

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="members" component={renderMembers} />
    </form>
  )
}

export default reduxForm({ form: 'fieldArrays', validate })(FieldArraysForm)
```


## react-hook-form

[react-hook-form docs](https://react-hook-form.com/)

react-hook-form supports:
- Uncontrolled components and native HTML inputs
- Controlled Inputs
- Controlled Inputs with global state

### Validation
```jsx
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const onSubmit = data => console.log(data);
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <p>{errors.firstName?.message}</p>
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <p>{errors.lastName?.message}</p>
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <p>{errors.age?.message}</p>
      <input type="submit" />
    </form>
  );
}
```

### Validation cross-field
```jsx
export default function App() {
  const { register, handleSubmit, getValues, formState:{ errors } } = useForm();
  const onSubmit = data => console.log(data);
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("dateFrom", { validate: () => {/*...*/} })} />
      <p>{errors.dateFrom?.message}</p>
      <input {...register("dateTo", { validate: (dateTo) => dateTo > getValues().dateFrom })} />
      <p>{errors.dateTo?.message}</p>

      <input type="submit" />
    </form>
  );
}
```

### Schema builder
```jsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
}).required();

export default function App() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>
      <input {...register("age")} />
      <p>{errors.age?.message}</p>
      
      <input type="submit" />
    </form>
  );
}
```

### Visited fields
```jsx
export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount }
  } = useForm({
    mode: "onChange"
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>Visited: {touchedFields.firstName}</p>

      <input type="submit" />
    </form>
  );
}
```

### Reset/Reinitialize the form
```jsx
export default function App() {
  const { register, handleSubmit, reset } = useForm({ defaultValues });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      //...
      <input type="button" onClick={() => reset(defaultValues)} />
    </form>
  );
}
```

### Form submission

### Fields arrays
```jsx
import React from "react";
import { useFieldArray } from "react-hook-form";

export default function Fields({ control, register, setValue, getValues }) {
  const { fields, append, remove, prepend } = useFieldArray({ control, name: "testFieldArray" });
  return (
    <ul>
      {fields.map((item, index) => (
        <li key={item.id}>
          <input {...register(`testFieldArray.${index}.name`)} />
        </li>
      ))}
    </ul>
  );
}

const defaultValues = {
  testFieldArray: [{ name: "useFieldArray1" }, { name: "useFieldArray2" }]
};

export default function App() {
  const { control, register, handleSubmit, getValues, errors, reset, setValue } = useForm({ defaultValues });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldArray {...{ control, register, defaultValues, getValues, setValue, errors }} />
    </form>
  );
}
```

