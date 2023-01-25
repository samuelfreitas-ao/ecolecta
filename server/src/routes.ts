import express, { request } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controller/PointsController';
import ItemsController from './controller/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);



const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.post('/items', itemsController.create);
routes.get('/items', itemsController.index);
routes.get('/items/:id', itemsController.show);

routes.post('/points', upload.single('image'), pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;