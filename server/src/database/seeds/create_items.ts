import Knex from  'knex';

export async function seed(knex: Knex){
    await knex('tb_items').insert([
        {title:"Lâmpadas", image:"lampadas.svg"}
        ,{title:"Pilhas e Bateria", image:"baterias.svg"}
        ,{title:"Papéis e Papelão", image:"papeis-papelao.svg"}
        ,{title:"Resíduos electrónicos", image:"eletronicos.svg"}
        ,{title:"Resíduos orgânicos", image:"organicos.svg"}
        ,{title:"Óleo de cozinha", image:"oleo.svg"}
    ]);
}