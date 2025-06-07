import { Router } from 'express';
import { AuthController } from './controller';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login); // POST /api/login
router.post('/signup', authController.signup);

export default router;
