import { Router } from "express";
import { getHostByTriggerId } from "../controllers/host.controller";

class HostRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // this.router.get('/', welcome);
    this.router.get('/trigger/:id', getHostByTriggerId);
  }
}

export default new HostRoutes().router;