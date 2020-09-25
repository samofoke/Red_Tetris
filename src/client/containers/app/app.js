import React from 'react';
import { connect } from 'react-redux';
import mycss from './app.css';
import Uni_Button from '../../components/button.component/button.component';
import { alert } from '../../actions/client.server';
//import { store } from '../../index';
import { pingServer } from '../../actions/server';
import Nav from '../../components/navbar/navbar.component';
import Main from '../../containers/app/mainControl/mainControl.component';
import * as ActionNames from '../../../server/ActionsOntherServer';
import {socket} from '../../socket';

const App = (props) => {

  const keyboardEvent = (event) => {

    if (props.joinedGame) {
      if (event.keyCode == 37) {
        socket.emit(ActionNames.GAME_ACTION, "left")
      }
    }else {
      console.log("left is not working.")
    }
  }
  return (
    <div className={mycss.app} tabIndex="0" onKeyDown={keyboardEvent}>
      <Nav></Nav>
      <Main></Main>
      {/* /*<span>{message}</span>
      <span>testing</span>
      <Uni_Button onClick={() => onClick()}
      >
        Press
      </Uni_Button> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    joinedGame: state.joinedGame
  }
}

// const mapDispatchToProps = dispatch => {
//   console.log("mapping correctly\n");
//   return {
//     onClick: () => {dispatch(pingServer)}
//   }
// }


export default connect(mapStateToProps, null)(App);


