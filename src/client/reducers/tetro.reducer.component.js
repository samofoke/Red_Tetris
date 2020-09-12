import { TETROINTSET, SETSTATETETRO } from '../actions/pieces.actions.component';

const initialState = new Array(20).fill(new Array(10).fill(0));

const tetroMino = (st = {}, ac) => {
    switch(ac.type) {
        case TETROINTSET:
            return {
                ...st,
                tetroState: initialState
            }
        case SETSTATETETRO:
            return {
                ...st,
                tetroState: ac.newState
            }
        default:
            return st;
    }
}

export default tetroMino;