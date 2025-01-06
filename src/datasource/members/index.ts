import { Router } from 'express';
import { MemberController } from './controller';

const router = Router();

// Create an instance of the MemberController with the imported connection
const memberController = new MemberController();

// Define routes and connect them to controller functions
router.get('/', (req, res) => memberController.getAllMembers(req, res));
router.get('/:id', (req, res) => memberController.getMemberById(req, res));
router.get('/name/:name', (req, res) => memberController.getMemberByName(req, res))
router.post('/', (req, res) => memberController.createMember(req, res));
router.put('/:id', (req, res) => memberController.updateMember(req, res));
router.delete('/:id', (req, res) => memberController.deleteMember(req, res));

export default router;
