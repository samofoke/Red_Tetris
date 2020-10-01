import React from 'react';
import { connect } from 'react-redux';
import styles from './app.css';
//import Uni_Button from '../../components/button.component/button.component';
import { alert } from '../../actions/client.server';
//import { store } from '../../index';
//import { pingServer } from '../../actions/server';
import Main from './main/main.component';
import Nav from '../../components/navbar/navbar.component';
//import Modal from '../../components/modal.component/modal.component';
import { serverGameAction } from '../../actions/server';
//import * as ActionNames from '../../../server/ActionsOntherServer';
//import {socket} from '../../socket';

const App = (props) => {

	function KeyboardController(keys, repeat) {
		var timers = {};
		var locked = {};

		var lockedKey = [38, 32, 48, 96];

		document.onkeydown = (event) => {
			if (props.gameJoined) {
				let key = event.keyCode;
				if (!(key in keys) || !repeat) {
					return true;
				}
				if (lockedKey.includes(key)) {
					if (!(key in locked)) {
						keys[key]();
						locked[key] = key;
					}
				} else if (!(key in timers)) {
					timers[key] = null;
					keys[key]();
					timers[key] = setInterval(keys[key], repeat);
				}
			}
		};

		document.onkeyup = (event) => {
			let key = event.keyCode;
			if (key in timers) {
				if (timers[key] != null) {
					clearInterval(timers[key]);
					delete timers[key];
				}
			}
			else if (key in locked) {
				delete locked[key];
			}
		};
	}

	KeyboardController({
		32: function() { props.serverGameAction("downShortcut") },
    	37: function() { props.serverGameAction("left") },
    	38: function() { props.serverGameAction("rotate") },
    	39: function() { props.serverGameAction("right") },
    	40: function() { props.serverGameAction("down") },
		48: function() { props.serverGameAction("savePiece") },
		96: function() { props.serverGameAction("savePiece") }

	}, 125);

	if (props.errorMessage) {
		return (
			<div className={styles.error}>
				<span>ERROR : {props.errorMessage}</span>
			</div>
		)
	}

	return (
		<div className={styles.app} tabIndex="0">
			<Nav></Nav>
			<Main></Main>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		gameJoined: state.gameJoined,
		errorMessage: state.errorMessage,
		showInstructions: state.showInstructions
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleInstructions: () => dispatch(toggleInstructions()),
		serverGameAction: gameAction => dispatch(serverGameAction(gameAction))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


