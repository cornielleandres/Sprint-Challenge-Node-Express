import React, { Component } from 'react';
import axios from 'axios';

// Styles
import styled from 'styled-components';

const ActionDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	margin: 5px;
	padding: 5px;
	width: 50%;

	.buttons {
		button {
			border-radius: 5px;
			padding: 5px 10px;
		}

		.edit-btn {
			background: purple;
			color: white;

			&:hover {
				background: black;
				color: pink;
				cursor: pointer;
			}
		}
	}
`;

export default class ActionDetails extends Component {
	state = {
		action: {
			id: 0,
			project_id: 0,
			description: '',
			notes: '',
			completed: false,
		},
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios
			.get(`${ URL }/api/actions/${ this.props.id }`)
			.then(action => this.setState({ action: action.data }))
			.catch(err => console.log(err));
	};

	render() {
		const { id, project_id, description, notes, completed } = this.state.action;
		const { goToEditAction } = this.props;
		return(
			<ActionDiv>
				<p>ID: { id }</p>
				<p>Project ID: { project_id }</p>
				<p>Description: { description }</p>
				<p>Notes: { notes }</p>
				<p>Completed: { completed ? 'true' : 'false' }</p>

				<div className = 'buttons'>
					<button className = 'edit-btn' onClick = { () => goToEditAction(id) }>Edit Action</button>
				</div>
			</ActionDiv>
		);
	}
};
