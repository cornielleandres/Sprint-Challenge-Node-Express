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

export default class EditAction extends Component {
	state = {
		action: {
			project_id: 0,
			description: '',
			notes: '',
			completed: false,
		},
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios
			.get(`${ URL }/api/actions/${ this.props.actionId }`)
			.then(action => this.setState({ action: action.data }))
			.catch(err => console.log(err));
	};

	handleInputChange = e => this.setState({
		action: {
			...this.state.action,
			[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
		}
	});

	handleSubmit = e => {
		e.preventDefault();
		const updatedAction = { ...this.state.action };

		const URL = 'http://localhost:5000';
		axios
			.put(`${ URL }/api/actions/${ this.props.actionId }`, updatedAction)
			.then(action => this.props.updateProjects())
			.catch(err => console.log(err));
	};

	render() {
		const { description, notes, completed } = this.state.action;
		return(
			<StyledForm className = 'fade-in-anim' onSubmit = { this.handleSubmit }>
				Updated Action Description:
				<input
					name = 'description'
					value = { description }
					onChange = { this.handleInputChange }
				/>

				Updated Project Description:
				<input
					name = 'notes'
					value = { notes }
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
