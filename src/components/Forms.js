import React from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import minimalll from "../images/minimalll.png";
const Style = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  height: 100vh;
  font-size: 1.5rem;
  background #18181E ;
  color: #DEC79B;
`;
const SignUp = ({ errors, touched, values }) => {
  return (
    <Style>
      <div className="form">
        <img src={minimalll} alt="Logo" />
        <h4>Sign Up</h4>

        <Form>
          <Field
            type="username"
            name="username"
            placeholder="Enter Username"
            className="input"
          />
          <br />
          {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
          )}
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="input"
          />
          <br />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
          <button type="submit" className="submit">
            Submit
          </button>
        </Form>
      </div>
    </Style>
  );
};

const FormikApp = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),

    password: Yup.string()
      .min(4, "make a strong password")
      .required()
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post(
        "https://webpt7-weightliftingjournal.herokuapp.com/api/auth/register",
        values
      )
      .then(res => {
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log("NOOOOO!!!", err.response));
  }
});
const FormSignUp = FormikApp(SignUp);

export default FormSignUp;