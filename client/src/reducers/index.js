import { combineReducers } from 'redux'

import location from './location'
import sky from './skyscanner'
import action from './action'

const rootReducer = combineReducers({
  location,
  sky,
  action
})

export default rootReducer
