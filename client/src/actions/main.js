import axios from 'axios'


export const getCheap = (origin, keyword) => {
  return function (dispatch) {
    axios.post('/api/skyscanner/getSky',
    { origin, keyword },
    { headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        dispatch({
          type: 'GET_CHEAP_INFO',
          payload: response.data
        })
      } else {
        dispatch({
          type: 'GET_CHEAP_ERROR',
          payload: response.data
        })
      }
    })
    .catch(function (error) {
      console.log(error);
      dispatch({
        type: 'GET_CHEAP_ERROR',
        payload: error
      })
    });
  }
}

export const getBudget = (origin, budget) => {
  return function (dispatch) {
    console.log(origin, budget)
    axios.post('/api/skyscanner/getBudget',
    { origin, budget },
    { headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      console.log('code', response)
      if (response.status === 200) {
        dispatch({
          type: 'GET_BUDGET_INFO',
          payload: response.data
        })
      } else {
        dispatch({
          type: 'GET_BUDGET_ERROR',
          payload: response.data
        })
      }
    })
    .catch(function (error) {
      console.log(error);
      dispatch({
        type: 'GET_BUDGET_ERROR',
        payload: error
      })
    });
  }
}

export const getCurrentCity = (l) => {
  return function (dispatch) {
    axios.get('/api/ip/getIP')
    .then((response) => {
      dispatch({
        type: 'GET_IP',
        payload: {
          ip: response.data.address,
          city: response.data.city.split('(')[0] || response.data.city,
          country: response.data.country
        }
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
