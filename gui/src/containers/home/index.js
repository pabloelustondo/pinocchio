import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
    selectTestCase,
    unSelectTestCase,
  incrementAsync,
  incrementAsyncAPI,
  decrement,
  decrementAsync,
} from '../../modules/counter'

const Home = props => (
  <div>
      <button onClick={props.incrementAsyncAPI}>Get Test Results</button>
      <p>Number of Test Cases: {props.count}</p>
      <p>Selected Test Case: {props.selected}</p>


      Test Cases:

      {props.list.map( l =>
          <div key={l.id} onClick={() => props.selectTestCase(l.id)}>
          <div >{l.id}</div>
              <div hidden={props.selected !== l.id}>
                  <h4>Current:</h4>
              <img  src={'http://localhost:3001/' + l.id} style={{width: '100%'}}/>
                  <h4>Baseline:</h4>
              <img  src={'http://localhost:3001/' + l.id} style={{width: '100%'}}/>
              </div>
          </div>

      )}

      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
        Increment Async
      </button>
  </div>
)

const mapStateToProps = ({ counter }) => ({
    selected: counter.selected,
    list: counter.list,
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
        selectTestCase,
        unSelectTestCase,
      incrementAsync,
        incrementAsyncAPI,
      decrement,
      decrementAsync,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
