import { Response } from "express";
import { StatusCodes } from "http-status-codes";


export type ErrorMessageType = 'success'|'warning'|'error'|'info';
export enum ErrorMessageTypeEnum {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    INFO = 'info'
}

export interface ErrorMessageInterface{
    description:string,
    type: ErrorMessageType
}


export class ApiResponse {
    private res:Response;
    private data: Object;
    private status: number;
    private validationError: null | Object
    private message : ErrorMessageInterface | null
    constructor(res:Response){
        this.data = {};
        this.res = res;
        this.status = StatusCodes.OK;
        this.validationError = null;
        this.message = null
    }

    setData(data: Record<string,any>|any):this{
        this.data = data;
        return this;
    }

    setStatus(status:number):this{
        this.status = status;
        return this;
    }

    setValidationError(error: Record<string,any>|any):this{
        this.validationError = error;
        return this;
    }

    setMessage(message:string, type:ErrorMessageType = ErrorMessageTypeEnum.INFO):this{
        this.message = {
            description: message, type: type
        }
        return this;
    }

    sendJson(){
        return this.res.status(this.status).json({
            status: this.status,
            message: this.message,
            validationError: this.validationError,
            ...this.data
        })
    }
}