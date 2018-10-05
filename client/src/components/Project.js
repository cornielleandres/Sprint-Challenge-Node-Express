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

	.buttons {
		button {
			padding: 5px 10px;
			border-radius: 5px;
			color: white;
	
			&:hover {
				background: black;
				cursor: pointer;
			}
		}

		.edit-btn {
			background: blue;

			&:hover {
				color: cyan;
			}
		}

		.delete-btn {
			background: red;

			&:hover {
				color: red;
			}
		}
	}
`;

const Project = props => {
	const { project, goToProject, goToEditProject, goToDeleteProject } = props;
	return(
		<ProjectDiv onClick = { () => goToProject(project.id) }>
			<div className = 'buttons'>
				<button className = 'edit-btn' onClick = { e => goToEditProject(e, project.id) }>Edit Project</button>
				<button className = 'delete-btn' onClick = { e => goToDeleteProject(e, project.id) }>Delete Project</button>
			</div>

			<p>Project ID: { project.id }</p>
			<p>Name: { project.name }</p>
			<p>Description: { project.description }</p>
			<p>Completed: { project.completed ? 'true' : 'false' }</p>
		</ProjectDiv>
	);
};

export default Project;
