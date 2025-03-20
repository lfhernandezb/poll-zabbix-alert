import { classToPlain, instanceToPlain } from "class-transformer";
import axios from "axios";
import * as https from "https";
import { Params, PollRequest } from "../model/request.model";
import { PollResponse } from "../model/response.model";
import { config } from "../config/config";

async function queryAllAlerts(): Promise<any> {
  
    // create a new Request object
    const request: PollRequest = {
        jsonrpc: "2.0",
        method: "problem.get",
        id: 1,
        params: {
            output: "extend",
            selectAcknowledges: "extend",
            selectTags: "extend",
            selectSuppressionData: "extend",
            recent: "true",
            sortfield: ["eventid"],
            sortorder: "DESC"              
        },
    };

    // send an http request to the backend using axios
    return axios.post(config.zabbixUrl + "/zabbix/api_jsonrpc.php", instanceToPlain(request, ), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.zabbixToken}`
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
}

async function queryAlertById(id: number): Promise<any> {
  
    // create a new Request object
    const request: PollRequest = {
        jsonrpc: "2.0",
        method: "event.get",
        id: 1,
        params: {
            output: "extend",
            selectAcknowledges: "extend",
            selectTags: "extend",
            selectSuppressionData: "extend",
            eventids: id.toString()
        },
    };

    console.log(instanceToPlain(request, ));

    // send an http request to the backend using axios
    return axios.post(config.zabbixUrl + "/zabbix/api_jsonrpc.php", instanceToPlain(request, ), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.zabbixToken}`
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
}

async function queryHostByTriggerId(id: string): Promise<any> {
  
    // create a new Request object
    const request: PollRequest = {
        jsonrpc: "2.0",
        method: "host.get",
        id: 2,
        params: {
            triggerids: [ id ]
        },
    };

    console.log(instanceToPlain(request, ));

    // send an http request to the backend using axios
    return axios.post(config.zabbixUrl + "/zabbix/api_jsonrpc.php", instanceToPlain(request, ), {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.zabbixToken}`
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
}

export { queryAllAlerts, queryAlertById, queryHostByTriggerId };
  