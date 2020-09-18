// import alert from './alert'
// export default alert
import { ALERT_POP, HOST } from '../actions/client.server';
import { P_SERVER } from '../actions/server';

const alertsmg = (state, action) => {
    console.log("arlet send.!!!");
    return {
        ...state,
        message: action.message
    }
}

const accessServer = (state, action) => {
    console.log("are you running");
    return dispatch => {
        setTimeout(() => {
            console.log("ran successfully");
            dispatch("pinned perfectly");
        }, 1000);
    };
}

const updateplayerlist = (state, action) => {
    console.log("update player list.");
    return {
        ...state,
        playerlist: action.playerlist
    }
}

const reducer = (state = {}, action) => {
    switch(action.type) {
        case ALERT_POP: return alertsmg(state, action);
        case P_SERVER: return accessServer(state, action);
        //default: return state;
        case HOST: return updateplayerlist(state, action);
        default: console.log("didn't work as expected"); return state;
    }
}

export default reducer;

