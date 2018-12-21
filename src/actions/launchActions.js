import axios from 'axios'

const api_uri =
  "https://api.spacexdata.com/v3/launches?launch_year=2018&order=desc&limit=20";

export function getLaunches() {
  const action_type = 'GET_LAUNCHES'
  return dispatch => {
    // Dispatch the action for telling our reducer that the API call is in progress
    dispatch({type: `${action_type}_PENDING`});
    axios.get(api_uri)
      .then(({data}) => {
          dispatch({
            type: `${action_type}_FULFILLED`,
            payload: data
          });
      })
      .catch(err => {
          // Dispatch the error action with error information
          dispatch({
            type: `${action_type}_REJECTED`,
            error: err.response.data
          });
          // console.log(err.response.data.message);
      });
  };
}