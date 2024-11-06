import { Router } from "express";
import adminController from '../controller/adminController.js';
import migrantController from '../controller/migrantController.js';
import institutionController from '../controller/institutionController.js'
import checkAuth from "../middlewares/checkAuth.js";

const router = Router();

// Rotas do Painel Administrativo

// Rotas migrantes
router.post('/migrants/check-email', checkAuth.auth, migrantController.checkEmail);
router.post('/migrants/delete', checkAuth.auth, migrantController.deleteMigrant);
router.get('/migrants', checkAuth.auth, migrantController.getMigrants);
router.post('/migrant/create', migrantController.createMigrant);
router.get('/migrant/register', migrantController.getRegisterMigrant);
router.get('/migrants/search', migrantController.searchMigrant);
router.post('/migrants/edit', migrantController.getEditMigrantForm);
router.post('/migrants/update', migrantController.updateMigrant); 
router.post('/migrants/details', migrantController.getMigrantById);
router.post('/migrants', migrantController.createMigrant);
router.post('/migrants/change-password', migrantController.getUpdatePassword);
router.post('/migrants/updatePassword', migrantController.updatePassword);

// Rotas instituições
router.get('/institutions', checkAuth.auth, institutionController.getInstitutions);
router.get('/institutions/search', checkAuth.auth, institutionController.searchInstitutions);
router.post('/institutions/details', checkAuth.auth, institutionController.getInstitutionById);
router.post('/institutions/edit', checkAuth.auth, institutionController.getEditInstitutionForm);
router.post('/institutions/update', checkAuth.auth, institutionController.updateInstitution); 
router.post('/institutions/delete', checkAuth.auth, institutionController.deleteInstitution);
router.post('/institution/create', checkAuth.auth, institutionController.createInstitution);
router.get('/institution/register', checkAuth.auth, institutionController.getRegisterInstitution);

// Rotas admin
router.post('/login', adminController.login);

export default router;
