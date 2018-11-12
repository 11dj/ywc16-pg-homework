import React, { Component } from 'react';
import './App.css';
// import DataList from './../dataList'

import BudgetComponent from './budgetDiv'
import CheapComponent from './cheapDiv'

class MainComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      keyword: ''
    }
  }

  componentWillMount () {
    this.props.getCurrentCity()
  }

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.location.city !== this.props.location.city) this.setState({ keyword: nextProps.location.city })
  // }

  handleInputChange = (e) => {
    this.setState({ keyword: e.target.value })
  }

  submit = () => {
    if (this.props.location.ip) {
      if (this.state.keyword) {
        this.props.openLoading()
        if (/\d/.test(this.state.keyword)) {
          console.log(`${this.state.keyword} is a number`)
          this.props.getBudget(this.props.location.ip ,this.state.keyword)
        } else {
          this.props.getCheap(this.props.location.ip ,this.state.keyword)
        }
      } else {
        alert('ใส่ข้อมูลให้ครบถ้วน')
      }
    } else {
      alert('กำลังหาต้นทางของคุณอยู่ครับ')
    }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submit()
    }
  }

  clear () {
    this.setState({ keyword: '' })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        เที่ยวไหน[ถูก]ดี?
        </header>
        <div className='App-body'>
          <div className='first_topic'>
            {
              this.props.location.city ? `ต้นทางของคุณ คือ ${this.props.location.city}`: `กำลังหาต้นทางของคุณ. . . `
            }
          </div>
          <div>
            <input
            type="text"
            className={'search-input'}
            placeholder='ระบุงบประมาณหรือ ชื่อเมือง ที่ต้องการเดินทาง'
            value={this.state.keyword}
            onChange={this.handleInputChange.bind(this)}
            onKeyPress={this._handleKeyPress}
            />
            <button className="search-btn" onClick={this.submit.bind(this)} >
            หาเลย
            </button>
          </div>
          <div className='loading_div'>
            {this.props.action.onLoading ? (
              'กำลังค้นหาข้อมูล. . . .'
            ) : '' }
          </div>
          <div className='loading_div'>
            {this.props.action.errorText ? (
              'ไม่พบข้อมูล หรือ เซิฟเวอร์ขัดข้อง กรุณาลองใหม่'
            ) : '' }
          </div>
          <div>
            {
              this.props.sky.type === 'budget' ?
              <BudgetComponent
              result={this.props.sky.result || []}/>
              : ''
            }
          </div>
          <div>
            {
              this.props.sky.type === 'cheap' ?
              <CheapComponent
              origin={this.props.location.city}
              destination={this.props.sky.destination}
              result={this.props.sky.result || []}/>
              : ''
            }
          </div>
          
        </div>
        <div className="footer">
          Powered by Skyscanner API
        </div>
      </div>
    );
  }
}

export default MainComponent;
