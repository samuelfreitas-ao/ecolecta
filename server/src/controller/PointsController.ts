import {Request, Response} from 'express';
import knex from '../database/connection';
import addr from '../config/addr';

var urlBase = addr;
class PointsController{
    async create(request: Request, response: Response){
        const {
            name
            ,email
            ,whatsapp
            ,latitude
            ,longitude
            ,province
            ,county
            ,items
        } = request.body;
        //Transação para rollback, caso der um erro numa das queries
        const trx = await knex.transaction();
        const point = {
            name
            ,image:request.file.filename
            ,email
            ,whatsapp
            ,latitude
            ,longitude
            ,province
            ,county
        };

        console.log(point);

        const insertedIds = await trx('tb_points').insert(point);
    
        const point_id = insertedIds[0]
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id:number)=>{
            return {
                item_id
                ,point_id
            }
        });
    
        await trx('tb_point_items').insert(pointItems);
        
        await trx.commit();

        return response.json({
            id: point_id,
            ... point
        });
    }

    async index (request: Request, response: Response) {
        //Pode ou não vir um parâmetro de pesquisa
        const { province, items } = request.query;

        const parsedItem = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('tb_points')
            .select('tb_points.*')
            .join('tb_point_items', 'tb_point_items.point_id', '=', 'tb_points.id')
            .whereIn('tb_point_items.item_id', parsedItem)
            .where('province', String(province))
            .distinct();

        const serializedPoints = points.map(point=>{
            return {
                ... point
                ,image_url: `${urlBase}/uploads/${point.image}`
            }
        });
        
        return response.json(serializedPoints);
    }

    async show (request: Request, response: Response) {
        const { id } = request.params;
        const point = await knex('tb_points').where('id', id).first();

        if(!point){
            return  response.status(400).json({"message": "Point not found"});
        }
        
        
        const serializedPoint = {
            ... point
            ,image_url: `${urlBase}/uploads/${point.image}`
        };

        const items = await knex('tb_items')
            .select('tb_items.title')
            .join('tb_point_items', 'tb_items.id', '=', 'tb_point_items.item_id')
            .where('tb_point_items.point_id', id);
            
        return response.status(200).json({
            point: serializedPoint
            ,items
        });
    }
}

export default PointsController;