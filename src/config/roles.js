const ROLES = {
    ADMIN: 1,
    USER: 2,
    GUEST: 'GUEST',
    OWN_ROLE: 'OWN_ROLE' // на случай взаимодествия с собственной записью пользователя (прим: удаляет свой же комментарий)
};
const ALL_ROLES = (() => {
    const roles = [];
    for(let key in ROLES) {
        roles.push(ROLES[key]);
    }
    return roles;
})();

module.exports = {
    ACCESS_RIGHTS: {
        users: {
            add: [ROLES.ADMIN],
            update: [ROLES.ADMIN],
            remove: [ROLES.ADMIN],
            get: [
                ROLES.ADMIN,
                ROLES.USER
            ]
        },
        movies: {
            add: [ROLES.ADMIN],
            update: [ROLES.ADMIN],
            remove: [ROLES.ADMIN],
            get: ALL_ROLES
        },
        comments: {
            add: [ROLES.ADMIN, ROLES.USER],
            remove: [ROLES.ADMIN, ROLES.OWN_ROLE],
            get: ALL_ROLES
        }
    },
    ALL_ROLES,
    ROLES
};
