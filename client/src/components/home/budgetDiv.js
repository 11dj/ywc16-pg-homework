import React, { Component } from 'react';
import './App.css';

class BudgetComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      keyword: '',
      sorted: false,
      list: this.props.result
    }
  }

  sorted =() => {
    this.setState({ list: this.state.list.reverse(), sorted: !this.state.sorted })
  }

  render() {
    return (
      <div className="budget-container">
      <div className='budget-sort-btn-div'>
        <button className='budget-sort-btn' onClick={this.sorted.bind(this)}>
          {`${ this.state.sorted ? 'แพงสุดไปถูกสุด' : 'ถูกสุดไปแพงสุด'}`}
        </button>
      </div>
        <div style={{ marginTop: '40px'}}>
        {
          ( this.state.list || [1,2,3,4]).map((x, i) => 
            <div key={i} className='budget-list-div'>
              <div className='budget-topic-list-div'>
                <div>
                  {`${i+1}. ไป ${x.city} (${x.country})`}
                </div>
                <div>{`ราคา ${x.minPrice} บาท`}</div>
              </div>
              <div className='budget-body-list-div'>
                <div className='budget-date-div'>
                  <img src="/img/dep.png" alt=""/>
                  <div>
                    {`ไปวันที่ ${(new Date(x.departureDate)).getDate()}/${(new Date(x.departureDate)).getMonth() + 1}/${(new Date(x.departureDate)).getFullYear()}`}
                  </div>
                  <div>
                    {`โดยสายการบิน ${x.departureFlight}`}
                  </div>
                </div>
                <div className='budget-date-div'>
                <img src="/img/arv.png" alt=""/>
                  <div>
                    {`กลับวันที่ ${(new Date(x.arrivalDate)).getDate()}/${(new Date(x.arrivalDate)).getMonth() + 1}/${(new Date(x.arrivalDate)).getFullYear()}`}
                  </div>
                  <div>
                    {`โดยสายการบิน ${x.arrivalFlight}`}
                  </div>
                </div>
              </div>
            </div>
          )
        }

        </div>
      </div>
    );
  }
}

export default BudgetComponent
