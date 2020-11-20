import knex from 'knex';
import path from 'path';

const connection = knex({
    client:"sqlite3"
    ,connection:{
        filename: path.resolve(__dirname, 'db_ecolecta.sqlite')
    }
   /*client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : '',
            database : 'db_ecoleta'
    }
    */
    ,useNullAsDefault: true
});
export default connection;