const Charts = require('../models/charts.model');
const chartCategory = require('../enum/chart.cartegory.enum');
const chartRedisController = require('./charts.redis.controller');
const axios = require('axios');

function saveCharts(req, res) {
    const query = req.query;
    if (query.chart) {
        // Update
        const dataChart = {
            name: req.body.name,
            content: req.body.content,
            symbol: req.body.symbol,
            resolution: req.body.resolution,
        };
        if (dataChart.name.indexOf('TICKER-FINBOX') !== -1) {
            dataChart.name = dataChart.name.split(':')[1];
        }
        Charts.updateOne({
            _id: req.query.chart,
            owner: query.user,
            ownerSource: query.client
        }, dataChart, function (err, chart) {
            if (err) {
                console.log(err);
                return res.json({status: 'error'})
            }
            return res.json({status: 'ok'});
        })
    } else {
        let dataCharts = new Charts(req.body);
        dataCharts.owner = query.user;
        dataCharts.ownerSource = query.client;
        dataCharts.timestamp = new Date().getTime();
        if (dataCharts.name.indexOf('TICKER-FINBOX') !== -1) {
            dataCharts.name = dataCharts.name.split(':')[1];
            dataCharts.category = chartCategory.Ticker;
            Charts.findOne({owner: query.user, ownerSource: query.client, name: dataCharts.name, category: chartCategory.Ticker}, function (err, chart) {
                if (err) {
                    console.log(err);
                    return res.json({status: 'error'});
                }
                if (chart && chart._id) {
                    Charts.updateOne({
                        _id: chart._id,
                        owner: chart.user,
                        ownerSource: chart.client
                    }, dataCharts, function (err, charts) {
                        if (err) {
                            console.log(err);
                            return res.json({status: 'error', id: chart._id})
                        }
                        return res.json({status: 'ok', id: chart._id});
                    })
                } else {
                    dataCharts.save(function (err) {
                        if (err) {
                            console.log(err);
                            return res.json({status: 'error', id: dataCharts._id})
                        }
                        return res.json({status: 'ok', id: dataCharts._id});
                    });
                }

            })
        } else {
            dataCharts.category = chartCategory.Default;
            dataCharts.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.json({status: 'error', id: dataCharts._id})
                }
                return res.json({status: 'ok', id: dataCharts._id});
            });
        }
    }
}

