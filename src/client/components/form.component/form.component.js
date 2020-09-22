import React from 'react'
import { connect } from 'react-redux'
import ps from './form.style.css'

const PlayerForm = ( props ) => {

	return (
		<div className={ps.fs}>
			<input type="text" id="inputName" />
			<br/>
			<input value="FUN" type="button" onClick={props.onUpdateName} />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		// playerlist
	}
}

export default PlayerForm