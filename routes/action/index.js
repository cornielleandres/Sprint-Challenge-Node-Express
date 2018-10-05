const express = require('express');
const actionModel = require('../../data/helpers/actionModel.js');

const router = express.Router();

// get all actions
router.get('/', (req, res) => {
	actionModel
		.get()
		.then(actions => {
			if (actions.length) return res.status(200).json(actions);
			else return res.status(404).json('There are no actions to retrieve.');
		})
		.catch(err => res.status(500).json(`Server could not retrieve action information: ${ err }`));
});

// // get project with specific project ID
// router.get('/:id', (req, res) => {
// 	const { id } = req.params;
// 	projectModel
// 		.get(id)
// 		.then(project => res.status(200).json(project))
// 		.catch(err => res.status(500).json(`Server could not retrieve project information: ${ err }. It is likely the project with ID ${ id } does not exist.`));
// });

// // get all actions for project with specific project ID
// router.get('/:id/actions', (req, res) => {
// 	const { id } = req.params;
// 	projectModel
// 		.getProjectActions(id)
// 		.then(actions => {
// 			if (actions.length) res.status(200).json(actions);
// 			else return res.status(404).json(`Either project with ID ${ id } does not exist or it does not have any actions.`);
// 		})
// 		.catch(err => res.status(500).json(`Server could not retrieve project information: ${ err }`));
// });

// // post new project and return that project
// router.post('/', (req, res) => {
// 	const { name, description } = req.body;
// 	const newProject = { name, description };
// 	projectModel
// 		.insert(newProject)
// 		.then(project => res.status(201).json(project))
// 		.catch(err => res.status(500).json(`Server could not post new project: ${ err }`));
// });

// // edit project with specific project ID and return that updated project
// router.put('/:id', (req, res) => {
// 	const { id } = req.params;
// 	const { name, description, completed } = req.body;
// 	const updatedProject = { name, description, completed };
// 	projectModel
// 		.update(id, updatedProject)
// 		.then(project => {
// 			if (project) return res.status(200).json(project);
// 			else return res.status(404).json(`Project with ID ${ id } does not exist.`);
// 		})
// 		.catch(err => res.status(500).json(`Server could not update project: ${ err }`));
// });

// // delete a project with a specific project ID
// router.delete('/:id', (req, res) => {
// 	const { id } = req.params;
// 	projectModel
// 		.remove(id)
// 		.then(del => {
// 			if (del) return res.status(200).json(`Project with ID ${ id } successfully deleted.`);
// 			else return res.status(404).json(`Project with ID ${ id } does not exist.`);
// 		})
// 		.catch(err => res.status(500).json(`Server could not delete project: ${ err }`));
// });

module.exports = router;
