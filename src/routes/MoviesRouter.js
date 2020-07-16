const {BaseRouter} = require("./BaseRouter");
const {add, update, remove, get, getById} = require('../controllers/moviesController');
const {ACCESS_RIGHTS} = require('../config/roles');
const {withAccess} = require('../controllers/authController');

class MoviesRouter extends BaseRouter {
    constructor() {
        super();
    }

    init() {
        this.router.get('/', withAccess(ACCESS_RIGHTS.movies.get), get);
        this.router.get('/:id', withAccess(ACCESS_RIGHTS.movies.get), getById);
        this.router.post('/', withAccess(ACCESS_RIGHTS.movies.add), add);
        this.router.put('/:id', withAccess(ACCESS_RIGHTS.movies.update), update);
        this.router.delete('/:id', withAccess(ACCESS_RIGHTS.movies.remove), remove);
    }
}

const moviesRouter = new MoviesRouter();

module.exports = moviesRouter.Router;
