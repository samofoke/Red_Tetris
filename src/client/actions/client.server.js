export const ALERT_POP = 'ALERT_POP'

export const alert = (message) => {
  console.log("The mesaage took place.")
  return {
    type: ALERT_POP,
    message
  }
}

export const HOST = 'HOST';

export const updatePlayerList = (h) => {
  console.log("The host is updated.!!");
  return {
    type: HOST,
    h
  }
}

export const UPDATE_PLAYER = 'UPDATE_PLAYER';

export const updatePlayer = (pn) => {
  return {
    type: UPDATE_PLAYER,
    pn
  }
}

export const UPDATE_GAME_SELECTED = 'UPDATE_GAME_SELECTED';

export const updateGameSelected = (puuid) => {
  return {
    type: UPDATE_GAME_SELECTED,
    puuid
  }
}

export const UPDATE_JOINED_GAME = 'UPDATE_JOINED_GAME';

export const updateJoinGame = (joinedgame) => {
  console.log("The player has joined the game.");
  return {
    type: UPDATE_JOINED_GAME,
    joinedgame
  }
}

