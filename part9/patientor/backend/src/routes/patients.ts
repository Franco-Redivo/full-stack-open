import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatientEntry } from '../types';
import toNewPatientEntry from '../utils';

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

router.post('/', (req, res) => {
    try{
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientsService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown){
        let errorMessage = ' Something went wrong. ';
        if (error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    

});

export default router;