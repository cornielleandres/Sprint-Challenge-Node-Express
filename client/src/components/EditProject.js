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

export default class EditProject extends Component {
	state = {
		project: {
			name: '',
			description: '',
			completed: false,
		},
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios
			.get(`${ URL }/api/projects/${ this.props.id }`)
			.then(project => this.setState({ project: project.data }))
			.catch(err => console.log(err));
	};

	handleInputChange = e => this.setState({
		project: {
			...this.state.project,
			[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
		}
	});

	handleSubmit = e => {
		e.preventDefault();
		const updatedProject = { ...this.state.project };

		const URL = 'http://localhost:5000';
		axios
			.put(`${ URL }/api/projects/${ this.props.id }`, updatedProject)
			.then(project => this.props.updateProjects())
			.catch(err => console.log(err));
	};

	render() {
		const { name, description, completed } = this.state.project;
		return(
			<StyledForm className = 'fade-in-anim' onSubmit = { this.handleSubmit }>
				Updated Project Name:
				<input
					name = 'name'
					value = { name }
					onChange = { this.handleInputChange }
				/>

				Updated Project Description:
				<input
					name = 'description'
					value = { description }
					onChange = { this.handleInputChange }
				/>

				Completed:
				<input
					type = 'checkbox'
					name = 'completed'
					checked = { completed }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>
			</StyledForm>
		);
	}
};
