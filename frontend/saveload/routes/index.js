const express = require('express');
const chartRouter = require('./chart.router');
const chartTickerRouter = require('./chart-ticker.router');
const studyTemplate = require('./study.router');
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.use('/1.1/charts', chartRouter);
router.use('/1.1/study_templates', studyTemplate);
router.use('/api', chartTickerRouter);

module.exports = router;
