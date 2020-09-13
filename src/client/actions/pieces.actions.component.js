export const TETROINTSET = "TETROINTSET";
export const SETSTATETETRO = "SETSTATETETRO";


export const tetroIntState = () => {
    return {
        type: TETROINTSET
    }
}

export const setStateTetro = (newState) => {
    return {
        type: SETSTATETETRO,
        newState
    }
}