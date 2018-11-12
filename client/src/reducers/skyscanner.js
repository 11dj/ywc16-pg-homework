
const initialState = {
  destination: '',
  result: [
    {
      list:[]
    }
  ],
  type: ''
}

const sky = (state = initialState, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case 'GET_IP':
      return Object.assign({}, nextState, action.payload)
    case 'CLEAR_SKY':
      return initialState
    case 'GET_CHEAP_INFO':
      console.log('GET GET_CHEAP_INFO', action.payload)
      nextState.result = action.payload.main
      nextState.destination = action.payload.destination
      nextState.type = 'cheap'
      return nextState
      case 'GET_BUDGET_INFO':
      console.log('GET GET_CHEAP_INFO', action.payload)
      nextState.result = action.payload
      nextState.type = 'budget'
      return nextState
    default:
      return state
  }
}

export default sky
