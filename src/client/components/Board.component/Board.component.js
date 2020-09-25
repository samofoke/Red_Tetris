import React from 'react';
import bd from './Board.style.css';

const BdGame = (props) => {

    let cxt = <div>Board Empty</div>;

    if (props.gameState) {
        console.log("launched Game state.");
        cxt = props.gameState.map( rw => {
            console.log("row: ", rw);
            let ln = rw.map( blks => {
                return <div className={bd.blks}>{blks}</div>;
            });
            ln = <div className={bd.rw}>{ln}</div>;
            return ln;
        })
    }

    return (
        <div className={bd.bord}>
            {cxt}
        </div>
    );
}


export default BdGame;
