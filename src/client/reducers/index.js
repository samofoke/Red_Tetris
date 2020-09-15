// import alert from './alert'
// export default alert
import { ALERT_POP } from '../actions/client.server';
import { P_SERVER } from '../actions/server';

const Alert = (state, action) => {
    console.log("arlet send.!!!");
    return {
        ...state,
        message: action.message
    }
}

const accessServer = (state, action) => {
    return dispatch => {
        setTimeout(() => {
            console.log("ran successfully");
            dispatch("pinned perfectly");
        }, 1000);
    };
}

const reducer = (state = {}, action) => {
    switch(action.type) {
        case ALERT_POP: return Alert(state, action);
        case P_SERVER: return accessServer(state, action);
        default: return state;
    }
}

export default reducer;

