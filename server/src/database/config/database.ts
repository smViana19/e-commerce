import 'dotenv/config'
import { Options } from 'sequelize';
import pg from 'pg';  // Importando o módulo pg explicitamente

const config: Options = {
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  dialect: 'postgres',
  dialectModule: pg,  // Aqui você especifica o módulo `pg`
  dialectOptions: {
    ssl: {
      require: true, // Para forçar o uso de SSL
      rejectUnauthorized: false, // Pode ajustar isso conforme seu certificado SSL
    },
  },
}

export = config;