import { Router } from "express";
import { getAlertById, getAllAlerts } from "../controllers/alert.controller";

class AlertRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // this.router.get('/', welcome);
    this.router.get("/", getAllAlerts);
    this.router.get('/:id', getAlertById);
  }
}

export default new AlertRoutes().router;