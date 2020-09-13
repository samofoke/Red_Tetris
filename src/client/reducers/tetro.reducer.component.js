import { TETROINTSET, SETSTATETETRO } from '../actions/pieces.actions.component';

const initialState = new Array(20).fill(new Array(10).fill(0));

const tetroMino = (state = {}, action) => {
    switch(action.type) {
        case TETROINTSET:
            return {
                ...state,
                tetroState: initialState
            }
        case SETSTATETETRO:
            return {
                ...state,
                tetroState: action.newState
            }
        default:
            return state;
    }
}

export default tetroMino;