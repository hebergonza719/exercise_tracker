import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function Register({ values, errors, touched, status }) {

  return (
    <div>
      <Form>
        <label htmlFor="username"> Username
          <Field id="username" 
            type="text"
            name="username"
            placeholder="Username"
          />
          {touched.username && errors.username && (
            // errors.name comes from Yup
            <p>{errors.username}</p>
          )}
        </label>
      </Form>
      <Form>
        <label htmlFor="password"> Password
          <Field id="password"
            type="text"
            name="password"
            placeholder="Password"
          />
          {touched.password && errors.password && (
            // errors.name comes from Yup
            <p>{errors.password}</p>
          )}
        </label>
        <button type="submit">Register</button>
      </Form>

    </div>
  )
}

const FormikRegister = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      password: props.password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please include a username"),
    password: Yup.string().required("Please include a password")
  }),

  handleSubmit(values, {resetForm}) {
    axios
      .post("http://localhost:4000/api/auth/register", 
      values,
      { withCredentials: true }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.response));
    resetForm();
  }


})(Register);

export default FormikRegister;

