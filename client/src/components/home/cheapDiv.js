import React, { Component } from 'react';
import './App.css';

class CheapComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      keyword: '',
      listA: this.props.result,
      indexList: 0
    }
  }

  choose (key, e) {
    console.log(key)
    this.setState({ indexList: key })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.result !== this.state.listA) {
      this.setState({ listA: nextProps.result})
    }
  }


  render() {
    // let newRes = this.props.result
    // let minPriceMon = newRes.sort((a,b) => (a.minPrice > b.minPrice) ? 1 : ((b.minPrice > a.minPrice) ? -1 : 0))[0]
    // console.log(minPriceMon)
    return (
      <div className="cheap-container">
        <div className='cheap-h'>
          {`เที่ยวบินระหว่าง ${this.props.origin} กับ ${this.props.destination}`}
          {/* <div>{this.props.origin}</div>
          <div>---    *    --</div>
          <div>{this.props.destination}</div> */}
        </div>
        <div className='cheap-topic'>ราคาถูกสุดในแต่ละเดือน</div>
        <div className="cheap-month-listx">
          <div className="cheap-month-list">
            {
              (this.props.result || [] ).map((x,i) =>
                <div key={i}
                style={{ opacity: `${ this.state.indexList === i ? '1' : '0.3'}`}}
                className='cheap-month-div'
                onClick={this.choose.bind(this, i)}>
                  <div className='cheap-month-date'>{x.date}</div>
                  <div className='cheap-month-price'>{`${x.minPrice} ฿`}</div>
                </div>
              )
            }
          </div>
        </div>
        <div className='cheap-topic'>{`รายการที่บินในเดือน ${this.state.listA[this.state.indexList].date}`}</div>
        <div className="cheap-list-divxy">
          <div className='cheap-list-divx'>
          { 
            (this.state.listA[this.state.indexList].list.sort((a,b) => (a.MinPrice > b.MinPrice) ? 1 : ((b.MinPrice > a.MinPrice) ? -1 : 0)) || []).map((x,i) =>
            <div key={i} className='cheap-list-div'>
              <div className='cheap-list-topx'>
                <div>รายการที่ {i+1} </div>
                <div>{`ราคา ${x.MinPrice} ฿`}</div>
              </div>
              <div className='cheap-list-top'>
                <div>
                  <div>
                    <img src="/img/dep.png" alt=""/>
                  </div>
                  <div>{`ขาไป ${(new Date(x.OutboundLeg.DepartureDate)).getDate()}/${(new Date(x.OutboundLeg.DepartureDate)).getMonth() + 1}/${(new Date(x.OutboundLeg.DepartureDate)).getFullYear()}`} </div>
                  <div>{`โดย ${x.OutboundLeg.FlightName}`}</div>
                </div>
                <div>
                <div>
                    <img src="/img/arv.png" alt=""/>
                  </div>
                <div>{`ขากลับ ${(new Date(x.InboundLeg.DepartureDate)).getDate()}/${(new Date(x.InboundLeg.DepartureDate)).getMonth() + 1}/${(new Date(x.InboundLeg.DepartureDate)).getFullYear()}`} </div>
                  <div>{`โดย ${x.InboundLeg.FlightName}`}</div>
                </div>
              </div>
            </div>
          )
          }

          </div>
        </div>
      </div>
    );
  }
}

export default CheapComponent
