import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]> ) => {
    res.send(patientsService.getNonSensitivePatientsEntries());
});

router.post('/', (_req, res) => {
    res.send('Saving a patient!');
});

export default router;