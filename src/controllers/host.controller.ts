import { NextFunction, Request, Response } from "express";
import { queryHostByTriggerId } from "../services/zabbix.service";
import { PollResponse } from "../model/response.model";
import { plainToInstance } from "class-transformer";
import axios from "axios";
import { handleAxiosError } from "../handlers/handle-axios-error";

// async function getHostByTriggerId(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
export const getHostByTriggerId: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (req, res, next) => {
    // Your implementation
    try {
        
        const id = parseInt(req.params.id, 0);
        const resp = await queryHostByTriggerId(id.toString());
        const pollResponse = resp.data;
        // console.log(resp.data);
        parseZabbixResponse(pollResponse);
        res.send("Poll!");
    } catch (error: any) {
        next(error); // Pass the error to the middleware
    }
};

function parseZabbixResponse(pollResponse: PollResponse): void {
    const zabixResp = plainToInstance(PollResponse, JSON.parse(JSON.stringify(pollResponse)), {
        excludeExtraneousValues: false,
    });

    console.log(zabixResp);
      
}
