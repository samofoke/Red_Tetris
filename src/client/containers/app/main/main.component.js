import React from 'react';
import { connect } from 'react-redux';
import styles from './main.style.css';
import PlayerList from '../../../components/playerlist/listofplayers.component';
import PlayerForm from '../../../components/form.component/form.component';
import ShadowBoard from '../../../components/shadowboard.component/shadowboard.component';
import Board from '../../../components/Board.component/Board.component';
import GameData from '../../../components/data.component/data.component';
import Button from '../../../components/button.component/button.component';
import EndGameLeaderBoard from '../../../components/endGame.component/endGame.component';
//import socket from '../../../socket';
import { updatePlayerName, updateSelectedGame, resetState } from '../../../actions/client.server';
import { serverCreateGame, serverJoinGame, serverAddNewPlayerToLobby, serverStartGame, serverQuitGame } from '../../../actions/server';


const Main = ( props ) => {
	const startGame = () => {
		props.serverStartGame();
	}

	const quitGame = () => {
		props.serverQuitGame();
		props.resetState({playerName: props.playerName});
		window.history.pushState(null, '', '/');
	}

	const updateName = () => {
		let name = document.getElementById('playerInputName').value;

		if (name != undefined && name.length > 0) {
			props.serverAddNewPlayerToLobby(name);
			props.onUpdatePlayerName(name);
		}
	}

	let buttons = null;
	let content = null;

	if (props.playerName === undefined || props.playerName.length == 0) {
		content = (
			<div className={styles.playerFormContainer}>
				<PlayerForm onUpdateName={updateName}></PlayerForm>
			</div>
		);
	}
	else {
		let startButton = null;
		if (props.isHost) {
			if (!props.gameStart) {
				startButton = <Button onClick={startGame} value="Start Game"/>;
			}
		}
		if (props.gameJoined) {
			buttons = (
				<div className={styles.buttons}>
					<div>
						{startButton}
						<Button id="quitGameButton" onClick={quitGame} value="Quit Game"/>
					</div>
				</div>
			);
		}

		let endGameContent = null;
		if (props.endGame) {
			endGameContent = <EndGameLeaderBoard
				uuid={props.playerUUID}
				isWinnerByScore={props.isWinnerByScore}
				isWinner={props.isWinner}
				playersInfo={props.shadowState}
				playersLostList={props.playersLostList}
			/>
		}

		if (props.gameJoined) {
			content = (
				<div className={styles.gameArea}>
					<div className={styles.shadowBoard}>
						<ShadowBoard playerUUID={props.playerUUID} shadowState={props.shadowState}/>
					</div>
					<div className={styles.boardWrapper}>
						<Board gameState={props.gameState}/>
						{endGameContent}
					</div>
					<div>
						<GameData gameData={props.gameState}/>
					</div>
				</div>
			)
		}
		else {
			content = (
				<PlayerList
					hostList={props.hostList}
					gameSelected={props.gameSelected}
					onSelectGame={props.onSelectGame}
					createGame={props.serverCreateGame}
					joinGame={props.serverJoinGame}>
				</PlayerList>
			);
		}
	}
	return (
		<div className={styles.main}>
			{content}
			{buttons}
		</div>
	)
}

const mapStateToProps = (state) => {

	return {
		hostList: state.hostList,
		playerName: state.playerName,
		gameSelected: state.gameSelected,
		gameJoined: state.gameJoined,
		gameState: state.gameState,
		shadowState: state.shadowState,
		isHost: state.isHost,
		playerUUID: state.playerUUID,
		gameStart: state.gameStart,
		isWinner: state.isWinner,
		isWinnerByScore: state.isWinnerByScore,
		endGame: state.endGame,
		leaderBoard: state.leaderBoard,
		playersLostList: state.playersLostList
	}
}

const mapDispatchToProps = dispatch => {
	return {
		serverAddNewPlayerToLobby: name => dispatch(serverAddNewPlayerToLobby(name)),
		serverStartGame: () => dispatch(serverStartGame()),
		serverQuitGame: () => dispatch(serverQuitGame()),

		onUpdatePlayerName: playerName => dispatch(updatePlayerName(playerName)),
		onSelectGame: hostID => dispatch(updateSelectedGame(hostID)),
		onUpdateGameJoined: gameJoined => dispatch(onUpdateGameJoined(gameJoined)),
		resetState: action => dispatch(resetState(action)),
		serverCreateGame: () => dispatch(serverCreateGame()),
		serverJoinGame: gameSelected => dispatch(serverJoinGame(gameSelected))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);