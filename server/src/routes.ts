import express from 'express'
import { celebrate, Joi } from 'celebrate'

import multer from 'multer'
import multerConfig from './config/multer'

import PointsController from './controller/PointsController'
import ItemsController from './controller/ItemsController'

const routes = express.Router()

const upload = multer(multerConfig)

const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.post('/items', itemsController.create)
routes.get('/items', itemsController.index)
routes.get('/items/:id', itemsController.show)

routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        province: Joi.string().required(),
        county: Joi.string().required(),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

export default routes
