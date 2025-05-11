import { Router } from 'express';
import { DashboardController } from './controller';

const router = Router();

// Create an instance of the DashboardController
const staffController = new DashboardController();

// Define routes and connect them to controller functions
router.get('/activity', (req, res) => staffController.getActivity(req, res));
router.get('/memberships', (req, res) => staffController.getMemberships(req, res));


export default router;
