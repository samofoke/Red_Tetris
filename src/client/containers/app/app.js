import React from 'react';
import { connect } from 'react-redux';
import mycss from './app.css';
import Uni_Button from '../../components/button.component/button.component';
import { alert } from '../../actions/client.server';
import { store } from '../../index';
import { pingServer } from '../../actions/server';


const App = ({message}) => {
  return (
    <div className={mycss.app}>
      <span>{message}</span>
      <span>Red Tetris</span>
      <Uni_Button onClick={() => onClick()}
      >
        Press
      </Uni_Button>
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
    onClick: () => {dispatch(alert(pingServer))}
  }
}


export default connect(mapStateToProps, null)(App)


