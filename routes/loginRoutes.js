import { Router } from "express";
import adminController from '../controller/dashboardController.js';

const router = Router();

// Rotas admin
router.get('/login', adminController.getLogin);
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);

export default router;
