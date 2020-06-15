var Q           = require('q');
var hbs         = require('nodemailer-express-handlebars');
var nodemailer  = require('nodemailer');

exports.notify = (args) => {
    var deferred = Q.defer();

    args.to         = args.req.body.email;
    args.message    = "Invoice Notification: #" + args.invoice.invoiceId
    
    if (__settings.production) {
        var transporter = nodemailer.createTransport(__settings.smtp);

        try {
            var options = {
                "context": {
                    "vat":          args.invoice.vat,
                    "date":         args.invoice.date,
                    "items":        args.invoice.items,
                    "total":        args.invoice.total,
                    "subtotal":     args.invoice.subtotal,
                    "recipient":    args.invoice.recipient,
                    "invoiceId":    args.invoice.invoiceId
                },
                "to":       args.to,
                "text":     args.message,
                "from":     '"Invoices" <support@bitid.co.za>',
                "subject":  args.message,
                "template": "notify"
            };
            transporter.use('compile', hbs({
                'viewEngine': {
                    'extName':          '.hbs',
                    'layoutsDir':       __dirname + '/templates',
                    'partialsDir':      __dirname + '/templates',
                    'defaultLayout':    'notify.hbs'
                },
                'extName':  '.hbs',
                'viewPath': __dirname + '/templates'
            }));
            transporter.sendMail(options, (error, info) => {
                if (error) {
                    console.log(4, error);
                    args.sent = false;
                    deferred.reject(error);
                } else {
                    console.log(5);
                    args.sent = true;
                    deferred.resolve(args);
                };
            });
        } catch (error) {
            console.log(error);
        };
    } else {
        args.sent = false;
        deferred.resolve(args);
    };

    return deferred.promise;
};