async function getCharts(req, res) {
    const result = {
        status: 'ok',
        data: {
            "content": "{\"description\":\"\",\"resolution\":\"D\",\"symbol_type\":\"stock\",\"exchange\":\"HOSE\",\"listed_exchange\":\"\",\"symbol\":\"VNM\",\"short_name\":\"VNM\",\"legs\":\"[{\\\"symbol\\\":\\\"VNM\\\",\\\"pro_symbol\\\":\\\"VNM\\\"}]\",\"is_realtime\":\"1\",\"content\":\"{\\\"name\\\":\\\"\\\",\\\"layout\\\":\\\"s\\\",\\\"charts\\\":[{\\\"panes\\\":[{\\\"sources\\\":[{\\\"type\\\":\\\"MainSeries\\\",\\\"id\\\":\\\"ACQV3x\\\",\\\"state\\\":{\\\"style\\\":1,\\\"esdShowDividends\\\":true,\\\"esdShowSplits\\\":true,\\\"esdShowEarnings\\\":true,\\\"esdShowBreaks\\\":false,\\\"esdBreaksStyle\\\":{\\\"color\\\":\\\"rgba( 235, 77, 92, 1)\\\",\\\"style\\\":2,\\\"width\\\":1},\\\"esdFlagSize\\\":2,\\\"showCountdown\\\":false,\\\"bidAsk\\\":{\\\"visible\\\":false,\\\"lineStyle\\\":1,\\\"lineWidth\\\":1,\\\"bidLineColor\\\":\\\"#2196F3\\\",\\\"askLineColor\\\":\\\"#EF5350\\\"},\\\"prePostMarket\\\":{\\\"visible\\\":true,\\\"lineStyle\\\":1,\\\"lineWidth\\\":1,\\\"preMarketColor\\\":\\\"#fb8c00\\\",\\\"postMarketColor\\\":\\\"#2196f3\\\"},\\\"showInDataWindow\\\":true,\\\"visible\\\":true,\\\"showPriceLine\\\":true,\\\"priceLineWidth\\\":1,\\\"priceLineColor\\\":\\\"\\\",\\\"baseLineColor\\\":\\\"#B2B5BE\\\",\\\"showPrevClosePriceLine\\\":false,\\\"prevClosePriceLineWidth\\\":1,\\\"prevClosePriceLineColor\\\":\\\"rgba( 85, 85, 85, 1)\\\",\\\"minTick\\\":\\\"default\\\",\\\"extendedHours\\\":false,\\\"dividendsAdjustment\\\":{},\\\"sessVis\\\":false,\\\"statusViewStyle\\\":{\\\"fontSize\\\":16,\\\"showExchange\\\":true,\\\"showInterval\\\":true,\\\"symbolTextSource\\\":\\\"description\\\"},\\\"candleStyle\\\":{\\\"upColor\\\":\\\"#26a69a\\\",\\\"downColor\\\":\\\"#ef5350\\\",\\\"drawWick\\\":true,\\\"drawBorder\\\":true,\\\"borderColor\\\":\\\"#378658\\\",\\\"borderUpColor\\\":\\\"#26a69a\\\",\\\"borderDownColor\\\":\\\"#ef5350\\\",\\\"wickColor\\\":\\\"#737375\\\",\\\"wickUpColor\\\":\\\"#26a69a\\\",\\\"wickDownColor\\\":\\\"#ef5350\\\",\\\"barColorsOnPrevClose\\\":false,\\\"drawBody\\\":true},\\\"hollowCandleStyle\\\":{\\\"upColor\\\":\\\"#26a69a\\\",\\\"downColor\\\":\\\"#ef5350\\\",\\\"drawWick\\\":true,\\\"drawBorder\\\":true,\\\"borderColor\\\":\\\"#378658\\\",\\\"borderUpColor\\\":\\\"#26a69a\\\",\\\"borderDownColor\\\":\\\"#ef5350\\\",\\\"wickColor\\\":\\\"#737375\\\",\\\"wickUpColor\\\":\\\"#26a69a\\\",\\\"wickDownColor\\\":\\\"#ef5350\\\",\\\"drawBody\\\":true},\\\"haStyle\\\":{\\\"upColor\\\":\\\"#26a69a\\\",\\\"downColor\\\":\\\"#ef5350\\\",\\\"drawWick\\\":true,\\\"drawBorder\\\":true,\\\"borderColor\\\":\\\"#378658\\\",\\\"borderUpColor\\\":\\\"#26a69a\\\",\\\"borderDownColor\\\":\\\"#ef5350\\\",\\\"wickColor\\\":\\\"#737375\\\",\\\"wickUpColor\\\":\\\"#26a69a\\\",\\\"wickDownColor\\\":\\\"#ef5350\\\",\\\"showRealLastPrice\\\":false,\\\"barColorsOnPrevClose\\\":false,\\\"inputs\\\":{},\\\"inputInfo\\\":{},\\\"drawBody\\\":true},\\\"barStyle\\\":{\\\"upColor\\\":\\\"#26a69a\\\",\\\"downColor\\\":\\\"#ef5350\\\",\\\"barColorsOnPrevClose\\\":false,\\\"dontDrawOpen\\\":false,\\\"thinBars\\\":true},\\\"hiloStyle\\\":{\\\"color\\\":\\\"#2196f3\\\",\\\"showBorders\\\":true,\\\"borderColor\\\":\\\"#2196f3\\\",\\\"showLabels\\\":true,\\\"labelColor\\\":\\\"#2196f3\\\",\\\"fontSize\\\":7,\\\"drawBody\\\":true},\\\"lineStyle\\\":{\\\"color\\\":\\\"#2196f3\\\",\\\"linestyle\\\":0,\\\"linewidth\\\":2,\\\"priceSource\\\":\\\"close\\\",\\\"styleType\\\":2},\\\"areaStyle\\\":{\\\"color1\\\":\\\"rgba(33, 150, 243, 0.28)\\\",\\\"color2\\\":\\\"#2196f3\\\",\\\"linecolor\\\":\\\"#2196f3\\\",\\\"linestyle\\\":0,\\\"linewidth\\\":2,\\\"priceSource\\\":\\\"close\\\",\\\"transparency\\\":100},\\\"renkoStyle\\\":{\\\"upColor\\\":\\\"#26a69a\\\",\\\"downColor\\\":\\\"#ef5350\\\",\\\"borderUpColor\\\":\\\"#26a69a\\\",\\\"borderDownColor\\\":\\\"#ef5350\\\",\\\"upColorProjection\\\":\\\"#a9dcc3\\\",\\\"downColorProjection\\\":\\\"#f5a6ae\\\",\\\"borderUpColorProjection\\\":\\\"#a9dcc3\\\",\\\"borderDownColorProjection\\\":\\\"#f5a6ae\\\",\\\"wickUpColor\\\":\\\"#26a69a\\\",\\\"wickDownColor\\\":\\\"#ef5350\\\",\\\"inputs\\\":{\\\"source\\\":\\\"close\\\",\\\"sources\\\":\\\"Close\\\",\\\"boxSize\\\":3,\\\"style\\\":\\\"ATR\\\",\\\"atrLength\\\":14,\\\"wicks\\\":true},\\\"inputInfo\\\":{\\\"source\\\":{\\\"name\\\":\\\"source\\\"},\\\"sources\\\":{\\\"name\\\":\\\"Source\\\"},\\\"boxSize\\\":{\\\"name\\\":\\\"Box size\\\"},\\\"style\\\":{\\\"name\\\":\\\"Style\\\"},\\\"atrLength\\\":{\\\"name\\\":\\\"ATR length\\\"},\\\"wicks\\\":{\\\"name\\\":\\\"Wicks\\\"}}},\\\"pbStyle\\\":{\\\"upColor\\\":\\\"#26a69a\\\",\\\"downColor\\\":\\\"#ef5350\\\",\\\"borderUpColor\\\":\\\"#26a69a\\\",\\\"borderDownColor\\\":\\\"#ef5350\\\",\\\"upColorProjection\\\":\\\"#a9dcc3\\\",\\\"downColorProjection\\\":\\\"#f5a6ae\\\",\\\"borderUpColorProjection\\\":\\\"#a9dcc3\\\",\\\"borderDownColorProjection\\\":\\\"#f5a6ae\\\",\\\"inputs\\\":{\\\"source\\\":\\\"close\\\",\\\"lb\\\":3},\\\"inputInfo\\\":{\\\"source\\\":{\\\"name\\\":\\\"Source\\\"},\\\"lb\\\":{\\\"name\\\":\\\"Number of line\\\"}}},\\\"kagiStyle\\\":{\\\"upColor\\\":\\\"#26a69a\\\",\\\"downColor\\\":\\\"#ef5350\\\",\\\"upColorProjection\\\":\\\"#a9dcc3\\\",\\\"downColorProjection\\\":\\\"#f5a6ae\\\",\\\"inputs\\\":{\\\"source\\\":\\\"close\\\",\\\"style\\\":\\\"ATR\\\",\\\"atrLength\\\":14,\\\"reversalAmount\\\":1},\\\"inputInfo\\\":{\\\"source\\\":{\\\"name\\\":\\\"Source\\\"},\\\"style\\\":{\\\"name\\\":\\\"Style\\\"},\\\"atrLength\\\":{\\\"name\\\":\\\"ATR length\\\"},\\\"reversalAmount\\\":{\\\"name\\\":\\\"Reversal amount\\\"}}},\\\"pnfStyle\\\":{\\\"upColor\\\":\\\"#26a69a\\\",\\\"downColor\\\":\\\"#ef5350\\\",\\\"upColorProjection\\\":\\\"#a9dcc3\\\",\\\"downColorProjection\\\":\\\"#f5a6ae\\\",\\\"inputs\\\":{\\\"sources\\\":\\\"Close\\\",\\\"reversalAmount\\\":3,\\\"boxSize\\\":1,\\\"style\\\":\\\"ATR\\\",\\\"atrLength\\\":14,\\\"oneStepBackBuilding\\\":false},\\\"inputInfo\\\":{\\\"sources\\\":{\\\"name\\\":\\\"Source\\\"},\\\"boxSize\\\":{\\\"name\\\":\\\"Box size\\\"},\\\"reversalAmount\\\":{\\\"name\\\":\\\"Reversal amount\\\"},\\\"style\\\":{\\\"name\\\":\\\"Style\\\"},\\\"atrLength\\\":{\\\"name\\\":\\\"ATR length\\\"},\\\"oneStepBackBuilding\\\":{\\\"name\\\":\\\"One step back building\\\"}}},\\\"baselineStyle\\\":{\\\"baselineColor\\\":\\\"rgba( 117, 134, 150, 1)\\\",\\\"topFillColor1\\\":\\\"rgba( 38, 166, 154, 0.28)\\\",\\\"topFillColor2\\\":\\\"rgba( 38, 166, 154, 0.05)\\\",\\\"bottomFillColor1\\\":\\\"rgba( 239, 83, 80, 0.05)\\\",\\\"bottomFillColor2\\\":\\\"rgba( 239, 83, 80, 0.28)\\\",\\\"topLineColor\\\":\\\"rgba( 38, 166, 154, 1)\\\",\\\"bottomLineColor\\\":\\\"rgba( 239, 83, 80, 1)\\\",\\\"topLineWidth\\\":2,\\\"bottomLineWidth\\\":2,\\\"priceSource\\\":\\\"close\\\",\\\"transparency\\\":50,\\\"baseLevelPercentage\\\":50},\\\"rangeStyle\\\":{\\\"upColor\\\":\\\"#26a69a\\\",\\\"downColor\\\":\\\"#ef5350\\\",\\\"thinBars\\\":true,\\\"upColorProjection\\\":\\\"#a9dcc3\\\",\\\"downColorProjection\\\":\\\"#f5a6ae\\\",\\\"inputs\\\":{\\\"range\\\":10,\\\"phantomBars\\\":false},\\\"inputInfo\\\":{\\\"range\\\":{\\\"name\\\":\\\"Range\\\"},\\\"phantomBars\\\":{\\\"name\\\":\\\"Phantom bars\\\"}}},\\\"symbol\\\":\\\"VNM\\\",\\\"shortName\\\":\\\"VNM\\\",\\\"timeframe\\\":\\\"\\\",\\\"onWidget\\\":false,\\\"interval\\\":\\\"D\\\",\\\"currencyId\\\":null,\\\"showSessions\\\":false,\\\"priceAxisProperties\\\":{\\\"autoScale\\\":true,\\\"autoScaleDisabled\\\":false,\\\"lockScale\\\":false,\\\"percentage\\\":false,\\\"percentageDisabled\\\":false,\\\"log\\\":false,\\\"logDisabled\\\":false,\\\"alignLabels\\\":true,\\\"isInverted\\\":false,\\\"indexedTo100\\\":false}},\\\"zorder\\\":0,\\\"haStyle\\\":{\\\"studyId\\\":\\\"BarSetHeikenAshi@tv-basicstudies-60\\\"},\\\"renkoStyle\\\":{\\\"studyId\\\":\\\"BarSetRenko@tv-prostudies-40\\\"},\\\"pbStyle\\\":{\\\"studyId\\\":\\\"BarSetPriceBreak@tv-prostudies-34\\\"},\\\"kagiStyle\\\":{\\\"studyId\\\":\\\"BarSetKagi@tv-prostudies-34\\\"},\\\"pnfStyle\\\":{\\\"studyId\\\":\\\"BarSetPnF@tv-prostudies-34\\\"},\\\"rangeStyle\\\":{\\\"studyId\\\":\\\"BarSetRange@tv-basicstudies-72\\\"},\\\"currencyId\\\":null},{\\\"type\\\":\\\"Study\\\",\\\"id\\\":\\\"KRBk2V\\\",\\\"state\\\":{\\\"styles\\\":{\\\"plot_0\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":1,\\\"plottype\\\":0,\\\"trackPrice\\\":false,\\\"transparency\\\":35,\\\"visible\\\":true,\\\"color\\\":\\\"#000080\\\",\\\"histogramBase\\\":0,\\\"joinPoints\\\":false,\\\"title\\\":\\\"Plot\\\"}},\\\"inputs\\\":{\\\"in_0\\\":9,\\\"in_1\\\":0.85,\\\"in_2\\\":6},\\\"precision\\\":\\\"default\\\",\\\"palettes\\\":{},\\\"bands\\\":{},\\\"area\\\":{},\\\"graphics\\\":{},\\\"showInDataWindow\\\":true,\\\"visible\\\":true,\\\"showStudyArguments\\\":true,\\\"plots\\\":{\\\"0\\\":{\\\"id\\\":\\\"plot_0\\\",\\\"type\\\":\\\"line\\\"}},\\\"_metainfoVersion\\\":50,\\\"isTVScript\\\":false,\\\"isTVScriptStub\\\":false,\\\"is_hidden_study\\\":false,\\\"description\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"shortDescription\\\":\\\"ALMA\\\",\\\"is_price_study\\\":true,\\\"id\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies\\\",\\\"scriptIdPart\\\":\\\"\\\",\\\"name\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies\\\",\\\"description_localized\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"shortId\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"packageId\\\":\\\"tv-basicstudies\\\",\\\"version\\\":\\\"1\\\",\\\"fullId\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies-1\\\",\\\"productId\\\":\\\"tv-basicstudies\\\",\\\"_serverMetaInfoVersion\\\":27,\\\"format\\\":{\\\"type\\\":\\\"price\\\",\\\"precision\\\":4}},\\\"zorder\\\":-1,\\\"metaInfo\\\":{\\\"palettes\\\":{},\\\"inputs\\\":[{\\\"id\\\":\\\"in_0\\\",\\\"name\\\":\\\"Window Size\\\",\\\"defval\\\":9,\\\"type\\\":\\\"integer\\\",\\\"min\\\":0,\\\"max\\\":5000},{\\\"id\\\":\\\"in_1\\\",\\\"name\\\":\\\"Offset\\\",\\\"defval\\\":0.85,\\\"type\\\":\\\"float\\\",\\\"min\\\":-1000000000000,\\\"max\\\":1000000000000},{\\\"id\\\":\\\"in_2\\\",\\\"name\\\":\\\"Sigma\\\",\\\"defval\\\":6,\\\"type\\\":\\\"float\\\",\\\"min\\\":-1000000000000,\\\"max\\\":1000000000000}],\\\"plots\\\":[{\\\"id\\\":\\\"plot_0\\\",\\\"type\\\":\\\"line\\\"}],\\\"graphics\\\":{},\\\"defaults\\\":{\\\"styles\\\":{\\\"plot_0\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":1,\\\"plottype\\\":0,\\\"trackPrice\\\":false,\\\"transparency\\\":35,\\\"visible\\\":true,\\\"color\\\":\\\"#000080\\\"}},\\\"inputs\\\":{\\\"in_0\\\":9,\\\"in_1\\\":0.85,\\\"in_2\\\":6}},\\\"_metainfoVersion\\\":50,\\\"isTVScript\\\":false,\\\"isTVScriptStub\\\":false,\\\"is_hidden_study\\\":false,\\\"styles\\\":{\\\"plot_0\\\":{\\\"title\\\":\\\"Plot\\\",\\\"histogramBase\\\":0,\\\"joinPoints\\\":false}},\\\"description\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"shortDescription\\\":\\\"ALMA\\\",\\\"is_price_study\\\":true,\\\"id\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies-1\\\",\\\"scriptIdPart\\\":\\\"\\\",\\\"name\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies\\\",\\\"description_localized\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"shortId\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"packageId\\\":\\\"tv-basicstudies\\\",\\\"version\\\":\\\"1\\\",\\\"fullId\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies-1\\\",\\\"productId\\\":\\\"tv-basicstudies\\\",\\\"_serverMetaInfoVersion\\\":27,\\\"format\\\":{\\\"type\\\":\\\"price\\\",\\\"precision\\\":4}}},{\\\"type\\\":\\\"Study\\\",\\\"id\\\":\\\"OGp4uB\\\",\\\"state\\\":{\\\"styles\\\":{\\\"plot_0\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":1,\\\"plottype\\\":0,\\\"trackPrice\\\":false,\\\"transparency\\\":35,\\\"visible\\\":true,\\\"color\\\":\\\"rgba(38, 198, 218, 1)\\\",\\\"histogramBase\\\":0,\\\"joinPoints\\\":false,\\\"title\\\":\\\"Plot\\\"}},\\\"inputs\\\":{\\\"in_0\\\":9,\\\"in_1\\\":0.85,\\\"in_2\\\":6},\\\"precision\\\":\\\"default\\\",\\\"palettes\\\":{},\\\"bands\\\":{},\\\"area\\\":{},\\\"graphics\\\":{},\\\"showInDataWindow\\\":true,\\\"visible\\\":true,\\\"showStudyArguments\\\":true,\\\"plots\\\":{\\\"0\\\":{\\\"id\\\":\\\"plot_0\\\",\\\"type\\\":\\\"line\\\"}},\\\"_metainfoVersion\\\":50,\\\"isTVScript\\\":false,\\\"isTVScriptStub\\\":false,\\\"is_hidden_study\\\":false,\\\"description\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"shortDescription\\\":\\\"ALMA\\\",\\\"is_price_study\\\":true,\\\"id\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies\\\",\\\"scriptIdPart\\\":\\\"\\\",\\\"name\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies\\\",\\\"description_localized\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"shortId\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"packageId\\\":\\\"tv-basicstudies\\\",\\\"version\\\":\\\"1\\\",\\\"fullId\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies-1\\\",\\\"productId\\\":\\\"tv-basicstudies\\\",\\\"_serverMetaInfoVersion\\\":27,\\\"format\\\":{\\\"type\\\":\\\"price\\\",\\\"precision\\\":4}},\\\"zorder\\\":-2,\\\"metaInfo\\\":{\\\"palettes\\\":{},\\\"inputs\\\":[{\\\"id\\\":\\\"in_0\\\",\\\"name\\\":\\\"Window Size\\\",\\\"defval\\\":9,\\\"type\\\":\\\"integer\\\",\\\"min\\\":0,\\\"max\\\":5000},{\\\"id\\\":\\\"in_1\\\",\\\"name\\\":\\\"Offset\\\",\\\"defval\\\":0.85,\\\"type\\\":\\\"float\\\",\\\"min\\\":-1000000000000,\\\"max\\\":1000000000000},{\\\"id\\\":\\\"in_2\\\",\\\"name\\\":\\\"Sigma\\\",\\\"defval\\\":6,\\\"type\\\":\\\"float\\\",\\\"min\\\":-1000000000000,\\\"max\\\":1000000000000}],\\\"plots\\\":[{\\\"id\\\":\\\"plot_0\\\",\\\"type\\\":\\\"line\\\"}],\\\"graphics\\\":{},\\\"defaults\\\":{\\\"styles\\\":{\\\"plot_0\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":1,\\\"plottype\\\":0,\\\"trackPrice\\\":false,\\\"transparency\\\":35,\\\"visible\\\":true,\\\"color\\\":\\\"#000080\\\"}},\\\"inputs\\\":{\\\"in_0\\\":9,\\\"in_1\\\":0.85,\\\"in_2\\\":6}},\\\"_metainfoVersion\\\":50,\\\"isTVScript\\\":false,\\\"isTVScriptStub\\\":false,\\\"is_hidden_study\\\":false,\\\"styles\\\":{\\\"plot_0\\\":{\\\"title\\\":\\\"Plot\\\",\\\"histogramBase\\\":0,\\\"joinPoints\\\":false}},\\\"description\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"shortDescription\\\":\\\"ALMA\\\",\\\"is_price_study\\\":true,\\\"id\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies-1\\\",\\\"scriptIdPart\\\":\\\"\\\",\\\"name\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies\\\",\\\"description_localized\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"shortId\\\":\\\"Arnaud Legoux Moving Average\\\",\\\"packageId\\\":\\\"tv-basicstudies\\\",\\\"version\\\":\\\"1\\\",\\\"fullId\\\":\\\"Arnaud Legoux Moving Average@tv-basicstudies-1\\\",\\\"productId\\\":\\\"tv-basicstudies\\\",\\\"_serverMetaInfoVersion\\\":27,\\\"format\\\":{\\\"type\\\":\\\"price\\\",\\\"precision\\\":4}}},{\\\"type\\\":\\\"LineToolTrendLine\\\",\\\"id\\\":\\\"O7qeDR\\\",\\\"state\\\":{\\\"linecolor\\\":\\\"rgba(33, 150, 243, 1)\\\",\\\"linewidth\\\":1,\\\"linestyle\\\":0,\\\"extendLeft\\\":false,\\\"extendRight\\\":false,\\\"leftEnd\\\":0,\\\"rightEnd\\\":0,\\\"showLabel\\\":false,\\\"horzLabelsAlign\\\":\\\"center\\\",\\\"vertLabelsAlign\\\":\\\"bottom\\\",\\\"font\\\":\\\"Verdana\\\",\\\"textcolor\\\":\\\"#2196f3\\\",\\\"fontsize\\\":14,\\\"bold\\\":false,\\\"italic\\\":false,\\\"snapTo45Degrees\\\":true,\\\"alwaysShowStats\\\":false,\\\"showMiddlePoint\\\":false,\\\"showPriceRange\\\":false,\\\"showBarsRange\\\":false,\\\"showDateTimeRange\\\":false,\\\"showDistance\\\":false,\\\"showAngle\\\":false,\\\"statsPosition\\\":2,\\\"visible\\\":true,\\\"frozen\\\":false,\\\"currencyId\\\":null,\\\"intervalsVisibilities\\\":{\\\"seconds\\\":true,\\\"secondsFrom\\\":1,\\\"secondsTo\\\":59,\\\"minutes\\\":true,\\\"minutesFrom\\\":1,\\\"minutesTo\\\":59,\\\"hours\\\":true,\\\"hoursFrom\\\":1,\\\"hoursTo\\\":24,\\\"days\\\":true,\\\"daysFrom\\\":1,\\\"daysTo\\\":366,\\\"weeks\\\":true,\\\"months\\\":true,\\\"ranges\\\":true},\\\"title\\\":\\\"\\\",\\\"lastUpdateTime\\\":0,\\\"text\\\":\\\"\\\",\\\"symbol\\\":\\\"HOSE:VNM\\\",\\\"interval\\\":\\\"D\\\",\\\"fixedSize\\\":true},\\\"points\\\":[{\\\"time_t\\\":1597199400,\\\"offset\\\":0,\\\"price\\\":109.05163199888668},{\\\"time_t\\\":1613615400,\\\"offset\\\":0,\\\"price\\\":110.11492930370645}],\\\"zorder\\\":-3,\\\"linkKey\\\":\\\"GCy64t5IlmtF\\\",\\\"ownerSource\\\":\\\"ACQV3x\\\"}],\\\"leftAxisesState\\\":[],\\\"rightAxisesState\\\":[{\\\"state\\\":{\\\"id\\\":\\\"OJxQ7ER0hPZ4\\\",\\\"m_priceRange\\\":{\\\"m_maxValue\\\":115.758,\\\"m_minValue\\\":83.013},\\\"m_isAutoScale\\\":true,\\\"m_isPercentage\\\":false,\\\"m_isIndexedTo100\\\":false,\\\"m_isLog\\\":false,\\\"m_isLockScale\\\":false,\\\"m_isInverted\\\":false,\\\"m_height\\\":193,\\\"m_topMargin\\\":0.1,\\\"m_bottomMargin\\\":0.08,\\\"alignLabels\\\":true},\\\"sources\\\":[\\\"ACQV3x\\\",\\\"KRBk2V\\\",\\\"OGp4uB\\\",\\\"O7qeDR\\\"]}],\\\"overlayPriceScales\\\":{},\\\"stretchFactor\\\":2813.73673644967,\\\"mainSourceId\\\":\\\"ACQV3x\\\",\\\"priceScaleRatio\\\":null},{\\\"sources\\\":[{\\\"type\\\":\\\"study_Volume\\\",\\\"id\\\":\\\"PLGrhv\\\",\\\"state\\\":{\\\"styles\\\":{\\\"vol\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":1,\\\"plottype\\\":5,\\\"trackPrice\\\":false,\\\"transparency\\\":65,\\\"visible\\\":true,\\\"color\\\":\\\"#000080\\\",\\\"histogramBase\\\":0,\\\"joinPoints\\\":false,\\\"title\\\":\\\"Volume\\\"},\\\"vol_ma\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":5,\\\"plottype\\\":4,\\\"trackPrice\\\":false,\\\"transparency\\\":65,\\\"visible\\\":true,\\\"color\\\":\\\"#0496ff\\\",\\\"histogramBase\\\":0,\\\"joinPoints\\\":false,\\\"title\\\":\\\"Volume MA\\\"}},\\\"palettes\\\":{\\\"volumePalette\\\":{\\\"colors\\\":{\\\"0\\\":{\\\"color\\\":\\\"#eb4d5c\\\",\\\"width\\\":1,\\\"style\\\":0,\\\"name\\\":\\\"Falling\\\"},\\\"1\\\":{\\\"color\\\":\\\"#53b987\\\",\\\"width\\\":1,\\\"style\\\":0,\\\"name\\\":\\\"Growing\\\"}}}},\\\"inputs\\\":{\\\"showMA\\\":false,\\\"length\\\":20,\\\"col_prev_close\\\":false},\\\"precision\\\":\\\"default\\\",\\\"bands\\\":{},\\\"area\\\":{},\\\"graphics\\\":{},\\\"showInDataWindow\\\":true,\\\"visible\\\":true,\\\"showStudyArguments\\\":true,\\\"plots\\\":{\\\"0\\\":{\\\"id\\\":\\\"vol\\\",\\\"type\\\":\\\"line\\\"},\\\"1\\\":{\\\"id\\\":\\\"volumePalette\\\",\\\"palette\\\":\\\"volumePalette\\\",\\\"target\\\":\\\"vol\\\",\\\"type\\\":\\\"colorer\\\"},\\\"2\\\":{\\\"id\\\":\\\"vol_ma\\\",\\\"type\\\":\\\"line\\\"}},\\\"_metainfoVersion\\\":50,\\\"isTVScript\\\":false,\\\"isTVScriptStub\\\":false,\\\"is_hidden_study\\\":false,\\\"transparency\\\":65,\\\"description\\\":\\\"Volume\\\",\\\"shortDescription\\\":\\\"Volume\\\",\\\"is_price_study\\\":false,\\\"id\\\":\\\"Volume@tv-basicstudies\\\",\\\"description_localized\\\":\\\"Volume\\\",\\\"shortId\\\":\\\"Volume\\\",\\\"packageId\\\":\\\"tv-basicstudies\\\",\\\"version\\\":\\\"1\\\",\\\"fullId\\\":\\\"Volume@tv-basicstudies-1\\\",\\\"productId\\\":\\\"tv-basicstudies\\\",\\\"name\\\":\\\"Volume@tv-basicstudies\\\",\\\"_serverMetaInfoVersion\\\":15,\\\"format\\\":{\\\"type\\\":\\\"volume\\\"}},\\\"zorder\\\":-1,\\\"metaInfo\\\":{\\\"palettes\\\":{\\\"volumePalette\\\":{\\\"colors\\\":{\\\"0\\\":{\\\"name\\\":\\\"Falling\\\"},\\\"1\\\":{\\\"name\\\":\\\"Growing\\\"}}}},\\\"inputs\\\":[{\\\"id\\\":\\\"showMA\\\",\\\"name\\\":\\\"show MA\\\",\\\"defval\\\":false,\\\"type\\\":\\\"bool\\\",\\\"isHidden\\\":true},{\\\"id\\\":\\\"length\\\",\\\"name\\\":\\\"MA Length\\\",\\\"defval\\\":20,\\\"type\\\":\\\"integer\\\",\\\"min\\\":1,\\\"max\\\":2000},{\\\"defval\\\":false,\\\"id\\\":\\\"col_prev_close\\\",\\\"name\\\":\\\"Color based on previous close\\\",\\\"type\\\":\\\"bool\\\"}],\\\"plots\\\":[{\\\"id\\\":\\\"vol\\\",\\\"type\\\":\\\"line\\\"},{\\\"id\\\":\\\"volumePalette\\\",\\\"palette\\\":\\\"volumePalette\\\",\\\"target\\\":\\\"vol\\\",\\\"type\\\":\\\"colorer\\\"},{\\\"id\\\":\\\"vol_ma\\\",\\\"type\\\":\\\"line\\\"}],\\\"graphics\\\":{},\\\"defaults\\\":{\\\"styles\\\":{\\\"vol\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":1,\\\"plottype\\\":5,\\\"trackPrice\\\":false,\\\"transparency\\\":65,\\\"visible\\\":true,\\\"color\\\":\\\"#000080\\\"},\\\"vol_ma\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":1,\\\"plottype\\\":0,\\\"trackPrice\\\":false,\\\"transparency\\\":65,\\\"visible\\\":false,\\\"color\\\":\\\"#0496FF\\\"}},\\\"palettes\\\":{\\\"volumePalette\\\":{\\\"colors\\\":{\\\"0\\\":{\\\"color\\\":\\\"#eb4d5c\\\",\\\"width\\\":1,\\\"style\\\":0},\\\"1\\\":{\\\"color\\\":\\\"#53b987\\\",\\\"width\\\":1,\\\"style\\\":0}}}},\\\"inputs\\\":{\\\"showMA\\\":false,\\\"length\\\":20,\\\"col_prev_close\\\":false}},\\\"_metainfoVersion\\\":50,\\\"isTVScript\\\":false,\\\"isTVScriptStub\\\":false,\\\"is_hidden_study\\\":false,\\\"transparency\\\":65,\\\"styles\\\":{\\\"vol\\\":{\\\"title\\\":\\\"Volume\\\",\\\"histogramBase\\\":0},\\\"vol_ma\\\":{\\\"title\\\":\\\"Volume MA\\\",\\\"histogramBase\\\":0}},\\\"description\\\":\\\"Volume\\\",\\\"shortDescription\\\":\\\"Volume\\\",\\\"is_price_study\\\":false,\\\"id\\\":\\\"Volume@tv-basicstudies-1\\\",\\\"description_localized\\\":\\\"Volume\\\",\\\"shortId\\\":\\\"Volume\\\",\\\"packageId\\\":\\\"tv-basicstudies\\\",\\\"version\\\":\\\"1\\\",\\\"fullId\\\":\\\"Volume@tv-basicstudies-1\\\",\\\"productId\\\":\\\"tv-basicstudies\\\",\\\"name\\\":\\\"Volume@tv-basicstudies\\\",\\\"_serverMetaInfoVersion\\\":15,\\\"format\\\":{\\\"type\\\":\\\"volume\\\"}}}],\\\"leftAxisesState\\\":[],\\\"rightAxisesState\\\":[{\\\"state\\\":{\\\"id\\\":\\\"X0iHiVNzbury\\\",\\\"m_priceRange\\\":{\\\"m_maxValue\\\":8176900,\\\"m_minValue\\\":0},\\\"m_isAutoScale\\\":true,\\\"m_isPercentage\\\":false,\\\"m_isIndexedTo100\\\":false,\\\"m_isLog\\\":false,\\\"m_isLockScale\\\":false,\\\"m_isInverted\\\":false,\\\"m_height\\\":39,\\\"m_topMargin\\\":0.1,\\\"m_bottomMargin\\\":0.08,\\\"alignLabels\\\":true},\\\"sources\\\":[\\\"PLGrhv\\\"]}],\\\"overlayPriceScales\\\":{},\\\"stretchFactor\\\":571.2900015182445,\\\"mainSourceId\\\":\\\"PLGrhv\\\",\\\"priceScaleRatio\\\":null},{\\\"sources\\\":[{\\\"type\\\":\\\"Study\\\",\\\"id\\\":\\\"sMfEu0\\\",\\\"state\\\":{\\\"styles\\\":{\\\"plot_0\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":1,\\\"plottype\\\":0,\\\"trackPrice\\\":false,\\\"transparency\\\":35,\\\"visible\\\":true,\\\"color\\\":\\\"#FF0000\\\",\\\"histogramBase\\\":0,\\\"joinPoints\\\":false,\\\"title\\\":\\\"Plot\\\"}},\\\"inputs\\\":{},\\\"precision\\\":\\\"default\\\",\\\"palettes\\\":{},\\\"bands\\\":{},\\\"area\\\":{},\\\"graphics\\\":{},\\\"showInDataWindow\\\":true,\\\"visible\\\":true,\\\"showStudyArguments\\\":true,\\\"plots\\\":{\\\"0\\\":{\\\"id\\\":\\\"plot_0\\\",\\\"type\\\":\\\"line\\\"}},\\\"_metainfoVersion\\\":50,\\\"isTVScript\\\":false,\\\"isTVScriptStub\\\":false,\\\"is_hidden_study\\\":false,\\\"description\\\":\\\"Balance of Power\\\",\\\"shortDescription\\\":\\\"Balance of Power\\\",\\\"is_price_study\\\":false,\\\"id\\\":\\\"Balance of Power@tv-basicstudies\\\",\\\"scriptIdPart\\\":\\\"\\\",\\\"name\\\":\\\"Balance of Power@tv-basicstudies\\\",\\\"description_localized\\\":\\\"Balance of Power\\\",\\\"shortId\\\":\\\"Balance of Power\\\",\\\"packageId\\\":\\\"tv-basicstudies\\\",\\\"version\\\":\\\"1\\\",\\\"fullId\\\":\\\"Balance of Power@tv-basicstudies-1\\\",\\\"productId\\\":\\\"tv-basicstudies\\\",\\\"_serverMetaInfoVersion\\\":27,\\\"format\\\":{\\\"type\\\":\\\"price\\\",\\\"precision\\\":4}},\\\"zorder\\\":-1,\\\"metaInfo\\\":{\\\"palettes\\\":{},\\\"inputs\\\":[],\\\"plots\\\":[{\\\"id\\\":\\\"plot_0\\\",\\\"type\\\":\\\"line\\\"}],\\\"graphics\\\":{},\\\"defaults\\\":{\\\"styles\\\":{\\\"plot_0\\\":{\\\"linestyle\\\":0,\\\"linewidth\\\":1,\\\"plottype\\\":0,\\\"trackPrice\\\":false,\\\"transparency\\\":35,\\\"visible\\\":true,\\\"color\\\":\\\"#FF0000\\\"}},\\\"inputs\\\":{}},\\\"_metainfoVersion\\\":50,\\\"isTVScript\\\":false,\\\"isTVScriptStub\\\":false,\\\"is_hidden_study\\\":false,\\\"styles\\\":{\\\"plot_0\\\":{\\\"title\\\":\\\"Plot\\\",\\\"histogramBase\\\":0,\\\"joinPoints\\\":false}},\\\"description\\\":\\\"Balance of Power\\\",\\\"shortDescription\\\":\\\"Balance of Power\\\",\\\"is_price_study\\\":false,\\\"id\\\":\\\"Balance of Power@tv-basicstudies-1\\\",\\\"scriptIdPart\\\":\\\"\\\",\\\"name\\\":\\\"Balance of Power@tv-basicstudies\\\",\\\"description_localized\\\":\\\"Balance of Power\\\",\\\"shortId\\\":\\\"Balance of Power\\\",\\\"packageId\\\":\\\"tv-basicstudies\\\",\\\"version\\\":\\\"1\\\",\\\"fullId\\\":\\\"Balance of Power@tv-basicstudies-1\\\",\\\"productId\\\":\\\"tv-basicstudies\\\",\\\"_serverMetaInfoVersion\\\":27,\\\"format\\\":{\\\"type\\\":\\\"price\\\",\\\"precision\\\":4}}}],\\\"leftAxisesState\\\":[],\\\"rightAxisesState\\\":[{\\\"state\\\":{\\\"id\\\":\\\"Q1IQGDNU5bet\\\",\\\"m_priceRange\\\":{\\\"m_maxValue\\\":1,\\\"m_minValue\\\":-1},\\\"m_isAutoScale\\\":true,\\\"m_isPercentage\\\":false,\\\"m_isIndexedTo100\\\":false,\\\"m_isLog\\\":false,\\\"m_isLockScale\\\":false,\\\"m_isInverted\\\":false,\\\"m_height\\\":42,\\\"m_topMargin\\\":0.1,\\\"m_bottomMargin\\\":0.08,\\\"alignLabels\\\":true},\\\"sources\\\":[\\\"sMfEu0\\\"]}],\\\"overlayPriceScales\\\":{},\\\"stretchFactor\\\":614.9732620320856,\\\"mainSourceId\\\":\\\"sMfEu0\\\",\\\"priceScaleRatio\\\":null}],\\\"timeScale\\\":{\\\"m_barSpacing\\\":6,\\\"m_rightOffset\\\":10},\\\"chartProperties\\\":{\\\"paneProperties\\\":{\\\"backgroundType\\\":\\\"solid\\\",\\\"background\\\":\\\"#ffffff\\\",\\\"backgroundGradientStartColor\\\":\\\"#ffffff\\\",\\\"backgroundGradientEndColor\\\":\\\"#ffffff\\\",\\\"vertGridProperties\\\":{\\\"color\\\":\\\"#F0F3FA\\\",\\\"style\\\":0},\\\"horzGridProperties\\\":{\\\"color\\\":\\\"#F0F3FA\\\",\\\"style\\\":0},\\\"crossHairProperties\\\":{\\\"color\\\":\\\"#758696\\\",\\\"style\\\":2,\\\"transparency\\\":0,\\\"width\\\":1},\\\"topMargin\\\":10,\\\"bottomMargin\\\":8,\\\"axisProperties\\\":{\\\"autoScale\\\":true,\\\"autoScaleDisabled\\\":false,\\\"lockScale\\\":false,\\\"percentage\\\":false,\\\"percentageDisabled\\\":false,\\\"indexedTo100\\\":false,\\\"log\\\":false,\\\"logDisabled\\\":false,\\\"alignLabels\\\":true,\\\"isInverted\\\":false},\\\"legendProperties\\\":{\\\"showStudyArguments\\\":true,\\\"showStudyTitles\\\":true,\\\"showStudyValues\\\":true,\\\"showSeriesTitle\\\":true,\\\"showSeriesOHLC\\\":true,\\\"showLegend\\\":true,\\\"showBarChange\\\":true,\\\"showBackground\\\":true,\\\"backgroundTransparency\\\":50,\\\"wrapText\\\":false}},\\\"scalesProperties\\\":{\\\"backgroundColor\\\":\\\"#ffffff\\\",\\\"lineColor\\\":\\\"rgb(136 136 136)\\\",\\\"textColor\\\":\\\"#131722\\\",\\\"fontSize\\\":12,\\\"scaleSeriesOnly\\\":false,\\\"showSeriesLastValue\\\":true,\\\"seriesLastValueMode\\\":1,\\\"showSeriesPrevCloseValue\\\":false,\\\"showStudyLastValue\\\":false,\\\"showSymbolLabels\\\":false,\\\"showStudyPlotLabels\\\":false,\\\"showBidAskLabels\\\":false,\\\"showPrePostMarketPriceLabel\\\":true,\\\"showFundamentalNameLabel\\\":false,\\\"showFundamentalLastValue\\\":false,\\\"barSpacing\\\":6,\\\"showCurrency\\\":true},\\\"chartEventsSourceProperties\\\":{\\\"visible\\\":true,\\\"futureOnly\\\":true,\\\"breaks\\\":{\\\"color\\\":\\\"rgba(85, 85, 85, 1)\\\",\\\"visible\\\":false,\\\"style\\\":2,\\\"width\\\":1}},\\\"priceScaleSelectionStrategyName\\\":\\\"auto\\\"},\\\"lineToolsGroups\\\":{\\\"groups\\\":[]},\\\"version\\\":2,\\\"timezone\\\":\\\"Asia/Ho_Chi_Minh\\\",\\\"sessions\\\":{\\\"properties\\\":{\\\"graphics\\\":{\\\"backgrounds\\\":{\\\"outOfSession\\\":{\\\"color\\\":\\\"#2196F3\\\",\\\"transparency\\\":92,\\\"visible\\\":false},\\\"preMarket\\\":{\\\"color\\\":\\\"#FF9800\\\",\\\"transparency\\\":92,\\\"visible\\\":false},\\\"postMarket\\\":{\\\"color\\\":\\\"#2196F3\\\",\\\"transparency\\\":92,\\\"visible\\\":false}},\\\"vertlines\\\":{\\\"sessBreaks\\\":{\\\"color\\\":\\\"#4985e7\\\",\\\"style\\\":2,\\\"visible\\\":false,\\\"width\\\":1}}}}},\\\"shouldBeSavedEvenIfHidden\\\":true}]}\"}",
            "symbol": "VNM",
            "resolution": "D"
        }
    };
    // return res.json(result);
    const query = req.query;
    if (query.chart) {
        const charts = await Charts.findOne({
            _id: query.chart,
            // owner: query.user,
            ownerSource: query.client
        }).lean().select('-symbol -resolution');
        charts['id'] = charts._id;
        // delete charts['id'];
        // delete charts['name'];
        const result = {
            status: 'ok',
            data: charts
        };
        return res.json(result);
    } else {
        const listCharts = await Charts.find({owner: query.user, ownerSource: query.client}).lean().select('-content');
        const listChartsFinboxer = await Charts.findOne({_id: "62d2e488cd37c2001c079bd1"}).lean().select('-content');
        listCharts.push(listChartsFinboxer);
        var listChartsResult = [];
        for (var i =0; i < listCharts.length; i++) {
            var chartData = listCharts[i];
            if (chartData && chartData['_id']) {
                chartData['id'] = chartData._id;
                listChartsResult.push(chartData);
            }
        }
        const result = {
            status: 'ok',
            data: listChartsResult
        };
        return res.json(result);
    }
}

