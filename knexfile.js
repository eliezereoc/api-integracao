import dotenv from 'dotenv/config';

export default {
    development: {
        client: 'mysql2',
        connection: {   
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        },
        migrations: {            
            directory: './src/database/migrations',
            extension: 'js',
        },
        seeds: {
            directory: './src/database/seeds',
            extension: 'js',
        },
    },
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        },
        migrations: {            
            directory: './src/database/migrations',
            extension: 'js',
        },         
    },
};