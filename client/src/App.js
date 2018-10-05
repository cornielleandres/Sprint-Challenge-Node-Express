import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

// Components
import ProjectsList from './components/ProjectsList';

// Styles
import styled from 'styled-components';

const AppDiv = styled.div`
	header {
		margin: 10px;

		h1 {
			font-size: 2rem;
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

	render() {
		const { projects } = this.state;
		return (
			<AppDiv>
				<header>
					<h1>Projects and Actions</h1>
				</header>

				<Route exact path = '/' render = { () => <ProjectsList projects = { projects } /> } />
			</AppDiv>
		);
	}
}

export default App;
