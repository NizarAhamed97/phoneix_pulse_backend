import { Router } from 'express';
import { StaffController } from './controller';

const router = Router();

// Create an instance of the StaffController
const staffController = new StaffController();

// Define routes and connect them to controller functions
router.get('/', (req, res) => staffController.getAllStaff(req, res));
//router.get('/:id', (req, res) => staffController.getStaffById(req, res));
router.get('/trainers', (req, res) => staffController.getTrainerStaffs(req, res));

router.get('/name/:name', (req, res) => staffController.getStaffByName(req, res));
router.post('/', (req, res) => staffController.createStaff(req, res));
router.put('/:id', (req, res) => staffController.updateStaff(req, res));
router.delete('/:id', (req, res) => staffController.deleteStaff(req, res));

export default router;
