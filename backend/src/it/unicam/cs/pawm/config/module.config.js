module.exports = {
    username: 'root',
    password: 'root',
    database: 'progetto_pawm',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 6, //numero massimo di connessioni
        min: 0, //numero minimo di connessioni
    }
};
