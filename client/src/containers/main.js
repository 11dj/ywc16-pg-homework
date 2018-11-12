import React from 'react'
import MainComponent from '../components/home'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getCheap,
  getCurrentCity,
  getBudget
} from '../actions/main'

import {
  openLoading
} from '../actions/loading'

import './style.css'

export class MainContainer extends React.Component {
  render () {
    return (
      <div className={'main-container'}> 
        <MainComponent {...this.props}/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    first: state.first,
    location: state.location,
    action: state.action,
    sky: state.sky

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCheap,
    getCurrentCity,
    openLoading,
    getBudget
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
