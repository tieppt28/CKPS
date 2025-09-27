import {
    ResolutionString,
    GetMarksCallback,
    LibrarySymbolInfo,
    Mark,
} from '../../assets/charting_library/charting_library';
import { UDFCompatibleDatafeed } from '../../assets/datafeeds/udf/src/udf-compatible-datafeed';
import {
    getErrorMessage,
    logMessage,
    RequestParams,

} from '../../assets/datafeeds/udf/src/helpers';
import { UdfDatafeedMark, extractField } from '../../assets/datafeeds/udf/src/udf-compatible-datafeed-base';

export class CustomDatafeed extends UDFCompatibleDatafeed {
    constructor(url: string, updateFrequency?: number, actionEnable: boolean = false, actionSymbol?: string, actionType?: string, actionDate?: string) {
        super(url, updateFrequency);
        this.actionEnable = actionEnable;
        this.actionSymbol = actionSymbol;
        this.actionDate = actionDate;
        this.actionType = actionType
    }

    protected actionEnable: boolean;
    protected actionSymbol?: string;
    protected actionDate?: string;
    protected actionType?: string;

    convertYYYYMMDDtoTimestamp = (rawDate: string) => {
        // Tách năm, tháng, ngày
        const year = parseInt(rawDate.substring(0, 4), 10);
        const month = parseInt(rawDate.substring(4, 6), 10) - 1; // JS month bắt đầu từ 0
        const day = parseInt(rawDate.substring(6, 8), 10);

        // Tạo Date tại UTC+7, 7h sáng
        const date = new Date(Date.UTC(year, month, day, 0, 0, 0));
        // Cộng thêm 7 giờ (UTC+7)
        date.setUTCHours(date.getUTCHours() + 7);

        // Lấy timestamp tính theo giây
        return Math.floor(date.getTime() / 1000);
    }

    getActionMarks = (rawMarks: Mark[], symbolInfo: LibrarySymbolInfo): Promise<Mark[]> => {
        return new Promise(async (resolve, _) => {
            try {
                if (this.actionEnable && symbolInfo.ticker == this.actionSymbol) {
                    const requestOptions = {
                        method: "GET",
                    };

                    if (this.actionDate && this.actionDate.length == 8) {
                        const buyDate = `${this.actionDate.slice(0, 4)}-${this.actionDate.slice(4, 6)}-${this.actionDate.slice(6, 8)}`;
                        const response = await fetch(`https://tcs.finbox.vn/${this.actionType}/${this.actionSymbol}?buy=${buyDate}`, requestOptions);
                        const responseText = await response.text();
                        const responseObj = JSON.parse(responseText);
                        if (responseObj && responseObj.actions && Array.isArray(responseObj.actions)) {
                            const actionBalanceParts = 3;
                            const actions = responseObj.actions as Array<any>;
                            const validMarks: UdfDatafeedMark | Mark[] = [];
                            for (let action of actions.filter(item => item.balance && item.balance > 0)) {
                                if (action && action.action && action.action == 'T+X') {
                                    action.action = 'T+' + action.t;
                                }
                                const newMark: any = {};
                                let color = 'black';
                                let background = 'white';
                                if (
                                    action.action?.toLowerCase()?.includes('buy') ||
                                    action.action?.toLowerCase()?.includes('gia tăng') ||
                                    action.action?.toLowerCase()?.includes('pullback')) {
                                    color = 'green';
                                    background = '#00800026';
                                } else {
                                    color = 'red';
                                    background = '#ff000026';
                                }

                                newMark.id = action.day + '_' + validMarks.length;
                                newMark.color = color;
                                newMark.labelFontColor = 'white';
                                newMark.minSize = 20;
                                newMark.pattern = 0;
                                newMark.time = this.convertYYYYMMDDtoTimestamp(`${action.day}`);

                                const balance = Math.round(action.balance / (1 / 3));
                                const actionType = this.actionType?.replace(/\bt(\d+)\b/gi, "T+$1") ?? '';
                                newMark.text = [
                                    `<div style="display: flex; justify-content: center">
                                        <b style="color: orange; padding-bottom: 10px; font-size: 20px; font-weigth: bold;">
                                            ${actionType}
                                        </b>
                                    </div>`,
                                    `<div style="color: ${color}; background: ${background}; padding: 10px 20px;">
                                        <b>
                                            ${action.action} ${balance}/${actionBalanceParts} - ${action.price.toFixed(2)}
                                        </b>
                                    </div>`
                                ];

                                let actionText = action.action;
                                if (typeof actionText == 'string' && actionText.toLowerCase().includes('sell')) {
                                    actionText = 'SELL';
                                } else if (typeof actionText == 'string' && actionText.toLowerCase().includes('buy')) {
                                    actionText = 'BUY';
                                }
                                newMark.label = `${actionText} ${balance}/${actionBalanceParts} - ${action.price.toFixed(2)}`;

                                validMarks.push(newMark);
                            }

                            return resolve(validMarks);

                        }
                    }
                }
            } catch (e) {
            }
            return resolve(rawMarks);
        })
    }

    // Override hàm getMarks
    override getMarks(symbolInfo: LibrarySymbolInfo, from: number, to: number, onDataCallback: GetMarksCallback<Mark>, resolution: ResolutionString): void {
        if (!this._configuration.supports_marks) {
            return;
        }

        const requestParams: RequestParams = {
            symbol: symbolInfo.ticker || '',
            from: from,
            to: to,
            resolution: resolution,
        };

        this.send<Mark[] | UdfDatafeedMark>('marks', requestParams)
            .then((response: Mark[] | UdfDatafeedMark) => {
                if (!Array.isArray(response)) {
                    const result: Mark[] = [];
                    for (let i = 0; i < response.id.length; ++i) {
                        result.push({
                            id: extractField(response, 'id', i),
                            time: extractField(response, 'time', i),
                            color: extractField(response, 'color', i),
                            text: extractField(response, 'text', i),
                            label: extractField(response, 'label', i),
                            labelFontColor: extractField(response, 'labelFontColor', i),
                            minSize: extractField(response, 'minSize', i),
                            borderWidth: extractField(response, 'borderWidth', i),
                            hoveredBorderWidth: extractField(response, 'hoveredBorderWidth', i),
                            imageUrl: extractField(response, 'imageUrl', i),
                            showLabelWhenImageLoaded: extractField(response, 'showLabelWhenImageLoaded', i),
                        });
                    }

                    response = result;
                }

                this.getActionMarks(response, symbolInfo).then(res => onDataCallback(res));  
            })
            .catch((error?: string | Error) => {
                logMessage(`UdfCompatibleDatafeed: Request marks failed: ${getErrorMessage(error)}`);
                onDataCallback([]);
            });
    }

}

