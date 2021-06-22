import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import SearchForm from './SearchForm';
import LogCard from './LogCard';
import Header from './Header';
import LastFiveLogs from './LastFiveLogs';


const BtnStyle = styled.button`
  background-color: #18181E;
  color: white;
  font-family: 'Karma', serif;
  height: 40px;
  border-color: #18181E;
  border-radius: 5px;
  margin-bottom: 5%;
`

export default function LastLog({ exerciseList }) {

  console.log("this is exerciseList in LastLog", exerciseList);

  // const reverseList = exerciseList.reverse();

  if (exerciseList.length === 0) {
    return (
      <div>
        <Header /> 
        <h3>You have no previous logs</h3>
        <Link to="/new-log">
          <BtnStyle>Create a new log</BtnStyle>
        </Link>
        <Link to="/new-log" className="material-icons floating-btn">add</Link>
      </div>
    );
  }
  else {
    return (
      <div>
        <Header /> 
        <SearchForm exerciseList={exerciseList} />
        
        <Link to="/new-log">
          <BtnStyle>Create a new log</BtnStyle>
        </Link>
        <Link to="/new-log" className="material-icons floating-btn">add</Link>
      </div>
    );
  };
};