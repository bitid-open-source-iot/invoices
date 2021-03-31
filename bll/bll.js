const Q = require('q');
const dal = require('../dal/dal');
const tools = require('../lib/tools');
const emails = require('../emails/emails');
const moment = require('moment');
const payfast = require('@payfast/core');
const ErrorResponse = require('../lib/error-response');

var module = function () {
    var bllPayfast = {
        payment: async (req, res) => {
            var args = {
                'req': req,
                'res': res
            };
            var body = JSON.parse(JSON.stringify(req.body));
            delete body.header;
            const verify = await payfast.validate.request(body);
            if (!verify.valid && __settings.production) {
                var err = new ErrorResponse();
                err.error.errors[0].code = 401;
                err.error.errors[0].reason = 'Payfast request is invalid!';
                err.error.errors[0].message = 'Payfast request is invalid!';
                __responder.error(req, res, err);
            } else {
                args.req.body.amount = {
                    'fee': parseFloat(args.req.body.amount_fee),
                    'net': parseFloat(args.req.body.amount_net),
                    'gross': parseFloat(args.req.body.amount_gross)
                };
                args.req.body.gateway = 'payfast';
                args.req.body.invoiceId = args.req.body.m_payment_id;
                args.req.body.paymentId = args.req.body.pf_payment_id;

                var myModule = new dal.module();
                myModule.invoices.pay(args)
                    .then(args => {
                        __responder.success(req, res, args.result);
                    }, err => {
                        __responder.error(req, res, err);
                    });
            };
        }
    };

    var bllInvoices = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            tools.insertOwnerIfNoneExists(args)
                .then(myModule.invoices.add, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.invoices.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.invoices.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        share: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.invoices.share(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.invoices.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.invoices.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        notify: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            args.req.body.filter = ['date', 'items', 'invoiceId', 'recipient'];

            var myModule = new dal.module();
            myModule.invoices.get(args)
                .then(args => {
                    var deferred = Q.defer();

                    args.invoice = args.result;
                    delete args.result;

                    args.invoice.vat = 0;
                    args.invoice.total = 0;
                    args.invoice.subtotal = 0;

                    args.invoice.items.map(item => {
                        item.nett = item.amount * item.quantity;
                        args.invoice.total += item.nett;
                        item.tax = item.tax.toFixed(2);
                        item.nett = item.nett.toFixed(2);
                        item.amount = item.amount.toFixed(2);
                        item.quantity = item.quantity.toFixed(2);
                    });

                    args.invoice.vat = args.invoice.total * 0.15;
                    args.invoice.subtotal = args.invoice.total - args.invoice.vat;

                    args.invoice.vat = args.invoice.vat.toFixed(2);
                    args.invoice.total = args.invoice.total.toFixed(2);
                    args.invoice.subtotal = args.invoice.subtotal.toFixed(2);

                    args.invoice.date.due = moment(args.invoice.date.due).format('YYYY/MM/DD')
                    args.invoice.invoiceId = args.invoice._id.toString().toUpperCase();
                    args.invoice.recipient.name = args.invoice.recipient.name.toUpperCase();
                    args.invoice.date.initialized = moment(args.invoice.date.initialized).format('YYYY/MM/DD')
                    args.invoice.recipient.address = [args.invoice.recipient.street, args.invoice.recipient.suburb, args.invoice.recipient.townCity, args.invoice.recipient.postalCode, args.invoice.recipient.country].join(', ').toUpperCase();

                    emails.notify(args)
                        .then(args => {
                            deferred.resolve(args);
                        }, err => {
                            deferred.reject(err);
                        });

                    return deferred.promise;
                }, null)
                .then(args => {
                    __responder.success(req, res, args.invoice);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        unsubscribe: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.invoices.unsubscribe(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        updatesubscriber: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.invoices.updatesubscriber(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    return {
        'payfast': bllPayfast,
        'invoices': bllInvoices
    };
};

exports.module = module;