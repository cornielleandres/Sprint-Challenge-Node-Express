import React, { Component } from 'react';
import axios from 'axios';

// Components
import Action from './Action';

// Styles
import styled from 'styled-components';

const ProjectDetailsDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	margin: 5px;
	padding: 5px;
	width: 50%;

	.add-action-btn {
		border-radius: 5px;
		padding: 5px 10px;
		background: purple;
		color: white;

		&:hover {
			background: black;
			color: pink;
			cursor: pointer;
		}
	}
`;

export default class ProjectDetails extends Component {
	state = {
		project: {
			id: 0,
			name: '',
			description: '',
			completed: false,
			actions: [],
		},
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios
			.get(`${ URL }/api/projects/${ this.props.id }`)
			.then(project => this.setState({ project: project.data }))
			.catch(err => console.log(err));
	}

	render() {
		const { project } = this.state;
		const { goToAction, goToCreateAction } = this.props;
		return(
			<ProjectDetailsDiv className = 'fade-in-anim'>
				<p>ID: { project.id }</p>
				<p>Name: { project.name }</p>
				<p>Description: { project.description }</p>
				<p>Completed: { project.completed ? 'true' : 'false' }</p>

				<hr />

				<p>Actions:</p>
				<div className = 'actions'>
					{ project.actions.map((action, i) => <Action key = { i } goToAction = { goToAction } action = { action } />) }
				</div>

				<button className = 'add-action-btn' onClick = { () => goToCreateAction(project.id) }>Add New Action</button>
			</ProjectDetailsDiv>
		);
	}
};
