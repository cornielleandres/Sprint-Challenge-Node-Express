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
	const { projects, goToProject, goToEditProject, goToDeleteProject } = props;
	return(
		<ProjectsListDiv>
			{ projects.map((project, i) => <Project key = { i } goToDeleteProject = { goToDeleteProject } goToEditProject = { goToEditProject } goToProject = { goToProject } project = { project } />) }
		</ProjectsListDiv>
	);
};

export default ProjectsList;
