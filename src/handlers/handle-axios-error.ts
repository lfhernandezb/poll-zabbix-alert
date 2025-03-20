import { AxiosError } from "axios";
import { Response } from "express";

export const handleAxiosError = (err: AxiosError, res: Response) => {
    if (err.response) {
        return res.status(err.response.status).json({
            message: "Error from external API",
            status: err.response.status,
            data: err.response.data,
        });
    } else if (err.request) {
        return res.status(504).json({
            message: "External API is not responding",
            error: err.message,
        });
    } else {
        return res.status(500).json({
            message: "Axios request error",
            error: err.message,
        });
    }
};
