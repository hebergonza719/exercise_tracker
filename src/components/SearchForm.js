import React, { useState, useEffect } from "react";
// import CharacterCard from "./CharacterCard";
import styled from "styled-components";
import LogCard from "./LogCard";
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import LastFiveLogs from './LastFiveLogs';

const BtnStyle = styled.button`
  background-color: #18181E;
  color: white;
  font-family: 'Karma', serif;
  height: 28px;
  border-color: #18181E;
  border-radius: 5px;
  margin: 10px;
`

const ParaError = styled.p`
  font-size: 13px;
  margin: 10px 0 -8px 8px;
  color: red;
`

const ErrorPMessage = styled.p`
  margin-top: 0;
  color: darkred;
`

const SearchForm = ({ exerciseList, values, errors, touched, status }) => {
  console.log("this is values in Searchform", values);

  // const [searchDate, setSearchDate] = useState("");

  // const [searchResults, setSearchResults] = useState(exerciseList);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // console.log("this is values in useEffect", values);
    // console.log("this is status", status);
    // console.log("this is exerciseList", exerciseList);
    const results = exerciseList.filter(exercise => {
      return exercise.date === status;
    });

    setSearchResults(results);
    console.log("this is results", results);

  }, [status]);

  const returnResults = () => {
    if (touched.date && searchResults.length === 0) {
      console.log("first if is running");
      return (
        <div>
          <ErrorPMessage>You don't have logs for that date</ErrorPMessage>
          <LastFiveLogs exerciseList={exerciseList} />
        </div>
      );
    }

    else if (searchResults.length === 0) {
      console.log("second if is running");
      return (
        <div>
          <LastFiveLogs exerciseList={exerciseList} />
        </div>
      )
    }

    else if (searchResults.length > 0) {
      console.log("third if is running");
      return (
        searchResults.map(exercise => (
          <LogCard exercise={exercise} />
        ))
      )
    }
  }

  // const handleChange = event => {
  //   setSearchDate(event.target.value);
  // };

  // const submitForm = event => {
  //   event.preventDefault();

  //   const results = exerciseList.filter(exercise => {
  //     return exercise.date === searchDate;
  //   });

  //   setSearchResults(results);
  //   console.log("this is results", searchResults);
  // };


  return (
    <section className="search-form">
      {/* <form> */}
      <Form>
        {touched.date && errors.date && (
          // errors.name comes from Yup
          <ParaError>{errors.date}</ParaError>
        )}

        <label htmlFor="date" className="date-label">Search for date:
          {/* <InputField */}
          <Field className="search-field"
            id="date"
            type="date"
            name="date"
            // onChange={handleChange}
          />
        </label>

        {/* <BtnStyle type="submit" onClick={submitForm}>Search</BtnStyle> */}
        <BtnStyle type="submit">Search</BtnStyle>
        
      {/* </form> */}
      </Form>
      {/* {searchResults.map(exercise => (
        <LogCard exercise={exercise} />
      ))} */}
      {returnResults()}
    </section>
  );
}

const FormikSearchForm  = withFormik({
  mapPropsToValues(props) {
    return {
      date: props.date || "",
    };
  },

  validationSchema: Yup.object().shape({
    date: Yup.string().required("Select a date")
  }),

  handleSubmit(values, { setStatus }) {
    setStatus(values.date.toString());
    // resetForm();
  }

})(SearchForm);

export default FormikSearchForm;