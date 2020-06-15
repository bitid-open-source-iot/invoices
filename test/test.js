var Q           = require('q');
var chai        = require('chai');
var fetch       = require('node-fetch');
var assert      = require('chai').assert;
var expect      = require('chai').expect;
var should      = require('chai').should();
var config      = require('./config.json');
var moment      = require('moment');
var chaiSubset  = require('chai-subset');
chai.use(chaiSubset);

var invoiceId = null;

describe('Invoices', function() {
    it('/api/invoices/add', function(done) {
        this.timeout(5000);

        tools.api.invoices.add()
        .then((result) => {
            try {
                invoiceId = result.invoiceId;
                result.should.have.property('invoiceId');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/api/invoices/get', function(done) {
        this.timeout(5000);

        tools.api.invoices.get()
        .then((result) => {
            try {
                result.should.have.property('role');
                result.should.have.property('date');
                result.should.have.property('items');
                result.should.have.property('users');
                result.should.have.property('status');
                result.should.have.property('payment');
                result.should.have.property('recipient');
                result.should.have.property('invoiceId');
                result.should.have.property('serverDate');
                result.should.have.property('description');
                result.should.have.property('organizationOnly');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/api/invoices/list', function(done) {
        this.timeout(5000);

        tools.api.invoices.list()
        .then((result) => {
            try {
                result[0].should.have.property('role');
                result[0].should.have.property('date');
                result[0].should.have.property('items');
                result[0].should.have.property('users');
                result[0].should.have.property('status');
                result[0].should.have.property('payment');
                result[0].should.have.property('recipient');
                result[0].should.have.property('invoiceId');
                result[0].should.have.property('serverDate');
                result[0].should.have.property('description');
                result[0].should.have.property('organizationOnly');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/api/invoices/update', function(done) {
        this.timeout(5000);

        tools.api.invoices.update()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/api/invoices/share', function(done) {
        this.timeout(5000);

        tools.api.invoices.share()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/api/invoices/updatesubscriber', function(done) {
        this.timeout(5000);

        tools.api.invoices.updatesubscriber()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/api/invoices/unsubscribe', function(done) {
        this.timeout(5000);

        tools.api.invoices.unsubscribe()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/api/invoices/notify', function(done) {
        this.timeout(5000);

        tools.api.invoices.notify()
        .then((result) => {
            try {
                result.should.have.property('notified');
                expect(result.notified).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

describe('Payfast', function() {
    it('/api/payfast/payment', function(done) {
        this.timeout(5000);

        tools.api.payfast.payment()
        .then((result) => {
            try {
                result.should.have.property('success');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

describe('Remove Added Items', function() {
    it('/api/invoices/delete', function(done) {
        this.timeout(5000);

        tools.api.invoices.delete()
        .then((result) => {
            try {
                result.should.have.property('deleted');
                expect(result.deleted).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

var tools = {
    api: {
        payfast: {
            payment: async () => {
                var deferred = Q.defer();
                
                const response = await tools.post('/api/payfast/payment', {
                    "token":              "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "name_last":          "",
                    "item_name":          "xxx",
                    "signature":          "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    "amount_fee":         "-2.51",
                    "amount_net":         "4.99",
                    "name_first":         "",
                    "custom_str1":        "invoice",
                    "custom_str2":        "000000000000000000000001",
                    "custom_str3":        "",
                    "custom_str4":        "",
                    "custom_str5":        "",
                    "custom_int1":        "",
                    "custom_int2":        "",
                    "custom_int3":        "",
                    "custom_int4":        "",
                    "custom_int5":        "",
                    "merchant_id":        "xxxxxxxx",
                    "m_payment_id":       invoiceId,
                    "billing_date":       moment().format("YYYY-MM-DD"),
                    "amount_gross":       "7.50",
                    "pf_payment_id":      "xxxxxxxx",
                    "email_address":      config.email,
                    "payment_status":     "COMPLETE",
                    "item_description":   ""
                });

                deferred.resolve(response);

                return deferred.promise;
            }
        },
        invoices: {
            add: async () => {
                var deferred = Q.defer();
                
                const response = await tools.post('/api/invoices/add', {
                    'items': [
                        {
                            'tax':          15,
                            'icon':         'xxx',
                            'itemId':       '000000000000000000000001',
                            'amount':       10,
                            'quantity':     1,
                            'description':  'xxx'
                        }
                    ],
                    'recipient': {
                        'reg':          '',
                        'vat':          '',
                        'type':         'business',
                        'name':         '',
                        'street':       '',
                        'suburb':       '',
                        'country':      '',
                        'townCity':     '',
                        'postalCode':   ''
                    },
                    'appId':            '000000000000000000000001',
                    'description':      'xxx',
                    'organizationOnly': 0
                });

                deferred.resolve(response);

                return deferred.promise;
            },
            get: async () => {
                var deferred = Q.defer();

                const response = await tools.post('/api/invoices/get', {
                    'filter': [
                        'role',
                        'date',
                        'items',
                        'users',
                        'status',
                        'payment',
                        'recipient',
                        'invoiceId',
                        'serverDate',
                        'description',
                        'organizationOnly'
                    ],
                    'invoiceId': invoiceId
                });

                deferred.resolve(response);

                return deferred.promise;
            },
            list: async () => {
                var deferred = Q.defer();
                
                const response = await tools.post('/api/invoices/list', {
                    'filter': [
                        'role',
                        'date',
                        'items',
                        'users',
                        'status',
                        'payment',
                        'recipient',
                        'invoiceId',
                        'serverDate',
                        'description',
                        'organizationOnly'
                    ],
                    'invoiceId': invoiceId
                });

                deferred.resolve(response);

                return deferred.promise;
            },
            share: async () => {
                var deferred = Q.defer();
                
                const response = await tools.post('/api/invoices/share', {
                    'role':         4,
                    'email':        'shared@email.com',
                    'invoiceId':    invoiceId
                });

                deferred.resolve(response);

                return deferred.promise;
            },
            update: async () => {
                var deferred = Q.defer();
                
                const response = await tools.post('/api/invoices/update', {
                    'title':        'test update',
                    'invoiceId':    invoiceId
                });

                deferred.resolve(response);

                return deferred.promise;
            },
            delete: async () => {
                var deferred = Q.defer();
                
                const response = await tools.post('/api/invoices/delete', {
                    'invoiceId': invoiceId
                });

                deferred.resolve(response);

                return deferred.promise;
            },
            notify: async () => {
                var deferred = Q.defer();
                
                const response = await tools.post('/api/invoices/notify', {
                    'email':        config.email,
                    'invoiceId':    invoiceId
                });

                deferred.resolve(response);

                return deferred.promise;
            },
            unsubscribe: async () => {
                var deferred = Q.defer();
                
                const response = await tools.post('/api/invoices/unsubscribe', {
                    'email':        'shared@email.com',
                    'invoiceId':    invoiceId
                });

                deferred.resolve(response);

                return deferred.promise;
            },
            updatesubscriber: async () => {
                var deferred = Q.defer();
                
                const response = await tools.post('/api/invoices/updatesubscriber', {
                    'role':         2,
                    'email':        'shared@email.com',
                    'invoiceId':    invoiceId
                });

                deferred.resolve(response);

                return deferred.promise;
            }
        }
    },
    put: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email, 
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.api + url, {
            'headers': {
                'Accept':           '*/*',
                'Content-Type':     'application/json; charset=utf-8',
                'Authorization':    JSON.stringify(config.token),
                'Content-Length':   payload.length
            },
            'body':   payload,
            'method': 'PUT'
        });
        
        const result = await response.json();

        deferred.resolve(result);
        
        return deferred.promise;
    },
    post: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email, 
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.api + url, {
            'headers': {
                'Accept':           '*/*',
                'Content-Type':     'application/json; charset=utf-8',
                'Authorization':    JSON.stringify(config.token),
                'Content-Length':   payload.length
            },
            'body':   payload,
            'method': 'POST'
        });
        
        const result = await response.json();

        deferred.resolve(result);
        
        return deferred.promise;
    }
};