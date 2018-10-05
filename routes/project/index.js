const express = require('express');
const projectModel = require('../../data/helpers/projectModel.js');

const router = express.Router();

// get all projects
router.get('/', (req, res) => {
	projectModel
		.get()
		.then(projects => {
			if (projects.length) {
				return res.status(200).json(projects);
			} else {
				return res.status(404).json('There are no projects to retrieve.');
			}
		})
		.catch(err => res.status(500).json(`Server could not retrieve project information: ${ err }`));
});

// get project with specific project ID
router.get('/:id', (req, res) => {
	const { id } = req.params;
	projectModel
		.get(parseInt(id))
		.then(project => res.status(200).json(project))
		.catch(err => res.status(500).json(`Server could not retrieve project information: ${ err }`));
});

// get all actions for project with specific project ID
router.get('/:id/actions', (req, res) => {
	const { id } = req.params;
	projectModel
		.getProjectActions(id)
		.then(actions => {
			if (actions.length) {
				return res.status(200).json(actions);
			} else {
				return res.status(404).json(`Either project with ID ${ id } does not exist or it does not have any actions.`);
			}
		})
		.catch(err => res.status(500).json(`Server could not retrieve project information: ${ err }`));
});

module.exports = router;
