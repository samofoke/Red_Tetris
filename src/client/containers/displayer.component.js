import React from 'react';
import { connect } from 'react-redux';
//import '../css/display.component.style.css';


const colorBoard = ["gray", "black", "green"];

export const tetroDisplay = (tetroState) => {
    return (
        <dev className="tetro-display">
            {tetroState.map((row, index) => {
                return (
                    <div key={index} className="tetro-row">
                        {row.map((tcase, index) =>
                        <div
                        className="tcase"
                        key={index}
                        style={{color: colorBoard[tcase]}}
                        >
                        </div>
                        )}
                    </div>
                )
            })}
        </dev>
    )
}

const tetroArray = [];

const mapStateToProps = (state) => {
    return {
        tetroState: state.tetroreducer.tetroState || tetroArray,
    };
};

const mapDispatchToProps = dispatch => {
    return {}
};

const reduxTetroDisplayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(tetroDisplay);

export default reduxTetroDisplayer;