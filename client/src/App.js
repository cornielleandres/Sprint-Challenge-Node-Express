import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

// Components
import ProjectsList from './components/ProjectsList';
import ProjectDetails from './components/ProjectDetails';

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
		this.props.history.push(`/${ id }`);
	}

	render() {
		const { projects } = this.state;
		return (
			<AppDiv>
				<header>
					<h1>Projects and Actions</h1>

					<div className = 'links'>
						<Link to = '/'>Home</Link>
					</div>
				</header>

				<Route exact path = '/' render = { () => <ProjectsList goToProject = { this.goToProject } projects = { projects } /> } />

				<Route path = '/:id' render = { props => <ProjectDetails id = { props.match.params.id } /> } />
			</AppDiv>
		);
	}
}

export default App;
