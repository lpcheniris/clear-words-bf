import { NextFunction, Request, Response, Router } from 'express';


import { Word } from '../models/Word'

export const WordController: Router = Router();

WordController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    let result = {}
    try {
        let isExist = await Word.exists({ query: data.query })
        if (!isExist) {
            await new Word(data).save()
            result = {
                text: "This word is saved"
            }
        } else {
          result = {
              text: "This word is exist"
          }
        }
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
});

WordController.get('/:query', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Word.findOne({ query: req.params.query }).exec()
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
});

WordController.delete('/:query', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Word.remove({ query: req.params.query }).exec()
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
});
