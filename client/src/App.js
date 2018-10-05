import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

// Components
import ProjectsList from './components/ProjectsList';
import ProjectDetails from './components/ProjectDetails';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';

// Styles
import styled from 'styled-components';

const AppDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	header {
		margin: 10px;

		h1 {
			font-size: 2rem;
			text-align: center;
		}

		.links {
			text-align: center;
			margin: 15px 10px;

			a {
				border: 1px solid black;
				border-radius: 5px;
				padding: 5px 10px;
				margin: 5px;
				text-decoration: none;
				color: black;

				&:hover {
					background: black;
					color: white;
				}
			}
		}
	}
`;

class App extends Component {
	state = {
		projects: [],
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios
			.get(`${ URL }/api/projects`)
			.then(projects => this.setState({ projects: projects.data }))
			.catch(err => console.log(err));
	};

	goToProject = id => {
		this.props.history.push(`/projects/${ id }`);
	};

	goToEditProject = (e, id) => {
		e.stopPropagation();
		this.props.history.push(`/projects/${ id }/edit`);
	};

	goToDeleteProject = (e, id) => {
		e.stopPropagation();
		const URL = 'http://localhost:5000';
		axios
			.delete(`${ URL }/api/projects/${ id }`)
			.then(del => this.updateProjects())
			.catch(err => console.log(err));
	};

	updateProjects = () => {
		const URL = 'http://localhost:5000';
		axios
			.get(`${ URL }/api/projects`)
			.then(projects => this.setState({ projects: projects.data }, () => this.props.history.push('/')))
			.catch(err => console.log(err));
	};

	render() {
		const { projects } = this.state;
		return (
			<AppDiv>
				<header>
					<h1>Projects and Actions</h1>

					<div className = 'links'>
						<Link to = '/'>Home</Link>
						<Link to = '/create'>Create New Project</Link>
					</div>
				</header>

				<Route exact path = '/' render = { () => <ProjectsList goToDeleteProject = { this.goToDeleteProject } goToEditProject = { this.goToEditProject } goToProject = { this.goToProject } projects = { projects } /> } />

				<Route exact path = '/projects/:id' render = { props => <ProjectDetails id = { props.match.params.id } /> } />

				<Route path = '/create' render = { () => <CreateProject updateProjects = { this.updateProjects } /> } />

				<Route path = '/projects/:id/edit' render = { props => <EditProject id = { props.match.params.id } updateProjects = { this.updateProjects } /> } />
			</AppDiv>
		);
	}
}

export default App;