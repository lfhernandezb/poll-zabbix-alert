import express, { Application, Request, Response, NextFunction } from "express";
import axios, { AxiosError } from "axios";
import Server from "./src/index";
import { config } from "./src/config/config";
// import { config } from "dotenv";

const app: Application = express();
const server: Server = new Server(app);
// const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
// const LISTEN_ADDRESS: string = process.env.LISTEN_ADDRESS ?  process.env.LISTEN_ADDRESS : "localhost";

// Error-handling middleware
app.use(
  (err: unknown, req: Request, res: Response, next: NextFunction): void => {
      if (axios.isAxiosError(err)) {
          if (err.response) {
              res.status(err.response.status).json({
                  message: "Error from external API",
                  status: err.response.status,
                  data: err.response.data,
              });
          } else if (err.request) {
              res.status(504).json({
                  message: "External API is not responding",
                  error: err.message,
              });
          } else {
              res.status(500).json({
                  message: "Axios request error",
                  error: err.message,
              });
          }
      } else if (err instanceof Error) {
          res.status(500).json({
              message: "Internal Server Error",
              error: err.message,
          });
      } else {
          res.status(500).json({
              message: "Unknown error occurred",
          });
      }
  }
);

app
  .listen(config.listeningPort, config.listeningAddress, function () {
    console.log(`Server is running on port ${config.listeningPort}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.error("Error: address already in use");
    } else {
      console.error(err);
    }
    
  });