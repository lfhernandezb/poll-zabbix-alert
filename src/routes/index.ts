// for class-transform to work ok
import 'reflect-metadata';

import { Application } from "express";
import homeRoutes from "./alert.routes";
import alertRoutes from './alert.routes';
import hostRoutes from './host.routes';

export default class Routes {
  constructor(app: Application) {
    app.use("/api/alerts", alertRoutes);
    app.use("/api/hosts", hostRoutes);
  }
}