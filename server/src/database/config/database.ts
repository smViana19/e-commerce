import 'dotenv/config'
import { Options } from 'sequelize';
const config: Options = {
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Para forçar o uso de SSL
      rejectUnauthorized: false, // Você pode definir isso como true se tiver um certificado SSL válido
    },
  },
}
// const config: Options = {
//   username: "",
//   password: "",
//   database: "ecommercedb",  
//   host: "",  
//   dialect: "sqlite",
//   storage: "./database.sqlite",
// };

export = config