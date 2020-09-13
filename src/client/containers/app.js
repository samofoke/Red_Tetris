import React from 'react';
import { connect } from 'react-redux';
import { tetroIntState } from '../actions/pieces.actions.component';
import tetrodisplay from './displayer.component';

// const App = (props) => {
//   return (
//     <div>
//       I am working fine for now!!
//     </div>
//   )
// }

// export default App

export const App = (props) => {
  return (
    <div>
      <span style={{display: "block"}}>Red Tetris</span>
      <tetroIntState />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {}
};

const reduxApp = connect (
  mapStateToProps,
  mapDispatchToProps
)(App);

export default reduxApp;
// const App = ({message}) => {
//   return (
//     <span>{message}</span>
//   )
// }

// const mapStateToProps = (state) => {
//   return {
//     message: state.message
//   }
// }
// export default connect(mapStateToProps, null)(App)


