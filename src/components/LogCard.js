import React from "react";
import styled from 'styled-components';
import exerciselog from '../images/exerciselog.jpg';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: initial;
  border: 1px solid lightgray;
  border-radius: 4px; 
  padding: 0% 5% 0% 5%;
  margin: 5% 10% 5% 10%;
`
const NotesContainer = styled.div`
  border: 1px solid;
  margin-bottom: 8%;
  padding: 8px;
  margin-left: -2%;
  margin-right: -2%;
`
const H3Styled = styled.h3`
  margin-top: 0;
`

export default function LogCard ({ exercise }) {
  return (
    <CardContainer>
      <div className="img-container">
        <img className="card-img" src={exerciselog} />
      </div>
      <h3 className="h3-date">Date: {exercise.date}</h3>
      <H3Styled>Exercise Type: {exercise.exercise}</H3Styled>
      <H3Styled>Target Muscle: {exercise.muscle}</H3Styled>
      <H3Styled>Number of Sets: {exercise.sets}</H3Styled>
      <H3Styled>Number of Reps: {exercise.reps}</H3Styled>
      <H3Styled>Weight Lifted: {exercise.weight} lb</H3Styled>
      <NotesContainer>
        <h3 className="h3-notes">Notes:</h3>
        <p className="p-notes">{exercise.notes}</p>
      </NotesContainer>
    </CardContainer>    
  )
}