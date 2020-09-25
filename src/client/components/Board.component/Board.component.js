import React from 'react';
import bd from './Board.style.css';

const BdGame = (props) => {

    let cxt = <div>Board Empty</div>;
    let blkClass = [];
    blkClass.push(bd.blks);

    if (props.gameState) {
        console.log("launched Game state.");
        cxt = props.gameState.map( rw => {
            console.log("row: ", rw);
            let ln = rw.map( blks => {
                let xpl = [...blkClass];
                xpl.push(bd[blks]);
                xpl = xpl.join(' ');
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
