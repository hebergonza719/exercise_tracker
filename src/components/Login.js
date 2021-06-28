import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function Login({ values, errors, touched, status }) {

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
        <button type="submit">Login</button>
      </Form>

    </div>
  )
}

const FormikLogin = withFormik({
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
      .post("http://localhost:4000/api/auth/login", 
        values,
        { withCredentials: true}
      )
      .then(res => {
        localStorage.setItem("token", res.data.jwt_token);
        console.log("token has been set")
      })
      .catch(err => {
        localStorage.removeItem("token");
        console.log("invalid login", err);
      });
    resetForm();
  }


})(Login);

export default FormikLogin;

