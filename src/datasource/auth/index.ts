import { Router } from 'express';
import { AuthController } from './controller';

const router = Router();
const authController = new AuthController();

router.post('/', authController.login); // POST /api/login

export default router;
