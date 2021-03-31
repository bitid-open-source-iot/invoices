const Q = require('q');
const db = require('./../db/mongo');
const format = require('../lib/format');
const ObjectId = require('mongodb').ObjectId;
const ErrorResponse = require('../lib/error-response');

var module = function () {
	var dalInvoices = {
		pay: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.description),
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};
			var update = {
				$set: {
					'payment': {
						'id': args.req.body.paymentId,
						'token': args.req.body.token,
						'gateway': args.req.body.gateway
					},
					'date.paid': new Date(),
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblInvoices'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.description;
					err.error.errors[0].message = error.description;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly
					}
				},
				'date': {
					'due': null,
					'paid': null,
					'initialized': new Date()
				},
				'payment': {
					'id': '',
					'token': '',
					'gateway': ''
				},
				'items': args.req.body.items || [],
				'status': args.req.body.status || 'unpaid',
				'recipient': args.req.body.recipient || {},
				'serverDate': new Date(),
				'description': args.req.body.description
			};
			if (args.req.body.status === 'paid') {
				params.date.due = new Date();
				params.date.paid = new Date();
				params.payment.id = 'house';
				params.payment.token = 'house';
				params.payment.gateway = 'house';
			};
			if (typeof (args.req.body.date) != "undefined") {
				params.date.due = new Date(args.req.body.date.due);
			};
			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblInvoices'
			})
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.description;
					err.error.errors[0].message = error.description;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.invoiceId),
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'invoiceId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblInvoices'
			})
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.description;
					err.error.errors[0].message = error.description;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'invoiceId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblInvoices'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.description;
					err.error.errors[0].message = error.description;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		share: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'bitid.auth.users.email': {
					$ne: format.email(args.req.body.email)
				},
				'_id': ObjectId(args.req.body.invoiceId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': format.email(args.req.body.email)
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblInvoices'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.description;
					err.error.errors[0].message = error.description;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2,
							$lte: 5
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.invoiceId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (Array.isArray(args.req.body.items)) {
				update.$set.items = args.req.body.items;
			};
			if (typeof (args.req.body.date) != "undefined") {
				if (typeof (args.req.body.date.due) != "undefined") {
					params.date.due = new Date(args.req.body.date.due);
				};
			};
			if (typeof (args.req.body.recipient) != 'undefined') {
				if (typeof (args.req.body.recipient.reg) != 'undefined') {
					update.$set['recipient.reg'] = args.req.body.recipient.reg;
				};
				if (typeof (args.req.body.recipient.vat) != 'undefined') {
					update.$set['recipient.vat'] = args.req.body.recipient.vat;
				};
				if (typeof (args.req.body.recipient.type) != 'undefined') {
					update.$set['recipient.type'] = args.req.body.recipient.type;
				};
				if (typeof (args.req.body.recipient.name) != 'undefined') {
					update.$set['recipient.name'] = args.req.body.recipient.name;
				};
				if (typeof (args.req.body.recipient.street) != 'undefined') {
					update.$set['recipient.street'] = args.req.body.recipient.street;
				};
				if (typeof (args.req.body.recipient.suburb) != 'undefined') {
					update.$set['recipient.suburb'] = args.req.body.recipient.suburb;
				};
				if (typeof (args.req.body.recipient.country) != 'undefined') {
					update.$set['recipient.country'] = args.req.body.recipient.country;
				};
				if (typeof (args.req.body.recipient.townCity) != 'undefined') {
					update.$set['recipient.townCity'] = args.req.body.recipient.townCity;
				};
				if (typeof (args.req.body.recipient.postalCode) != 'undefined') {
					update.$set['recipient.postalCode'] = args.req.body.recipient.postalCode;
				};
			};
			if (typeof (args.req.body.description) != 'undefined') {
				update.$set.description = args.req.body.description;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined') {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblInvoices'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.description;
					err.error.errors[0].message = error.description;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.invoiceId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblInvoices'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.description;
					err.error.errors[0].message = error.description;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.invoiceId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': format.email(args.req.body.email)
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblInvoices'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.description;
					err.error.errors[0].message = error.description;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		updatesubscriber: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.invoiceId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblInvoices'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': format.email(args.req.body.email)
							}
						},
						'_id': ObjectId(args.req.body.invoiceId)
					};
					var update = {
						$set: {
							'bitid.auth.users.$.role': args.req.body.role
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblInvoices'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.description;
					err.error.errors[0].message = error.description;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	return {
		'invoices': dalInvoices
	};
};

exports.module = module;