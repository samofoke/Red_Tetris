import React from 'react';
import { connect } from 'react-redux';
import mycss from './app.css';


const App = ({message}) => {
  return (
    <div className={mycss.app}>
      <span>{message}</span>
      <span>Red Tetris</span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}


export default connect(mapStateToProps, null)(App)


