import React from 'react';

// Styles
import styled from 'styled-components';

const ActionDiv = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	margin: 5px;
	padding: 5px;
`;

const Action = props => {
	const { action } = props;
	return(
		<ActionDiv>
			<p>Action ID: { action.id }</p>
			<p>Description: { action.description }</p>
			<p>Notes: { action.notes }</p>
			<p>Completed: { action.completed ? 'true' : 'false' }</p>
		</ActionDiv>
	);
};

export default Action;
