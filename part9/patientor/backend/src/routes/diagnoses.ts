import express from 'express';
import { Response } from 'express';
import diagnosesService from '../services/diagnosesService';
import { DiagnosesEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response< DiagnosesEntry[]>) => {
    res.send(diagnosesService.getDiagnoses());
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnoses!');
});

export default router;