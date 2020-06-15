var bll     = require('./../bll/bll');
var router  = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.invoices.add(req, res);
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.invoices.get(req, res);
});

router.post('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.invoices.list(req, res);
});

router.post('/share', (req, res) => {
    var myModule = new bll.module();
    myModule.invoices.share(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.invoices.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.invoices.delete(req, res);
});

router.post('/notify', (req, res) => {
    var myModule = new bll.module();
    myModule.invoices.notify(req, res);
});

router.post('/unsubscribe', (req, res) => {
    var myModule = new bll.module();
    myModule.invoices.unsubscribe(req, res);
});

router.post('/updatesubscriber', (req, res) => {
    var myModule = new bll.module();
    myModule.invoices.updatesubscriber(req, res);
});

module.exports = router;