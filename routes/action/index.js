const express = require('express');
const actionModel = require('../../data/helpers/actionModel.js');
const projectModel = require('../../data/helpers/projectModel.js');

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

// get action with specific action ID
router.get('/:id', (req, res) => {
	const { id } = req.params;
	actionModel
		.get(id)
		.then(action => res.status(200).json(action))
		.catch(err => res.status(500).json(`Server could not retrieve action information: ${ err }. It is likely the action with ID ${ id } does not exist.`));
});

// post new action and return that action
router.post('/', (req, res) => {
	const { project_id, description, notes } = req.body;
	const newAction = { project_id, description, notes };
	actionModel
		.insert(newAction)
		.then(action => res.status(201).json(action))
		.catch(err => res.status(500).json(`Server could not post new action: ${ err }`));
});

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
