import React, { Component } from 'react';
import axios from 'axios';

// Styles
import styled from 'styled-components';

const StyledForm = styled.form`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
	border-radius: 5px;
	padding: 5px;
	margin: 5px;

	* {
		margin: 5px;
	}

	input {
		border-radius: 5px;
		padding: 5px;
	}

	button {
		padding: 5px 10px;
		border-radius: 5px;
		background: fuchsia;

		&:hover {
			background: black;
			color: fuchsia;
			cursor: pointer;
		}
	}
`;

export default class CreateAction extends Component {
	state = {
		project_id: this.props.projectId,
		description: '',
		notes: '',
	};

	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = e => {
		e.preventDefault();
		const newAction = { ...this.state };

		const URL = 'http://localhost:5000';
		axios
			.post(`${ URL }/api/actions`, newAction)
			.then(action => this.props.updateProjects())
			.catch(err => console.log(err));
	};

	render() {
		const { description, notes } = this.state;
		return(
			<StyledForm className = 'fade-in-anim' onSubmit = { this.handleSubmit }>
				New Action Description:
				<input
					name = 'description'
					value = { description }
					onChange = { this.handleInputChange }
				/>

				New Action Notes:
				<textarea
					name = 'notes'
					value = { notes }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</StyledForm>
		);
	}
};
