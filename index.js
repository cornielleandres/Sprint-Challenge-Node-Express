const express = require('express');
const applyGlobalMiddleware = require('./middleware/globalMiddleware.js');
const { projectRoutes, actionRoutes } = require('./routes');

const server = express();
const port = 5000;

applyGlobalMiddleware(server);

server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

server.listen(port, () => console.log(`\n=== Server listening on port ${ port } ===`));
