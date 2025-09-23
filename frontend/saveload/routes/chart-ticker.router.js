var express = require('express');
var router = express.Router();
const chartsController = require('../controlller/charts.controller');

router.route('/saveChartTicker')
    .post(chartsController.saveChartTicker);
router.route('/removeChartTicker')
    .post(chartsController.removeChartTicker);
router.route('/loadChartTicker')
    .post(chartsController.loadChartTicker);
router.route('/resetDefaultChartTicker')
    .post(chartsController.resetDefaultChartTicker);

module.exports = router;
