import express from 'express';
import { Response, Request } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry, NonSensitivePatientEntry, PatientsEntry, NewEntry, Entry } from '../types';
import {parseDiagnosisCodes} from '../utils';
//import { z } from 'zod';
import { errorMiddleware, newPatientParser, newEntryParser } from '../middlewares';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]> ) => {
    res.send(patientsService.getNonSensitivePatientsEntries());
});

router.get('/:id', (req, res: Response<PatientsEntry>) => {
    const patient = patientsService.findById(req.params.id);

    if(patient){
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, Entry, NewEntry>, res: Response<Entry>) => {
    const patient = patientsService.findById(req.params.id);
    if (!patient) {
        res.sendStatus(404);
        return;
    }

    const diagnosisCodes = parseDiagnosisCodes(req.body);
    if (diagnosisCodes.length > 0) {
        req.body.diagnosisCodes = diagnosisCodes;
    }else{
        delete req.body.diagnosisCodes;
    }
    const addedEntry = patientsService.addEntry(req.params.id, req.body);
    res.json(addedEntry);
});

router.post('/',newPatientParser, (req: Request<unknown,unknown,NewPatientEntry>, res: Response<PatientsEntry>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient); 
    

});

router.use(errorMiddleware);

export default router;