const { validationResult, ValidationChain } = require('express-validator');
import * as express from 'express';

const validate = (validations: typeof ValidationChain[]) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ message: errors.array()[0].msg });
    };
};
export default validate