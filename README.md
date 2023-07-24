# hackerrank-node.js-intermediate-cert

## Authorization Middleware
Your company is launching a task manager app soon. The team has already created an ExpressJS app with several routes for creating and managing tasks. As the NodeJS developer in your company, you are required to write an Authorization middleware to provide access to some routes based on the role of the user.

The middleware should implement the following functionalities:

Complete the middleware.js module. The module's default export is an Express JS middleware function. This function should parse the 'x-role' header and check whether the role has access to the route or not.

The scope of the route is passed to the middleware as a string in the format .

Example: To check if the user has access to the create a task (in the tasks route), the scope passed to the middleware will be "tasks.create", where "tasks" is the scope name and "create" is the action name separated by a "." dot.

The roles-scopes mapping is stored in a file named roles.txt. The data is stored as a JSON string. The structure of each role-scope mapping object is as follows:

{
"role": "admin",
"scopes": {
"tasks": [
"create",
"getById"
]
}
}

role: This is the property which has to match with the x-role header value passed with the request. [STRING]

scopes: An object containing key-value pairs corresponding to each SCOPE_NAME of the system. If the passed scope name does not match with any of the keys defined in the object, the access is invalid and the server should respond back with the status code 403 while not passing the control to the next function. [OBJECT]

[scopeName]: Each dynamic key in the scopes object is a list of valid actions the user has access to in the current scope. [STRING ARRAY]

If the role passed in the x-role header is not present in the roles JSON, it does not have access and the server should respond back with the status code 403 while not passing the control to the next function.

If the role has access to the route, pass the control to the next function in the middleware stack.

Complete the tasks.js module to include all the routes with the appropriate middleware mapping mentioned below.

HINT: Make sure to trim the extra whitespaces from the JSON string before parsing it.

### Note: you must update routes in tasks.js
var express = require('express');
var router = express.Router();
var tasksController = require('../controllers/tasks.controller');
var middleware = require('../middleware');

router
    .post('/', 
        middleware('tasks.create'), 
        tasksController.create)

    .get('/:id', 
        middleware('tasks.getById'), 
        tasksController.getById)
        
    // Added a non-protected route
    .get('/',
        tasksController.getAll); 

module.exports = router;
