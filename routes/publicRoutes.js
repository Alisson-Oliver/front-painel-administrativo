import { Router } from "express";
import termController from "../controller/termController.js";

const router = Router();

router.get('/terms/:type', termController.getTermsPage);

export default router;
