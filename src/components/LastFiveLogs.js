import React from "react";
import styled from "styled-components";
import LogCard from "./LogCard";

const TitleStyled = styled.h3`
  background-color: #18181E;
  color: #DEC79B;
  margin-left: 10%;
  margin-right: 10%;
`

export default function LastFiveLogs({ exerciseList }) {
  return (
    <div>
      <TitleStyled>Your last five logs:</TitleStyled>
      {exerciseList.slice(-5).map((exercise) =>
        <LogCard exercise = {exercise} /> 
      )}
    </div>
  )
};