import React from 'react';
import { connect } from 'react-redux';
import con from './mainControl.style.css';
import Player from '../../../components/playerlist/listofplayers.component';

const mainFunction = (props) => {
    return (
        <div className={con.control}>
            <Player playerlist={props.playerlist}></Player>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        playerlist: state.playerlist
    }
}

export default connect(mapStateToProps, null)(mainFunction);