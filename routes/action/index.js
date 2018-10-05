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

// edit action with specific action ID and return that updated action
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { project_id, description, notes, completed } = req.body;
	const updatedAction = { project_id, description, notes, completed };
	actionModel
		.update(id, updatedAction)
		.then(action => {
			if (action) return res.status(200).json(action);
			else return res.status(404).json(`Action with ID ${ id } does not exist.`);
		})
		.catch(err => res.status(500).json(`Server could not update action: ${ err }`));
});

// delete an action with a specific action ID
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	actionModel
		.remove(id)
		.then(del => {
			if (del) return res.status(200).json(`Action with ID ${ id } successfully deleted.`);
			else return res.status(404).json(`Action with ID ${ id } does not exist.`);
		})
		.catch(err => res.status(500).json(`Server could not delete action: ${ err }`));
});

module.exports = router;
