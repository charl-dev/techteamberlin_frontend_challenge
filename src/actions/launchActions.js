import axios from 'axios'

const api_uri =
  "https://api.spacexdata.com/v3/launches?launch_year=2018&order=desc&limit=20";

// export function getLaunches() {
//     return dis
//     // make a request to the spacex api
//     axios
//       .get(api_uri)
//       .then(({ data }) => {
//         this.setState({
//           launches: data,
//           loading: false
//         });
//       })
//       .catch(err => {
//         alert("Something is wrong, please refresh the page!");
//       });
// }

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
          // console.log('here is the data', data);
      })
      .catch(err => {
          // Dispatch the error action with error information
          dispatch({
            type: `${action_type}_REJECTED`,
            error: err.response.data
          });
          console.log(err.response.data.message);
      });
  };
}