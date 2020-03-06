const {BaseRouter} = require("./BaseRouter");
const {addRequest, update, remove, get, getByIdRequest} = require('../controllers/usersController');

class UsersRouter extends BaseRouter {
    constructor() {
        super();
    }

    init() {
        this.router.get('/', function(req, res, next) {
            if(req.user.id === 13) {
                next();
            } else {
                res.sendStatus(401);
            }
        }, get);
        this.router.get('/:id', getByIdRequest);
        this.router.post('/', addRequest);
        this.router.put('/:id', update);
        this.router.delete('/:id', remove);
    }
}

const usersRouter = new UsersRouter();

module.exports = usersRouter.Router;
