import React from 'react';

// Components
import Project from './Project';

// Styles
import styled from 'styled-components';

const ProjectsListDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ProjectsList = props => {
	const { projects, goToProject } = props;
	return(
		<ProjectsListDiv>
			{ projects.map((project, i) => <Project key = { i } goToProject = { goToProject } project = { project } />) }
		</ProjectsListDiv>
	);
};

export default ProjectsList;
