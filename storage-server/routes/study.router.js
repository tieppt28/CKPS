var express = require('express');
var router = express.Router();
const studyTemplateController = require('../controlller/study.controller');

/* GET users listing. */
router.route('/')
    .post(studyTemplateController.saveStudyTemplate)
    .get(studyTemplateController.getStudyTemplate)
    .delete(studyTemplateController.deleteStudyTemplate);

module.exports = router;
