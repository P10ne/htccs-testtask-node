const {BaseRouter} = require("./BaseRouter");
const {get, getById, add, remove, update} = require('../controllers/commentsController');
const {roles, OWN_ROLE, ALL_ROLES} = require('../config/roles');
const {withAccess} = require('../controllers/authController');

class CommentsRouter extends BaseRouter {
    constructor() {
        super();
    }

    init() {
        this.router.get('/', withAccess(ALL_ROLES), get);
        this.router.get('/:id', withAccess(ALL_ROLES), getById);
        this.router.post('/', withAccess([1, 2]), add);
        this.router.delete('/:id', withAccess([1, OWN_ROLE]), remove);
    }
}

const commentsRouter = new CommentsRouter();

module.exports = commentsRouter.Router;
