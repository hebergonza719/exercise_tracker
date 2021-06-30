import { axiosWithAuth } from '../utils/axiosWithAuth';

export const FETCH_DATA = "FETCH_DATA";

export const FETCH_LAST_FIVE = "FETCH_LAST_FIVE";

export const getData = () => dispatch => {
  axiosWithAuth()
    .get(`${process.env.REACT_APP_BACKEND_URL}/logs/${localStorage.getItem('user_id')}`)
    .then(res => {
      dispatch({ type: FETCH_DATA, payload: res.data })
    })
    .catch(err => {
      console.error("error fetching data from api. err: ", err);
    });
};

export const getLastFive = () => dispatch => {
  axiosWithAuth()
    .get(`${process.env.REACT_APP_BACKEND_URL}/logs/${localStorage.getItem('user_id')}/last-five`)
    .then(res => {
      dispatch({ type: FETCH_LAST_FIVE, payload: res.data })
    })
    .catch(err => {
      console.error("error fetching data from api. err: ", err);
    });
};