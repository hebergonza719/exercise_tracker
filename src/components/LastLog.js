import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import SearchForm from './SearchForm';

import { connect } from "react-redux";

const BtnStyle = styled.button`
  background-color: #18181E;
  color: white;
  font-family: 'Karma', serif;
  height: 40px;
  border-color: #18181E;
  border-radius: 5px;
  margin-bottom: 5%;
`

// function LastLog({ exerciseList, logs }) {
function LastLog({ logs }) {
  if (logs.length === 0) {
    return (
      <div>
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
        <SearchForm exerciseList={logs} />
        
        <Link to="/new-log">
          <BtnStyle>Create a new log</BtnStyle>
        </Link>
        <Link to="/new-log" className="material-icons floating-btn">add</Link>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    logs: state.logs
  };
};

export default connect (
  mapStateToProps
)(LastLog);