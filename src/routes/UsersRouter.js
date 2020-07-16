const {BaseRouter} = require("./BaseRouter");
const {withAccess} = require('../controllers/authController');
const {addRequest, update, remove, get, getByIdRequest} = require('../controllers/usersController');
const {ACCESS_RIGHTS} = require('../config/roles');

class UsersRouter extends BaseRouter {
    constructor() {
        super();
    }

    init() {
        this.router.get('/', get);
        this.router.get('/:id', getByIdRequest);
        this.router.post('/', withAccess(ACCESS_RIGHTS.users.add), addRequest);
        this.router.put('/:id', withAccess(ACCESS_RIGHTS.users.update), update);
        this.router.delete('/:id', withAccess(ACCESS_RIGHTS.users.remove), remove);
    }
}

const usersRouter = new UsersRouter();

module.exports = usersRouter.Router;
