import React from "react";
import { Formik, Field, Form, useField, FieldAttributes } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel
} from "@material-ui/core";

type MyRadioProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const App: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yogurt: ""
        }}
        validate={values => {
          const errors: Record<string, string> = {};
          if (values.firstName.includes("bob")) {
            errors.firstName = "no bob";
          }

          return errors;
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("submit", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <MyTextField placeholder="first name" name="firstName" />
            </div>
            <div>
              <Field
                placeholder="last name"
                name="lastName"
                type="input"
                as={TextField}
              />
            </div>

            <div>
              <Field name="isTall" type="checkbox" as={Checkbox} />
              <div>cookies: </div>
              <Field
                name="cookies"
                type="checkbox"
                value="chocolate chip"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="snickerdoodle"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="sugar"
                as={Checkbox}
              />
            </div>

            <div>yorgut</div>
            {/*   <Field name="yogurt" type="radio" value="peach" as={Radio} /> */}
            <MyRadio name="yogurt" type="radio" value="peach" label="peach" />
            <MyRadio
              name="yogurt"
              type="radio"
              value="blueberry"
              label="blueberry"
            />
            <MyRadio name="yogurt" type="radio" value="apple" label="apple" />
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
