import express from 'express';
import { Response, Request } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry, NonSensitivePatientEntry, PatientsEntry } from '../types';
//import {toNewPatientEntry} from '../utils';
//import { z } from 'zod';
import { errorMiddleware, newPatientParser } from '../middlewares';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]> ) => {
    res.send(patientsService.getNonSensitivePatientsEntries());
});

router.get('/:id', (req, res: Response<NonSensitivePatientEntry>) => {
    const patient = patientsService.findById(req.params.id);

    if(patient){
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/',newPatientParser, (req: Request<unknown,unknown,NewPatientEntry>, res: Response<PatientsEntry>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient); 
    

});

router.use(errorMiddleware);

export default router;