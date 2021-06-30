import axios from 'axios';

export const FETCH_DATA = "FETCH_DATA";

export const FETCH_LAST_FIVE = "FETCH_LAST_FIVE";

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

export const getLastFive = () => dispatch => {
  axios
    .get('http://localhost:4000/api/logs/last-five')
    .then(res => {
      dispatch({ type: FETCH_LAST_FIVE, payload: res.data })
    })
    .catch(err => {
      console.error("error fetching data from api. err: ", err);
    });
};