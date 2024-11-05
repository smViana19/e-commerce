import 'dotenv/config'
import { Options } from 'sequelize';
const config: Options = {
  username: "",
  password: "",
  database: "ecommercedb",  
  host: "",  
  dialect: "sqlite",
  storage: "./database.sqlite",
};

export = config