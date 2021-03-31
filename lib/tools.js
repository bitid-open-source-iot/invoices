const Q = require('q');
const format = require('./format');
const ErrorResponse = require('./error-response');

exports.setRoleList = (args) => {
    var deferred = Q.defer();

    try {
        args.result = args.result.map(o => {
            if (typeof (o.bitid) != "undefined") {
                if (typeof (o.bitid.auth) != "undefined") {
                    if (typeof (o.bitid.auth.users) != "undefined") {
                        o.role = 0;

                        o.bitid.auth.users.map(user => {
                            user.email = format.email(user.email);
                            if (user.email == format.email(args.req.body.header.email)) {
                                o.role = user.role;
                            };
                        });
                    };
                };
            };
            return o;
        });

        if (typeof (args.req.body.filter) != "undefined" && Array.isArray(args.req.body.filter)) {
            if (args.req.body.filter.indexOf("role") == -1) {
                args.result = args.result.map(o => {
                    delete o.role;
                    return o;
                });
            };
        };

        if (typeof (args.req.body.filter) != "undefined") {
            if (args.req.body.filter.indexOf("users") == -1) {
                args.result = args.result.map(o => {
                    if (typeof (o.bitid) != "undefined") {
                        if (typeof (o.bitid.auth) != "undefined") {
                            if (typeof (o.bitid.auth.users) != "undefined") {
                                delete o.bitid.auth.users;
                            };
                        };
                    };
                    return o;
                });
            };
        };

        deferred.resolve(args);
    } catch (error) {
        var err = new ErrorResponse();
        err.error.errors[0].code = 503;
        err.error.errors[0].reason = error.message;
        err.error.errors[0].message = error.message;
        deferred.resolve(err);
    };

    return deferred.promise;
};

exports.setRoleObject = (args) => {
    var deferred = Q.defer();

    try {
        if (typeof (args.result.bitid) != "undefined") {
            if (typeof (args.result.bitid.auth) != "undefined") {
                if (typeof (args.result.bitid.auth.users) != "undefined") {
                    args.result.role = 0;

                    args.result.bitid.auth.users.map(user => {
                        user.email = format.email(args.req.body.header.email);
                        if (user.email == format.email(args.req.body.header.email)) {
                            args.result.role = user.role;
                        };
                    });
                };
            };
        };

        if (typeof (args.req.body.filter) != "undefined" && Array.isArray(args.req.body.filter)) {
            if (args.req.body.filter.indexOf("role") == -1) {
                delete args.result.role;
            };
        };

        if (typeof (args.req.body.filter) != "undefined") {
            if (args.req.body.filter.indexOf("users") == -1) {
                if (typeof (args.result.bitid) != "undefined") {
                    if (typeof (args.result.bitid.auth) != "undefined") {
                        if (typeof (args.result.bitid.auth.users) != "undefined") {
                            delete args.result.bitid.auth.users;
                        };
                    };
                };
            };
        };

        deferred.resolve(args);
    } catch (error) {
        var err = new ErrorResponse();
        err.error.errors[0].code = 503;
        err.error.errors[0].reason = error.message;
        err.error.errors[0].message = error.message;
        deferred.resolve(err);
    };

    return deferred.promise;
};

exports.insertOwnerIfNoneExists = (args) => {
    var deferred = Q.defer();

    try {
        if (!args.req.body.users || typeof (args.req.body.users) != "undefined") {
            args.req.body.users = [{
                'role': 5,
                'email': format.email(args.req.body.header.email)
            }];
        } else {
            var adminFound = false;
            args.req.body.users.map(user => {
                if (user.role == 5) {
                    adminFound = true;
                };
            });

            if (!adminFound) {
                var creatorFound = false;
                args.req.body.users.map(user => {
                    user.email = format.email(args.req.body.header.email);
                    if (user.email == format.email(args.req.body.header.email)) {
                        user.role = 5;
                        creatorFound = true;
                    };
                });
                if (!creatorFound) {
                    args.req.body.users.push({
                        'role': 5,
                        'email': format.email(args.req.body.header.email)
                    });
                };
            };
        };

        deferred.resolve(args);
    } catch (err) {
        deferred.reject(err);
    };

    return deferred.promise;
};