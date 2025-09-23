const signalType = require('./signal.enum');

function signalDataToMark(signalDataItem, index) {
    let color;
    let label;
    let minSize;
    if (signalDataItem.signal === signalType.LONG || signalDataItem.signal === signalType.SHORT) {
        color = signalDataItem.signal.endsWith(signalType.LONG) ? 'green' : 'red';
        label = signalDataItem.signal.endsWith(signalType.LONG) ? 'L' : 'S';
        minSize = 20;
    } else {
        color = signalDataItem.signal.endsWith(signalType.BUY) ? 'green' : 'red';
        label = signalDataItem.signal.endsWith(signalType.BUY) ? 'B' : 'S';
        minSize = signalDataItem.signal.startsWith(signalType.SMALL) ? 20 : 20;
        signalDataItem.time = signalDataItem.time / 1000;
    }
    return {
        id: index,
        time: signalDataItem.time,
        color: color,
        label: label,
        labelFontColor: 'white',
        minSize: minSize,
        text: signalDataItem.signal,
        tooltip: signalDataItem.signal
    };
}

function signalDataToTimeScaledMark(signalDataItem, index) {
    return {
        id: index,
        time: signalDataItem.time,
        color: signalDataItem.signal.endsWith(signalType.BUY) ? 'green' : 'red',
        label: signalDataItem.signal.endsWith(signalType.BUY) ? 'B' : 'S',
        tooltip: signalDataItem.signal
    };
}

function signalDataToMarkData(signalData) {
    const markDataArr = signalData.map((item, index) => signalDataToMark(item, index));
    const markData = {
        id: [],
        time: [],
        color: [],
        text: [],
        label: [],
        labelFontColor: [],
        minSize: []
    }
    for (var i = 0 ; i < 1; i++) {
        var item = markDataArr[i];
        markData.id.push(item.id);
        markData.time.push(item.time);
        markData.color.push(item.color);
        markData.text.push(item.text);
        markData.label.push(item.label);
        markData.labelFontColor.push(item.labelFontColor);
        markData.minSize.push(item.minSize);
    }
    // markDataArr.forEach((item) => {
    //     markData.id.push(item.id);
    //     markData.time.push(item.time);
    //     markData.color.push(item.color);
    //     markData.text.push(item.text);
    //     markData.label.push(item.label);
    //     markData.labelFontColor.push(item.labelFontColor);
    //     markData.minSize.push(item.minSize);
    // });
    return markData;
}

module.exports = {
    signalDataToMark,
    signalDataToTimeScaledMark,
    signalDataToMarkData
}
