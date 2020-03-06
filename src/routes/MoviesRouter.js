const {BaseRouter} = require("./BaseRouter");
const {add, update, remove, get, getById} = require('../controllers/moviesController');

class MoviesRouter extends BaseRouter {
    constructor() {
        super();
    }

    init() {
        this.router.get('/', get);
        this.router.get('/:id', getById);
        this.router.post('/', add);
        this.router.put('/:id', update);
        this.router.delete('/:id', remove);
    }
}

const moviesRouter = new MoviesRouter();

module.exports = moviesRouter.Router;
