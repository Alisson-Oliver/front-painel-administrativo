import { Router } from "express";
import migrantController from '../controller/migrantController.js';
import institutionController from '../controller/institutionController.js'
import termController from "../controller/termController.js";
import checkAuth from "../middlewares/checkAuth.js";
import dashboardController from "../controller/dashboardController.js";
import checkAuthAdmin from '../middlewares/checkAuthAdmin.js';

const router = Router();

// Rotas do Painel Administrativo

// Rota principal do painel administrativo
router.get('/home', checkAuth.auth, dashboardController.getHome);


// Rotas migrantes
router.post('/migrants/check-email', checkAuth.auth, migrantController.checkEmail);
router.post('/migrants/delete', checkAuth.auth, migrantController.deleteMigrant);
router.get('/migrants', checkAuth.auth, migrantController.getMigrants);
router.post('/migrant/create', checkAuth.auth, migrantController.createMigrant);
router.get('/migrant/register', checkAuth.auth, migrantController.getRegisterMigrant);
router.post('/migrants', checkAuth.auth, migrantController.createMigrant);
router.get('/migrants/search', checkAuth.auth, migrantController.searchMigrant);
router.post('/migrants/edit', checkAuth.auth, migrantController.getEditMigrantForm);
router.post('/migrants/update', checkAuth.auth, migrantController.updateMigrant); 
router.post('/migrants/details', checkAuth.auth, migrantController.getMigrantById);
router.post('/migrants/change-password', checkAuth.auth, migrantController.getUpdatePassword);
router.post('/migrants/updatePassword', checkAuth.auth, migrantController.updatePassword);



// Rotas instituições
router.get('/institutions', checkAuth.auth, institutionController.getInstitutions);
router.get('/institutions/search', checkAuth.auth, institutionController.searchInstitutions);
router.post('/institutions/details', checkAuth.auth, institutionController.getInstitutionById);
router.post('/institutions/edit', checkAuth.auth, institutionController.getEditInstitutionForm);
router.post('/institutions/update', checkAuth.auth, institutionController.updateInstitution); 
router.post('/institutions/delete', checkAuth.auth, institutionController.deleteInstitution);
router.post('/institution/create', checkAuth.auth, institutionController.createInstitution);
router.get('/institution/register', checkAuth.auth, institutionController.getRegisterInstitution);


// Rotas Termos
router.get('/terms', checkAuth.auth, termController.getAllTerms);
router.get('/edit-terms/:type', checkAuthAdmin.isAdmin, termController.editTermsPage);
router.get('/terms/:type', checkAuth.auth, termController.getTermsPage);
router.post('/save-terms', checkAuthAdmin.isAdmin, termController.saveTermsPage);

// Rotas Forms
router.get('/forms/migrants', checkAuth.auth, migrantController.getForms);
router.get('/forms/status', checkAuth.auth, migrantController.getFormsByStatus);
router.post('/forms/read', checkAuth.auth, migrantController.formRead);
router.post('/forms/resolved', checkAuth.auth, migrantController.formResolved);
router.post('/forms/delete', checkAuth.auth, migrantController.deleteForms);

export default router;
