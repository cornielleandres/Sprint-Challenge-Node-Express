import React from 'react';

// Styles
import styled from 'styled-components';

const ProjectDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	margin: 5px;
	padding: 5px;
	width: 50%;
`;

const Project = props => {
	const { project } = props;
	return(
		<ProjectDiv>
			<p>ID: { project.id }</p>
			<p>Name: { project.name }</p>
			<p>Description: { project.description }</p>
			<p>Completed: { project.completed ? 'true' : 'false' }</p>
		</ProjectDiv>
	);
};

export default Project;
