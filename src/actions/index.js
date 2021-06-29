import axios from 'axios';

export const FETCH_DATA = "FETCH_DATA";

export const getData = () => dispatch => {
  axios
    .get('http://localhost:4000/api/logs')
    .then(res => {
      dispatch({ type: FETCH_DATA, payload: res.data })
    })
    .catch(err => {
      console.error("error fetching data from api. err: ", err);
    });
};