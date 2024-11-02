import { Router } from "express";
import adminController from '../controller/adminController.js';

const router = Router();

// Rotas do Painel Administrativo
router.post('/migrants/delete/:id', adminController.deleteMigrant);
router.get('/migrants', adminController.getMigrants);
router.post('/migrant/create', adminController.createMigrant);
router.get('/migrant/register', adminController.getRegisterMigrant);
router.get('/migrants/search', adminController.searchMigrant);
router.get('/migrants/edit/:id', adminController.getEditMigrantForm);
router.post('/migrants/update/:id', adminController.updateMigrant); 
router.get('/migrants/details/:id', adminController.getMigrantById);
router.get('/migrants/:id', adminController.getMigrantById);
router.post('/migrants', adminController.createMigrant);

export default router;
