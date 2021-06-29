import React, { useState, useEffect } from "react";
import LogForm from "./components/LogForm";
import { Route, BrowserRouter } from "react-router-dom";
import LastLog from "./components/LastLog";
import Register from "./components/Register";
import Login from "./components/Login";
import "./fonts.css";
import "./App.css";

// Redux
import { connect } from "react-redux";
import { getData } from "./actions";

function App(props) {
  const [exerciseList, setExerciseList] = useState([]);
  const addNewExercise = exercise => {
    const newExercise = {
      date: exercise.date,
      exercise: exercise.exercise,
      muscle: exercise.muscle,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      notes: exercise.notes
    };
    const newExerciseList = [...exerciseList, newExercise];
    setExerciseList(newExerciseList);
  };

  const { getData } = props;

  useEffect(() => {
    getData();
  }, [getData])

  return (
    <BrowserRouter>
      <div className="App">
        <Route
          exact
          path="/register"
          render={routeProps => {
            return <Register {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/"
          render={routeProps => {
            return <Login {...routeProps} />;
          }}
        />
        <Route
          exact
          path="/lastlog"
          render={routeProps => {
            // return <LastLog {...routeProps} exerciseList={exerciseList} />;
            return <LastLog {...routeProps}/>;
          }}
        />
        <Route
          path="/new-log"
          render={routeProps => {
            return <LogForm {...routeProps} addNewExercise={addNewExercise} />;
          }}
        />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    logs: state.logs
  };
};

// export default App;
export default connect (
  mapStateToProps,
  { getData }
)(App);