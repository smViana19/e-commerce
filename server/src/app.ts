import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://bazzarbrand.vercel.app/"
];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(router)
app.use(errorHandler)


export default app;