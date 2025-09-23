var express = require('express');
var router = express.Router();
const chartsController = require('../controlller/charts.controller');

/* GET users listing. */
router.route('/')
    .post(chartsController.saveCharts)
    .get(chartsController.getCharts)
    .delete(chartsController.deleteCharts);

module.exports = router;
