import {Request, Response} from 'express';
import knex from '../database/connection';
import addr from '../config/addr';

var urlBase = addr;
class ItemsController{
    async create(request: Request, response: Response) {
        console.log(request.body);
        const {
            title
            ,image
        } = request.body;
    
        //Transação para rollback, caso der um erro numa das queries
        const item = {
            title
            ,image
        };

        const insertedIds = await knex('tb_items').insert(item);
    
        const item_id = insertedIds[0];
    
        return response.json({
            id: item_id
            ,... item
        });
    }

    async index (request: Request, response: Response) {
        const items = await knex('tb_items').select('*');
        const serializedItems = items.map(item=>{
            return {
                id: item.id
                ,title: item.title
                ,image_url: `${urlBase}/uploads/${item.image}`
            }
        });
        return response.json(serializedItems);
    }

    async show (request: Request, response: Response) {
        const { id } = request.params;
        const items = await knex('tb_items').where('id', id);
        const serializedItems = items.map(item=>{
            return {
                id: item.id
                ,title: item.title
                ,image_url: `${urlBase}/uploads/${item.image}`
            }
        });
        return response.json(serializedItems);
    }
}

export default ItemsController;