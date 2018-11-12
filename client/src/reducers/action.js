const initialState = {
  onLoading: false,
  errorText: ''
}

const action = (state = initialState, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case 'LOADING_ON':
      nextState = {
        onLoading: true,
        errorText: ''
      }
      return nextState
    case 'LOADING_OFF':
    case 'GET_CHEAP_INFO':
    case 'GET_BUDGET_INFO':
      nextState.onLoading = false
      return nextState
    case 'GET_BUDGET_ERROR':
    case 'GET_CHEAP_ERROR':
      nextState = {
        onLoading: false,
        errorText: action.payload
      }
      return nextState
    default:
      return state
  }
}

export default action
