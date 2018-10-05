import React from 'react';

// Styles
import styled from 'styled-components';

const ProjectDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	margin: 5px;
	padding: 5px;
	width: 50%;

	&:hover {
		background: #ddd;
		cursor: pointer;
	}

	button {
		padding: 5px 10px;
		border-radius: 5px;
		background: blue;
		color: white;

		&:hover {
			background: black;
			color: cyan;
			cursor: pointer;
		}
	}
`;

const Project = props => {
	const { project, goToProject, goToEditProject } = props;
	return(
		<ProjectDiv onClick = { () => goToProject(project.id) }>
			<button onClick = { e => goToEditProject(e, project.id) }>Edit Project</button>

			<p>Project ID: { project.id }</p>
			<p>Name: { project.name }</p>
			<p>Description: { project.description }</p>
			<p>Completed: { project.completed ? 'true' : 'false' }</p>
		</ProjectDiv>
	);
};

export default Project;
