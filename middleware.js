const ROLES_FILE = __dirname + '/roles.txt';
const fs = require('fs');

module.exports = (scope) => (req, res, next) => {
    const userRole = req.headers['x-role'];

    const rolesScopesMappingJson = fs.readFileSync(ROLES_FILE, 'utf-8').trim();
    const rolesScopesMapping = JSON.parse(rolesScopesMappingJson);

    const roleScope = rolesScopesMapping.find(roleScope => roleScope.role === userRole);
    const userScopes = roleScope ? roleScope.scopes : undefined;
    
    if (!userScopes) {
        return res.status(403).send('Access denied: Invalid role');
    }

    const [scopeName, actionName] = scope.split('.');
    const allowedActions = userScopes[scopeName];

    if (allowedActions && allowedActions.includes(actionName)) {
        next();
    } else {
        return res.status(403).send('Access denied: Insufficient permissions');
    }
};
