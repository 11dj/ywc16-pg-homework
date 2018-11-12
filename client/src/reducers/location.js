
const initialState = {
  ip: '49.229.219.72',
  city: 'Bangkok',
  country: '',
  lat: 0,
  lng: 0
}

const location = (state = initialState, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case 'GET_IP':
      return Object.assign({}, nextState, action.payload)
    default:
      return state
  }
}

export default location
