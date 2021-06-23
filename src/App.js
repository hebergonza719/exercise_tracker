import React, { useState } from "react";
import LogForm from "./components/LogForm";
import { Route, BrowserRouter } from "react-router-dom";
import LastLog from "./components/LastLog";
import "./fonts.css";
import "./App.css";

function App() {
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

  return (
    <BrowserRouter>
      <div className="App">
        <Route
          exact
          path="/lastlog"
          render={routeProps => {
            return <LastLog {...routeProps} exerciseList={exerciseList} />;
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
}
export default App;