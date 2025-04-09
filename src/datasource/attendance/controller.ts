import { Request, Response } from 'express';
import connection from '../../database/dbcon';
import { AttendanceQueries } from './mysql';

export class AttendanceController {
  private queries: AttendanceQueries;

  constructor() {
    this.queries = new AttendanceQueries();
  }

  // Member APIs
  public getPresentMembers(req: Request, res: Response) {
    connection.query(this.queries.getPresentMembersQuery(), (error, results) => {
      if (error) return res.status(500).json({ error });
      res.json(results);
    });
  }

  public getAbsentMembers(req: Request, res: Response) {
    connection.query(this.queries.getAbsentMembersQuery(), (error, results) => {
      if (error) return res.status(500).json({ error });
      res.json(results);
    });
  }

  public checkInMember(req: Request, res: Response) {
    const { FK_MemberID } = req.body;
  
    // First, check if member is already checked in
    const checkQuery = `
      SELECT * FROM attendance 
      WHERE FK_MemberID = ? AND CheckOut IS NULL AND DATE(CheckIn) = CURDATE()
    `;
    connection.query(checkQuery, [FK_MemberID], (err, results) => {
      if (err) return res.status(500).json({ error: err });
  
      if ((results as any).length > 0) {
        // Already checked in, so check out
        connection.query(this.queries.updateCheckoutQuery(), [FK_MemberID], (error) => {
          if (error) return res.status(500).json({ error });
          return res.json({ message: 'Member was already checked in, so now checked out' });
        });
      } else {
        // Not checked in, so insert new record
        connection.query(this.queries.insertAttendanceQuery(), [FK_MemberID], (error) => {
          if (error) return res.status(500).json({ error });
          return res.status(201).json({ message: 'Member checked in successfully' });
        });
      }
    });
  }

  public checkOutMember(req: Request, res: Response) {
    const { FK_MemberID } = req.body;
    connection.query(this.queries.updateCheckoutQuery(), [FK_MemberID], (error, results) => {
      if (error) return res.status(500).json({ error });
      res.json({ message: 'Member checked out successfully' });
    });
  }

  // Staff APIs
  public getPresentStaff(req: Request, res: Response) {
    connection.query(this.queries.getPresentStaffQuery(), (error, results) => {
      if (error) return res.status(500).json({ error });
      res.json(results);
    });
  }

  public getAbsentStaff(req: Request, res: Response) {
    connection.query(this.queries.getAbsentStaffQuery(), (error, results) => {
      if (error) return res.status(500).json({ error });
      res.json(results);
    });
  }

  public checkInStaff(req: Request, res: Response) {
    const { FK_StaffID } = req.body;
  
    const checkQuery = `
      SELECT * FROM staff_attendance 
      WHERE FK_StaffID = ? AND CheckOut IS NULL AND DATE(CheckIn) = CURDATE()
    `;
    connection.query(checkQuery, [FK_StaffID], (err, results) => {
      if (err) return res.status(500).json({ error: err });
  
      if ((results as any).length > 0) {
        // Already checked in, so check out
        connection.query(this.queries.updateStaffCheckoutQuery(), [FK_StaffID], (error) => {
          if (error) return res.status(500).json({ error });
          return res.json({ message: 'Staff was already checked in, so now checked out' });
        });
      } else {
        // Not checked in, so insert new record
        connection.query(this.queries.insertStaffAttendanceQuery(), [FK_StaffID], (error) => {
          if (error) return res.status(500).json({ error });
          return res.status(201).json({ message: 'Staff checked in successfully' });
        });
      }
    });
  }

  public checkOutStaff(req: Request, res: Response) {
    const { FK_StaffID } = req.body;
    connection.query(this.queries.updateStaffCheckoutQuery(), [FK_StaffID], (error, results) => {
      if (error) return res.status(500).json({ error });
      res.json({ message: 'Staff checked out successfully' });
    });
  }
}