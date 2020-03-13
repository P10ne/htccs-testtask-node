const {BaseRouter} = require("./BaseRouter");
const {withAccess} = require('../controllers/authController');
const {addRequest, update, remove, get, getByIdRequest} = require('../controllers/usersController');

class UsersRouter extends BaseRouter {
    constructor() {
        super();
    }

    init() {
        this.router.get('/', get);
        this.router.get('/:id', getByIdRequest);
        this.router.post('/', withAccess([1]), addRequest);
        this.router.put('/:id', withAccess([1]), update);
        this.router.delete('/:id', withAccess([1]), remove);
    }
}

const usersRouter = new UsersRouter();

module.exports = usersRouter.Router;
