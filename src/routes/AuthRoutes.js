const {BaseRouter} = require('./BaseRouter');
const {login} = require('../controllers/authController');

class AuthRouter extends BaseRouter {
    constructor() {
        super();
    }

    init() {
        this.router.post('/login', login);
    }
}

const authRouter = new AuthRouter();

module.exports = authRouter.Router;
