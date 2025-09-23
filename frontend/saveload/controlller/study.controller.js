const StudyTemplate = require('../models/study.model');


function saveStudyTemplate(req, res) {
    const query = req.query;
    const data = req.body;
    StudyTemplate.find({
        owner: query.user,
        ownerSource: query.client,
        name: data.name
    }, function (err, studyTemplate) {
        if (err) {
            return res.json({start: 'error'});
        }
        if (studyTemplate.length > 0) {
            StudyTemplate.updateOne({
                name: data.name,
                owner: query.user,
                ownerSource: query.client
            }, {content: data.content}, function (err, chart) {
                if (err) {
                    console.log(err);
                    return res.json({status: 'error'})
                }
                return res.json({status: 'ok'});
            })
        } else {
            let dataTemplate = {
                owner: query.user,
                ownerSource: query.client,
                name: data.name,
                content: data.content
            };
            dataTemplate = new StudyTemplate(dataTemplate);
            dataTemplate.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.json({status: 'error'})
                }
                return res.json({status: 'ok'});
            });
        }
    })
}

async function getStudyTemplate(req, res) {
    const query = req.query;
    if (query.template) {
        const charts = await StudyTemplate.findOne({
            name: query.template,
            owner: query.user,
            ownerSource: query.client
        }).lean().select('name content');
        const result = {
            status: 'ok',
            data: charts
        };
        return res.json(result);
    } else {
        const listTemplate = await StudyTemplate.find({
            owner: query.user,
            ownerSource: query.client
        }).lean().select('name');
        const result = {
            status: 'ok',
            data: listTemplate
        };
        return res.json(result);
    }
}

function deleteStudyTemplate(req, res) {
    const query = req.query;
    if (query.template) {
        StudyTemplate.deleteOne({name: query.template, owner: query.user, ownerSource: query.client}, function (err) {
            if (err) {
                return res.json({status: 'error'});
            }
            return res.json({status: 'ok'});
        });
    } else {
        return res.json({status: 'error'});
    }
}

module.exports = {
    saveStudyTemplate: saveStudyTemplate,
    getStudyTemplate: getStudyTemplate,
    deleteStudyTemplate: deleteStudyTemplate
};