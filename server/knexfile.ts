import path from 'path';

module.exports = {
    client:"sqlite3"
    ,connection:{
        filename: path.resolve(__dirname, 'src', 'database', 'db_ecolecta.sqlite')
    }
   
   /*client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : '',
            database : 'db_ecoleta'
    }
    ,migrations:{
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
    ,seeds:{
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }*/
    ,useNullAsDefault: true
};