import { Router } from "express";
import adminController from '../controller/adminController.js';
import migrantController from '../controller/migrantController.js';
import institutionController from '../controller/institutionController.js'

const router = Router();

// Rotas do Painel Administrativo

// Rotas migrantes
router.post('/migrants/delete/:id', migrantController.deleteMigrant);
router.get('/migrants', migrantController.getMigrants);
router.post('/migrant/create', migrantController.createMigrant);
router.get('/migrant/register', migrantController.getRegisterMigrant);
router.get('/migrants/search', migrantController.searchMigrant);
router.get('/migrants/edit/:id', migrantController.getEditMigrantForm);
router.post('/migrants/update/:id', migrantController.updateMigrant); 
router.get('/migrants/details/:id', migrantController.getMigrantById);
router.get('/migrants/:id', migrantController.getMigrantById);
router.post('/migrants', migrantController.createMigrant);


// Rotas instituições
router.get('/institutions', institutionController.getInstitutions);
router.get('/institutions/search', institutionController.searchInstitutions);
router.post('/institutions/details', institutionController.getInstitutionById);
router.post('/institutions/edit', institutionController.getEditInstitutionForm);
router.post('/institutions/update/:id', institutionController.updateInstitution); 
router.post('/institutions/delete', institutionController.deleteInstitution);

router.post('/institution/create', institutionController.createInstitution);
router.get('/institution/register', institutionController.getRegisterInstitution);

// Rotas admin
router.get('/login', adminController.getLoginAdmin);

export default router;
