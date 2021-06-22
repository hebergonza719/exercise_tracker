import React from "react";
import { Form, Field, withFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import styled from "styled-components";
import { Button } from "grommet";
import { connect } from "react-redux";
import { login } from "../src/store/auth/actions";

const Header = styled.nav`
  width:100%;
  height 155px;
  background: #18181E;
  margin-bottom: 15%;
`;

const ImgLogo = styled.img`
  display: block;
  margin: 0 auto;
  padding: 2%;
  width: 30%;
`;

const StyledH1 = styled.h1`
  width: 100%;
  margin-left: 25%;
  margin-top: 4%;
  margin-bottom: 35%;
`;

const StyledLabel = styled.label`
  width: 100%;
  margin: 1% 10%;
`;

const StyledField = styled(Field)`
  width: 80%;
  padding: 5px;
  margin: 2% 10%;
  border-radius: 10px;
  border: 2px solid #d0d0d0;
  height 30px;
  font-size:16px;
`;

const MyStyledButton = styled(Button)`
  text-align: center;
  margin: 20% 0% 10% 10%;
  font-weight: bold;
  font: Helvetica Neue;
  background-color: #18181e;
  color: #dec79b;
  font-size: 30px;
  width: 82.5%;
  height: 60px;
  border-radius: 10px;
  @media (min-width: 960px) and (max-width: 1400px) {
    background-color: black;
  }
`;

const StyledFooter = styled.footer`
  margin-top: 60%;
  width:100%;
  height 150px;
  background: #18181E;
`;

const LinkStyle = styled(Link)`
  font-size: 16px;
  color: #dec79b;
  text-decoration: underline;
  display: flex;
  justify-content: center;
`;

const CopyrightStyle = styled.p`
  display: flex;
  justify-content: center;
  color: #dec79b;
`;

const LogIn = ({ errors, touched, ...props }) => {
  return (
    <div>
      <Header>
        <ImgLogo src={require("./img/MinimalLift.png")}></ImgLogo>
      </Header>

      <StyledH1>Welcome Back!</StyledH1>
      <Form>
        <StyledLabel>
          Email
          <StyledField type="text" name="username" placeholder="Email" />
        </StyledLabel>
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}
        <StyledLabel>
          Password
          <StyledField type="password" name="password" placeholder="Password" />
        </StyledLabel>
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <MyStyledButton primary type="submit">
          {props.isLoading ? "..." : "Get ready to workout! "}
        </MyStyledButton>
      </Form>

      <StyledFooter>
        <br />
        <br />
        <LinkStyle to="#">Terms of Service</LinkStyle>
        <LinkStyle to="#">Privacy Policy</LinkStyle>
        <CopyrightStyle>©2019 Minimal Lift</CopyrightStyle>
      </StyledFooter>
    </div>
  );
};

const FormikLogIn = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please enter your username."),
    password: Yup.string()
      .min(2)
      .required("Please enter at least 6 characters.")
  }),

  handleSubmit(values, { resetForm, props }) {
    props.login(values, props.history);
    resetForm();
  }
})(LogIn);

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error
  };
};
export default connect(mapStateToProps, { login })(FormikLogIn);