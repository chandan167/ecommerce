import { Router } from "express";
export const group = ((callback: (router: Router) => void) => {
    const router = Router();
    callback(router);
    return router;
});