function deleteCharts(req, res) {
    const query = req.query;
    if (query.chart) {
        Charts.deleteOne({_id: query.chart, owner: query.user, ownerSource: query.client}, function (err) {
            if (err) {
                return res.json({status: 'error'});
            }
            return res.json({status: 'ok'});
        });
    } else {
        return res.json({status: 'error'});
    }
}

function saveChartTicker(req, res) {
    const dataChart = req.body;
    if (dataChart.userId && dataChart.chartObject && dataChart.ticker) {
        const version = dataChart.version ?? undefined;
        chartRedisController.saveChartTickerUser(dataChart.ticker, dataChart.userId, dataChart.chartObject, version, function (success) {
            return res.json(success);
        })
    } else {
        return res.json(false);
    }
}

function removeChartTicker(req, res) {
    const dataChart = req.body;
    if (dataChart.userId && dataChart.chartId) {
        const version = dataChart.version ?? undefined;
        chartRedisController.removeChartTickerUser(dataChart.chartId, dataChart.userId, version, function (success) {
            return res.json(success);
        })
    } else {
        return res.json(false);
    }
}

function loadChartTicker(req, res) {
    const dataChart = req.body;
    if (dataChart.userId && dataChart.ticker) {
        const version = dataChart.version ?? undefined;
        chartRedisController.loadChartTickerUser(dataChart.ticker, dataChart.userId, version, async function (data) {
            var isVip = false;
            
            try {
                const res = await axios.post('https://api.finbox.vn/api/users/checkVip', {
                    userId: dataChart.userId,
                })
                isVip = res && res.data && res.data.isVip;
            } catch(e) {
                console.log(e);
            }

            if (!data.success) {
                return res.json({success: false, 'isVip': isVip});
            }

            return res.json({success: true, chartObject: data.data, 'isVip': isVip});
        })
    } else {
        return res.json({success: false});
    }
}

function resetDefaultChartTicker(req, res) {
    const dataChart = req.body;
    if (dataChart.userId && dataChart.ticker) {
        const version = dataChart.version ?? undefined;
        chartRedisController.resetDefaultChartTickerUser(dataChart.ticker, dataChart.userId, version, function (data) {
            if (!data.success) {
                return res.json({success: false});
            }
            return res.json({success: true});
        })
    } else {
        return res.json({success: false});
    }
}

module.exports = {
    saveCharts: saveCharts,
    getCharts: getCharts,
    deleteCharts: deleteCharts,
    saveChartTicker: saveChartTicker,
    removeChartTicker: removeChartTicker,
    loadChartTicker: loadChartTicker,
    resetDefaultChartTicker: resetDefaultChartTicker
};