import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

// Components
import ProjectsList from './components/ProjectsList';
import ProjectDetails from './components/ProjectDetails';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';
import ActionDetails from './components/ActionDetails';
import CreateAction from './components/CreateAction';
import EditAction from './components/EditAction';

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

	goToAction = id => {
		this.props.history.push(`/actions/${ id }`);
	};

	goToCreateAction = projectId => {
		this.props.history.push(`/actions/create/${ projectId }`);
	};

	goToEditAction = actionId => {
		this.props.history.push(`/actions/edit/${ actionId }`);
	};

	goToDeleteAction = actionId => {
		const URL = 'http://localhost:5000';
		axios
			.delete(`${ URL }/api/actions/${ actionId }`)
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
			<AppDiv className = 'fade-in-anim'>
				<header>
					<h1>Projects and Actions</h1>

					<div className = 'links'>
						<Link to = '/'>Home</Link>
						<Link to = '/create'>Create New Project</Link>
					</div>
				</header>

				<Route exact path = '/' render = { () => <ProjectsList goToDeleteProject = { this.goToDeleteProject } goToEditProject = { this.goToEditProject } goToProject = { this.goToProject } projects = { projects } /> } />

				<Route exact path = '/projects/:id' render = { props => <ProjectDetails id = { props.match.params.id } goToCreateAction = { this.goToCreateAction } goToAction = { this.goToAction } /> } />

				<Route path = '/create' render = { () => <CreateProject updateProjects = { this.updateProjects } /> } />

				<Route path = '/projects/:id/edit' render = { props => <EditProject id = { props.match.params.id } updateProjects = { this.updateProjects } /> } />

				<Route exact path = '/actions/:id' render = { props => <ActionDetails id = { props.match.params.id } goToEditAction = { this.goToEditAction } goToDeleteAction = { this.goToDeleteAction } /> } />

				<Route path = '/actions/create/:projectId' render = { props => <CreateAction projectId = { props.match.params.projectId } updateProjects = { this.updateProjects } /> } />

				<Route path = '/actions/edit/:actionId' render = { props => <EditAction actionId = { props.match.params.actionId } updateProjects = { this.updateProjects } /> } />
			</AppDiv>
		);
	}
}

export default App;
