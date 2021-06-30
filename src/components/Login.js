import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

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
        <div>
          <h5>Create an account?</h5>
          <NavLink to="/register">Register</NavLink>
        </div>
        
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
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, 
        values,
        { withCredentials: true}
      )
      .then(res => {
        localStorage.setItem("token", res.data.jwt_token);
        localStorage.setItem("user_id", res.data.user_id);
        window.location.replace('/lastlog')
      })
      .catch(err => {
        localStorage.removeItem("token");
        console.log("invalid login", err);
      });
    resetForm();
  }


})(Login);

export default FormikLogin;

