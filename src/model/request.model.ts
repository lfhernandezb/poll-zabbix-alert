export class Params {
    output?:                string;
    selectAcknowledges?:    string;
    selectTags?:            string;
    selectSuppressionData?: string;
    recent?:                string;
    sortfield?:             string[];
    sortorder?:             string;
    eventids?:              string;
    triggerids?:            string[];
}

export class PollRequest {
    jsonrpc?: string;
    method?:  string;
    params?:  Params;
    id?:      number;
}