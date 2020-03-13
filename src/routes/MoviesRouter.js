const {BaseRouter} = require("./BaseRouter");
const {add, update, remove, get, getById} = require('../controllers/moviesController');
const {withAccess} = require('../controllers/authController');

class MoviesRouter extends BaseRouter {
    constructor() {
        super();
    }

    init() {
        this.router.get('/', get);
        this.router.get('/:id', getById);
        this.router.post('/', withAccess([1]), add);
        this.router.put('/:id', withAccess([1]), update);
        this.router.delete('/:id', withAccess([1]), remove);
    }
}

const moviesRouter = new MoviesRouter();

module.exports = moviesRouter.Router;
