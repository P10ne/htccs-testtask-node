const Router = require("express");

class BaseRouter {
    constructor()
    {
        this.router = Router();
        this.init();
    }

    get Router() {
        return this.router;
    }

    init() {}
}

module.exports = {
    BaseRouter
};
