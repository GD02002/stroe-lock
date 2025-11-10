import express from 'express';
import {
    ruleController
} from '../controller/index.js';

const ruleRouter = express.Router();

ruleRouter.get('/list', ruleController.getRuleFn);
ruleRouter.post('/get-by-id', ruleController.getByIdRuleFn);
ruleRouter.post('/add', ruleController.addRuleFn);
ruleRouter.post('/update', ruleController.updateRuleFn);
ruleRouter.post('/delete', ruleController.deleteRuleFn);
ruleRouter.post('/delete-metafield', ruleController.deleteMetafieldFn);


export default ruleRouter;
