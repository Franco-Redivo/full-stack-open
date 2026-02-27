import { NextFunction, Request, Response } from "express";
import { newEntrySchema } from "./utils";
import { z } from 'zod';

export const newPatientParser = ( req: Request, _res: Response, next: NextFunction) => {
    try{
        newEntrySchema.parse(req.body);
        next();
    } catch(error: unknown) {
        next(error);
    } 
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if(error instanceof z.ZodError){
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};