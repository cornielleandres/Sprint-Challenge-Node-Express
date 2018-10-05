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
		background: lime;

		&:hover {
			background: black;
			color: lime;
			cursor: pointer;
		}
	}
`;

export default class CreateProject extends Component {
	state = {
		name: '',
		description: '',
	};

	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = e => {
		e.preventDefault();
		const newProject = { ...this.state };

		const URL = 'http://localhost:5000';
		axios
			.post(`${ URL }/api/projects`, newProject)
			.then(project => this.props.updateProjects())
			.catch(err => console.log(err));
	};

	render() {
		const { name, description } = this.state;
		return(
			<StyledForm className = 'fade-in-anim' onSubmit = { this.handleSubmit }>
				New Project Name:
				<input
					name = 'name'
					value = { name }
					onChange = { this.handleInputChange }
				/>

				New Project Description:
				<input
					name = 'description'
					value = { description }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</StyledForm>
		);
	}
};
