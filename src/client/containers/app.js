import React from 'react';
import { connect } from 'react-redux';
import mycss from './app.css';
import Uni_Button from '../components/button.component/button.component';
import { alert } from '../actions/alert';
import { store } from '../index';
import Button from '../components/button.component/button.component';


const App = ({message}) => {
  return (
    <div className={mycss.app}>
      <span>{message}</span>
      <span>Red Tetris</span>
      <Button onClick={() => onClick()}
      >
        Press
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const mapDispatchToProps = dispatch => {
  console.log("mapping correctly\n");
  return {
    onClick: () => {dispatch(alert("Success"))}
  }
}


export default connect(mapStateToProps, null)(App)


