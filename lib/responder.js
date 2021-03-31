const Q = require('q');
const ErrorResponse = require('./error-response');

var module = function() {
	var responder = {
		response: {
			update: (result) => {
				var deferred = Q.defer();

				deferred.resolve({
					"updated": result.n
				});

				return deferred.promise;
			},

			delete: (result) => {
				var deferred = Q.defer();

				deferred.resolve({
					"deleted": result.n
				});

				return deferred.promise;
			},

			payfast: {
				payment: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						"success": true
					});

					return deferred.promise;
				}
			},

			invoices: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						"invoiceId": result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred  = Q.defer();

					var tmp = {
						'role': 		result.role,
						'date': 		result.date,
						'items': 		result.items,
						'status': 		result.status,
						'payment': 		result.payment,
						'recipient':	result.recipient,
						'invoiceId':	result._id,
						'serverDate':	result.serverDate,
						'description':	result.description
					};

					if (typeof(result.bitid) != "undefined") {
						if (typeof(result.bitid.auth) != "undefined") {
							tmp.users 				= result.bitid.auth.users;
							tmp.organizationOnly 	= result.bitid.auth.organizationOnly;
						};
					};
					
					deferred.resolve(tmp);
					
					return deferred.promise;
				},

				list: (result) => {
					var deferred  = Q.defer();
					
					result = result.map(obj => {
						var tmp = {
							'role': 		obj.role,
							'date': 		obj.date,
							'items': 		obj.items,
							'status':		obj.status,
							'payment': 		obj.payment,
							'recipient':	obj.recipient,
							'invoiceId':	obj._id,
							'serverDate':	obj.serverDate,
							'description':	obj.description
						};

						if (typeof(obj.bitid) != "undefined" && typeof(obj.role) != "undefined" && obj.role > 0) {
							if (typeof(obj.bitid.auth) != "undefined") {
								tmp.users 				= obj.bitid.auth.users;
								tmp.organizationOnly 	= obj.bitid.auth.organizationOnly;
							};
						};

						return tmp;
					});
					
					deferred.resolve(result);
					
					return deferred.promise;
				},

				notify: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						"notified": 1
					});

					return deferred.promise;
				}
			}
		},

		model: (req, result) => {
			var deferred = Q.defer();

			switch(req.originalUrl) {
				case('*'):
					deferred.resolve(result);
					break;

				case('/api/invoices/add'):
					responder.response.invoices.add(result).then(deferred.resolve, deferred.reject);
					break;
				case('/api/invoices/get'):
					responder.response.invoices.get(result).then(deferred.resolve, deferred.reject);
					break;
				case('/api/invoices/list'):
					responder.response.invoices.list(result).then(deferred.resolve, deferred.reject);
					break;
				case('/api/invoices/notify'):
					responder.response.invoices.notify(result).then(deferred.resolve, deferred.reject);
					break;
				
				case('/api/payfast/payment'):
					responder.response.payfast.payment(result).then(deferred.resolve, deferred.reject);
					break;

				case('/api/invoices/share'):
				case('/api/invoices/update'):
				case('/api/invoices/unsubscribe'):
				case('/api/invoices/updatesubscriber'):
					responder.response.update(result).then(deferred.resolve, deferred.reject);
					break;

				case('/api/invoices/delete'):
					responder.response.delete(result).then(deferred.resolve, deferred.reject);
					break;
				
				default:
					deferred.resolve({
						'success': 'Your request resolved successfully but this payload is not modeled!'
					});
					break;
			};

			return deferred.promise;
		},

		error: (req, res, err) => {
			res.status(err.error.code).json(err.error);
		},	

		success: (req, res, result) => {
			responder.model(req, result)
			.then(result => {
				res.json(result);
			}, error => {
				var err = new ErrorResponse();
				err.error.errors[0].code = 401;
				err.error.errors[0].reason = error.message;
				err.error.errors[0].message = error.message;
				responder.error(req, res, err);
			});
		}
	};

	return responder;
};

exports.module = module;