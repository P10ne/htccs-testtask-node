const {BaseRouter} = require('./BaseRouter');
const {login, logout, refresh} = require('../controllers/authController');

class AuthRouter extends BaseRouter {
    constructor() {
        super();
    }

    init() {
        this.router.post('/login', login);
        this.router.post('/logout', logout)
        this.router.post('/refresh', refresh);
    }
}

const authRouter = new AuthRouter();

module.exports = authRouter.Router;
