import { NextFunction, Request, RequestHandler, Response } from "express";

export interface PaginationI {
    limit: number;
    page: number;
    skip: number
}

const defaultPaginationOption: PaginationI = {
    limit: 10,
    page: 1,
    skip: 0
}

export const pagination = (paginationOption?: PaginationI | null | any) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const pagination = { ...defaultPaginationOption, ...paginationOption }
        pagination.page = Number(req.query.page || pagination.page);
        pagination.limit = Number(req.query.limit || pagination.limit);
        pagination.skip = (pagination.page - 1) * pagination.limit
        req.pagination = pagination
        next();
    }
}