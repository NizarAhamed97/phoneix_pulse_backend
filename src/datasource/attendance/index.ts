import { Router } from 'express';
import { AttendanceController } from './controller';

const router = Router();
const attendanceController = new AttendanceController();

// Member Attendance Routes
router.get('/members/present', (req, res) => attendanceController.getPresentMembers(req, res));
router.get('/members/absent', (req, res) => attendanceController.getAbsentMembers(req, res));
router.post('/members/checkin', (req, res) => attendanceController.checkInMember(req, res));
router.post('/members/checkout', (req, res) => attendanceController.checkOutMember(req, res));

// Staff Attendance Routes
router.get('/staff/present', (req, res) => attendanceController.getPresentStaff(req, res));
router.get('/staff/absent', (req, res) => attendanceController.getAbsentStaff(req, res));
router.post('/staff/checkin', (req, res) => attendanceController.checkInStaff(req, res));
router.post('/staff/checkout', (req, res) => attendanceController.checkOutStaff(req, res));

export default router;