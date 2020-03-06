const {BaseRouter} = require("./BaseRouter");
const {get, getById, add, remove, update} = require('../controllers/commentsController');

class CommentsRouter extends BaseRouter {
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

const commentsRouter = new CommentsRouter();

module.exports = commentsRouter.Router;
